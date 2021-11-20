require("dotenv").config();
const PREFIX = "$";

const { Client, Message } = require("discord.js");
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  partials: ["MESSAGE", "REACTION"]
});

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in`);
});

client.on("messageCreate", (messageCreate) => {
  // if (messageCreate.author.bot) return;
  // console.log(`[${messageCreate.author.tag}]: ${messageCreate.content}`);
  // if (messageCreate.content === "hello") {
  //   messageCreate.reply("@everyone Hello!");
  // }
});

client.on("messageCreate", async (messageCreate) => {
  if (messageCreate.author.bot) return;
  console.log(`[${messageCreate.author.tag}]: ${messageCreate.content}`);
  if (messageCreate.content === "hello") {
    messageCreate.reply("@everyone Hello!");
  }
  if (messageCreate.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = messageCreate.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (CMD_NAME === "kick") {
      if (!messageCreate.member.permissions.has("KICK_MEMBERS")){
        return messageCreate.reply(
          "You do not have permissions to use that command"
        )};
      if (args.length === 0) {
      return messageCreate.reply("Please provide an ID")};
      // const member = client.users.cache.find(user => user.id === (''+args[0]+''));
      console.log(args[0])
      // const member = messageCreate.guild.members.cache.get(args[0]+"");
      // console.log(args[0])
      // console.log(messageCreate.guild.members.cache.get(args[0]));
      const member = messageCreate.mentions.members.first();
      if (member) {
        member
          .kick()
          .then((member) => messageCreate.channel.send(`${member} was kicked.`))
          .catch((err) =>
            messageCreate.channel.send("I cannot kick that user :(")
          );
      } else {
        messageCreate.channel.send("That member was not found");
      }
    } else if (CMD_NAME === "ban") {
      if (!messageCreate.member.permissions.has("BAN_MEMBERS"))
        return messageCreate.reply(
          "You do not have permissions to use that command"
        );
      if (args.length === 0) return messageCreate.reply("Please provide an ID");
      try {
        const user = await messageCreate.guild.members.ban(args[0]);
        messageCreate.channel.send("User was banned successfully");
      } catch (err) {
        console.log(err);
        messageCreate.channel.send(
          "An error occured. Either I do not have permissions or the user was not found"
        );
      }
    }
  }
});
client.on("messageReactionAdd", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === "910497235450617896") {
    switch (name) {
      case "🍎":
        member.roles.add("910109718121422848");
        break;
      case "🔫":
        member.roles.add("910108470995472485");
        break;
      case "💠":
        member.roles.add("910114620344250419");
        break;
    }
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === "910497235450617896") {
    switch (name) {
      case "🍎":
        member.roles.remove("910109718121422848");
        break;
      case "🔫":
        member.roles.remove("910108470995472485");
        break;
      case "💠":
        member.roles.remove("910114620344250419");
        break;
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
