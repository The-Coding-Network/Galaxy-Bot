const db = require('quick.db')
module.exports = {
    name: 'reset',
    async execute(client, msg, args) {
        msg.delete()
        if(!msg.author.id === '678240766790729728' || msg.author.id === '721416593166303352') return msg.reply('You do not have permiossion to use this command!');
        var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
        if(!user) return msg.reply('You didn\'t mention anyone!');
     
        var member;
        try {
            member = await msg.guild.members.fetch(user);
        } catch(err) {
            member = null;
        }

        await db.set(`user_${member.id}`, {warns: 0, kicks: 0, bans: 0, mutes: 0, automod: 0});
    }
}