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
                        type: 3,
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
                        type: 3,
                        required: true
                    }
                ]
            }
        });
        
        bot.api.applications(bot.user.id).guilds(OwnerGuildID).commands.post({
            data: {
                name: "help",
                description: "Give info about SpyroBot's commands"
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
                        type: 3,
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
        
    }
}
