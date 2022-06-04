module.exports = {
    async execute(Discord, bot, OwnerGuildID) {
        // await bot.api.applications(bot.user.id).guilds("621427447879172096").commands.get().then((result) => {
        //   console.log(result)
        // })
        // bot.api.applications(bot.user.id).guilds("621427447879172096").commands("886527320221958204").delete()
        // bot.api.applications(bot.user.id).guilds("621427447879172096").commands("848953661589422100").delete()

        // await bot.api.applications(bot.user.id).commands.get().then((result) => {
        //     console.log(result)
        // })
        // bot.api.applications(bot.user.id).commands("855848962907832390").delete()

        const data = [
            {
                name: "skip",
                description: "A command that skip"
            },
            {
                name: "infractions",
                description: "A command to see warns",
                options: [
                    {
                        name: "user",
                        description: "the user to see warns",
                        type: "USER",
                        required: true
                    }
                ]
            },
            {
                name: "ping",
                description: "Ping le bot"
            },
            {
                name: "rank",
                description: "To know your rank",
                options: [
                    {
                        name: "user",
                        description: "the user you want to know the rank",
                        type: "USER",
                        required: false
                    }
                ]
            },
            {
                name: "report",
                description: "A command to report",
                options: [
                    {
                        name: "user",
                        description: "the user to report",
                        type: "USER",
                        required: true
                    },
                    {
                        name: "reason",
                        description: "the reason of the report",
                        type: "STRING",
                        required: true
                    }
                ]
            },
            {
                name: "warn",
                description: "A command to warn",
                options: [
                    {
                        name: "user",
                        description: "the user to warn",
                        type: "USER",
                        required: true
                    },
                    {
                        name: "reason",
                        description: "the reason of the warn",
                        type: "STRING",
                        required: true
                    }
                ]
            },
            {
                name: "help",
                description: "Give info about SpyroBot's commands",
                options: [
                    {
                        name: "slash",
                        description: "If you want to receive the Slash Commands list.",
                        type: "STRING",
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
                        type: "STRING",
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
            },
            {
                name: "clear",
                description: "A command to clear",
                options: [
                    {
                        name: "amount",
                        description: "The number of message to delete.",
                        type: "INTEGER",
                        required: true
                    }
                ]
            },
            {
                name: "bots",
                description: "Give info about Bots"
            },
            {
                name: "info",
                description: "Give info about SpyroBot"
            },
            {
                name: "faitsdivers",
                description: "A command that send Faits Divers"
            },
            {
                name: "baka",
                description: "An insult command",
                options: [
                    {
                        name: "user",
                        description: "The user to insult",
                        type: "USER",
                        required: true
                    }
                ]
            },
            {
                name: "play",
                description: "Play song",
                options: [
                    {
                        name: "link",
                        description: "The link of the song",
                        type: "STRING",
                        required: true
                    }
                ]
            },
            {
                name: "volume",
                description: "Change the volume",
                options: [
                    {
                        name: "level",
                        description: "the level of the volume",
                        type: "STRING",
                        required: false
                    }
                ]
            },
            {
                name: "pause",
                description: "Pause song"
            },
            {
                name: "unpause",
                description: "Unpause song"
            },
            {
                name: "queue",
                description: "Send the queue"
            },
            {
                name: "musicinfo",
                description: "the current music info"
            },
            {
                name: "leave",
                description: "Stop the music and leave"
            },
            {
                name: "loop",
                description: "Change the loop mode",
                options: [
                    {
                        name: "mode",
                        description: "If you want to receive the Slash Commands list.",
                        type: "STRING",
                        required: true,
                        choices: [
                            {
                                name: 'Normal',
                                value: 'normal',
                            },
                            {
                                name: 'Shuffle',
                                value: 'Shuffle',
                            },
                            {
                                name: 'Off',
                                value: 'Off',
                            }
                        ]
                    }
                ]
            },
            {
                name: "leaderboard",
                description: "See the leaderboard of the server."
            }
        ];
        data.forEach(async element => {
            await bot.guilds.cache.get("621427447879172096")?.commands.create(element);
        })
        // const commands = await bot.guilds.cache.get("621427447879172096")?.commands.set([])
        // const commands = await bot.application?.commands.set([])
    }
}