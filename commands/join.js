const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    async execute(Discord, bot) {
        bot.on('guildMemberAdd', async member => {
            if (member.guild.id == 621427447879172096) {
                
                const Upsilon = member.guild.roles.cache.find(role => role.name === "Loup Upsilon");
                const Omega = member.guild.roles.cache.find(role => role.name === "Loup Omega");
                await member.guild.members.cache.get(member.id).roles.add(Upsilon.id);
                await member.guild.members.cache.get(member.id).roles.add(Omega.id);

                const channel = member.guild.channels.cache.find(ch => ch.name === 'bienvenue👋');
                const rules = member.guild.channels.cache.find(ch => ch.name === '📛règlement');
                const roles = member.guild.channels.cache.find(ch => ch.name === 'roles⚙');
                if (!channel) return;
                channel.send(`Salut ${member},bienvenue sur The Bad-Wolf tu fais maintenant partie de la meute :wolf:! \nLit les règles ${rules} et amuse toi ! \nTu peux aussi choisir tes rôles ici : ${roles} \n Et faire la commands $help pour connaitre les commandes de SpyroBot.`)
            } else if (member.guild.id == 845773392002678794) {
                const channel = member.guild.channels.cache.find(ch => ch.name === '✈-arrivée');
                const rules = member.guild.channels.cache.find(ch => ch.name === '📜-règles');
                const roles = member.guild.channels.cache.find(ch => ch.name === 'roles-⚙');
                if (!channel) return;
                channel.send(`Salut ${member}, bienvenue dans la bande ! \nN'hésite pas à lire les ${rules} et à prendre tes ${roles}. \nJe te souhaite un bon moment en notre compagnie !`);
            }
        })

        bot.on('guildMemberRemove', member => {
            if (member.guild.id == 621427447879172096) {
                const channel = member.guild.channels.cache.find(ch => ch.name === 'bienvenue👋');
                if (!channel) return;
                channel.send(`${member} quitte la meute et devient un loup solitaire 🙁`);
            } else if (member.guild.id == 845773392002678794) {
                const channel = member.guild.channels.cache.find(ch => ch.name === '✈-arrivée');
                if (!channel) return;
                channel.send(`${member} quitte la bande. \nÀ la revoyure !`);
            }
        })
    }
}