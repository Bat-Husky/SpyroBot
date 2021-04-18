module.exports = {
    async execute(Discord, bot) {
        const guild = bot.guilds.cache.get('621427447879172096')
        const channel = '683395478913679580';
        const Phasmophobia = guild.roles.cache.find(role => role.name === "Phasmophobia");
        const coding = guild.roles.cache.find(role => role.name === "Loup Codeur");
        const debat = guild.roles.cache.find(role => role.name === "Débatteur");

        const phasmophobiaEmoji = '👻'
        const codingemoji = '💻'
        const debatemoji = '🎤'

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
                if (reaction.emoji.name === codingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(coding.id);
                }
                if (reaction.emoji.name === debatemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(debat.id);
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
                if (reaction.emoji.name === codingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(coding.id);
                }
                if (reaction.emoji.name === debatemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(debat.id);
                }
            } else {
                return;
            }
        });
    }
}