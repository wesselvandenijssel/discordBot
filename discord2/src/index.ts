require("dotenv").config();
// const Discord = require('discord.js')
// const client = new Discord.Client()

// const config = require('./config.json')
// const mongo = require('./mongo')

// client.on('ready', async () => {
//   console.log('The client is ready!')

//   await mongo().then((mongoose) => {
//     try {
//       console.log('Connected to mongo!')
//     } finally {
//       mongoose.connection.close()
//     }
//   })
// })
// import DiscordJS, { Intents } from "discord.js";
import WOKCommands from "wokcommands";
import path from "path";
// import mongoose from "mongoose";
// const mongoose = require('mongoose')
import dotenv from 'dotenv';
dotenv.config()
// require ('dotenv').config()
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

client.on("ready", async () => {
  // await mongoose.connect(process.env.MONGO_URI || "", {
  //   keepAlive: true,
  // });
  const wok = new WOKCommands(client, {
    commandDir: path.join(__dirname, 'commands'),
    typeScript: true, //Only use this if you are using Typescript AND "ts-node"
    testServers: ["910108011220041738"],
    // BotOwners: [""],
    // mongoUri: process.env.MONGO_URI,
    // dbOptions: {
    //   keepAlive: true,
    // },
  });
  const { commandHandler } = wok
});


client.login(process.env.DISCORDJS_BOT_TOKEN);
