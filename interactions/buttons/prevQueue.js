const { MessageFlags, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'prevQueue',
    async execute(interaction, queue, bot) {
		const serverQueue = queue.get(interaction.guildId);

        if (!serverQueue) return interaction.reply({ content: "Il n'y a pas de musique en cours de lecture.", flags: MessageFlags.Ephemeral });

        const text = interaction.message.embeds[0].footer.text;
        const page = parseInt(text.split(' ')[1].split('/')[0], 10);
        const totalPage = Math.ceil(serverQueue.songs.length / 10);


        if (page == 1) {
            await interaction.reply({ content: "Vous êtes déjà à la première page.", flags: MessageFlags.Ephemeral });
        } else {

            let newPage = page - 1 <= totalPage ? page - 1 : totalPage;

            const embed = new EmbedBuilder()
                .setColor("#0042ff")
                .setTitle("Liste des chansons dans la file d'attente")
                .setDescription("Voici les chansons en attente :")
                .setFooter({ text: `Page ${newPage}/${totalPage}` });

            const len = (newPage) * 10 <= serverQueue.songs.length ? 10 : serverQueue.songs.length % 10;

            for (let i = 0; i < len; i++) {
                const song = serverQueue.songs[i + (newPage - 1) * 10];
                embed.addFields({ name: `#${i + 1 + (newPage - 1) * 10} : ${song.member.nickname}`, value: `[${song.title}](${song.url})` });
            }

            
            
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('prevQueue')
                        .setEmoji('⬅️')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(newPage === 1),
                    new ButtonBuilder()
                        .setCustomId('nextQueue')
                        .setEmoji('➡️')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(newPage === totalPage)
                );

            await interaction.update({ embeds: [embed], components: [row] });
        }

    },
};