const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config()

client.commands = new Discord.Collection();

['command', 'event'].forEach(handler => {
    require(`./handler/${handler}`)(client, Discord);
});

client.login(process.env.TOKEN)