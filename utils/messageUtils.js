// /utils/messageUtils.js

const Discord = require('discord.js');


//If message is over 1900 characters long, then use this function to split it. Returns an array of messages shorter than 1900 characters
function messageSplit(returnMessage) {
  startIndex = 0
  endIndex = 1900

  charactersSent = 0;

  returnArray = []

  //Splits text into chunks of 1900 characters
  while (returnMessage.length - charactersSent > 1900) {
    slicedMessageLength = 1900

    //Adjusting endIndex to complete word
    while (returnMessage.charAt(endIndex - 1) != " ") {
      endIndex++
      slicedMessageLength++
    }

    slicedMessage = returnMessage.slice(startIndex, endIndex) + "-";

    startIndex = startIndex + slicedMessageLength
    endIndex = endIndex + 1900
    charactersSent = charactersSent + slicedMessageLength

    returnArray.push(slicedMessage)
  }

  //Push whatever is left of the message
  returnArray.push(returnMessage.slice(startIndex));

  return returnArray
}

//Checks if there is actually a message, and returns error message if not
function messageCheck(messageText) {
  if (messageText == "" || messageText === undefined) { // Fix the variable name here
    return "Reference not found :("
  } else {
    return messageText
  }
}

//Handles message delivery - checks length of message and splits messages as appropriate
function deliverMessage(title, returnMessage, channel) {
  if (returnMessage.length > 1900) {
    messageArray = messageSplit(returnMessage)
    counter = 1

    for (msg of messageArray) {
      if (counter == 1)
        packageAndSend(title, msg, channel)
      else
        packageAndSend("", msg, channel)

      counter++
    }

  } else {
    packageAndSend(title, returnMessage, channel)
  }
}

//Packages messages in embed and sends them
function packageAndSend(title, message, channel) {
  const embedMessage = new Discord.MessageEmbed()
    .setColor('#fff')
    .setTitle(title)
    .setDescription(message)
    .setTimestamp()
    .setFooter('from 🦊 orthofox')

  channel.send(embedMessage);
}

module.exports = {
  messageSplit,
  messageCheck,
  deliverMessage,
  packageAndSend,
};
