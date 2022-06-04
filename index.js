/**
* @file Index du Bot, tout se passe ici.
* @author Léo Virth
* @version 2.0.1
* Bot original (sans les commentaires et avec toutes les commandes): {@link https://github.com/Bat-Husky/SpyroBot}
* @copyright Léo Virth 2021
* @license BSD-3-Clause
*/

const Discord = require('discord.js');
const { Client, MessageEmbed, Intents } = require('discord.js');
const Voice = require('@discordjs/voice')
const ytdl = require('ytdl-core');
const fs = require('fs');
const bot = new Client({
     intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES],
     partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
     fetchAllMembers: true
})
const { prefix, token, OwnerID, OwnerGuildID } = require('./JSON/config.json');
const AllCMD = require('./other/stockCMD');

const queue = new Map();


bot.on('ready', function () {
    console.log("Ready!");
    bot.user.setActivity("crash", { type: 'STREAMING', url: 'https://www.twitch.tv/bat_husky' })
    AllCMD.React.execute(Discord, bot)
    AllCMD.ReactRules.execute(Discord, bot)
    AllCMD.Join.execute(Discord, bot)
    AllCMD.Pin.execute(Discord, bot)
    AllCMD.InitSlash.execute(Discord, bot, OwnerGuildID)
});


bot.on("guildCreate", guild => {
    const channels = guild.channels.cache.filter(channel => channel.type == "GUILD_NEWS") || guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT");

    const embed = new MessageEmbed()
        .setColor("#5465FF")
        .setTitle("Thank you for inviting me!")
        .setURL("https://docs.google.com/document/d/1uSBdN_1_jUk0arHGbWB0kMjv6YJGQTgoLKO2QhjjhK8/edit?usp=sharing")
        .setDescription("Hi! I am SpyroBot! \nI am a multi-tasking bot developed by `Bat-Husky`. \nI have `🛡 moderation` and `🔊 music` commands. I also have other `☣ Useless` but funny commands. \nTo get started, use the command $help.")
        .setThumbnail(bot.user.avatarURL("png"))
        .addField('\u200b', '\u200b')
        .addFields(
          { name: 'Library :', value: '`discord.js`', inline: true },
          { name: 'Prefix :', value: '`$`', inline: true },
          { name: 'Running on :', value: `\`${bot.guilds.cache.size} servers\``, inline: true }
        )
    guild.channels.cache.find(channel => channel.id == channels.first().id).send({ embeds: [embed] }).catch(err => conbsole.error(err));
});


