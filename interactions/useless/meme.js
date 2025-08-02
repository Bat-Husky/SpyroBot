const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

const memes = [
    { name: 'Kappa', color: 0x0042ff, url: "https://knowyourmeme.com/memes/kappa", image: './Img/Kappa.png' },
    { name: 'LUL', color: 0xff0000, url: "https://knowyourmeme.com/memes/lul", image: './Img/LUL.png' },
    { name: 'Saitama OK', color: 0x0042ff, url: "https://knowyourmeme.com/memes/saitama-ok", image: './Img/Saitama-OK.png' },
    { name: 'STONKS', color: 0xff0000, url: "https://knowyourmeme.com/memes/stonks", image: './Img/STONKSe.png' },
    { name: 'Dance till your dead Deku', color: 0xff0000, url: "https://knowyourmeme.com/photos/1306489-my-hero-academia", image: './Img/Deku.gif' },
    { name: 'Leonardo DiCaprio laughing', color: 0xff0000, url: "https://knowyourmeme.com/memes/leonardo-dicaprio-laughing", image: './Img/leonardo.png' }
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Donne un meme aléatoire'),
	async execute(interaction) {
        const nombreAleatoire = Math.floor(Math.random() * memes.length);
        const meme = memes[nombreAleatoire];
        let Img = new AttachmentBuilder(meme.image, { name: `${meme.name.replace(/\s+/g, '-')}.png` });

        const embed = new EmbedBuilder()
            .setTitle(meme.name)
            .setColor(meme.color)
            .setURL(meme.url)
            .setImage(`attachment://${meme.name.replace(/\s+/g, '-')}.png`);

        await interaction.reply({ embeds: [embed], files: [Img] });
	},
};