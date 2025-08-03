const { Client, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, inlineCode } = require('discord.js');
const ytdl = require('ytdl-core')
const Voice = require('@discordjs/voice')
const youtubedl = require('youtube-dl-exec')
const fs = require('fs');

const vdButton = new ButtonBuilder()
    .setCustomId('vdown')
    .setLabel('🔉down')
    .setStyle(ButtonStyle.Secondary);

const vuButton = new ButtonBuilder()
    .setCustomId('vup')
    .setLabel('🔊up')
    .setStyle(ButtonStyle.Secondary);

const pauseButton = new ButtonBuilder()
    .setCustomId('pause')
    .setLabel('⏸️ pause')
    .setStyle(ButtonStyle.Secondary);

const stopButton = new ButtonBuilder()
    .setCustomId('stop')
    .setLabel('⏹️ stop')
    .setStyle(ButtonStyle.Secondary);

const skipButton = new ButtonBuilder()
    .setCustomId('skip')
    .setLabel('⏭️ skip')
    .setStyle(ButtonStyle.Secondary);

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


module.exports =  {
    match(message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}play`)
    },
    async action(message, queue, bot) {
        async function play(guild, song) {
            const serverQueue = queue.get(guild.id);
            if (!song) {
                // serverQueue.voiceChannel.leave();
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
                
            const embed = new EmbedBuilder()
                .setColor("#0042ff")
                .setAuthor({ name: "Table de lecture", iconURL: song.member.user.displayAvatarURL() })
                .setDescription(`[\`${song.title}\`](${song.url})`)
                .addFields([
                    { name: "De", value: `${song.member}`, inline: true },
                    { name: "Durée", value: inlineCode(`${song.duration}`), inline: true },
                    { name: "Auteur", value: inlineCode(`${song.author}`), inline: true }
                ])
            
            if (!serverQueue.msg) {
                serverQueue.msg = await guild.channels.cache.get(serverQueue.textChannel.id.toString()).send({ embeds: [embed], components: [new ActionRowBuilder().addComponents(vdButton, stopButton, pauseButton, skipButton, vuButton)] });
            } else {
                serverQueue.msg.edit({ embeds: [embed], components: [new ActionRowBuilder().addComponents(vdButton, stopButton, pauseButton, skipButton, vuButton)] }).catch(err => console.error(err));
            }    
        }

        const serverQueue = queue.get(message.guild.id);

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
                    member: message.member,
                    duration: songInfo.videoDetails.lengthSeconds ? `${Math.floor(songInfo.videoDetails.lengthSeconds / 60)}m ${songInfo.videoDetails.lengthSeconds % 60}s` : "Unknown",
                    author: songInfo.videoDetails.author ? songInfo.videoDetails.author.name : "Unknown"
            };
    
        if (!serverQueue) {
            var QueueChannel;
            var QueueChannels = JSON.parse(fs.readFileSync("./JSON/QueueChannel.json", "utf8"));
            QueueChannel = message.guild.channels.cache.find(ch => ch.name == QueueChannels[message.guild.id]) || message.guild.channels.cache.find(ch => ch.id == QueueChannels[message.guild.id])
    
            if (!QueueChannels[message.guild.id] || !message.guild.channels.cache.find(ch => ch.name == QueueChannels[message.guild.id]) && !message.guild.channels.cache.find(ch => ch.id == QueueChannels[message.guild.id])) {
                message.reply("Définnissez le channel de la Queue comme ceci : \n`SetQueueChannel <id or name>`")
                QueueChannel = message.channel;
            }
    
            const queueContruct = {
                textChannel: QueueChannel,
                voiceChannel: voiceChannel,
                ressource: null,
                connection: null,
                connection: null,
                songs: [],
                volume: 1,
                playing: true,
                loop: "Off",
                msg: null
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
                console.log(err);
                queue.delete(message.guild.id);
                message.channel.send(err);
                return
            }
        } else {
            serverQueue.songs.push(song);
            const embed = new EmbedBuilder()
                .setColor("#0042ff")
                .addFields([
                    { name: "Added to the queue", value: `[${song.title}](${song.url})` },
                    { name: "From", value: `${song.author}` }
                ])
            
            message.channel.send({ embeds: [embed] });
            return
        }
    },
}