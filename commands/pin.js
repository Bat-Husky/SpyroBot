module.exports = {
    /**
     * 
     * @param {Discord} Discord 
     * @param {Discord.Client} bot 
     */
    async execute(Discord, bot) {
        //const guild = bot.guilds.cache.get('621427447879172096')

        const pinEmoji = '📍' //'📌'

        bot.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.emoji.name !== pinEmoji) return;

            message = reaction.message;

            reaction.remove();

            if (!reaction.message.guild.members.cache.get(user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) {
                return message.reply("Vous n'avez pas les permissions").then((sent) => {
                    setTimeout(function () {
                        sent.delete();
                    }, 2500);
                });
            }
            
            message.pin();

            message.channel.send(`${user}, Le message a bien été pin.`).then((sent) => {
                setTimeout(function () {
                    sent.delete();
                }, 2500);
            });
        });
    }
}