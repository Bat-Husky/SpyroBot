const { ButtonBuilder, ButtonStyle, MessageFlags, ActionRowBuilder } = require('discord.js');

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


module.exports = {
    name: 'resume',
    async execute(interaction, queue, bot) {
        const serverQueue = queue.get(interaction.guildId);
        if (!interaction.member.voice.channel) {
            return interaction.reply({ content: 'Vous devez être dans un salon vocal pour reprendre la musique !', flags: MessageFlags.Ephemeral });
        }
        if (!serverQueue) return interaction.reply({ content: "Il n'y a pas de musique en cours de lecture.", flags: MessageFlags.Ephemeral });

        serverQueue.player.unpause();

        interaction.update({ components: [new ActionRowBuilder().addComponents(vdButton, stopButton, pauseButton, skipButton, vuButton)] }).catch(err => console.error(err));

    },
};