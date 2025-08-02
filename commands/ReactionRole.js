module.exports = {
    name: 'reactionphasmo',
    description: "Sets up a reaction role message!",
    async execute(message, Discord, bot) {
        const channel = '683395478913679580';

        const phasmophobiaEmoji = '👻';
        const codingemoji = '💻'
        const debatemoji = '🎤'
        const fishemoji = '🐟'
        const gameemoji = message.guild.emojis.cache.find(emoji => emoji.name == 'Saitama')
        const Ninemoji = message.guild.emojis.cache.find(emoji => emoji.name == 'nintendo')
        const bedrockemoji = message.guild.emojis.cache.find(emoji => emoji.name == 'bedrock')
        const javaemoji = message.guild.emojis.cache.find(emoji => emoji.name == 'minecraft')
      
        let embed = new Discord.MessageEmbed()
            .setColor('#0042ff')
            .setTitle('Roles : ')
            .setDescription('Si vous voulez accéder aux différents channels : \n\n'
                + `Phasmophobia : ${phasmophobiaEmoji}\n`
                + `Coding : ${codingemoji}\n`
                + `Débats : ${debatemoji}\n`
                + `Jeux : ${gameemoji}\n`
                + `Fish BOYIII : ${fishemoji}\n`
                + `Nintendo : ${Ninemoji}\n`
                + `Minecraft Bedrock : ${bedrockemoji}\n`
                + `Minecraft Java : ${javaemoji}\n`
            );

        // let messageEmbed = await message.channel.send(embed);
        let messageEmbed = await message.channel.send({ embeds: [embed] });
        // message.channel.messages.fetch('833383415528554496').then(message => message.edit({ embeds: [embed] }));
        
        messageEmbed.react(phasmophobiaEmoji);
        messageEmbed.react(codingemoji);
        messageEmbed.react(debatemoji);
        messageEmbed.react(gameemoji);
        messageEmbed.react(fishemoji);
        messageEmbed.react(Ninemoji);
        messageEmbed.react(bedrockemoji);
        messageEmbed.react(javaemoji);
        
    }

}