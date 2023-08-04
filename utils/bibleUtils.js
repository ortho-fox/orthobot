// /utils/bibleUtils.js

const checkAbbriev = require('./checkAbbriev');

function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Separates the book, chapter, and verse, and returns them in an array [0] is book, [1] is chapter, and [2] is verse
function getBookandReference(messageText) {
  const parts = messageText.split(" ");
  let book = "";
  let chapter = "";
  let startVerse = "";
  let endVerse = "";

  if (parts.length >= 2) {
    book = parts[0].toLowerCase();
    const chapterVerse = parts[1].split("-");
    if (chapterVerse.length === 1) {
      // Only one verse is provided
      const verseParts = chapterVerse[0].split(":");
      if (verseParts.length === 2) {
        chapter = verseParts[0];
        startVerse = verseParts[1];
        endVerse = startVerse; // Only one verse is provided, so start and end are the same
      }
    } else if (chapterVerse.length === 2) {
      // Start and end verses are provided
      const startVerseParts = chapterVerse[0].split(":");
      const endVerseParts = chapterVerse[1].split(":");
      if (startVerseParts.length === 2 && endVerseParts.length === 2) {
        chapter = startVerseParts[0];
        startVerse = startVerseParts[1];
        endVerse = endVerseParts[1];
      }
    }
  }

  book = checkAbbriev(book);

  return [book, chapter, startVerse, endVerse];
}

// Returns text of a given range in a chapter (inclusive of end verse)
function getRangeofTextInChapter(bible, book, chapter, startVerse, endVerse) {
  let returnMessage = "";

  try {
    let count = 1;
    for (let current = parseInt(startVerse); current <= parseInt(endVerse); current++) {
      const verseText = bible[book][chapter][current];
      if (count === 1) {
        returnMessage = returnMessage + current + ". " + verseText;
      } else {
        returnMessage = returnMessage + "\n\n" + current + ". " + verseText;
      }
      count++;
    }
  } catch (error) {
    returnMessage = "";
    console.log("Error in retrieving range within chapter");
  }

  return returnMessage;
}



// Returns all the text of a chapter
function getAllTextOfChapter(chapter) {
  let returnMessage = "";

  try {
    let count = 1;
    for (const verseNum in chapter) {
      if (count === 1) {
        returnMessage = returnMessage + verseNum + " " + chapter[verseNum];
      } else {
        returnMessage = returnMessage + " " + verseNum + " " + chapter[verseNum];
      }
      count++;
    }
  } catch (error) {
    returnMessage = "";
    console.log("Error in retrieving whole chapter");
  }

  return returnMessage;
}

// Gets the last verse of a chapter 
function getLastVerseOfChapter(chapter) {
  let lastVerse = 1;

  for (const verse in chapter) {
    if (parseInt(verse) > lastVerse)
      lastVerse = parseInt(verse);
  }

  return lastVerse;
}

// Gets a random verse from the Bible
function getRandomVerse(bible) {
  const books = Object.keys(bible);
  const randomBook = books[Math.floor(Math.random() * books.length)];

  const chapters = Object.keys(bible[randomBook]);
  const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];

  const verses = Object.keys(bible[randomBook][randomChapter]);
  const randomVerse = verses[Math.floor(Math.random() * verses.length)];

  return {
    book: randomBook,
    chapter: randomChapter,
    verse: randomVerse,
    text: bible[randomBook][randomChapter][randomVerse],
  };
}

module.exports = {
  getBookandReference,
  getRangeofTextInChapter,
  getAllTextOfChapter,
  getLastVerseOfChapter,
  titleCase,
  getRandomVerse,
};
