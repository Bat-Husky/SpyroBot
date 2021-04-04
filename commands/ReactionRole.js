module.exports = {
    name: 'reactionphasmo',
    description: "Sets up a reaction role message!",
    async execute(message, Discord, bot) {
        const channel = '683395478913679580';
        const Phasmophobia = message.guild.roles.cache.find(role => role.name === "Phasmophobia");

        const phasmophobiaEmoji = '👻';

        let embed = new Discord.MessageEmbed()
            .setColor('#0042ff')
            .setTitle('Phasmophobia')
            .setDescription('Si vous voulez avoir accès aux channels de Phasmo :\n\n'
                + `${phasmophobiaEmoji}\n`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(phasmophobiaEmoji);

        bot.on('messageReactionAdd', async (reaction, user) => {
            console.log('yep');
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === phasmophobiaEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Phasmophobia.id);
                }
            } else {
                return;
            }

        });

        bot.on('messageReactionRemove', async (reaction, user) => {
            console.log('nope');
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;


            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === phasmophobiaEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Phasmophobia.id);
                }
            } else {
                return;
            }
        });
    }

}