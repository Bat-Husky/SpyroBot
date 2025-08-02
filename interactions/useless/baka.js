const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const talkedRecently = new Set()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('baka')
		.setDescription('Insulte les autres')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur à insulter')
                .setRequired(true)
        ),
	async execute(interaction) {
        var sendmsg;
        var tts = false;
        var eph = false;
    
        const member = interaction.options.getUser('user');
        var admin = false;
        
        const user = interaction.member;
        if (user.permissions.has(PermissionFlagsBits.Administrator)) {
            tts = true
            admin = true;
        }
        if (admin == true || !talkedRecently.has(user.id)) {
            if (member) {
                    
                    var nombreAleatoire = Math.round(Math.random()*8);
                    if(nombreAleatoire === 1) {
                        sendmsg = `${member} est une grosse merde`
                    } else if (nombreAleatoire === 2) {
                        sendmsg = `${member} va bouffer ses grands morts`
                    } else if (nombreAleatoire === 3) {
                        sendmsg = `${member} est juste un énorme ABRUTI`
                    } else if (nombreAleatoire === 4) {
                        sendmsg = `${member} est une PÉTASSE`
                    } else if (nombreAleatoire === 5) {
                        sendmsg = `${member} est un sale gueux`
                    } else if (nombreAleatoire === 6) {
                        sendmsg = `${member} a un balai dans l'cul`
                    } else if (nombreAleatoire === 7) {
                        sendmsg = `${member} est une ordure`
                    } else {
                        sendmsg = `${member} est un sale gougnafier`
                    }
                    talkedRecently.add(user.id);
                        setTimeout(() => {
                    talkedRecently.delete(user.id);
                    }, 60000);
            } else {
                sendmsg = "Vous n'avez mentionné personne !"
                eph = true;
            }
        } else {
            sendmsg = "Wait a minute before tryng again"
            eph = true;
        }
        if (eph) {
            await interaction.reply({ content: sendmsg, flags: MessageFlags.Ephemeral });
        } else {
            await interaction.reply({ content: sendmsg, tts: tts })
        }
	},
};