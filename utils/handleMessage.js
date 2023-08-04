// utils/handleMessage.js

// Import utility functions from the same 'utils' directory
const { getBookandReference, getRangeofTextInChapter, getAllTextOfChapter, getLastVerseOfChapter } = require('./bibleUtils');
const { messageCheck, deliverMessage } = require('./messageUtils');
const titleCase = require('title-case'); //https://www.npmjs.com/package/title-case


// Import utility functions from the same 'utils' directory
const checkAbbriev = require('./checkAbbriev'); // If applicable

function handleMessage(messageText, message, bible) {
  //Define Regexes
  //Specific Verse
  const specificVerseRegex = RegExp("^(1 |2 |3 |)\\w+ [0-9]+:[0-9]+$", 'gi')

  //Whole Chapter
  const wholeChapRegex = RegExp("^(1 |2 |3 |)\\w+ [0-9]+$", 'gi')

  //Range within chapter
  const rangeWithinRegex = RegExp("^(1 |2 |3 |)\\w+ [0-9]+:[0-9]+-[0-9]+$", 'gi')

  //Range accross chapters
  const rangeAcrossRegex = RegExp("^(1 |2 |3 |)\\w+ [0-9]+:[0-9]+-[0-9]+:[0-9]+$", 'gi')

  //Whole Chapter ranges
  const wholeChapRange = RegExp("^(1 |2 |3 |)\\w+ [0-9]+-[0-9]+$", 'gi')

  if (specificVerseRegex.test(messageText)) {
    returnMessage = ""

    bookAndRef = getBookandReference(messageText)

    book = bookAndRef[0]
    reference = bookAndRef[1]

    chapter = reference.split(":")[0]
    verse = reference.split(":")[1]

    try {
      returnMessage = bible[book][chapter][verse]
    } catch (error) {
      returnMessage = ""
    }

    returnMessage = messageCheck(returnMessage)

    deliverMessage(titleCase.titleCase(book) + " " + reference, returnMessage, message.channel)

  } else if (wholeChapRegex.test(messageText)) {
    returnMessage = ""

    bookAndRef = getBookandReference(messageText)

    book = bookAndRef[0]
    chapter = bookAndRef[1]

    returnMessage = getAllTextOfChapter(bible[book][chapter])

    returnMessage = messageCheck(returnMessage)

    deliverMessage(titleCase.titleCase(book) + " " + chapter, returnMessage, message.channel)

  } else if (rangeWithinRegex.test(messageText)) {
    returnMessage = ""

    bookAndRef = getBookandReference(messageText)

    book = bookAndRef[0]
    reference = bookAndRef[1]

    chapter = reference.split(":")[0]
    startVerse = parseInt(reference.split(":")[1].split("-")[0])
    endVerse = parseInt(reference.split(":")[1].split("-")[1])

    returnMessage = getRangeofTextInChapter(bible[book][chapter], startVerse, endVerse)

    returnMessage = messageCheck(returnMessage)

    deliverMessage(titleCase.titleCase(book) + " " + reference, returnMessage, message.channel)

  } else if (rangeAcrossRegex.test(messageText)) {
    returnMessage = ""

    bookAndRef = getBookandReference(messageText)

    book = bookAndRef[0]
    reference = bookAndRef[1]

    startRef = reference.split("-")[0]
    endRef = reference.split("-")[1]

    startChap = parseInt(startRef.split(":")[0])
    startVerse = parseInt(startRef.split(":")[1])

    endChap = parseInt(endRef.split(":")[0])
    endVerse = parseInt(endRef.split(":")[1])

    //get all verses of the first chapter
    endVerseOfFirstChap = getLastVerseOfChapter(bible[book][startChap])
    returnMessage = "**Chapter " + startChap + "**\n" + getRangeofTextInChapter(bible[book][startChap], startVerse, endVerseOfFirstChap)

    //get all verses of the middle chapters
    currentChap = startChap + 1

    while (currentChap < endChap) {
      returnMessage = returnMessage + "\n\n**Chapter " + currentChap + "**\n" + getAllTextOfChapter(bible[book][currentChap])
      currentChap++
    }

    //get all verses of the final chapter
    returnMessage = returnMessage + "\n\n**Chapter " + currentChap + "**\n" + getRangeofTextInChapter(bible[book][endChap], 1, endVerse)

    returnMessage = messageCheck(returnMessage)

    deliverMessage(titleCase.titleCase(book) + " " + reference, returnMessage, message.channel)

  } else if (wholeChapRange.test(messageText)) {
    returnMessage = ""

    bookAndRef = getBookandReference(messageText)

    book = bookAndRef[0]
    reference = bookAndRef[1]

    startChap = parseInt(reference.split("-")[0])
    endChap = parseInt(reference.split("-")[1])

    while (startChap <= endChap) {
      returnMessage = returnMessage + "**Chapter " + startChap + "**\n" + getAllTextOfChapter(bible[book][startChap]) + "\n\n"
      startChap++
    }

    returnMessage = messageCheck(returnMessage)

    deliverMessage(titleCase.titleCase(book) + " " + reference, returnMessage, message.channel)
  }
}

// Export the handleMessage function directly
module.exports = handleMessage;



