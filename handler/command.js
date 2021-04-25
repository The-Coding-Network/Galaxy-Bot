const fs = require('fs');

module.exports = (client, Discord) => {

    const load_dir = (dirs) =>{
        const command_files = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));
        
        for(const file of command_files){
            const command = require(`../commands/${dirs}/${file}`);
            client.commands.set(command.name, command)
        }
        
    }
<<<<<<< Updated upstream
    ['moderation', 'other', 'fun'].forEach(e => load_dir(e));
=======
    ['moderation', 'other', 'fun', 'Reaction_Roles'].forEach(e => load_dir(e));
>>>>>>> Stashed changes

}