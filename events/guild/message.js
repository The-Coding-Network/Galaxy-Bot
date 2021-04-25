require('dotenv').config
const db = require('quick.db')

module.exports = async (Discord, client, message) => {
    let prefix = process.env.PREFIX
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