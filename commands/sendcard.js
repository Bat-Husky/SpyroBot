const { Client, inlineCode, Collection } = require('discord.js');
const fs = require('fs');

module.exports = {
    async execute(message) {
        async function addXP(userId, amount) {
            let allLevels = JSON.parse(fs.readFileSync("./JSON/Levels.json", "utf8"));
            
            const Upsilon = message.guild.roles.cache.find(role => role.name === "Loup Upsilon");
            const Delta = message.guild.roles.cache.find(role => role.name === "Loup Delta");
            const Gamma = message.guild.roles.cache.find(role => role.name === "Loup Gamma");
            const Kappa = message.guild.roles.cache.find(role => role.name === "Loup Kappa");

            if (!allLevels["User"][userId]) {
                allLevels["User"][userId] = {
                    id: userId,
                    level: 0,
                    xp: 0,
                    xpLevel: 100
                }
    
                allLevels["List"].push(userId.toString())
            }

            allLevels["User"][userId]["xp"] += amount;

            while (allLevels["User"][userId]["xp"] >= allLevels["User"][userId]["xpLevel"]) {
                allLevels["User"][userId]["level"] += 1
                allLevels["User"][userId]["xp"] -= allLevels["User"][userId]["xpLevel"]
                allLevels["User"][userId]["xpLevel"] = Math.floor(allLevels["User"][userId]["xpLevel"] * 1.17)
            }

            if (allLevels["User"][userId]["level"] >= 8) {
                await message.guild.members.cache.get(userId).roles.remove(Upsilon.id);
                await message.guild.members.cache.get(userId).roles.add(Delta.id);
            }
            if (allLevels["User"][userId]["level"] >= 20) {
                await message.guild.members.cache.get(userId).roles.remove(Delta.id);
                await message.guild.members.cache.get(userId).roles.add(Gamma.id);
            }
            if (allLevels["User"][userId]["level"] >= 30) {
                await message.guild.members.cache.get(userId).roles.remove(Gamma.id);
                await message.guild.members.cache.get(userId).roles.add(Kappa.id);
            }

            fs.writeFile("./JSON/Levels.json", JSON.stringify(allLevels), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        async function achievements(userId, achievementList) {
            let achiev = JSON.parse(fs.readFileSync("./JSON/cardsystem/achievements.json", "utf8"));

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;

            if (!achiev[userId]) achiev[userId] = [];
            achievementList.forEach(element => {
                achiev[userId].push({
                    name: element,
                    date: today
                });
            });
            fs.writeFileSync("./JSON/cardsystem/achievements.json", JSON.stringify(achiev));
        }

        // On recupère les messages
        let allMessage = JSON.parse(fs.readFileSync("./JSON/cardsystem/lastmessage.json", "utf8"));

        const infoCards = JSON.parse(fs.readFileSync("./JSON/cardsystem/cards.json", "utf8"))
        const cards = infoCards["cards"];
        let inventory = JSON.parse(fs.readFileSync("./JSON/cardsystem/inventory.json", "utf8"));

        let filteredCards = cards;

        if (!inventory[message.author.id]) {
            inventory[message.author.id] = {
                cards: [],
                collection: {}
            };
        } else {
            // On selectionne que les cartes que l'utilisateur n'a pas
            filteredCards = cards.filter(card => !inventory[message.author.id].cards.some(c => c.id[1] === card.id[1]));
        }
        // Si l'utilisateur a toutes les cartes, on ne lui en donne pas
        if (filteredCards.length === 0) {
            return;
        }

        // Si l'utilisateur n'a pas encore envoyé de message
        if (!allMessage[message.author.id]) {
            // On initialise le compteur de messages
            allMessage[message.author.id] = {
                nbMessage: 1
            }
        } else {
            // Sinon on incrémente le compteur de messages
            allMessage[message.author.id].nbMessage++;
        }

        // S'il n'a pas de message on ne fait rien
        if (allMessage[message.author.id].nbMessage >= 1) {
            // On calcule la probabilité de recevoir une carte en fonction du nombre de message
            let prob = 1 - (1 / Math.sqrt(allMessage[message.author.id].nbMessage));
            let total = Math.floor(prob * 1000);
            let number = Math.floor(Math.random() * 1000);
            if (number < total) {
                allMessage[message.author.id].nbMessage = 0;

                let card = filteredCards[Math.floor(Math.random() * filteredCards.length)];
                inventory[message.author.id].cards.push(card);
                inventory[message.author.id].collection[card.id[0]] = (inventory[message.author.id].collection[card.id[0]] || 0) + 1;

                message.author.send(`Vous avez reçu une nouvelle carte : \`${card.name}\``);

                let xp = 100
                let achiev = []

                if (inventory[message.author.id].collection[card.id[0]] == infoCards["collections"][card.id[0]]["count"]) {
                    achiev.push(`Collection complète : ${card.id[0]}`);
                    xp += 80*infoCards["collections"][card.id[0]]["count"];
                    message.channel.send(`Félicitations ${message.author}, vous avez complété la collection : ${card.id[0]}`);
                }

                if (inventory[message.author.id].cards.length == infoCards["total"]) {
                    achiev.push(`Collection complète : toutes les cartes`);
                    xp += 120*infoCards["total"];
                    message.channel.send(`Félicitations ${message.author}, vous avez complété la collection : toutes les cartes`);
                }

                achievements(message.author.id, achiev);
                addXP(message.author.id, xp);

                fs.writeFile("./JSON/cardsystem/inventory.json", JSON.stringify(inventory), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }

        fs.writeFile("./JSON/cardsystem/lastmessage.json", JSON.stringify(allMessage), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}
