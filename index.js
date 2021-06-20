const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const fs = require('fs');
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]})
const { Client, MessageEmbed } = require('discord.js');
const { prefix, token, OwnerID, OwnerGuildID } = require('./JSON/config.json');
const Help = require('./commands/Help');
const SpyroBot = require('./commands/SpyroBot');
const Givexp = require('./commands/givexp');
const MalFoutu = require('./commands/malfoutu');
const Ban = require('./commands/ban');
const Kick = require('./commands/kick');
const Warn = require('./commands/Warn');
const Infractions = require('./commands/Infractions');
const Meme = require('./commands/meme');
const Baka = require('./commands/baka');
const Clear = require('./commands/Clear');
const Crash = require('./commands/Crash');
const Reaction = require('./commands/ReactionRole');
const Diagonale = require('./commands/diagonale');
const React = require('./commands/react');
const Join = require('./commands/join');
const Report = require('./commands/report');
const LogsChannel = require('./commands/logsChannel');
const QueueChannel = require('./commands/QueueChannel');
const FaitsDivers = require('./commands/FaitsDivers');
const AddFaitsDivers = require('./commands/AddFaitsDivers');
const runTest = require('./commands/runforlife');
const cmdStatus = require('./commands/onoff');
const Pin = require('./commands/pin');
const Coin = require('./commands/coin');
const SlashCommands = require('./commands/SlashCommands');
const InitSlash = require('./commands/InitSlash');

const queue = new Map();


bot.on('ready', function () {
    console.log("Ready!");
    bot.user.setActivity("crash", { type: 'PLAYING' })
    React.execute(Discord, bot)
    Join.execute(Discord, bot)
    Pin.execute(Discord, bot)
    SlashCommands.execute(bot, OwnerGuildID, OwnerID, prefix)
    InitSlash.execute(Discord, bot, OwnerGuildID)
})


bot.on("guildCreate", guild => {
  const channels = guild.channels.cache.filter(channel => channel.type == "news") || guild.channels.cache.filter(channel => channel.type == "text");

  const embed = new MessageEmbed()
    .setColor("#0042ff")
    .setTitle("Thank you for inviting me!")
    .setURL("https://docs.google.com/document/d/1uSBdN_1_jUk0arHGbWB0kMjv6YJGQTgoLKO2QhjjhK8/edit?usp=sharing")
    .setDescription("Hi! I am SpyroBot! \nI am a multi-tasking bot developed by `Bat-Husky`. \nI have `🛡 moderation` and `🔊 music` commands. I also have other `☣ Useless` but funny commands. \nTo get started, use the command $help.")
    .setThumbnail('https://media.discordapp.net/attachments/575712614097879050/799944045778436107/spyrobot_v1.png?width=670&height=670')
    .addField('\u200b', '\u200b')
    .addFields(
      { name: 'Library :', value: '`discord.js`', inline: true },
      { name: 'Prefix :', value: '`$`', inline: true },
      { name: 'Running on :', value: `\`${bot.guilds.cache.size} servers\``, inline: true }
    )
  channels.first().send(embed).catch(err => console.log(err));
});


