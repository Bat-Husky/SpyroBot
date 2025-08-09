const { MessageFlags, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'nextQueue',
    async execute(interaction, queue, bot) {
		const serverQueue = queue.get(interaction.guildId);

        if (!serverQueue) return interaction.reply({ content: "Il n'y a pas de musique en cours de lecture.", flags: MessageFlags.Ephemeral });

        const text = interaction.message.embeds[0].footer.text;
        const page = parseInt(text.split(' ')[1].split('/')[0], 10);
        const totalPage = Math.ceil(serverQueue.songs.length / 10);


        if (page >= totalPage) {
            await interaction.reply({ content: "Vous êtes déjà à la dernière page.", flags: MessageFlags.Ephemeral });
        } else {
            
            const embed = new EmbedBuilder()
                .setColor("#0042ff")
                .setTitle("Liste des chansons dans la file d'attente")
                .setDescription("Voici les chansons en attente :")
                .setFooter({ text: `Page ${page + 1}/${totalPage}` });

            const len = (page + 1) * 10 <= serverQueue.songs.length ? 10 : serverQueue.songs.length % 10;

            for (let i = 0; i < len; i++) {
                const song = serverQueue.songs[i + (page) * 10];
                embed.addFields({ name: `#${i + 1 + (page * 10)} : ${song.member.nickname}`, value: `[${song.title}](${song.url})` });
            }

            
            
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('prevQueue')
                        .setEmoji('⬅️')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(page + 1 === 1),
                    new ButtonBuilder()
                        .setCustomId('nextQueue')
                        .setEmoji('➡️')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(page + 1 === totalPage)
                );

            await interaction.update({ embeds: [embed], components: [row] });
        }

    },
};