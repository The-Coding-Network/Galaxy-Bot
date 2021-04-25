const db = require('quick.db')
module.exports = {
    name: 'reset',
    async execute(client, msg, args) {
        await db.set(`user_${msg.author.id}`, {warns: 0, kicks: 0, bans: 0, mutes: 0});
        await console.log(db.get(`user_${msg.author.id}.warns`))
        await msg.delete()
    }
}