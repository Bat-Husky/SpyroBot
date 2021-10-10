module.exports = {
    async execute(Discord, bot, OwnerGuildID) {
 
        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "baka",
                description: "An insult command",
                options: [
                    {
                        name: "user",
                        description: "The user to insult",
                        type: 6,
                        required: true
                    }
                ]
            }
        });
        
        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "rank",
                description: "To know your rank",
                options: [
                    {
                        name: "user",
                        description: "the user you want to know the rank",
                        type: 6,
                        required: true
                    }
                ]
            }
        });
        
        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "faitsdivers",
                description: "A command that send Faits Divers"
            }
        });

        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "info",
                description: "Give info about SpyroBot"
            }
        });
        
        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "clear",
                description: "A command to clear",
                options: [
                    {
                        name: "amount",
                        description: "the number of message to delete",
                        type: 4,
                        required: true
                    }
                ]
            }
        });
        
        bot.api.applications(bot.user.id).guilds("621427447879172096").commands.post({
            data: {
                name: "help",
                description: "Give info about SpyroBot's commands",
                options: [
                    {
                        name: "slash",
                        description: "If you want to receive the Slash Commands list.",
                        type: 3,
                        required: false,
                        choices: [
                            {
                                name: 'Yes',
                                value: 'true',
                            },
                            {
                                name: 'No',
                                value: 'false',
                            }
                        ]
                    },
                    {
                        name: "mp",
                        description: "If you want to receive in mp.",
                        type: 3,
                        required: false,
                        choices: [
                            {
                                name: 'Yes',
                                value: 'true',
                            },
                            {
                                name: 'No',
                                value: 'false',
                            }
                        ]
                    }
                ]
            }
        });
        
        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "warn",
                description: "A command to warn",
                options: [
                    {
                        name: "user",
                        description: "the user to warn",
                        type: 6,
                        required: true
                    },
                    {
                        name: "reason",
                        description: "the reason of the warn",
                        type: 3,
                        required: true
                    }
                ]
            }
        });
        
        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "ping",
                description: "Ping le bot"
            }
        });
        
        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "infractions",
                description: "A command to see warns",
                options: [
                    {
                        name: "user",
                        description: "the user to see warns",
                        type: 6,
                        required: true
                    }
                ]
            }
        });
        
    }
}
