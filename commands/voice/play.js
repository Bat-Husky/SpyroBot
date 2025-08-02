const { Client, EmbedBuilder } = require('discord.js');
const ytdl = require('ytdl-core')
const Voice = require('@discordjs/voice')
const youtubedl = require('youtube-dl-exec')
const fs = require('fs');


module.exports =  {
    match(message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}play`)
    },
    async action(message, queue, bot) {
        function play(guild, song) {
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
                .addFields([
                    { name: "Now playing", value: `[${song.title}](${song.url})` },
                    { name: "From", value: `${song.author}` }
                ])
            guild.channels.cache.get(serverQueue.textChannel.id.toString()).send({ embeds: [embed] })
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
                author: message.member,
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