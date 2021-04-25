const { execute } = require("./warn");

module.exports = {
    name: 'ban',
    aliases: ['banish', 'banishment', 'endtimeonserver'],
    async execute(client, msg, args, Discord, offlines) {
        msg.delete();
        if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('you do not have permission to use this command!').then(msg => msg.delete({timeout: 600000}));

        var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
        if(!user) return msg.reply('You did not mention a user!').then(msg => msg.delete({timeout: 600000}));
        var member;
        try{
            member = await msg.guild.members.fetch(user)
        } catch(err) {
            member = null;
        }
        if(member){
            if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You can not ban a staff member!').then(msg => msg.delete({timeout: 600000}));
        }

        var reason = args.splice(1).join(' ');
        if(!reason) return msg.reply('You did not mention a reason!').then(msg => msg.delete({timeout: 600000}));
        var channel = msg.guild.channels.cache.find(c => c.name === ':lock:-logs');
        var log = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`${user} has been banned by ${msg.author} for "**${reason}**`)
        channel.send(log);

        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`You have been banned from the server ${msg.guild.name}. You can appeal the ban by messaging a staff member`)
        try {
            await user.send(userLog);
        } catch(err) {
            console.warn(err);
        }
        msg.guild.members.ban(user);
        }
    }