bot.on('messageCreate', async message => {
    if (!message.guild) return;
    
    if (message.guild.id == 621427447879172096n && message.channel.id == 839864195314221089n) return AllCMD.xp.execute(message.author, message, prefix, bot);
    if (message.author.bot) return;


    if (!message.content.startsWith(prefix)) {
        AllCMD.xp.execute(message.author, message, prefix, bot)
        return;
    }

    let commandUsed = AllCMD.SpyroBot.parse(message, prefix, bot) || AllCMD.givexp.parse(message, prefix) || AllCMD.Help.parse(message, prefix) || AllCMD.MalFoutu.parse(message, prefix) 
    || AllCMD.Kick.parse(message, prefix) || AllCMD.Ban.parse(message, prefix) || AllCMD.Warn.parse(message, prefix) || AllCMD.Infractions.parse(message, prefix) 
    || AllCMD.Baka.parse(message, prefix) || AllCMD.Meme.parse(message, prefix) || AllCMD.Clear.parse(message, prefix) || AllCMD.Crash.parse(message, prefix) 
    || AllCMD.Quoi.parse(message, prefix) || AllCMD.Diagonale.parse(message, prefix) || AllCMD.UserInfo.parse(message, prefix) || AllCMD.Report.parse(message, prefix) 
    || AllCMD.LogsChannel.parse(message, prefix) || AllCMD.QueueChannel.parse(message, prefix) || AllCMD.FaitsDivers.parse(message, prefix) || AllCMD.AddFaitsDivers.parse(message, prefix) 
    || AllCMD.runTest.parse(message, prefix) || AllCMD.cmdPrefix.parse(message, prefix) || AllCMD.cmdStatus.parse(message, prefix) || AllCMD.Coin.parse(message, prefix)
    || AllCMD.Constitution.parse(message, prefix) || AllCMD.OpenPattern.parse(message, prefix) || AllCMD.Focus.parse(message, prefix) || AllCMD.RulesCommand.parse(message, prefix)
    || AllCMD.rank.parse(message, prefix) || AllCMD.SetAntiMikwel.parse(message, prefix) || AllCMD.Leaderboard.parse(message, prefix);


    
    const serverQueue = queue.get(message.guild.id)

    if (message.content.toString().toLowerCase().startsWith(`${prefix}play`)) {
        execute(message, serverQueue);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}skip`)) {
        skip(message, serverQueue);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}pause`)) {
        pause(message, serverQueue);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}unpause`)) {
        unpause(message, serverQueue);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}leave`)) {
        stop(message, serverQueue);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}volume`)) {
        volume(message, serverQueue);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}*volume`)) {
        multiplyVolume(message, serverQueue);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}queue`)) {
        sendQueue(message, serverQueue);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}loop`)) {
        loup(message, serverQueue);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}musicinfo`)) {
        musicinfo(message, serverQueue);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}ping`)) {
        ping(message, prefix);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}reaction`)) {
        AllCMD.Reaction.execute(message, Discord, bot);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}reactrules`)) {
        AllCMD.ReactionRules.execute(message, Discord, bot);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}info`)) {
        info(message);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}bots`)) {
        botsYEY(message);
        return;
    }
});


