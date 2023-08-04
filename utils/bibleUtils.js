// /utils/bibleUtils.js

const checkAbbriev = require('./checkAbbriev');

//Separates the book and reference (or chapter), and returns them in an array [0] is book and [1] is reference
function getBookandReference(messageText) {
  if (messageText[0] >= '0' && messageText[0] <= '9') { //For books with numbers before them
    book = messageText.split(" ")[0] + " " + messageText.split(" ")[1].toLowerCase()
    reference = messageText.split(" ")[2]
  } else { //All other cases
    book = messageText.split(" ")[0].toLowerCase()
    reference = messageText.split(" ")[1]
  }

  book = book.toLowerCase()
  book = checkAbbriev(book)

  return [book, reference]
}

//Returns text of a given range in a chapter (inclusive of end verse)
function getRangeofTextInChapter(chapter, current, end) {
  returnMessage = ""

  try {
    count = 1
    while (current <= end) {
      if (count == 1) {
        returnMessage = returnMessage + current + " " + chapter[current]
      } else {
        returnMessage = returnMessage + " " + current + " " + chapter[current]
      }
      current++;
      count++;
    }
  } catch (error) {
    returnMessage = ""
    console.log("error in retrieving range within chapter")
  }

  return returnMessage
}

//Returns all the text of a chapter
function getAllTextOfChapter(chapter) {
  returnMessage = ""

  try {
    count = 1
    for (const verseNum in chapter) {
      if (count == 1) {
        returnMessage = returnMessage + verseNum + " " + chapter[verseNum]
      } else {
        returnMessage = returnMessage + " " + verseNum + " " + chapter[verseNum]
      }
      count++;
    }
  } catch (error) {
    returnMessage = ""
    console.log("error in retrieving whole chapter")
  }

  return returnMessage
}

//Gets the last verse of a chapter 
function getLastVerseOfChapter(chapter) {
  lastVerse = 1

  for (verse in chapter) {
    if (parseInt(verse) > lastVerse)
      lastVerse = verse
  }

  return lastVerse
}

module.exports = {
  getBookandReference,
  getRangeofTextInChapter,
  getAllTextOfChapter,
  getLastVerseOfChapter,
};