bot.on('message', async message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let commandUsed = SpyroBot.parse(message, prefix) || Givexp.parse(message, prefix) || Help.parse(message, prefix) || MalFoutu.parse(message, prefix) 
  || Kick.parse(message, prefix) || Ban.parse(message, prefix) || Warn.parse(message, prefix) || Infractions.parse(message, prefix) || Baka.parse(message, prefix) 
  || Meme.parse(message, prefix) || Clear.parse(message, prefix) || Crash.parse(message, prefix) || Diagonale.parse(message, prefix) || Report.parse(message, prefix) 
  || LogsChannel.parse(message, prefix) || QueueChannel.parse(message, prefix) || FaitsDivers.parse(message, prefix) || AddFaitsDivers.parse(message, prefix) 
  || runTest.parse(message, prefix) || cmdStatus.parse(message, prefix) || Coin.parse(message, prefix);

  const serverQueue = queue.get(message.guild.id);

  if (message.content.toString().toLowerCase().startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.toString().toLowerCase().startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.toString().toLowerCase().startsWith(`${prefix}leave`)) {
    stop(message, serverQueue);
    return;
  } else if (message.content.toString().toLowerCase().startsWith(`${prefix}volume`)) {
    volume(message, serverQueue);
    return;
  } else if (message.content.toString().toLowerCase().startsWith(`${prefix}queue`)) {
    sendQueue(message, serverQueue);
    return;
  } else if (message.content.toString().toLowerCase().startsWith(`${prefix}loop`)) {
    loup(message, serverQueue);
    return;
  } else if (message.content.toString().toLowerCase().startsWith(`${prefix}ping`)) {
    ping(message);
    return;
  } else if (message.content.toString().toLowerCase().startsWith(`${prefix}reaction`)) {
    Reaction.execute(message, Discord, bot);
    return;
  } else if (message.content.toString().toLowerCase().startsWith(`${prefix}info`)) {
    info(message);
    return;
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        author: message.member
  };

  if (!serverQueue) {
    var QueueChannel;
    var QueueChannels = JSON.parse(fs.readFileSync("../ReBot_test/JSON/QueueChannel.json", "utf8"));
    QueueChannel = message.guild.channels.cache.find(ch => ch.name == QueueChannels[message.guild.id]) || message.guild.channels.cache.find(ch => ch.id == QueueChannels[message.guild.id])

    if (!QueueChannels[message.guild.id] || !message.guild.channels.cache.find(ch => ch.name == QueueChannels[message.guild.id]) && !message.guild.channels.cache.find(ch => ch.id == QueueChannels[message.guild.id])) {
      message.reply("Définnissez le channel de la Queue comme ceci : \n`SetQueueChannel <id or name>`")
      QueueChannel = message.channel;
    }
    const queueContruct = {
      textChannel: QueueChannel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
      loop: false
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    const embed = new MessageEmbed()
        .setColor("#0042ff")
        .addField("Added to the queue", `[${song.title}](${song.url})`)
        .addField("From", `${song.author}`)
    return message.channel.send(embed);
  }
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url), { filter : 'audioonly' })
    .on("finish", () => {
      if (serverQueue.loop == true) serverQueue.songs.push(serverQueue.songs[0]);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolume(1);
  const embed = new MessageEmbed()
                    .setColor("#0042ff")
                    .addField("Now playing", `[${song.title}](${song.url})`)
                    .addField("From", `${song.author}`)
  serverQueue.textChannel.send(embed);
}

function skip(message, serverQueue) {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        let coins = JSON.parse(fs.readFileSync("./JSON/coin.json", "utf8"));
        if (coins[message.author.id].coins < 200) return message.reply(`You don't have enough coins to skip! \n\`${coins[message.author.id].coins}\` < \`200\``)
        coins[message.author.id].coins -= 200;
        fs.writeFile("./JSON/coin.json", JSON.stringify(coins), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    if (!message.member.voice.channel)
       return message.channel.send(
           "You have to be in a voice channel to skip the music!"
       );
    if (!serverQueue)
       return message.channel.send("There is no song that I could skip!");
     serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
    if (!message.member.voice.channel)
       return message.channel.send(
           "You have to be in a voice channel to stop the music!"
       );

    if (!serverQueue)
       return message.channel.send("There is no song that I could stop!");

    serverQueue.loop = false;
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

function volume(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send(
           "You have to be in a voice channel to change the volume !"
        );
    if (!serverQueue)
       return message.channel.send("There is no song !");
    let msg = message.content.toString().toLowerCase();
    let vol = msg.split(' ')[1];
    serverQueue.connection.dispatcher.setVolume(vol);
    const embed = new MessageEmbed()
          .setColor("#0042ff")
          .addField("Set volume to", `${vol * 100}%`)
    message.channel.send(embed);
}

function sendQueue(message, serverQueue) {
    if (!serverQueue)
        return message.channel.send("There is no song !");
    message.channel.send("Queue :");
    for (const title in serverQueue.songs) {
        message.channel.send("```markdown" + `\n#${serverQueue.songs[title].title}\n` + "```")
    }
}

function loup(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to pause the music!"
    );

  if (!serverQueue)
    return message.channel.send("There is no song!");
  
    if (serverQueue.loop == false) {
      serverQueue.loop = true;
      const embed = new MessageEmbed()
        .setColor("#0042ff")
        .addField("Loop", '`On`')
      message.channel.send(embed);
    } else {
      serverQueue.loop = false;
      const embed = new MessageEmbed()
        .setColor("#0042ff")
        .addField("Loop", '`Off`')
      message.channel.send(embed);
    }
}

function info(message) {
  const embed = new MessageEmbed()
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
  message.channel.send(embed);
}

function ping(message) {
    if (message.author.id != OwnerID) return message.reply("Vous n'avez pas les permissions nécessaires !");
    bot.user.setActivity(`${prefix}help`, { type: 'WATCHING' });
    const testChannel = message.guild.channels.cache.find(ch => ch.name === "the moderator's channel");
    let Time = Math.round((bot.uptime / 60000) * 1000) / 1000
    testChannel.send(`\`\`\`fix\nPing réussi ! \n\`\`\` \nUptime : \`${Time} minutes\``);
}


bot.login(token)
