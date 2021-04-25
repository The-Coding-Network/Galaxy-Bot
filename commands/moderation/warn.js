const Discord = require('discord.js');
const db = require('quick.db')
 
module.exports = {
    name:"warn",
    async execute(client, msg, args) {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You do not have permiossion to use this command!');
    var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if(!user) return msg.reply('You didn\'t mention anyone!');
 
    var member;
    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }
 
if(!member) return msg.reply('The user that you mentioned isn\'t in the server');
    
var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('you need to add a reason for me to punish this user!');
    if(msg.author.id === user.id) return msg.reply('you cannot warn yourself!');
    var warnEmbed = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`${user} has been warned succesfully by ${msg.author}`)
        .setFooter('This message will auto-delete in 10 seconds.')
      var sendEm = await msg.channel.send(warnEmbed);
       msg.delete()
       setTimeout(() => {
       sendEm.delete()
        }, 10000);
var embed = new Discord.MessageEmbed()
.setColor('0xff3030')
    .setTitle('You were warned by **The Coding Network**!')
    .setDescription('Server: **The Coding Network**')
    .addField('Reason:' , `${reason}`)
    try {
    user.send(embed);
    } catch(err) {
    console.warn(err);
        }

    var user = member
    

    if(!db.get(`user_${member.id}`)){
        db.set(`user_${member.id}`, {warns: 0, kicks: 0, bans: 0, mutes: 0})
    }
    db.add(`user_${member.id}.warns`, 1)
    let warns = db.get(`user_${member.id}.warns`)
    console.log(`${user} has ${db.get(`user_${member.id}.warns`)}`)

    if(db.get(`user_${member.id}.warns`) === 5){
        //Mute the person
        var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
        var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setTitle(`You have been muted for 1 hour in ${msg.guild.name}!\nReason: Auto mute for 3 warns`)
        user.roles.add(muteRole)
        user.roles.remove(main)
        user.send(userLog)
        
        setTimeout(function () {
            user.roles.remove(muteRole)
            user.roles.add(main)
        } , 10000);
        


    }

    }

}