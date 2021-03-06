module.exports = {
    async execute(Discord, bot) {
        const guild = bot.guilds.cache.get('621427447879172096')
        const channel = '621429833183789106'
        const Omega = guild.roles.cache.find(role => role.name === "Loup Omega");

        const emoji = '🛑'

        bot.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Omega.id);
                }
            } else {
                return;
            }

        });

        bot.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;


            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Omega.id);
                }
            } else {
                return;
            }
        });
    }
}