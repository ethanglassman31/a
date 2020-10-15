const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let inline = true
    let bicon = client.user.displayAvatarURL;
    let usersize = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    let uptimxd = client.uptime
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let servsize = client.guilds.cache.size
    const clientembed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setThumbnail(bicon)
    .addField("Bot Name", `<:discord:761635679788072990> ${client.user.username}`, inline)
    .addField("Bot Owner", " <@599590466907930645>", inline )
    .addField("Bot Uptime", `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`, inline )
    .addField("Servers", `🛡 ${servsize}`, inline)
    .addField("Users", `<:user:761635022478114857> ${usersize}`, inline)
    .addField("Bot Library", "<:ayb_djs:761635263629099020> Discord.js", inline)
    .addField("Created On", client.user.createdAt)
    .setFooter(`Information about: ${client.user.username}. Developed by: TSN_OrangeOVERP#0880 `)
    .setTimestamp()

    message.channel.send(clientembed);

}
