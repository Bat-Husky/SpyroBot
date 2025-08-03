const { ButtonBuilder, ButtonStyle, MessageFlags, ActionRowBuilder } = require('discord.js');

const vdButton = new ButtonBuilder()
    .setCustomId('vdown')
    .setLabel('🔉down')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);

const vuButton = new ButtonBuilder()
    .setCustomId('vup')
    .setLabel('🔊up')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);

const pauseButton = new ButtonBuilder()
    .setCustomId('pause')
    .setLabel('⏸️ pause')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);

const playButton = new ButtonBuilder()
    .setCustomId('resume')
    .setLabel('▶️ play')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);

const stopButton = new ButtonBuilder()
    .setCustomId('temp')
    .setLabel('✅')
    .setStyle(ButtonStyle.Success);

const skipButton = new ButtonBuilder()
    .setCustomId('skip')
    .setLabel('⏭️ skip')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);


module.exports = {
    name: 'stop',
    async execute(interaction, queue, bot) {
        const serverQueue = queue.get(interaction.guildId);
        if (!interaction.member.voice.channel) {
            return interaction.reply({ content: 'Vous devez être dans un salon vocal pour arrêter la musique !', flags: MessageFlags.Ephemeral });
        }
        if (!serverQueue) return interaction.reply({ content: "Il n'y a pas de musique en cours de lecture.", flags: MessageFlags.Ephemeral });
        
		serverQueue.loop = false;
        serverQueue.songs = [];
        serverQueue.connection.destroy();
		let msg = serverQueue.msg;
        queue.delete(interaction.guildId);

        let centerButton;
        if (interaction.message.components[0].components[2].customId === 'pause') {
            centerButton = pauseButton;
        } else {
            centerButton = playButton;
        }

        interaction.update({ components: [new ActionRowBuilder().addComponents(vdButton, stopButton, centerButton, skipButton, vuButton)] }).catch(err => console.error(err));

        setTimeout(function () {
            msg.delete();
        }, 1500);
    },
};