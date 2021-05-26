const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

const run = new Map();
const list = new Set();

module.exports = class Run extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}run`);
    }

    static action (message) {
        if (!message.content.toString().toLowerCase().split(' ')[1]) return message.reply("Vous n'avez rien spécifier")
        if (message.content.toString().toLowerCase().split(' ')[1] == "info") return this.info(message);
        if (message.content.toString().toLowerCase().split(' ')[1] == "list") return this.list(message);

        let runName = message.content.toString().split(' ');
        runName.splice(0, 2);
        runName = runName.join(' ');
        if (!runName) return message.reply("Il n'y a pas de nom de run.");

        if (message.content.toString().toLowerCase().split(' ')[1] == "create") return this.create_run(message, runName);
        if (message.content.toString().toLowerCase().split(' ')[1] == "join") return this.join_run(message, runName);
        if (message.content.toString().toLowerCase().split(' ')[1] == "start") return this.start_run(message, runName);
        if (message.content.toString().toLowerCase().split(' ')[1] == "delete") return this.delete_run(message, runName, false);
    }

    static info (message) {
        const embed = new MessageEmbed()
              .setColor("#4CD477")
              .setTitle("Run commands")
              .setDescription("Cette commande permet de créer des courses pour vous départager.")
              .addField("Utilisation :", "`$run info` : cette commande. \n`$run list` : Donne la liste des runs ouvertes. \n `$run create` : $run create <name> \n `$run start` : $run start <name> ; creator only \n `$run delete` : $run delete <name> ; creator only \n `$run join` : $run join <name>")
        message.channel.send(embed)
    }

    static list (message) {
        if (list.size == 0) return message.reply("There is no open run.")
        message.channel.send("__**All the open runs are :**__")
        for (const index of list) {
            message.channel.send(`>>> ${index}`)
        }
    }

    static create_run (message, runName) {
        if (run.get(runName)) return message.reply("This run already exist.");
        const runInfo = {
            run_name: runName,
            participant: [],
            creator: message.author,
            isStarted: false
        }

        // runInfo.participant.push(message.author);

        run.set(runName, runInfo);
        list.add(runName);

        message.channel.send(`The run **${runName}** has been created`);
    }

    static join_run (message, runName) {
        if (!run.get(runName)) return message.reply("This run doesn't exist.");
        const runInfo = run.get(runName);

        for (const index in runInfo.participant) {
            if (message.author == runInfo.participant[index]) return message.reply("You're already in this run!");
        }

        runInfo.participant.push(message.author);
        message.reply(`You joined the run **${runName}**`);
    }

    static start_run (message, runName) {
        if (!run.get(runName)) return message.reply("This run doesn't exist.");
        const runInfo = run.get(runName);
        if (message.author != runInfo.creator) return message.reply("You are not the creator of this run!");
        if (runInfo.participant.length == 0 || runInfo.participant.length == 1) return message.reply("There are not enough people!")
        if (runInfo.isStarted == true) return message.reply("This run is already started.");
        runInfo.isStarted = true;
        
        message.channel.send("The run start!");

        let random = Math.random()
        let nbWinner = Math.floor(random * runInfo.participant.length);
        let Winner = runInfo.participant[nbWinner];

        setTimeout(() => {
            runInfo.isStarted = false;
            message.channel.send(`The winner is **${Winner}** !`);
            this.delete_run(message, runName, true);
        }, 6000);
    }

    static delete_run (message, runName, isFinished) {
        if (!run.get(runName)) return message.reply("This run doesn't exist.");
        const runInfo = run.get(runName);
        if (message.author != runInfo.creator) return message.reply("You are not the creator of this run!");
        if (runInfo.isStarted == true) return message.reply("This run is started.");

        run.delete(runName);
        list.delete(runName);

        if (isFinished == false) return message.reply("The run has been deleted !");
    }
}
