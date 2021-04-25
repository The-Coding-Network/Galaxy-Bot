const db = require('quick.db')
module.exports = async (Discord, client, member) => {
    let cwelcome = member.guild.channels.cache.find(c => c.name === '「👋」welcome-and-goodbye')
    if(!cwelcome) return;

    const embed = new Discord.MessageEmbed()
    .setTitle("Member Joined")
    .setDescription(`${member} has joined ${member.guild.name}`)
    .setTimestamp()

    cwelcome.send(embed)

    if(!db.get(`user_${member.id}`)){
        db.set(`user_${member.id}`, {joined: Date(), warns: 0, kicks: 0, bans: 0, mutes: 0})
    }
}