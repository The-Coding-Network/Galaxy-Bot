module.exports = async (Discord, client, channel) => {
    let log_channel = channel.guild.channels.cache.find(c => c.name === '🔐↣｜logs');
    if(!log_channel) return;


    const embed = new Discord.MessageEmbed()
    .setColor('8b0000 ')
    .setTitle("Channel Deleted")
    .setDescription(`The ${channel.type} channel [**${channel.name}**] has been deleted.`)
    .setTimestamp()

    log_channel.send(embed)
}