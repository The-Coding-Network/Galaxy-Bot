const Discord = require("discord.js");
const ms = require('ms')

module.exports = {
    name:"unmute",
        async execute(client, msg, args) {
            msg.delete()
        var target = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
        if(!target) return msg.reply('you need to mention a user for me to unmute them!')
        var targetID = msg.guild.members.cache.get(target.id)

        var main = msg.guild.roles.cache.find(role => role.name === 'Verified');
        var muteRole = msg.guild.roles.cache.find(role => role.name === 'Muted');

        targetID.roles.remove(muteRole)
        targetID.roles.add(main)

        msg.channel.send(`${targetID} has been unmuted successfully!`);
}}