bot.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return

    const command = interaction.commandName;
    const guild = bot.guilds.cache.get(OwnerGuildID)
    const user = guild.members.cache.find(member => member.id == interaction.user.id);
    await interaction.deferReply({ ephemeral: command === 'clear'})

    const serverQueue = queue.get(guild.id)

    if (command === "skip") {
        if(!user.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
            let coins = JSON.parse(fs.readFileSync("./JSON/coin.json", "utf8"));
            if (coins[user.id].coins < 200) {interaction.editReply(`You don't have enough coins to skip! \n\`${coins[user.id].coins}\` < \`200\``); return}
            coins[user.id].coins -= 200;
            fs.writeFile("./JSON/coin.json", JSON.stringify(coins), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

        if (!user.voice.channel) {
            interaction.editReply("You have to be in a voice channel to skip the music!");
            return
        }

        if (!serverQueue) {
            interaction.editReply("There is no song that I could skip!");
            return
        }
        serverQueue.player.stop();
        interaction.editReply("⏭")
    } else if (command === "leave") {
        if (!user.voice.channel) {
            interaction.editReply("You have to be in a voice channel to stop the music!");
            return
        }
    
        if (!serverQueue) {
            interaction.editReply("There is no song that I could stop!");
            return
        }
    
        serverQueue.loop = false;
        serverQueue.songs = [];
        serverQueue.connection.destroy();
        queue.delete(guild.id);
        interaction.editReply("🛑")

    } else if (command === "volume") {
        if (!user.voice.channel) {
            interaction.editReply("You have to be in a voice channel to change the volume !");
            return
        }
        if (!serverQueue) { interaction.editReply("There is no song !"); return }


        console.log(serverQueue.ressource.volume)
        let vol = interaction.options.get("level");
        const vembed = new MessageEmbed()
            .setColor("#0042ff")
            .addField("Current volume :", `${Number(serverQueue.ressource.volume) * 100}%`)
        if (!vol) { interaction.editReply({ embeds: [vembed] }); return }
        serverQueue.ressource.volume.setVolume(Number(vol.value));

        serverQueue.volume = Number(vol.value);
        const embed = new MessageEmbed()
            .setColor("#0042ff")
            .addField("Set volume to", `${Number(vol.value) * 100}%`)
        // message.channel.send(embed);
        interaction.editReply({ embeds: [embed] });

    } else if (command === "queue") {
        if (!serverQueue) {
            interaction.editReply("There is no song!");
            return
        }
        var sendmsg = "Queue :\n";
        for (const title in serverQueue.songs) {
            sendmsg += ("```markdown" + `\n#${serverQueue.songs[title].title}\n` + "```");
        }
        interaction.editReply(sendmsg)

    } else if (command === "musicinfo") {
        if (!serverQueue) {
            interaction.editReply("There is no song!");
            return
        }
        if (serverQueue.loop) loopValue = "On"
        else loopValue = "Off"
    
        const embed = new MessageEmbed()
            .setColor("#0042FF")
            .setTitle("Music Info")
            .addFields(
                {name: "Channel vocal :", value: `${serverQueue.voiceChannel}`},
                {name: "Channel Queue :", value: `${serverQueue.textChannel}`},
                {name: "Volume :", value: `${serverQueue.volume*100}%`},
                {name: "Loop :", value: `${loopValue}`}
            )
            interaction.editReply({ embeds: [embed] });

    } else if (command === "pause") {
        if (!user.voice.channel) {
            interaction.editReply("You have to be in a voice channel to pause the music!");
            return
        }
    
        if (!serverQueue) {
            interaction.editReply("There is no song that I could pause!");
            return
        }
    
        serverQueue.player.pause();
        interaction.editReply("⏸")

    } else if (command === "unpause") {
        if (!user.voice.channel) {
            interaction.editReply("You have to be in a voice channel to unpause the music!");
            return
        }
    
        if (!serverQueue) {
            interaction.editReply("There is no song that I could unpause!");
            return
        }
    
        serverQueue.player.unpause();
        interaction.editReply("▶")

    } else if (command === "loop") {
        if (!user.voice.channel) {
            interaction.editReply("You have to be in a voice channel to loop the music !");
            return
        }
    
        if (!serverQueue) {
            interaction.editReply("There is no song!");
            return
        }
        var loopValue = interaction.options.get('mode')
        
        serverQueue.loop = loopValue.value;
        const embed = new MessageEmbed()
            .setColor("#0042ff")
            .addField("Loop", `\`${loopValue.value}\``)
            // message.channel.send(embed);
        interaction.editReply({ embeds: [embed] });

    } else if (command === "play") {
        pre_play(interaction, guild, serverQueue)
    } else {
        AllCMD.SlashCommands.execute(bot, guild, OwnerID, prefix, interaction)
    }

})


async function pre_play(interaction, guild, serverQueue) {
    const args = interaction.options.get("link");

    var User = guild.members.cache.find(member => member.id == interaction.user.id);

    const voiceChannel = User.voice.channel;
    if (!voiceChannel) {
        interaction.editReply("You need to be in a voice channel to play music!");
        return
    }

    const songInfo = await ytdl.getInfo(args.value).catch(err => {console.error(err)});
    //console.log(songInfo)
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        author: User
    };


    if (!serverQueue) {
        var QueueChannel;
        var QueueChannels = JSON.parse(fs.readFileSync("../ReBot_test/JSON/QueueChannel.json", "utf8"));
        QueueChannel = guild.channels.cache.find(ch => ch.name == QueueChannels[guild.id]) || guild.channels.cache.find(ch => ch.id == QueueChannels[guild.id])

        if (!QueueChannel) {
            interaction.editReply("Définnissez le channel de la Queue comme ceci : \n`SetQueueChannel <id or name>`")
            QueueChannel = guild.channels.cache.find(ch => ch.id == interaction.channel.id);
        }

        const queueContruct = {
            textChannel: QueueChannel,
            voiceChannel: voiceChannel,
            player: null,
            ressource: null,
            connection: null,
            songs: [],
            volume: 1,
            playing: true,
            loop: "Off"
        };

        queue.set(guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
            var connection = Voice.joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guildId,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator
            });
            queueContruct.connection = connection;
            interaction.editReplay("Start playing !");
            play(guild, queueContruct.songs[0]);
        } catch (err) {
            console.error(err);
            queue.delete(guild.id);
            interaction.editReply(err);
            return
        }
    } else {
        serverQueue.songs.push(song);
        const embed = new MessageEmbed()
            .setColor("#0042ff")
            .addField("Added to the queue", `[${song.title}](${song.url})`)
            .addField("From", `${song.author}`)
        // return message.channel.send(embed);
        interaction.editReply({ embeds: [embed] });
        return
    }
}


