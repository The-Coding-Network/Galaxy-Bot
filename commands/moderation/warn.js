// Require Discord JS
 
const Discord = require('discord.js');
 
// Run Command Handler And Code
 
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
        }}