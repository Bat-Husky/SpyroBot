const { SlashCommandBuilder, EmbedBuilder, MessageFlags, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cards')
		.setDescription('Affiche les cartes de l\'utilisateur')
        .addStringOption(option => 
            option.setName('carte')
                .setDescription('Carte à afficher')
        ),
	async execute(interaction) {
        let inventory = JSON.parse(fs.readFileSync("./JSON/cardsystem/inventory.json", "utf8"));

        const member = await interaction.guild.members.fetch({ user: interaction.user.id, force: true });

        const user = member.user;

        const color = user.accentColor;

        if (!inventory[user.id]) {
            await interaction.reply({ content: "Aucune carte trouvée pour cet utilisateur.", flags: MessageFlags.Ephemeral });
            return;
        }

        if (interaction.options.getString('carte')) {
            const cardName = interaction.options.getString('carte');
            const card = inventory[user.id].cards.find(c => c.name.toLowerCase() === cardName.toLowerCase());

            if (!card) {
                await interaction.reply({ content: "Carte non trouvée.", flags: MessageFlags.Ephemeral });
                return;
            }

            const Img = new AttachmentBuilder(`./Img/cards/${card.file}`, { name: card.file });

            const embed = new EmbedBuilder()
                .setTitle(`Carte : ${card.name}`)
                .setColor(color || "#0099ff")
                .setImage(`attachment://${card.file}`)
                .setFooter({ text: `Collection : ${card.id[0]}` });

            await interaction.reply({ embeds: [embed], files: [Img] });
            return;
        }

        let len = inventory[user.id].cards.length;
        const pages = Math.ceil(len / 6);
        if (pages > 1) len = 6;

        const embed = new EmbedBuilder()
            .setTitle("Cartes de l'utilisateur")
            .setColor(color || "#0099ff")
            .setDescription(`Nombre de cartes : ${inventory[user.id].cards.length}`)
            .setFooter({ text: `Page 1/${pages}` });


        for (let i = 0; i < len; i++) {
            const element = inventory[user.id].cards[i];
            embed.addFields({ name: `Carte : ${element.name}`, value: `Collection : ${element.id[0]}` });
        }

        if (pages > 1) {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('prevCard')
                        .setEmoji('⬅️')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId('nextCard')
                        .setEmoji('➡️')
                        .setStyle(ButtonStyle.Primary)
                );

            await interaction.reply({ embeds: [embed], components: [row] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
	},
};