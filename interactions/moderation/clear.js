const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Efface une certaine quantité de messages')
        .addNumberOption(option =>
            option.setName('nombre')
                .setDescription('Le nombre de messages à effacer')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
        var sendmsg;

        const channel = interaction.guild.channels.cache.find(ch => ch.id == interaction.channel.id);
        if (interaction.options.getNumber("nombre")) {
            let amount = 0;
            if (interaction.options.getNumber("nombre") <= 1) {
                amount = 1;
            } else {
                amount = interaction.options.getNumber("nombre");
                if (amount > 100) {
                    amount = 100;
                }
            }
            await channel.bulkDelete(amount, true).then((_message) => {
                sendmsg = `Bot cleared \`${_message.size}\` messages :broom:`
            });
        } else {
            sendmsg = 'enter the amount of messages that you would like to clear'
        }

        interaction.reply({ content: sendmsg, flags: MessageFlags.Ephemeral })
	},
};