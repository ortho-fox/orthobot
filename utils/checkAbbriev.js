// utils/checkAbbriev.js

function checkAbbriev(bookname) {
  switch (bookname) {
    case "gen":
      return "genesis"
      break;
    case "ex":
      return "exodus"
      break;
    case "lev":
      return "leviticus"
      break;
    case "num":
      return "numbers"
      break;
    case "deut":
      return "deuteronomy"
      break;
    case "josh":
      return "joshua"
      break;
    case "judg":
      return "judges"
      break;
    case "1 sam":
      return "1 samuel"
      break;
    case "2 sam":
      return "2 samuel"
      break;
    case "1 chr":
      return "1 chronicles"
      break;
    case "2 chr":
      return "2 chronicles"
      break;
    case "neh":
      return "nehemiah"
      break;
    case "est":
      return "esther"
      break;
    case "ps":
      return "psalms"
      break;
    case "prov":
      return "proverbs"
      break;
    case "eccles":
      return "ecclesiastes"
      break;
    case "song":
      return "song of solomon"
      break;
    case "isa":
      return "isaiah"
      break;
    case "jer":
      return "jeremiah"
      break;
    case "lam":
      return "lamentations"
      break;
    case "ezek":
      return "ezekiel"
      break;
    case "dan":
      return "daniel"
      break;
    case "hos":
      return "hosea"
      break;
    case "obad":
      return "obadiah"
      break;
    case "mic":
      return "micah"
      break;
    case "nah":
      return "nahum"
      break;
    case "hab":
      return "habakkuk"
      break;
    case "zeph":
      return "zephaniah"
      break;
    case "hag":
      return "haggai"
      break;
    case "zech":
      return "zechariah"
      break;
    case "mal":
      return "malachi"
      break;
    case "matt":
      return "matthew"
      break;
    case "rom":
      return "romans"
      break;
    case "1 cor":
      return "1 corinthians"
      break;
    case "2 cor":
      return "2 corinthians"
      break;
    case "gal":
      return "galatians"
      break;
    case "eph":
      return "ephesians"
      break;
    case "phil":
      return "philippians"
      break;
    case "col":
      return "colossians"
      break;
    case "1 thess":
      return "1 thessalonians"
      break;
    case "2 thess":
      return "2 thessalonians"
      break;
    case "1 tim":
      return "1 timothy"
      break;
    case "2 tim":
      return "2 timothy"
      break;
    case "philem":
      return "philemon"
      break;
    case "heb":
      return "hebrews"
      break;
    case "1 pet":
      return "1 peter"
      break;
    case "2 pet":
      return "2 peter"
      break;
    case "rev":
      return "revelation"
      break;
    default:
      return bookname
  }
}

module.exports = checkAbbriev; // Export the checkAbbriev function

