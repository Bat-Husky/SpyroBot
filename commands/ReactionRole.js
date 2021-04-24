module.exports = {
    name: 'reactionphasmo',
    description: "Sets up a reaction role message!",
    async execute(message, Discord, bot) {
        const channel = '683395478913679580';

        const phasmophobiaEmoji = '👻';
        const codingemoji = '💻'
        const debatemoji = '🎤'

        let embed = new Discord.MessageEmbed()
            .setColor('#0042ff')
            .setTitle('Roles : ')
            .setDescription('Si vous voulez accéder aux différents channels : \n\n'
                + `Phasmophobia : {phasmophobiaEmoji}\n`
                + `Coding : ${codingemoji}\n`
                + `Débats : ${debatemoji}`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(phasmophobiaEmoji);
        messageEmbed.react(codingemoji);
        messageEmbed.react(debatemoji);
    }

}