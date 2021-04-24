import discord
import os
import random
from discord.ext import commands
from discord.ext.commands.core import command
from discord.utils import get

client = commands.Bot(command_prefix = '.')


@client.command()
async def ping(ctx):
    await ctx.send(f'pong! {round(client.latency * 1000)}ms')


@client.command(aliases=['8ball'])
async def _8ball(ctx, *, question):
    responses = ['it is certain',
                 'Without a doubt',
                 'Yes, Definitley',
                 'Yes',
                 'No',
                 'count on it',
                 'My sources say no' ]
    await ctx.send(f'Question: {question}\nAnswer: {random.choice(responses)}')  


@client.command()
async def clear(ctx, amount=5):
    await ctx.channel.purge(limit=amount)


@client.command()
async def kick(ctx, member : discord.Member, *, reason=None):
    await member.kick(reason=reason)


@client.command()
async def ban(ctx, member : discord.Member, *, reason=None):
    await member.ban(reason=reason)


@client.command()
async def unban(ctx, user: discord.User):
    guild = ctx.guild
    mbed = discord.Embed(
        title = 'success!',
        description = f"{user} has successfully been unbanned."
    )
    if ctx.author.guild_permissions.ban_members:
        await ctx.send(embed=mbed)
        await guild.unban(user=user)


@client.command()
@commands.has_permissions(manage_channels = True)
async def lockdown(ctx):
    await ctx.channel.set_permissions(ctx.guild.default_role, send_messages=False)
    await ctx.send( ctx.channel.mention + "is now in lockdown.")


@client.command()
@commands.has_permissions(manage_channels = True)
async def unlock(ctx):
    await ctx.channel.set_permissions(ctx.guild.default_role, send_messages=True)
    await ctx.send( ctx.channel.mention + "has been unlocked.")


@client.command()
async def slowmode(ctx, seconds: int):
    await ctx.channel.edit(slowmode_delay=seconds)
    await ctx.send(f"Set the slowmode to {seconds} seconds!")


@client.command(pass_content=True)
async def changenick(ctx, member: discord.Member, nick):
    await member.edit(nick=nick)
    await ctx.send(f'nickname was changed for {member.mention} ')


@commands.command(
    name='help', aliases=['h', 'commands'], description="The help command!"
)
async def help(self, ctx):
    helpEmbed = discord.Embed(
        title="Help Commands!", color=random.choice(self.bot.color_list)
    )
    helpEmbed.set_thumbnail(url=ctx.author.avatar_url)



