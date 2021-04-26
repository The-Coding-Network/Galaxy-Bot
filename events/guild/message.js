require('dotenv').config
const db = require('quick.db')
const fs = require('fs')




module.exports = async (Discord, client, message) => {
    let prefix = process.env.PREFIX

    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const BannedWords = []
        if (BannedWords.some(word => message.toString().toLowerCase().includes(word))) {
            message.delete().catch(e => console.error("Couldn't delete message."))
            message.reply(`Please do not use a word in that sensence, if you felt there was a problem please message one of the bot devs (bot is still being developed)`)
            if(!db.get(`user_${member.id}`)){
                db.set(`user_${member.id}`, {warns: 0, kicks: 0, bans: 0, mutes: 0, automod: 0})
            }
            db.add(`user_${member.id}.automod`, 1)


        }            
    }
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    if(!message.guild) {
        //modmail?
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));


    if(command) command.execute(client, message, args, Discord, db);
}
