const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const fs = require('fs');
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]})
const { Client, MessageEmbed } = require('discord.js');
const { prefix, token, OwnerID } = require('./JSON/config.json');
const Help = require('./commands/Help');
const SpyroBot = require('./commands/SpyroBot');
const givexp = require('./commands/givexp');
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

const queue = new Map();

var loop = false;

bot.on('ready', function () {
    console.log("Ready!");
    bot.user.setActivity("crash", { type: 'PLAYING' })
    React.execute(Discord, bot)
    Join.execute(Discord, bot)
})


bot.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let commandUsed = SpyroBot.parse(message, prefix) || givexp.parse(message, prefix) || Help.parse(message, prefix) || MalFoutu.parse(message, prefix) || Kick.parse(message, prefix) || Ban.parse(message, prefix) || Warn.parse(message, prefix) || Infractions.parse(message, prefix) || Baka.parse(message, prefix) || Meme.parse(message, prefix) || Clear.parse(message, prefix) || Crash.parse(message, prefix) || Diagonale.parse(message, prefix) || Report.parse(message, prefix) || LogsChannel.parse(message, prefix)

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
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");
  const author = message.member;

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
  };

  const queueChannel = message.guild.channels.cache.find(ch => ch.name === 'the queue channel')

  if (!serverQueue) {
    const queueContruct = {
      textChannel: queueChannel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0], author);
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
                        .addField("From", `${author}`)
    return message.channel.send(embed);
  }
}

function play(guild, song, author) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  if (!author) {
    author = "<@what id you want>"
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url), { filter : 'audioonly' })
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolume(1);
  const embed = new MessageEmbed()
                    .setColor("#0042ff")
                    .addField("Now playing", `[${song.title}](${song.url})`)
                    .addField("From", `${author}`)
  serverQueue.textChannel.send(embed);
}

function skip(message, serverQueue) {
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
  
    if (loop == false) {
      loop = true;
      const embed = new MessageEmbed()
        .setColor("#0042ff")
        .addField("Loop", '`On`')
      message.channel.send(embed);
    } else {
      loop = false;
      const embed = new MessageEmbed()
        .setColor("#0042ff")
        .addField("Loop", '`Off`')
      message.channel.send(embed);
    }
}

function ping(message) {
    if (message.author.id != OwnerID) return message.reply("Vous n'avez pas les permissions nécessaires !");
    bot.user.setActivity(`${prefix}help`, { type: 'WATCHING' });
    const testChannel = message.guild.channels.cache.find(ch => ch.name === "the moderator's channel");
    testChannel.send('YEY');
}


bot.login(token)
