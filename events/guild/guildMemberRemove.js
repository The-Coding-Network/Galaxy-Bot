module.exports = async (Discord, client, member) => {
    let cwelcome = member.guild.channels.cache.find(c => c.name === '「👋」welcome-and-goodbye')
    if(!cwelcome) return;

    const embed = new Discord.MessageEmbed()
    .setTitle("Member Left")
    .setDescription(`${member.user.tag} has left ${member.guild.name}`)
    .setTimestamp()

    cwelcome.send(embed)
}