async function execute(message, serverQueue) {
    const args = message.content.split(" ");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        message.channel.send(
            "You need to be in a voice channel to play music!"
        );
        return
    }

    const songInfo = await ytdl.getInfo(args[1]).catch(err => {console.error(err)});
    //console.log(songInfo)
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        author: message.member
    };


    if (!serverQueue) {
        var QueueChannel;
        var QueueChannels = JSON.parse(fs.readFileSync("../ReBot_test/JSON/QueueChannel.json", "utf8"));
        QueueChannel = message.guild.channels.cache.find(ch => ch.name == QueueChannels[message.guild.id]) || message.guild.channels.cache.find(ch => ch.id == QueueChannels[message.guild.id])

        if (!QueueChannel) {
            message.reply("Définnissez le channel de la Queue comme ceci : \n`SetQueueChannel <id or name>`")
            QueueChannel = message.channel;
        }

        const queueContruct = {
            textChannel: QueueChannel,
            voiceChannel: voiceChannel,
            player: null,
            ressource: null,
            connection: null,
            songs: [],
            volume: 1,
            playing: true,
            loop: "Off"
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
            var connection = Voice.joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guildId,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator
            });
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.error(err);
            queue.delete(message.guild.id);
            message.channel.send(err);
            return
        }
    } else {
        serverQueue.songs.push(song);
        const embed = new MessageEmbed()
            .setColor("#0042ff")
            .addField("Added to the queue", `[${song.title}](${song.url})`)
            .addField("From", `${song.author}`)
        // return message.channel.send(embed);
        message.channel.send({ embeds: [embed] });
        return
    }
}


function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      //serverQueue.voiceChannel.leave();
      serverQueue.connection.destroy();
      queue.delete(guild.id);
      return;
    }

    var stream = ytdl(song.url, {
        filter: 'audioonly'
    });
    const player = Voice.createAudioPlayer();
    const ressource = Voice.createAudioResource(stream, { inlineVolume: true });
    serverQueue.player = player;
    serverQueue.ressource = ressource;

    serverQueue.connection.subscribe(player)
    player.play(ressource)
    player.on("stateChange", (oldOne, newOne) => {
        if (newOne.status == "idle") {
            let temp_song = serverQueue.songs[0];
            serverQueue.songs.shift();
            if (serverQueue.loop.toLowerCase() == "normal") serverQueue.songs.push(temp_song);
            else if (serverQueue.loop.toLowerCase() == "shuffle") { serverQueue.songs = shuffle(serverQueue.songs); serverQueue.songs.push(temp_song); }
            play(guild, serverQueue.songs[0]);
        }
    })
    player.on("error", error => console.error(error));
    ressource.volume.setVolume(serverQueue.volume);

    const embed = new MessageEmbed()
        .setColor("#0042ff")
        .addField("Now playing", `[${song.title}](${song.url})`)
        .addField("From", `${song.author}`)
    guild.channels.cache.get(serverQueue.textChannel.id.toString()).send({ embeds: [embed] })
}


