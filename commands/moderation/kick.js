module.exports = {
    name: 'kick',
    async execute(client, msg, args, Discord, offlines) {
        msg.delete()
        if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply('you do not have permission to use this command!').then(msg => msg.delete({timeout: 600000}))

        var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
        if(!user) return msg.reply('You did not mention a user!').then(msg => msg.delete({timeout: 600000}));
        var member;
        try{
            member = await msg.guild.members.fetch(user)
        } catch(err) {
            member = null;
        }
        if(member){
            if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You can not kick a staff member!').then(msg => msg.delete({timeout: 600000}));
        }
    
        var reason = args.splice(1).join(' ');
        if(!reason) return msg.reply('You did not mention a reason!').then(msg => msg.delete({timeout: 600000}));
        var channel = msg.guild.channels.cache.find(c => c.name === ':lock:-logs');
        var log = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`${user} has been kicked by ${msg.author} for "**${reason}**`)
        channel.send(log);
    
        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`You have been kicked from **${msg.guild.name}**. Here is the reason why: **${reason}**`)
        try {
            await user.send(userLog);
        } catch(err) {
            console.warn(err);
        }
        member.kick(reason)
        var confir = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`${user} has been kicked by ${msg.author}`)
        msg.channel.send(confir);
        msg.delete();
    }
    }