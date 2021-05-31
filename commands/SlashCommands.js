const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
    async execute(Discord, bot, OwnerGuildID) {
        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "baka",
                description: "An insult command",
                options: [
                    {
                        name: "user",
                        description: "The user to insult",
                        type: 3,
                        required: true
                    }
                ]
            }
        });

        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "faitsdivers",
                description: "A command that send Faits Divers"
            }
        });

        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "info",
                description: "Give info about SpyroBot"
            }
        });

        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "clear",
                description: "A command to clear",
                options: [
                    {
                        name: "amount",
                        description: "the number of message to delete",
                        type: 3,
                        required: true
                    }
                ]
            }
        });
    
    
        bot.ws.on('INTERACTION_CREATE', async interaction => {
            const command = interaction.data.name.toLowerCase();
            const guild = bot.guilds.cache.get(OwnerGuildID)
            var sendmsg;

            if (command === 'baka'){
                const mention = interaction.data.options[0];
                
                if (mention) {
                    let userID = mention["value"].split('!')[1]
                    userID = userID.replace(">", "")
                    const member = guild.members.cache.find(member => member.id == userID)
                    if (member) {
                        var nombreAleatoire = Math.round(Math.random()*8);
                        var reponse;
                        if(nombreAleatoire === 1) {
                            sendmsg = `${member} est une grosse merde`
                        } else if (nombreAleatoire === 2) {
                            sendmsg = `${member} va bouffer ses grands morts`
                        } else if (nombreAleatoire === 3) {
                            sendmsg = `${member} est juste un énorme ABRUTI`
                        } else if (nombreAleatoire === 4) {
                            sendmsg = `${member} est une PÉTASSE`
                        } else if (nombreAleatoire === 5) {
                            sendmsg = `${member} est un sale gueux`
                        } else if (nombreAleatoire === 6) {
                            sendmsg = `${member} a un balai dans l'cul`
                        } else if (nombreAleatoire === 7) {
                            sendmsg = `${member} est une ordure`
                        } else {
                            sendmsg = `${member} est un sale gougnafier`
                        }
                    } else {
                        sendmsg = "Il n'est pas sur le serveur !"
                    }
                } else {
                    sendmsg = "Vous n'avez mentionné personne !"
                }

                bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: sendmsg
                        }
                    }
                })

            } else if (command === 'faitsdivers') {
                
                let nbFaitsDivers = JSON.parse(fs.readFileSync("../ReBot_test/JSON/faitsdivers.json", "utf8"))["nombre"]
                let faitsDivers = JSON.parse(fs.readFileSync("../ReBot_test/JSON/faitsdivers.json", "utf8"))["faitsdivers"]
                let nbAleatoire = Math.floor(Math.random() * nbFaitsDivers);

                sendmsg = `>>> **${faitsDivers[nbAleatoire]}**`

                bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: sendmsg
                        }
                    }
                })

            } else if (command === 'clear') {
                const channel = guild.channels.cache.find(ch => ch.id == interaction.channel_id);
                if (Number(interaction.data.options[0].value) == interaction.data.options[0].value) {
                    let amount = 0;
                    if (interaction.data.options[0] == '1' || interaction.data.options[0] == '0') {
                        amount = 1;
                    } else {
                        amount = Number(interaction.data.options[0].value);
                        if (amount > 100) {
                            amount = 100;
                        }
                    }
                    await channel.bulkDelete(amount, true).then((_message) => {
                        sendmsg = `Bot cleared \`${_message.size}\` messages :broom:`
                    });
                } else {
                    sendmsg = 'enter the amount of messages that you would like to clear'
                }

                bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: sendmsg
                        }
                    }
                })

            } else if (command === 'info') {
                
                const sendmsg = new MessageEmbed()
                    .setColor("#0042ff")
                    .setTitle("SpyroBot Info")
                    .setURL("https://docs.google.com/document/d/1uSBdN_1_jUk0arHGbWB0kMjv6YJGQTgoLKO2QhjjhK8/edit?usp=sharing")
                    .setDescription("Hi! I am SpyroBot! \nI am a multi-tasking bot developed by `Bat-Husky`. \nI have `🛡 moderation` and `🔊 music` commands. I also have other `☣ Useless` but funny commands. \nFor more info about commands, use the command $help.")
                    .setThumbnail('https://media.discordapp.net/attachments/575712614097879050/799944045778436107/spyrobot_v1.png?width=670&height=670')
                    .addField('\u200b', '\u200b')
                    .addFields(
                    { name: 'Library :', value: '`discord.js`', inline: true },
                    { name: 'Prefix :', value: '`$`', inline: true },
                    { name: 'Running on :', value: `\`${bot.guilds.cache.size} servers\``, inline: true }
                    )

                bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [
                                sendmsg
                            ]
                        }
                    }
                })
            }
        });
    }
}