function skip(message, serverQueue) {
    if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
        let coins = JSON.parse(fs.readFileSync("./JSON/coin.json", "utf8"));
        if (coins[message.author.id].coins < 200) {message.reply(`You don't have enough coins to skip! \n\`${coins[message.author.id].coins}\` < \`200\``); return}
        coins[message.author.id].coins -= 200;
        fs.writeFile("./JSON/coin.json", JSON.stringify(coins), (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
    if (!message.member.voice.channel) {
        message.channel.send(
            "You have to be in a voice channel to skip the music!"
        );
        return
    }
    if (!serverQueue) {
        message.channel.send("There is no song that I could skip!");
        return
    }
    serverQueue.player.stop();
    message.react("⏭")
}


function pause(message, serverQueue) {
    if (!message.member.voice.channel) {
        message.channel.send(
            "You have to be in a voice channel to pause the music!"
        );
        return
    }

    if (!serverQueue) {
        message.channel.send("There is no song that I could pause!");
        return
    }

    serverQueue.player.pause();
    message.react("⏸")
}


function unpause(message, serverQueue) {
    if (!message.member.voice.channel) {
        message.channel.send(
            "You have to be in a voice channel to unpause the music!"
        );
        return
    }

    if (!serverQueue) {
        message.channel.send("There is no song that I could unpause!");
        return
    }

    serverQueue.player.unpause();
    message.react("▶")
}


function stop(message, serverQueue) {
    if (!message.member.voice.channel) {
        message.channel.send(
            "You have to be in a voice channel to stop the music!"
        );
        return
    }

    if (!serverQueue) {
        message.channel.send("There is no song that I could stop!");
        return
    }

    serverQueue.loop = false;
    serverQueue.songs = [];
    serverQueue.connection.destroy();
    queue.delete(message.guild.id);
    message.react("🛑")
}


function volume(message, serverQueue) {
    if (!message.member.voice.channel) {
        message.channel.send(
            "You have to be in a voice channel to change the volume !"
        );
        return
    }
    if (!serverQueue) { message.channel.send("There is no song !"); return }
    let vol = Number(message.content.toString().toLowerCase().split(' ')[1]);
    const vembed = new MessageEmbed()
        .setColor("#0042ff")
        .addField("Current volume :", `${serverQueue.ressource.volume * 100}%`)
        if (!vol) { message.channel.send({ embeds: [vembed] }); return }
        serverQueue.ressource.volume.setVolume(vol);
    serverQueue.volume = vol;
    const embed = new MessageEmbed()
        .setColor("#0042ff")
        .addField("Set volume to", `${vol * 100}%`)
    // message.channel.send(embed);
    message.channel.send({ embeds: [embed] });
}


function multiplyVolume(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
          "You have to be in a voice channel to change the volume !"
      );
    if (!serverQueue) {
        message.channel.send("There is no song!");
        return
    }
    let actualVol = serverQueue.connection.dispatcher.volume
    let vol = message.content.toString().toLowerCase().split(' ')[1];
    serverQueue.connection.dispatcher.setVolume(actualVol * vol);
    const embed = new MessageEmbed()
        .setColor("#0042ff")
        .addField("Volume multiplied by :", `${vol}`)
    // message.channel.send(embed);
    message.channel.send({ embeds: [embed] });
}


function sendQueue(message, serverQueue) {
    if (!serverQueue) {
        message.channel.send("There is no song!");
        return
    }
    message.channel.send("Queue :");
    for (const title in serverQueue.songs) {
        message.channel.send("```markdown" + `\n#${serverQueue.songs[title].title}\n` + "```")
    }
}


function loup(message, serverQueue) {
    if (!message.member.voice.channel) {
        message.channel.send(
            "You have to be in a voice channel to loop the music !"
        );
        return
    }

    if (!serverQueue) {
        message.channel.send("There is no song!");
        return
    }
    
    if (serverQueue.loop.toLowerCase() == "off" || serverQueue.loop.toLowerCase() == "shuffle") {
        serverQueue.loop = "Normal";
        const embed = new MessageEmbed()
            .setColor("#0042ff")
            .addField("Loop", '`On`')
        // message.channel.send(embed);
        message.channel.send({ embeds: [embed] });
    } else {
        serverQueue.loop = "Off";
        const embed = new MessageEmbed()
            .setColor("#0042ff")
            .addField("Loop", '`Off`')
        // message.channel.send(embed);
        message.channel.send({ embeds: [embed] });
    }
}


function musicinfo(message, serverQueue) {
    if (!serverQueue) {
        message.channel.send("There is no song!");
        return
    }
   var loopValue = serverQueue.loop

    const embed = new MessageEmbed()
        .setColor("#0042FF")
        .setTitle("Music Info")
        .addFields(
            {name: "Channel vocal :", value: `${serverQueue.voiceChannel}`},
            {name: "Channel Queue :", value: `${serverQueue.textChannel}`},
            {name: "Volume :", value: `${serverQueue.volume*100}%`},
            {name: "Loop :", value: `${loopValue}`}
        )
    message.channel.send({ embeds: [embed] });
}


function info(message) {
    const embed = new MessageEmbed()
        .setColor("#5465FF")
        .setTitle("SpyroBot Info")
        .setURL("https://docs.google.com/document/d/1uSBdN_1_jUk0arHGbWB0kMjv6YJGQTgoLKO2QhjjhK8/edit?usp=sharing")
        .setDescription("Hi! I am SpyroBot! \nI am a multi-tasking bot developed by `Bat-Husky`. \nI have `🛡 moderation` and `🔊 music` commands. I also have other `☣ Useless` but funny commands. \nFor more info about commands, use the command $help.")
        .setThumbnail(bot.user.avatarURL("png"))
        .addField('\u200b', '\u200b')
        .addFields(
          { name: 'Library :', value: '`discord.js`', inline: true },
          { name: 'Prefix :', value: '`$`', inline: true },
          { name: 'Running on :', value: `\`${bot.guilds.cache.size} servers\``, inline: true }
        )
    message.channel.send({ embeds: [embed] });
}


function botsYEY(message) {
    let Stinger = message.guild.members.cache.get('835577703884521523')
    let JAAJmo = message.guild.members.cache.get('828587649467154452')
    let ReBot = message.guild.members.cache.get('623244968336818176')
    let Sus = message.guild.members.cache.get('826447138724642817')

    let moi = message.guild.members.cache.get('467284102987382784')
    let VBat = message.guild.members.cache.get('437204882123128832')
    let Mikwel = message.guild.members.cache.get('373801923138158613')

    message.channel.send(`Ce serveur compte de nombreux Bots, néanmoins, certains sont uniques. \nLa quasi-intégralité des commandes et automatisations du serveur sont gérées par des Bots custom : ${bot.user}, ${Stinger} et ${JAAJmo}. \nCes Bots ont été créés respectivement par ${moi}, ${VBat} et ${Mikwel}. Nous les mettons à jour régulièrement, et comme ils sont de notre création, on peut faire ce que l'on veut avec. \nPS : ${ReBot} est la version de test de ${bot.user}, et ${Sus}, celle de ${Stinger}.`)
}

    
function ping(message, prefix) {
    if (message.author.id != OwnerID) return message.reply("You can't use that command!");
    if (message.guild.id != 621427447879172096n) return message.reply("Cette commande n'est pas disponible sur ce serveur.");
    bot.user.setActivity(`${prefix}help`, { type: 'WATCHING' });
    const testChannel = message.guild.channels.cache.find(ch => ch.name === 'test');
    let Hours = Math.floor(bot.uptime / 3600000);
    let Minutes = (Math.round((bot.uptime / 60000) * 1000) / 1000) - (Hours * 60);
    testChannel.send(`\`\`\`fix\nPing réussi !\n\`\`\`\nUptime : \n\`${Hours} hours\`\n\`${Minutes} minutes\``);
}



function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

bot.login(token)
