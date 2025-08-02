module.exports = {
    async execute(Discord, bot) {
        const guild = bot.guilds.cache.get('621427447879172096')
        const channel = '683395478913679580';  // '833120128035192912'
        const Phasmophobia = guild.roles.cache.find(role => role.name === "Phasmophobia");
        const coding = guild.roles.cache.find(role => role.name === "Loup Codeur");
        const jeux = guild.roles.cache.find(role => role.name === "Jeux");
        const nintendo = guild.roles.cache.find(role => role.name === "Nintendo");
        const bedrockm = guild.roles.cache.find(role => role.name === "Minecraft Bedrock");
        const javam = guild.roles.cache.find(role => role.name === "Minecraft Java");
        const fisher = guild.roles.cache.find(role => role.name === "Maître Pêcheur");

        const phasmophobiaEmoji = '👻'
        const codingemoji = '💻'
        const debatemoji = '🎤'
        const fishemoji = '🐟'
        const gameemoji = guild.emojis.cache.find(emoji => emoji.name == 'Saitama')
        const Ninemoji = guild.emojis.cache.find(emoji => emoji.name == 'nintendo')
        const bedrockemoji = guild.emojis.cache.find(emoji => emoji.name == 'bedrock')
        const javaemoji = guild.emojis.cache.find(emoji => emoji.name == 'minecraft')

        bot.on('messageReactionAdd', async (reaction, user) => {
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
                if (reaction.emoji.name === gameemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(jeux.id);
                }
                if (reaction.emoji.name === Ninemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(nintendo.id);
                }
                if (reaction.emoji.name === bedrockemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(bedrockm.id);
                }
                if (reaction.emoji.name === javaemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(javam.id);
                }
                if (reaction.emoji.name === fishemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(fisher.id);
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
                if (reaction.emoji.name === phasmophobiaEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Phasmophobia.id);
                }
                if (reaction.emoji.name === codingemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(coding.id);
                }
                if (reaction.emoji.name === debatemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(debat.id);
                }
                if (reaction.emoji.name === gameemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(jeux.id);
                }
                if (reaction.emoji.name === Ninemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(nintendo.id);
                }
                if (reaction.emoji.name === bedrockemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(bedrockm.id);
                }
                if (reaction.emoji.name === javaemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(javam.id);
                }
                if (reaction.emoji.name === fishemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(fisher.id);
                }
            } else {
                return;
            }
        });
    }
}