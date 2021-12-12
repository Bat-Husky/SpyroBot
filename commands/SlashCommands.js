const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');
const talkedRecently = new Set()

// TODO : v13

module.exports = {
    async execute(bot, OwnerGuildID, OwnerID, prefix) {
    
        bot.ws.on('INTERACTION_CREATE', async interaction => {
            const command = interaction.data.name.toLowerCase();
            const guild = bot.guilds.cache.get(OwnerGuildID)
            var sendmsg;
            var tts;

            if (command === 'baka'){
                const mention = interaction.data.options[0];
                var admin = false;
                
                const user = guild.members.cache.find(member => member.id == interaction.member.user.id);
                if (user.permissions.has("ADMINISTRATOR")) {
                    tts = true
                    admin = true;
                }
                if (admin == true || !talkedRecently.has(interaction.member.user.id)) {
                    if (mention) {
                        const member = guild.members.cache.find(member => member.id == mention.value);
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
                const user = guild.members.cache.find(member => member.id == interaction.member.user.id);
                if (!user.permissions.has("ADMINSTRATOR")) {
                    return bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: "You can't use that command!"
                            }
                        }
                    })
                }

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
            } else if (command === 'rank') {
                
                let allLevels = JSON.parse(fs.readFileSync("./JSON/Levels.json", "utf8"));

                var User = guild.members.cache.find(member => member.id == interaction.member.user.id);

                if (interaction.data.options) {
                    let mention = interaction.data.options[0];
                    User = guild.members.cache.find(member => member.id == mention.value)
                }

                var rank = 1;

                const Level = allLevels["User"][User.id]["level"]

                if (!allLevels["User"][User.id]) {
                    return bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: "Cette personne n'a pas de niveau."
                            }
                        }
                    })
                }

                for (var i = 0; i < allLevels["List"].length; i++) {
                    //console.log(allLevels["User"]["467284102987382800"])
                    if (allLevels["User"][allLevels["List"][i]]["id"] == User.id) {
                        rank = rank
                    } else if (allLevels["User"][allLevels["List"][i]]["level"] > Level) {
                        rank += 1
                    } else if (allLevels["User"][allLevels["List"][i]]["level"] == Level) {
                        if (allLevels["User"][allLevels["List"][i]]["xp"] > allLevels["User"][User.id]["xp"]) {
                            rank += 1
                        }
                    }
                }

                const embed = new MessageEmbed()
                    .setColor("#0042ff")
                    .setTitle(`${User.user.tag}`)
                    .addField("Rank :", `${rank}`)
                    .addField("Level :", `${allLevels["User"][User.id]["level"]}`)
                    .addField("XP :", `${allLevels["User"][User.id]["xp"]} / ${allLevels["User"][User.id]["xpLevel"]}`)
                    .setThumbnail(User.user.avatarURL("png"))

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
                const member = guild.members.cache.find(member => member.id == interaction.member.user.id);
                
                const top = new MessageEmbed()
                    .setColor("#5465FF")
                    .setTitle("SpyroBot's Commands")
                    .setDescription("Voici toutes les commandes de SpyroBot, le préfix du bot est `$`. \nVous pouvez pin un message en réagissant à celui-ci avec 📌.")
                
                const general = new MessageEmbed()
                    .setColor("#5465FF")
                    .setTitle("Général :")
                    .setDescription("`$info` : Donne des info sur le bot. \n`$Bots` : Donne des infos sur les bots. \n`$Rank` : Donne le niveau et le rang. \n`$Rules` : Lis les règles ! \n`$Spyro` : $Spyro <code|github|history> ; Donne des infos \n`$Open[Pattern/Code/Info]` : Donne des infos sur OpenBot. \n`$Constitution` : Envoie le fichier de la constitution. \n`$Coin info` : Donne des info sur la commande $coin \n`$cmdStatus` permet de désactiver certaines commandes \n`$Crash` : Fais crash le bot (Admin only) \n`$Ping` : Ping le bot (Admin only)")

                const useless = new MessageEmbed()
                    .setColor("#5465FF")
                    .setTitle("☣ Useless  :")
                    .setDescription("`$Givexp` : cette commande vous troll, tout simplement. \n`$tonbotestmalfoutu` : ne sert à rien ; rajouter set pour modifier. \n`$baka` : $baka <@user> ; insulte les autres. \n`$meme` : envoie des memes \n`$FaitsDivers` : Vous donne des faits divers. \n`$run info` : Donne des infos sur la commande run. \n`$diagonale` : Insulte la diagonale.")
                
                const moderation = new MessageEmbed()
                    .setColor("#5465FF")
                    .setTitle("🛡 Modération :")
                    .setDescription("`$Ban` : $Ban <@user> \n`$Kick` : $Kick <@user> \n`$Warn` : $Warn <@user> <reason> \n`$Infractions` : $Infractions <@user> \n`$Clear` : $Clear <amount> ; max 100 \n`$Report` : $Report <user> <reason> ; (everyone) \n`$LogsChannel` : $LogsChannel <id or name> ; défini le channel des logs.")

                const voice = new MessageEmbed()
                    .setColor("#5465FF")
                    .setTitle("🔊 Vocal :")
                    .setDescription("`$Play` : $Play <link> \n`$Skip` : passe à la musique suivante. \n`$Queue` : donne la liste des chansons sur la queue. \n`$Volume` : $volume <number> \n`$Loop` : Répète les musiques de la queue. \n`$Leave` : quitte le channel. \n`$SetQueueChannel` : $SetQueueChannel <id or name>")

                
                var isSlash;
                var isMP;

                
                if (interaction.data.options && interaction.data.options[0]) {
                    if (interaction.data.options[0].name == "slash") isSlash = (interaction.data.options[0].value === "true")
                    else if (interaction.data.options[0].name == "mp") isMP = (interaction.data.options[0].value === "true")
                }

                if (interaction.data.options && interaction.data.options[1]) {
                    if (interaction.data.options[1].name == "slash") isSlash = (interaction.data.options[1].value === "true")
                    else if (interaction.data.options[1].name == "mp") isMP = (interaction.data.options[1].value === "true")
                }
                
                
                if (isSlash) {

                    const slashHelp = new MessageEmbed()
                            .setColor("#5465FF")
                            .setTitle("Slash Commands")
                            .setDescription("__**Commands :**__ \n`baka` \n`faitsdivers` \n`info` \n`help` \n`ping` \n`clear` \n`warn` \n`infractions`")

                    if (isMP) {

                        member.send(slashHelp)
                        // member.send({ embeds: [slashHelp] })
    
                        return bot.api.interactions(interaction.id, interaction.token).callback.post({
                            data: {
                                type: 4,
                                data: {
                                    content: "DM sent!"
                                }
                            }
                        })
    
                    } else {
    
                        return bot.api.interactions(interaction.id, interaction.token).callback.post({
                            data: {
                                type: 4,
                                data: {
                                    embeds: [
                                        slashHelp
                                    ]
                                }
                            }
                        })

                    }

                }

                if (isMP) {

                    member.send(top) && member.send(general) && member.send(useless) && member.send(moderation) && member.send(voice)
                    // member.send({ embeds: [top] }) && member.send({ embeds: [general] }) && member.send({ embeds: [useless] }) && member.send({ embeds: [moderation] }) && member.send({ embeds: [voice] })

                    return bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: "DM sent!"
                            }
                        }
                    })

                } else {

                    return bot.api.interactions(interaction.id, interaction.token).callback.post({
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

                }

            } else if (command === 'warn') {
                const user = guild.members.cache.find(member => member.id == interaction.member.user.id);

                if (!user.hasPermission("MANAGE_MESSAGES")) {
                    return bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: "You can't use that command!"
                            }
                        }
                    })
                }

                let mention = interaction.data.options[0];
                const member = guild.members.cache.find(member => member.id == mention.value);

                if (!member) {
                    return bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: "No user found!"
                            }
                        }
                    })
                }

                if (member.permissions.has("ADMINISTRATOR")) {
                    return bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: "Can't warn user"
                            }
                        }
                    })
                }

                let logsChannels = JSON.parse(fs.readFileSync("./JSON/LogsChannels.json", "utf8"));
                if (!logsChannels[guild.id] || !guild.channels.cache.find(ch => ch.name == logsChannels[guild.id]) && !guild.channels.cache.find(ch => ch.id == logsChannels[guild.id])) {
                    return bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: "Définnissez le channel des logs comme ceci : \n`$LogsChannel <id or name>`"
                            }
                        }
                    })
                }

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
                // warnChannel.send({ embeds: [warnEmbedLogs] })

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
            } else if (command === 'ping') {
                
                if (interaction.member.user.id == OwnerID) {
                    bot.user.setActivity(`${prefix}help`, { type: 'WATCHING' });
                    // const testChannel = guild.channels.cache.find(ch => ch.name === 'test');
                    let Time = Math.round((bot.uptime / 60000) * 1000) / 1000
                    sendmsg = `\`\`\`fix\nPing réussi ! \n\`\`\` \nUptime : \`${Time} minutes\``
                } else {
                    sendmsg = "You can't use that command!"
                }

                bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: sendmsg
                        }
                    }
                })
            } else if (command === 'infractions') {
                let warns = JSON.parse(fs.readFileSync("../ReBot_test/JSON/Warning.json", "utf8"));
                const user = guild.members.cache.find(member => member.id == interaction.member.user.id);

                if (!user.hasPermission("MANAGE_MEMBERS")) {
                    return bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: "You can't use that command!"
                            }
                        }
                    })
                }
                const mention = interaction.data.options[0];
                const member = guild.members.cache.find(member => member.id == mention.value);
                    
                if(!warns[member.id]) {
                    return bot.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: "This user has no warn"
                            }
                        }
                    })
                }

                const warnEmbed = new MessageEmbed()
                    .setTitle('Infractions')
                    .setColor("#0042ff")
                    .addField("User", member)
                    .addField("Number of Warnings", warns[member.id].warns)
                    
                bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [
                                warnEmbed
                            ]
                        }
                    }
                })
            }
        });
    }
}
