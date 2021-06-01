const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
    async execute(Discord, bot, OwnerGuildID) {
            
        bot.ws.on('INTERACTION_CREATE', async interaction => {
            const command = interaction.data.name.toLowerCase();
            const guild = bot.guilds.cache.get(OwnerGuildID)
            var sendmsg;
            var tts;

            if (command === 'baka'){
                const mention = interaction.data.options[0];
                var admin = false;
                
                if (interaction.member.permissions == 17179869183) {
                    tts = true
                    admin = true;
                }
                if (admin == true || !talkedRecently.has(interaction.member.user.id)) {
                    if (mention) {
                        let userID = mention["value"].split('!')[1];
                        userID = userID.replace(">", "");
                        const member = guild.members.cache.find(member => member.id == userID);
                        if (member) {
                            
                            var nombreAleatoire = Math.round(Math.random()*8);
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
                            talkedRecently.add(interaction.member.user.id);
                                setTimeout(() => {
                            talkedRecently.delete(interaction.member.user.id);
                            }, 60000);
                        } else {
                            sendmsg = "Il n'est pas sur le serveur !"
                        }
                    } else {
                        sendmsg = "Vous n'avez mentionné personne !"
                    }
                } else {
                    sendmsg = "Wait a minute before tryng again"
                }

                bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            tts: tts,
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
            } else if (command === 'help') {
                
                const top = new MessageEmbed()
                    .setColor("#0042ff")
                    .setTitle("SpyroBot's Commands")
                    .setDescription("Voici toutes les commandes de SpyroBot, le préfix du bot est `$`. \nVous pouvez pin un message en réagissant à celui-ci avec 📌.")
                
                const general = new MessageEmbed()
                    .setColor("#0042ff")
                    .setTitle("Général :")
                    .setDescription("`$info` : Donne des info sur le bot. \n`$Coin info` : Donne des info sur la commande $coin \n`$cmdStatus` permet de désactiver certaines commandes \n`$Crash` : Fais crash le bot (Admin only) \n`$Ping` : Ping le bot (Admin only)")

                const useless = new MessageEmbed()
                    .setColor("#0042ff")
                    .setTitle("☣ Useless  :")
                    .setDescription("`$Givexp` : cette commande vous troll, tout simplement. \n`$tonbotestmalfoutu` : ne sert à rien ; rajouter set pour modifier. \n`$baka` : $baka <@user> ; insulte les autres. \n`$meme` : envoie des memes \n`$FaitsDivers` : Vous donne des faits divers. \n`$run info` : Donne des infos sur la commande run. \n`$diagonale` : Insulte la diagonale.")
                
                const moderation = new MessageEmbed()
                    .setColor("#0042ff")
                    .setTitle("🛡 Modération :")
                    .setDescription("`$Ban` : $Ban <@user> \n`$Kick` : $Kick <@user> \n`$Warn` : $Warn <@user> <reason> \n`$Infractions` : $Infractions <@user> \n`$Clear` : $Clear <amount> ; max 100 \n`$Report` : $Report <user> <reason> ; (everyone) \n`$LogsChannel` : $LogsChannel <id or name> ; défini le channel des logs.")

                const voice = new MessageEmbed()
                    .setColor("#0042ff")
                    .setTitle("🔊 Vocal :")
                    .setDescription("`$Play` : $Play <link> \n`$Skip` : passe à la musique suivante. \n`$Queue` : donne la liste des chansons sur la queue. \n`$Volume` : $volume <number> \n`$Loop` : Répète les musiques de la queue. \n`$Leave` : quitte le channel. \n`$SetQueueChannel` : $SetQueueChannel <id or name>")


                bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [
                                top,
                                general,
                                useless,
                                moderation,
                                voice
                            ]
                        }
                    }
                })
            } else if (command === 'warn') {
                
                if (interaction.member.permissions == 17179869183) {
                    let mention = interaction.data.options[0];
                    let userID = mention["value"].split('!')[1];
                    userID = userID.replace(">", "");
                    const member = guild.members.cache.find(member => member.id == userID);

                    let logsChannels = JSON.parse(fs.readFileSync("./JSON/LogsChannels.json", "utf8"));

                    if (logsChannels[guild.id] && guild.channels.cache.find(ch => ch.name == logsChannels[guild.id]) || guild.channels.cache.find(ch => ch.id == logsChannels[guild.id])) {
                        let warns = JSON.parse(fs.readFileSync("./JSON/Warning.json", "utf8"));

                        if(!warns[member.id]) warns[member.id] = {
                            warns: 0
                        };

                        warns[member.id].warns++;

                        fs.writeFile("./JSON/Warning.json", JSON.stringify(warns), (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });

                        sendmsg = new MessageEmbed()
                            .setDescription("Warns")
                            .setAuthor(`From ${interaction.member.user.username}`)
                            .setColor("#0042ff")
                            .addField("Warned User", member)
                            .addField("Reason", interaction.data.options[1].value)

                        const warnChannel = guild.channels.cache.find(ch => ch.name == logsChannels[guild.id]) || guild.channels.cache.find(ch => ch.id == logsChannels[guild.id])
                        const channel = guild.channels.cache.find(ch => ch.id == interaction.channel_id);

                        const warnEmbedLogs = new MessageEmbed()
                            .setDescription("Warns")
                            .setAuthor(`From ${interaction.member.user.username}`)
                            .setColor("#0042ff")
                            .addField("Warned User", member)
                            .addField("Warned in", channel)
                            .addField("Number of Warnings", warns[member.id].warns)
                            .addField("Reason", interaction.data.options[1].value)
                        warnChannel.send(warnEmbedLogs);

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
                    } else {
                        sendmsg = "Définnissez le channel des logs comme ceci : \n`$LogsChannel <id or name>`"

                        bot.api.interactions(interaction.id, interaction.token).callback.post({
                            data: {
                                type: 4,
                                data: {
                                    content: sendmsg
                                }
                            }
                        })
                    }
                } else {
                    sendmsg = "You can't use that command!";

                    bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: sendmsg
                            }
                        }
                    })
                }
            }
        });
    }
}
