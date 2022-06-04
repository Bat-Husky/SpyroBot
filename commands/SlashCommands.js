const { Client, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
// const { rank } = require('../other/stockCMD');
const talkedRecently = new Set()
const consti = new Discord.MessageAttachment('./other/Constitution_de_The_Bad-Wolf.docx')

// TODO : v13

module.exports = {
    async execute(bot, guild, OwnerID, prefix, interaction) {

        const command = interaction.commandName;
        

        // const serverQueue = queue.get(guild.id);

        if (command === 'baka') {

            baka(interaction, guild)

        } else if (command === 'faitsdivers') {
            var sendmsg;
            
            let nbFaitsDivers = JSON.parse(fs.readFileSync("../ReBot_test/JSON/faitsdivers.json", "utf8"))["nombre"]
            let faitsDivers = JSON.parse(fs.readFileSync("../ReBot_test/JSON/faitsdivers.json", "utf8"))["faitsdivers"]
            let nbAleatoire = Math.floor(Math.random() * nbFaitsDivers);

            sendmsg = `>>> **${faitsDivers[nbAleatoire]}**`

            interaction.editReply(sendmsg)

        } else if (command === 'bots') {
            var sendmsg;

            let Stinger = guild.members.cache.get('835577703884521523')
            let JAAJmo = guild.members.cache.get('828587649467154452')
            let ReBot = guild.members.cache.get('623244968336818176')
            let Sus = guild.members.cache.get('826447138724642817')

            let moi = guild.members.cache.get('467284102987382784')
            let VBat = guild.members.cache.get('437204882123128832')
            let Mikwel = guild.members.cache.get('631475496130969610')

            sendmsg = `Ce serveur compte de nombreux Bots, néanmoins, certains sont uniques. \nLa quasi-intégralité des commandes et automatisations du serveur sont gérées par des Bots custom : ${bot.user}, ${Stinger} et ${JAAJmo}. \nCes Bots ont été créés respectivement par ${moi}, ${VBat} et ${Mikwel}. Nous les mettons à jour régulièrement, et comme ils sont de notre création, on peut faire ce que l'on veut avec. \nPS : ${ReBot} est la version de test de ${bot.user}, et ${Sus}, celle de ${Stinger}.`

            interaction.editReply({content: sendmsg})

        } else if (command === 'clear') {
            var sendmsg;

            const user = guild.members.cache.find(member => member.id == interaction.user.id);
            if (!user.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
                return interaction.editReply("You can't use that command!")
            }

            const channel = guild.channels.cache.find(ch => ch.id == interaction.channel.id);
            if (Number(interaction.options.get("amount").value) == interaction.options.get("amount").value) {
                let amount = 0;
                if (interaction.options.get("amount").value == '1' || interaction.options.get("amount").value == '0') {
                    amount = 1;
                } else {
                    amount = Number(interaction.options.get("amount").value);
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

            interaction.editReply({content: sendmsg})

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

            interaction.editReply({ embeds: [sendmsg] })
        } else if (command === 'rank') {

            rank(interaction, guild)

        } else if (command === 'help') {

            help(interaction, guild)

        } else if (command === 'warn') {

            warn(interaction, guild)

        } else if (command === 'report') {

            report(interaction, guild)

        } else if (command === 'ping') {
            
            if (interaction.user.id == OwnerID) {
                bot.user.setActivity(`${prefix}help`, { type: 'WATCHING' });
                // const testChannel = guild.channels.cache.find(ch => ch.name === 'test');
                let Time = Math.round((bot.uptime / 60000) * 1000) / 1000
                sendmsg = `\`\`\`fix\nPing réussi ! \n\`\`\` \nUptime : \`${Time} minutes\``
            } else {
                sendmsg = "You can't use that command!"
            }

            interaction.editReply({ content: sendmsg })
        } else if (command === 'infractions') {
            let warns = JSON.parse(fs.readFileSync("../ReBot_test/JSON/Warning.json", "utf8"));
            const user = guild.members.cache.find(member => member.id == interaction.user.id);

            if (!user.permissions.has(Discord.Permissions.FLAGS.MODERATE_MEMBERS)) {
                return interaction.editReply("You can't use that command!")
            }
            const mention = interaction.options.get("user");
            const member = guild.members.cache.find(member => member.id == mention.value);
                
            if(!warns[member.id]) {
                return interaction.editReply("This user has no warn")
            }

            const warnEmbed = new MessageEmbed()
                .setTitle('Infractions')
                .setColor("#0042ff")
                .addField("User", member.toString())
                .addField("Number of Warnings", warns[member.id].warns.toString())
                
            interaction.editReply({ embeds: [warnEmbed] })
        } else if (command === 'leaderboard') {
            let allLevels = JSON.parse(fs.readFileSync("./JSON/Levels.json", "utf8"));
    
            var sortedId = allLevels["List"].sort((a, b) => allLevels["User"][b]["level"] - allLevels["User"][a]["level"])
    
            var top10 = sortedId.slice(0, 10)
            
    
            var ranks = {};
            
            for (const id of top10) {
                const Level = allLevels["User"][id]["level"]
                let rank = 1
                for (var i = 0; i < allLevels["List"].length; i++) {
                    //console.log(allLevels["User"]["467284102987382800"])
                    if (allLevels["User"][allLevels["List"][i]]["id"] == id) {
                        rank = rank
                    } else if (allLevels["User"][allLevels["List"][i]]["level"] > Level) {
                        rank += 1
                    } else if (allLevels["User"][allLevels["List"][i]]["level"] == Level) {
                        if (allLevels["User"][allLevels["List"][i]]["xp"] > allLevels["User"][id]["xp"]) {
                            rank += 1
                        }
                    }
                }
                ranks[id] = rank
            }
    
            top10.sort((a, b) => ranks[a] - ranks[b]);
    
            var sendmsg = "Top 10 :\n"
            for (const player of top10) {
                let user = guild.members.cache.get(player)
                sendmsg += "```swift\n" + `${ranks[player]}. ${user.user.username} : lvl${allLevels["User"][player]["level"]}\n` + "```"
            }
            interaction.editReply(sendmsg);
        }
    }
}


async function baka(interaction, guild) {
    var sendmsg;
    var tts;

    const mention = interaction.options.get('user');
    var admin = false;
    
    const user = guild.members.cache.find(member => member.id == interaction.user.id);
    if (user.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
        tts = true
        admin = true;
    }
    if (admin == true || !talkedRecently.has(user.id)) {
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
                talkedRecently.add(user.id);
                    setTimeout(() => {
                talkedRecently.delete(user.id);
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

    interaction.editReply({ content: sendmsg, tts: tts })
}


async function rank(interaction, guild) {
            
    let allLevels = JSON.parse(fs.readFileSync("./JSON/Levels.json", "utf8"));

    var User = guild.members.cache.find(member => member.id == interaction.user.id);

    if (interaction.options.get("user")) {
        let mention = interaction.options.get("user");
        User = guild.members.cache.find(member => member.id == mention.value)
    }

    var rank = 1;

    const Level = allLevels["User"][User.id]["level"]

    if (!allLevels["User"][User.id]) {
        return interaction.editReply("Cette personne n'a pas de niveau.")
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

    interaction.editReply({ embeds: [embed] })
}


async function help(interaction, guild) {
    const member = guild.members.cache.find(member => member.id == interaction.user.id);
    
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


    console.log(interaction.options)

    var isSlash;
    var isMP;

    

    if (interaction.options && interaction.options.get("slash")) {
        isSlash = (interaction.options.get("slash").value === "true")
    }

    if (interaction.options && interaction.options.get("mp")) {
        isMP = (interaction.options.get("mp").value === "true")
    }

    if (isSlash) {

        const slashHelp = new MessageEmbed()
                .setColor("#5465FF")
                .setTitle("Slash Commands")
                .setDescription("__**Commands :**__ \n`info` \n`help` \n`bots` \n`ping` \n`baka` \n`faitsdivers` \n`warn` \n`infractions` \n`report` \n`clear` \n`rank`")

        if (isMP) {

            // member.send(slashHelp)
            member.send({ embeds: [slashHelp] })

            return interaction.editReply({ content: "DM sent!" })

        } else {

            return interaction.editReply({ embeds: [slashHelp] })

        }

    }

    if (isMP) {

        // member.send(top) && member.send(general) && member.send(useless) && member.send(moderation) && member.send(voice)
        member.send({ embeds: [top] }) && member.send({ embeds: [general] }) && member.send({ embeds: [useless] }) && member.send({ embeds: [moderation] }) && member.send({ embeds: [voice] })

        return interaction.editReply({ content: "DM sent!" })

    } else {

        return interaction.editReply({
            embeds: [
                top,
                general,
                useless,
                moderation,
                voice
            ]
        })

    }
}


async function warn(interaction, guild) {
    var sendmsg;

    const user = guild.members.cache.find(member => member.id == interaction.user.id);

    if (!user.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
        return interaction.editReply("You can't use that command!")
    }

    let mention = interaction.options.get("user");
    const member = guild.members.cache.find(member => member.id == mention.value);

    if (!member) {
        return interaction.editReply("No user found!")
    }

    if (member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
        return interaction.editReply("Can't warn user")
    }

    let logsChannels = JSON.parse(fs.readFileSync("./JSON/LogsChannels.json", "utf8"));
    if (!logsChannels[guild.id] || !guild.channels.cache.find(ch => ch.name == logsChannels[guild.id]) && !guild.channels.cache.find(ch => ch.id == logsChannels[guild.id])) {
        return interaction.editReply("Définnissez le channel des logs comme ceci : \n`$LogsChannel <id or name>`")
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
        .addField("Warned User", member.toString())
        .addField("Reason", interaction.options.get("reason").value.toString())

    const warnChannel = guild.channels.cache.find(ch => ch.name == logsChannels[guild.id]) || guild.channels.cache.find(ch => ch.id == logsChannels[guild.id])
    const channel = guild.channels.cache.find(ch => ch.id == interaction.channel.id);

    const warnEmbedLogs = new MessageEmbed()
        .setDescription("Warns")
        .setAuthor(`From ${interaction.member.user.username}`)
        .setColor("#0042ff")
        .addField("Warned User", member.toString())
        .addField("Warned in", channel.toString())
        .addField("Number of Warnings", warns[member.id].warns.toString())
        .addField("Reason", interaction.options.get("reason").value.toString())
    // warnChannel.send(warnEmbedLogs);
    warnChannel.send({ embeds: [warnEmbedLogs] })

    interaction.editReply({ embeds: [sendmsg] })
}


async function report(interaction, guild) {
    var sendmsg;
            
    const user = guild.members.cache.find(member => member.id == interaction.user.id);

    let mention = interaction.options.get("user");
    const member = guild.members.cache.find(member => member.id == mention.value);

    if (!member) {
        return interaction.editReply("No user found!")
    }

    if (mention.value == OwnerID) {
        return interaction.editReply("Can't warn user")
    }

    let logsChannels = JSON.parse(fs.readFileSync("./JSON/LogsChannels.json", "utf8"));
    if (!logsChannels[guild.id] || !guild.channels.cache.find(ch => ch.name == logsChannels[guild.id]) && !guild.channels.cache.find(ch => ch.id == logsChannels[guild.id])) {
        return interaction.editReply("Définnissez le channel des logs comme ceci : \n`$LogsChannel <id or name>`")
    }

    sendmsg = `${member} a bien été report.`

    const warnChannel = guild.channels.cache.find(ch => ch.name == logsChannels[guild.id]) || guild.channels.cache.find(ch => ch.id == logsChannels[guild.id])
    const channel = guild.channels.cache.find(ch => ch.id == interaction.channel.id);

    const warnEmbedLogs = new MessageEmbed()
        .setDescription("Report")
        .addField("By : ", `${interaction.member.user.username}`)
        .addField("Warned User", member.toString())
        .addField("Reason :", interaction.options.get("reason").value.toString())
    // warnChannel.send(warnEmbedLogs);
    warnChannel.send({ embeds: [warnEmbedLogs] })

    interaction.editReply(sendmsg)
}