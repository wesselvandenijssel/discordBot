import { ICommand } from "wokcommands";

export default{
    category: "Testing",
    description: "Replies with pong",

    slash: true,
    testOnly: true,

    callback: ({ message, interaction }) => {
        if (message){
        message.reply('Pong')
        }

        if (interaction){
            interaction.reply({
                content: 'Pong',
                ephemeral: true
            })
        }
    },
} as ICommand