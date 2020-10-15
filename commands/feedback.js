const Discord = require("discord.js");

module.exports.run = async (client, message) => {
    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const args3 = args.slice(2).join(" ");
    const command = args.shift().toLowerCase();
    const embed2 = new Discord.MessageEmbed()
    .setTitle("New Feedback report!")
    .setAuthor(message.author.username, message.author.avatarURL())
    .addField("Bot Rating", args[0])
    .addField("Feedback", args3)
    .setTimestamp()
    .setColor("GREEN")
    const embed3 = new Discord.MessageEmbed()
    .setTitle("New Feedback report!")
    .setAuthor(message.author.username, message.author.avatarURL())
    .addField("Bot Rating", args[0])
    .addField("Feedback", args3)
    .setTimestamp()
    .setColor("GREEN")
    .setFooter("Guild: " + message.guild.name)
    message.channel.send(embed=embed2)
    const channel2 = client.channels.cache.get("766380526612905984");
    channel2.send(embed3)
}