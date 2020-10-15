const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    let inline = true
    let embed = new Discord.MessageEmbed()
    .setTitle("Help Command")
    .setColor("8adced")
    .setURL("https://discord.gg/sgCHhDJ")
    .addField("a!invite", "Invites The Bot", inline )
    .addField("a!botinfo", "Shows the bot info.", inline )
    .addField("a!serverinfo", "Shows the current server's info.", inline )
    .addField("Coming Soon", "Coming Soon", inline )
    .addField("Coming Soon", "Coming Soon", inline )
    .addField("Coming Soon", "Coming Soon", inline )
    .addField("a!help", "Shows this command.", inline )
    .setTimestamp()
    message.channel.send(embed)
}