import { ICommand } from "wokcommands";

export default {
  category: "Fun",
  description: "status", // Required for slash commands
  permissions: ["ADMINISTRATOR"],
  slash: "both",
  testOnly: true,
  guildOnly: true,
  minArgs: 1,
  expectedArgs: "<status>",
  expectedArgsTypes: ["STRING"],
  ownerOnly: true,

  callback: ({ client, text }) => {
    client.user?.setPresence({
      status: "dnd",
      activities: [
        {
          name: text,
        },
      ],
    });
    return "status updated";
  },
} as ICommand;
