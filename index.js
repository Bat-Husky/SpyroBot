/**
* @file Index du Bot, tout se passe ici.
* @author Léo Virth
* @version 2.0.1
* Bot original (sans les commentaires et avec toutes les commandes): {@link https://github.com/Bat-Husky/SpyroBot}
* @copyright Léo Virth 2021
* @license BSD-3-Clause
*/

const Discord = require('discord.js')
const path = require('path')
const fs = require('fs')
const { Client, EmbedBuilder, GatewayIntentBits, Partials, Events, Collection, MessageFlags } = require('discord.js');
const bot = new Client({
     intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.MessageContent],
     partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User, Partials.GuildMember, Partials.ThreadMember],
     fetchAllMembers: true
})
const SpyroBot = require('./commands/SpyroBot')
const Ping = require('./commands/ping')
const Reaction = require('./commands/ReactionRole');
const React = require('./commands/react');
const Join = require('./commands/join');
const Pin = require('./commands/pin');
const ReactRules = require('./commands/reactRules');
const ReactionRules = require('./commands/ReactionRules');
const xp = require('./commands/xp');
const botinfo = require('./commands/botinfo');


const { prefix, token } = require('./JSON/config.json');
const queue = new Map();

const VoiceCommandsList = ['play', 'skip', 'leave', 'queue', 'loop', 'clearqueue', 'volume', 'pause', 'resume', 'shuffle'];
// Create a new collection to store the slash commands
bot.SlashCommands = new Collection();

const foldersPath = path.join(__dirname, 'interactions');
const SlashCommandFolders = fs.readdirSync(foldersPath);

for (const folder of SlashCommandFolders) {
	const commandsPath = path.join(foldersPath, folder);
    if (fs.lstatSync(commandsPath).isDirectory()) {
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
            bot.SlashCommands.set(command.data.name, command);
            } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}


// Create a new array to store the commands
bot.commands = new Array();

const cfoldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(cfoldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(cfoldersPath, folder);

    if (fs.lstatSync(commandsPath).isDirectory() && folder != 'voice') {
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            bot.commands.push(command);
        }
    }
}

// Create a new array to store the voice commands
bot.voiceCommands = new Array();

const vfoldersPath = path.join(__dirname, 'commands', 'voice');
const voiceCommandFiles = fs.readdirSync(vfoldersPath).filter(file => file.endsWith('.js'));
for (const file of voiceCommandFiles) {
    const filePath = path.join(vfoldersPath, file);
    const command = require(filePath);
    bot.voiceCommands.push(command);
}


bot.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    bot.user.setPresence({ activities: [{ name: 'crash' , type: 0 }] });
    React.execute(Discord, bot)
    ReactRules.execute(Discord, bot)
    Join.execute(Discord, bot)
    Pin.execute(Discord, bot)
});



bot.on("guildCreate", guild => {
    const channels = guild.channels.cache.find(channel => channel.type == "GUILD_NEWS") || guild.channels.cache.find(channel => channel.type == "GUILD_TEXT");

    const embed = new EmbedBuilder()
        .setColor("#5465FF")
        .setTitle("Thank you for inviting me!")
        .setURL("https://docs.google.com/document/d/1uSBdN_1_jUk0arHGbWB0kMjv6YJGQTgoLKO2QhjjhK8/edit?usp=sharing")
        .setDescription("Hi! I am SpyroBot! \nI am a multi-tasking bot developed by `Bat-Husky`. \nI have `🛡 moderation` and `🔊 music` commands. I also have other `☣ Useless` but funny commands. \nTo get started, use the command $help.")
        .setThumbnail('https://media.discordapp.net/attachments/575712614097879050/799944045778436107/spyrobot_v1.png?width=670&height=670')
        .addFields([{ name:'\u200b', value: '\u200b' }])
        .addFields([
        { name: 'Library :', value: '`discord.js`', inline: true },
        { name: 'Prefix :', value: '`$`', inline: true },
        { name: 'Running on :', value: `\`${bot.guilds.cache.size} servers\``, inline: true }
        ])

    channels.send({ embeds: [embed] }).catch(err => conbsole.error(err));
});



bot.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.SlashCommands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
        if (VoiceCommandsList.includes(interaction.commandName)) {
            await command.execute(interaction, queue, bot);
        } else {
			await command.execute(interaction);
		}
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});



bot.on('messageCreate', async message => {
    if (!message.guild) return;
    if (message.guild.id == 621427447879172096n && message.channel.id == 839864195314221089n) return xp.execute(message.author, message, prefix, bot);
    if (message.author.bot) return;

    if (!message.content.startsWith(prefix) && message.guild.id == 621427447879172096n) {
        xp.execute(message.author, message, prefix, bot)
        return;
    }
    
    let commandUsed = false;
    for (const command of bot.commands) {
        commandUsed ||= command.parse(message, prefix);
    }
    for (const command of bot.voiceCommands) {
        if (command.match(message, prefix)) {
            commandUsed = true;
            command.action(message, queue, bot);
        }
    }
    commandUsed ||= SpyroBot.parse(message, prefix, bot) || Ping.parse(message, prefix, bot) || botinfo.parse(message, prefix, bot);

    if (commandUsed == false && message.guild.id == 621427447879172096n) {
        xp.execute(message.author, message, prefix, bot)
    }

    if (message.content.toString().toLowerCase().startsWith(`${prefix}reaction`)) {
        Reaction.execute(message, Discord, bot);
        return;
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}reactrules`)) {
        ReactionRules.execute(message, Discord, bot);
        return;
    }
});


bot.login(token)
