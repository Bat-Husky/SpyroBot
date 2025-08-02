const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('faitsdivers')
		.setDescription('Donne un fait divers aléatoire'),
	async execute(interaction) {
        let nbFaitsDivers = JSON.parse(fs.readFileSync("./JSON/faitsdivers.json", "utf8"))["nombre"]
        let faitsDivers = JSON.parse(fs.readFileSync("./JSON/faitsdivers.json", "utf8"))["faitsdivers"]
        let nbAleatoire = Math.floor(Math.random() * nbFaitsDivers);

        interaction.reply(`>>> **${faitsDivers[nbAleatoire]}**`);
	},
};