const { SlashCommandBuilder, MessageFlags, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('Accédez à la boutique'),
	async execute(interaction) {
        async function addXP(userId, amount) {
            let allLevels = JSON.parse(fs.readFileSync("./JSON/Levels.json", "utf8"));
            
            const Upsilon = interaction.guild.roles.cache.find(role => role.name === "Loup Upsilon");
            const Delta = interaction.guild.roles.cache.find(role => role.name === "Loup Delta");
            const Gamma = interaction.guild.roles.cache.find(role => role.name === "Loup Gamma");
            const Kappa = interaction.guild.roles.cache.find(role => role.name === "Loup Kappa");

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
                await interaction.guild.members.cache.get(userId).roles.remove(Upsilon.id);
                await interaction.guild.members.cache.get(userId).roles.add(Delta.id);
            }
            if (allLevels["User"][userId]["level"] >= 20) {
                await interaction.guild.members.cache.get(userId).roles.remove(Delta.id);
                await interaction.guild.members.cache.get(userId).roles.add(Gamma.id);
            }
            if (allLevels["User"][userId]["level"] >= 30) {
                await interaction.guild.members.cache.get(userId).roles.remove(Gamma.id);
                await interaction.guild.members.cache.get(userId).roles.add(Kappa.id);
            }

            fs.writeFile("./JSON/Levels.json", JSON.stringify(allLevels), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        const coins = JSON.parse(fs.readFileSync("./JSON/coin.json", "utf8"));

		if (!coins[interaction.user.id]) {
			coins[interaction.user.id] = { coins: 0 };
		}

        const userCoins = coins[interaction.user.id].coins;
        const XP_orb = await interaction.client.application.emojis.fetch("1403732131296841798");
        const card = await interaction.client.application.emojis.fetch("1403739073566343258");
        const cardRich = await interaction.client.application.emojis.fetch("1403739902188847257");

        const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Boutique")
            .setDescription(`Vous avez \`${userCoins} pièces\`.`)
            .addFields(
                { name: `${XP_orb} Expérience - 500 pièces`, value: "100 points d'expérience" },
                { name: `${card} Carte - 1250 pièces`, value: "Garantie une carte au prochain message" },
                { name: `${cardRich} Carte Légendaire - 3250 pièces`, value: "Vous donne une carte Légendaire" }
            );

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('buy_xp_orb')
                    .setEmoji(XP_orb.id)
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(userCoins < 500),
                new ButtonBuilder()
                    .setCustomId('buy_card')
                    .setEmoji(card.id)
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(userCoins < 1250),
                new ButtonBuilder()
                    .setCustomId('buy_card_rich')
                    .setEmoji(cardRich.id)
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(userCoins < 3250)
            );

        const response = await interaction.reply({ embeds: [embed], components: [row], withResponse: true });

        const collectorFilter = i => i.user.id === interaction.user.id;

        const collector = response.resource.message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 120_000, filter: collectorFilter });

        collector.on('collect', async i => {
            const selection = i.customId;

            if (selection === 'buy_xp_orb') {
                if (userCoins >= 500) {
                    coins[interaction.user.id].coins -= 500;
                    addXP(interaction.user.id, 100);
                    await i.reply({ content: 'Vous avez acheté un orbe d\'expérience !', flags: MessageFlags.Ephemeral });
                } else {
                    await i.reply({ content: 'Vous n\'avez pas assez de pièces !', flags: MessageFlags.Ephemeral });
                }
            } else if (selection === 'buy_card') {
                if (userCoins >= 1250) {
                    coins[interaction.user.id].coins -= 1250;

                    let allMessage = JSON.parse(fs.readFileSync("./JSON/cardsystem/lastmessage.json", "utf8"));

                    allMessage[interaction.user.id] = {
                        nbMessage: 1e30
                    };

                    fs.writeFile("./JSON/cardsystem/lastmessage.json", JSON.stringify(allMessage), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });


                    await i.reply({ content: 'Vous avez acheté une carte !', flags: MessageFlags.Ephemeral });
                } else {
                    await i.reply({ content: 'Vous n\'avez pas assez de pièces !', flags: MessageFlags.Ephemeral });
                }
            } else if (selection === 'buy_card_rich') {
                if (userCoins >= 3250) {
                    
                    const infoCards = JSON.parse(fs.readFileSync("./JSON/cardsystem/cards.json", "utf8"))
                    const cards = infoCards["legendaryCards"];
                    let inventory = JSON.parse(fs.readFileSync("./JSON/cardsystem/inventory.json", "utf8"));

                    let filteredCards = cards;

                    if (!inventory[interaction.user.id]) {
                        inventory[interaction.user.id] = {
                            cards: [],
                            collection: {}
                        };
                    } else {
                        // On selectionne que les cartes que l'utilisateur n'a pas
                        filteredCards = cards.filter(card => !inventory[interaction.user.id].cards.some(c => c.id[1] === card.id[1]));
                    }

                    if (filteredCards.length === 0) {
                        await i.reply({ content: 'Vous avez déjà toutes les cartes légendaires !', flags: MessageFlags.Ephemeral });
                        return;
                    } else {
                        // On sélectionne une carte légendaire au hasard
                        const randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
                        inventory[interaction.user.id].cards.push(randomCard);

                        fs.writeFile("./JSON/cardsystem/inventory.json", JSON.stringify(inventory), (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });

                        coins[interaction.user.id].coins -= 3250;
                        await i.reply({ content: `Vous avez acheté une carte légendaire !\nNom : ${randomCard.name}`, flags: MessageFlags.Ephemeral });
                    }
                } else {
                    await i.reply({ content: 'Vous n\'avez pas assez de pièces !', flags: MessageFlags.Ephemeral });
                }
            }

            fs.writeFile("./JSON/coin.json", JSON.stringify(coins), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
	},
};