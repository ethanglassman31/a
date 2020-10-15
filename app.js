const Discord = require('discord.js');
const client = new Discord.Client();
client.setMaxListeners(0);
const prefix = 'w!'
const chalk = require('chalk');
const figlet = require('figlet');
require('dotenv').config();
const { GiveawaysManager } = require("discord-giveaways");
// Starts updating currents giveaways
const whitelistedRole = "staff"
const money = require('discord-money')
const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;
const { inspect } = require('util');

client.on('message', (message) => {
    if (message.content === '<@599590466907930645>') {
        message.channel.send('Please do not ping Orange!')
    }
})
client.on('message', async message => {
  const args = message.content.split(' ');
  const command = args.shift().toLowerCase();
  
  if (command === '-eval') {
    // Put your userID here
    if (message.author.id !== '599590466907930645') return;
    
    let evaled;
    try {
        message.channel.bulkDelete(1)
      evaled = await eval(args.join(' '));
      message.channel.send(inspect(evaled));
      console.log(inspect(evaled));
    }
    catch (error) {
      console.error(error);
      message.reply('there was an error during evaluation.');
    }
  }
});

const fs = require('fs');
client.on('message', async (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(process.env.prefix)) return;
    const args = message.content.slice(process.env.prefix.length).split(' ');
    const commandName = args[0].toLowerCase();
    args.shift();
    const command = commandlist.findIndex((cmd) => cmd.name === commandName);
    if(command == -1) return;
    commandlist[command].file.run(client, message, args);
});
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
client.on("message", (message) => {

    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "edit"){
        if(!message.member.roles.cache.some(role =>[whitelistedRole].includes(role.name))) {
            return message.channel.send("You don't have permission to run this command!");
        }
        try {
            let messageID = args[0];
        client.giveawaysManager.edit(messageID, {
            newWinnerCount: 3,
            newPrize: args.slice(1).join(" "),
            addTime: 5000
        }).then(() => {
            message.channel.send("Success! Giveaway will updated in less than "+(client.giveawaysManager.options.updateCountdownEvery/1000)+" seconds.");
        }).catch((err) => {
            message.channel.send("No giveaway found for "+messageID+", please check and try again");
        });
        } catch (err) {
            return message.channel.send("Error!" + err);
        }
    } 

});
client.on("message", (message) => {

    const ms = require("ms"); // npm install ms
    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(command === "reroll"){
        if(!message.member.roles.cache.some(role =>[whitelistedRole].includes(role.name))) {
            return message.channel.send("You don't have permission to run this command!");
        } try {
            let messageID = args[0];
            client.giveawaysManager.reroll(messageID).then(() => {
                message.channel.send("Success! Giveaway rerolled!");
            }).catch((err) => {
                message.channel.send("No giveaway found for "+messageID+", please check and try again");
            });
        } catch (err) {
        return message.channel.send("There was an error while ranking this user: " + err);
    }
    }
});
client.on("message", (message) => {

    const ms = require("ms"); // npm install ms
    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "start-giveaway"){
        // g!start-giveaway 2d 1 Awesome prize!
        // will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"
        if(!message.member.roles.cache.some(role =>[whitelistedRole].includes(role.name))) {
            return message.channel.send("You don't have permission to run this command!");
        }
        try {
            client.giveawaysManager.start(message.channel, {
                time: ms(args[0]),
                prize: args.slice(2).join(" "),
                winnerCount: parseInt(args[1]),
                messages: {
                    giveaway: "\n\n🎉🎉 **GIVEAWAY** 🎉🎉",
                    giveawayEnded: "\n\n🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
                    timeRemaining: "Time remaining: **{duration}**!",
                    inviteToParticipate: "React with 🎉 to participate!",
                    winMessage: "Congratulations, {winners}! You won **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Giveaway cancelled, no valid participations.",
                    hostedBy: "Hosted by: {user}",
                    winners: "winner(s)",
                    endedAt: "Ended at",
                    units: {
                        seconds: "seconds",
                        minutes: "minutes",
                        hours: "hours",
                        days: "days",
                        pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                    }
                }
            }).then((gData) => {
                console.log(gData); // {...} (messageid, end date and more)
            });
            // And the giveaway has started!
        } catch (err) {
            return message.channel.send("There was an error while ranking this user: " + err);
        }
        } 
        
        
});
const { config } = require('process');
let commandlist = [];
fs.readdir('./commands/', async (err, files) => {
    if(err){
        return console.log(chalk.red('An error occured when checking the commands folder for commands to load: ' + err));
    }
    files.forEach(async (file) => {
        if(!file.endsWith('.js')) return;
        let commandFile = require(`./commands/${file}`);
        commandlist.push({
            file: commandFile,
            name: file.split('.')[0]
        });
    });
});

client.login(process.env.token)
