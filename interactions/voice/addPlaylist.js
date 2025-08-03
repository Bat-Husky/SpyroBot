const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core')

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

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addplaylist')
		.setDescription('Ajoute une playlist à la file d\'attente')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // No permissions required
	async execute(interaction, queue, bot) {
		const serverQueue = queue.get(interaction.guildId);
        
        if (!interaction.member.voice.channel) {
            return interaction.reply("Vous devez être dans un salon vocal pour passer la musique !");
        }

		if (!serverQueue) return interaction.reply("Il n'y a pas de musique en cours de lecture.");

        const select = new StringSelectMenuBuilder()
            .setCustomId('playlist_select')
            .setPlaceholder('Sélectionnez une playlist');

        let playlists = JSON.parse(fs.readFileSync("./JSON/playlists.json", "utf8"));
        for (const [name, urls] of Object.entries(playlists)) {
            select.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(name)
                    .setValue(name)
            );
        }

        const row = new ActionRowBuilder().addComponents(select);

        const response = await interaction.reply({ content: 'Choisissez une playlist à ajouter à la file d\'attente :', components: [row], withResponse: true });

        const collectorFilter = i => i.user.id === interaction.user.id;

        const collector = response.resource.message.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 30_000, filter: collectorFilter });

        collector.on('collect', async i => {
            const selection = i.values[0];
            await i.reply(`Vous avez sélectionné la playlist : ${selection}!`);
            const selectedUrls = playlists[selection];

            let selectedUrlsShuffled = shuffle(selectedUrls.slice());

            for (const url of selectedUrlsShuffled) {
                const songInfo = await ytdl.getInfo(url);
                const song = {
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    member: interaction.member,
                    duration: songInfo.videoDetails.lengthSeconds ? `${Math.floor(songInfo.videoDetails.lengthSeconds / 60)}m ${songInfo.videoDetails.lengthSeconds % 60}s` : "Unknown",
                    author: songInfo.videoDetails.author ? songInfo.videoDetails.author.name : "Unknown"
                };
                serverQueue.songs.push(song);
            }
        });
	},
};