module.exports = async (Discord, client, reaction, user) => {
     const channel1 = reaction.message.guild.channels.cache.find(c => c.name === '「✅」verify')
     if(!channel1) return;
     //return;
     const b = reaction.emoji.name
     if(reaction.message.partial) await reaction.message.fetch()
     if(reaction.partial) await reaction.fetch()
     if(user.bot) return;
     if(!reaction.message.guild) return;

     //Verification
     const verified = reaction.message.guild.roles.cache.find('812858247501185068');

     const Everified= '✅'

     if(reaction.message.channel.id === channel1.id){
          if(b === Everified) {
               reaction.message.guild.members.cache.get(user.id).roles.add(verified)  
          }
     }

 }
 