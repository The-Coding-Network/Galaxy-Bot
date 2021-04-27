require('dotenv').config
const db = require('quick.db')
const fs = require('fs')
const mongo = require('../../mongo')
const punishmentSchema = require('../../schemas/punishmentlog')




module.exports = async (Discord, client, message) => {
    let prefix = process.env.PREFIX
    const member = message.member

    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const BannedWords = []
        if (BannedWords.some(word => message.toString().toLowerCase().includes(word))) {
            message.delete().catch(e => console.error("Couldn't delete message."))
            message.reply(`Please do not use a word in that sensence, if you felt there was a problem please message one of the bot devs (bot is still being developed)`)
            if(!db.get(`user_${member.id}`)){
                db.set(`user_${member.id}`, {warns: 0, kicks: 0, bans: 0, mutes: 0, automod: 0})
            }
            db.add(`user_${member.id}.automod`, 1)

            if(!db.get(`user_${member.id}`)){
                db.set(`user_${member.id}`, {warns: 0, kicks: 0, bans: 0, mutes: 0, automod: 0})
            }
            if(db.get(`user_${member.id}.automod` === 5)){
                db.add(`user_${member.id}.warns`, 1)
                db.remove(`user_${member.id}.automod`, 5)
            }
        
            if(db.get(`user_${member.id}.warns`) === 3){
                //Mute the person
                var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
                var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
                var userLog = new Discord.MessageEmbed()
                .setColor('0x05ff4c')
                .setTitle(`You have been muted for 30 minutes hour in ${msg.guild.name}!\nReason: Auto mute for 3 warns`)
                user.roles.add(muteRole)
                user.roles.remove(main)
                user.send(userLog)
                db.add(`user_${member.id}.mutes`, 1);
        
                await mongo().then(async (mongoose) => {
                    try {
                        await new punishmentSchema({
                            userID: member.id,
                            type: 'MUTE',
                            reason: 'Auto mute (30 minutes) for 3 warns',
                            by: 'AutoMod'
                        }).save()
                    } finally {
                        mongoose.connection.close()
                    }
                })
                
                setTimeout(function () {
                    user.roles.remove(muteRole)
                    user.roles.add(main)
                } , 1800000);    
            }
            if(db.get(`user_${member.id}.warns`) === 4){
                //Mute the person
                var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
                var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
                var userLog = new Discord.MessageEmbed()
                .setColor('0x05ff4c')
                .setTitle(`You have been muted for 1 hour in ${msg.guild.name}!\nReason: Auto mute for 4 warns`)
                user.roles.add(muteRole)
                user.roles.remove(main)
                user.send(userLog)
                db.add(`user_${member.id}.mutes`, 1);
        
                await mongo().then(async (mongoose) => {
                    try {
                        await new punishmentSchema({
                            userID: member.id,
                            type: 'MUTE',
                            reason: 'Auto mute (1 hour) for 4 warns',
                            by: 'AutoMod'
                        }).save()
                    } finally {
                        mongoose.connection.close()
                    }
                })
                
                setTimeout(function () {
                    user.roles.remove(muteRole)
                    user.roles.add(main)
                } , 3600000);    
            }
            if(db.get(`user_${member.id}.warns`) === 5){
                //Mute the person
                var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
                var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
                var userLog = new Discord.MessageEmbed()
                .setColor('0x05ff4c')
                .setTitle(`You have been kicked from ${msg.guild.name}!\nReason: Auto kick for 5 warns`)
                await user.send(userLog)
                db.add(`user_${member.id}.kicks`, 1);
                await member.kick("Auto kick for 5 warns") 
                await mongo().then(async (mongoose) => {
                    try {
                        await new punishmentSchema({
                            userID: member.id,
                            type: 'KICK',
                            reason: 'Auto kick for 5 warns',
                            by: 'AutoMod'
                        }).save()
                    } finally {
                        mongoose.connection.close()
                    }
                })
                
                
         
            }
            if(db.get(`user_${member.id}.warns`) === 6){
                //Mute the person
                var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
                var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
                var userLog = new Discord.MessageEmbed()
                .setColor('0x05ff4c')
                .setTitle(`You have been banned from ${msg.guild.name}!\nReason: Auto temp-ban (2 days) for 6 warns`)
                await user.send(userLog)
                db.add(`user_${member.id}.bans`, 1);
                await member.ban() 
        
                await mongo().then(async (mongoose) => {
                    try {
                        await new punishmentSchema({
                            userID: member.id,
                            type: 'BAN',
                            reason: 'Auto ban (2 bans) for 6 warns',
                            by: 'AutoMod'
                        }).save()
                    } finally {
                        mongoose.connection.close()
                    }
                })
        
                setTimeout(function () {
                    user.unban()
                } , 172800000);     
         
            }
            if(db.get(`user_${member.id}.warns`) === 7){
                //Mute the person
                var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
                var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
                var userLog = new Discord.MessageEmbed()
                .setColor('0x05ff4c')
                .setTitle(`You have been banned from ${msg.guild.name}!\nReason: Auto perm-ban for 7 warns`)
                user.send(userLog)
                db.add(`user_${member.id}.bans`, 1);
                member.ban()  
                
                await mongo().then(async (mongoose) => {
                    try {
                        await new punishmentSchema({
                            userID: member.id,
                            type: 'BAN',
                            reason: 'Auto ban (cemi-perm) for 7 warns',
                            by: 'AutoMod'
                        }).save()
                    } finally {
                        mongoose.connection.close()
                    }
                })
         
            }
            if(db.get(`user_${member.id}.warns`) === 8){
                //Mute the person
                var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
                var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
                var userLog = new Discord.MessageEmbed()
                .setColor('0x05ff4c')
                .setTitle(`You have been kicked from ${msg.guild.name}!\nReason: Auto perm-ban for 8 warns`)
                user.send(userLog)
                db.add(`user_${member.id}.bans`, 1);
                member.ban()    
        
                await mongo().then(async (mongoose) => {
                    try {
                        await new punishmentSchema({
                            userID: member.id,
                            type: 'BAN',
                            reason: 'Auto perm ban for 8 warns',
                            by: 'AutoMod'
                        }).save()
                    } finally {
                        mongoose.connection.close()
                    }
                })
         
            }


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
