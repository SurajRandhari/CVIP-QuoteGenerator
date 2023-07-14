const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQoute');
const twitterBtn = document.getElementById('twitter');
const copyIcon = document.querySelector(".copy");
const speechBtn = document.querySelector(".speech");
const synth = window.speechSynthesis;

let realData = '';
let quoteData = '';

const updateQuote = () => {
  let rnum = Math.floor(Math.random() * 1643);
  quoteData = realData[rnum];

  quote.innerText = `${quoteData.text}`;
  quoteData.author == null
    ? (author.innerText = 'Unknown')
    : (author.innerText = `${quoteData.author}`);
};

const tweetNow = () => {
  let tweetPost = `https://twitter.com/intent/tweet?text=${quoteData.text} - ${quoteData.author}`;
  window.open(tweetPost);
};

const getQuotes = async () => {
  const api = 'https://type.fit/api/quotes';
  try {
    let data = await fetch(api);
    realData = await data.json();
    updateQuote();
  } catch (error) {}
};

copyIcon.addEventListener("click", () => {
  const textToCopy = `${quote.innerText} - ${author.innerText}`;
  navigator.clipboard.writeText(textToCopy).then(() => {
    console.log("Quote copied successfully!");
  }).catch((error) => {
    console.log("Error copying quote:", error);
  });
});

speechBtn.addEventListener("click", () => {
  if (!speechBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(`${quote.innerText} by ${author.innerText}`);
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
    }, 10);
  }
});

newQuoteBtn.addEventListener('click', updateQuote);
twitterBtn.addEventListener('click', tweetNow);
getQuotes();