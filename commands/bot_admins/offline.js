module.exports = {
    name: 'offline',
    aliases: ['invisible'],
    execute(Discord, client, message) {
        if(message.author.id === '678240766790729728' || message.author.id === '721416593166303352') {
            client.user.setStatus('invisible');
        }
    }
}