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
import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from "wokcommands";
import path from "path";
import mongoose from "mongoose";
// const mongoose = require('mongoose')
import dotenv from 'dotenv';
import testSchema from './test-schema'
dotenv.config()
// require ('dotenv').config()
// const { Client, Intents } = require("discord.js");
const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", async () => {
  // await mongoose.connect(process.env.MONGO_URI || "", {
  //   keepAlive: true,
  // });
  const wok = new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    typeScript: true, //Only use this if you are using Typescript AND "ts-node"
    testServers: ["910108011220041738"],
    botOwners: ["305295568245358603"],
    mongoUri: process.env.MONGO_URI,
    dbOptions: {
      keepAlive: true,
    },
  });
  setTimeout(async() => {
    await new testSchema({
      message: 'hello world',
    }).save()
  }, 1000);
  const { commandHandler } = wok
});


client.login(process.env.DISCORDJS_BOT_TOKEN);
