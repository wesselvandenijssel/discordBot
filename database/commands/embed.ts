import { MessageEmbed } from 'discord.js';
import { ICommand } from "wokcommands";

export default{
  category: 'Fun',
  description: 'Sends an embed', // Required for slash commands
  permissions: ['ADMINISTRATOR'],
  slash: false,
  testOnly: true,

    callback: ({ message, text}) => {
    // const json = JSON.parse(text)
    // const embed = new MessageEmbed(json)
    // return embed
        const logo =
      'https://elo.glu.nl/sites/all/themes/custom/glu/logo.svg'

    const embed = new MessageEmbed()
      .setTitle('Example text embed')
      .setURL('https://www.youtube.com/channel/UChPrh75CmPP9Ig6jISPnfNA')
      .setAuthor(message.author.username)
      .setImage(logo)
      .setThumbnail(logo)
      .setFooter('This is a footer')
      .setColor('#00AAFF')
      .addFields(
        {
          name: 'Field 1',
          value: 'Hello world',
          inline: true,
        },
        {
          name: 'Field 2',
          value: 'Hello world',
          inline: true,
        },
        {
          name: 'Field 3',
          value: 'Hello world',
          inline: true,
        },
        {
          name: 'Field 4',
          value: 'Hello world',
        }
      )
    return embed
  }
} as ICommand