const { MessageFlags, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'prevCard',
    async execute(interaction, queue, bot) {
        const inventory = JSON.parse(fs.readFileSync("./JSON/cardsystem/inventory.json", "utf8"));
        const text = interaction.message.embeds[0].footer.text;
        const page = parseInt(text.split(' ')[1].split('/')[0], 10);
        const totalPage = Math.ceil(inventory[interaction.user.id].cards.length / 6);

        const member = await interaction.guild.members.fetch({ user: interaction.user.id, force: true });

        const user = member.user;

        const color = user.accentColor;

        if (page == 1) {
            await interaction.reply({ content: "Vous êtes déjà à la première page.", flags: MessageFlags.Ephemeral });
        } else {
            const embed = new EmbedBuilder()
                .setTitle("Cartes de l'utilisateur")
                .setColor(color || "#0099ff")
                .setDescription(`Nombre de cartes : ${inventory[user.id].cards.length}`)
                .setFooter({ text: `Page ${page - 1}/${totalPage}` });

            const len = (page - 1) * 6 <= inventory[user.id].cards.length ? 6 : inventory[user.id].cards.length % 6;

            for (let i = 0; i < len; i++) {
                const element = inventory[user.id].cards[i + (page - 2) * 6];
                embed.addFields({ name: `Carte : ${element.name}`, value: `Collection : ${element.id[0]}` });
            }

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('prevCard')
                        .setEmoji('⬅️')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(page - 1 === 1),
                    new ButtonBuilder()
                        .setCustomId('nextCard')
                        .setEmoji('➡️')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(page - 1 === totalPage)
                );

            await interaction.update({ embeds: [embed], components: [row] });

        }

    },
};