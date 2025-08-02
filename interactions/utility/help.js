const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Donne des informations sur les commandes du bot')
        .addBooleanOption(option =>
            option.setName('slash')
                .setDescription('Si vous voulez les commandes slash')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('mp')
                .setDescription('Si vous voulez les envoyer en MP')
                .setRequired(false)
        ),
	async execute(interaction) {
		const top = new EmbedBuilder()
            .setColor("#5465FF")
            .setTitle("SpyroBot's Commands")
            .setDescription("Voici toutes les commandes de SpyroBot, le préfix du bot est `$`. \nVous pouvez pin un message en réagissant à celui-ci avec 📌.")
                 
        const general = new EmbedBuilder()
            .setColor("#5465FF")
            .setTitle("Général :")
            .setDescription("`$info` : Donne des info sur le bot. \n`$Bots` : Donne des infos sur les bots. \n`$Rank` : Donne le niveau et le rang. \n`$Rules` : Lis les règles ! \n`$Spyro` : $Spyro <code|github|history> ; Donne des infos \n`$Open[Pattern/Code/Info]` : Donne des infos sur OpenBot. \n`$Coin info` : Donne des info sur la commande $coin \n`$cmdStatus` permet de désactiver certaines commandes \n`$Crash` : Fais crash le bot (Admin only) \n`$Ping` : Ping le bot (Admin only)")

        const useless = new EmbedBuilder()
            .setColor("#5465FF")
            .setTitle("☣ Useless  :")
            .setDescription("`$Givexp` : cette commande vous troll, tout simplement. \n`$baka` : $baka <@user> ; insulte les autres. \n`$meme` : envoie des memes \n`$FaitsDivers` : Vous donne des faits divers. \n`$run info` : Donne des infos sur la commande run. \n`$diagonale` : Insulte la diagonale.")
        
        const moderation = new EmbedBuilder()
            .setColor("#5465FF")
            .setTitle("🛡 Modération :")
            .setDescription("`$Ban` : $Ban <@user> \n`$Kick` : $Kick <@user> \n`$Warn` : $Warn <@user> <reason> \n`$Infractions` : $Infractions <@user> \n`$Clear` : $Clear <amount> ; max 100 \n`$Report` : $Report <user> <reason> ; (everyone) \n`$LogsChannel` : $LogsChannel <id or name> ; défini le channel des logs.")

        const voice = new EmbedBuilder()
            .setColor("#5465FF")
            .setTitle("🔊 Vocal :")
            .setDescription("`$Play` : $Play <link> \n`$Skip` : passe à la musique suivante. \n`$Queue` : donne la liste des chansons sur la queue. \n`$Volume` : $volume <number> \n`$Loop` : Répète les musiques de la queue. \n`$Leave` : quitte le channel. \n`$SetQueueChannel` : $SetQueueChannel <id or name>")
        
        const slashHelp = new EmbedBuilder()
            .setColor("#5465FF")
            .setTitle("Slash Commands")
            .setDescription("__**Commands :**__ \n`info` \n`help` \n`bots` \n`ping` \n`baka` \n`faitsdivers` \n`warn` \n`infractions` \n`report` \n`clear` \n`rank`")

        if (interaction.options.getBoolean('slash')) {
            if (interaction.options.getBoolean('mp')) {
                await interaction.user.send({ embeds: [slashHelp] });
                return interaction.reply({ content: 'Les commandes Slash ont été envoyées en MP.', flags: MessageFlags.Ephemeral });
            }
            return interaction.reply({ embeds: [slashHelp] });
        }

        if (interaction.options.getBoolean('mp')) {
            await interaction.user.send({ embeds: [top] });
            await interaction.user.send({ embeds: [general] });
            await interaction.user.send({ embeds: [useless] });
            await interaction.user.send({ embeds: [moderation] });
            await interaction.user.send({ embeds: [voice] });
            return interaction.reply({ content: 'Les commandes ont été envoyées en MP.', flags: MessageFlags.Ephemeral });
        }
        await interaction.reply({ embeds: [top, general, useless, moderation, voice] });
	},
};