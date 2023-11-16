const cardElems = document.querySelectorAll(".card");
const guessImgElems = document.querySelectorAll(".back-img");
const newGameBtn = document.querySelector(".new-game-btn");
const cardsContainer = document.querySelector(".cards-container");

const images = [
  "airplane-svgrepo-com.svg",
  "amphora-svgrepo-com.svg",
  "antenna-bus-svgrepo-com.svg",
  "articulated-lorry-svgrepo-com.svg",
  "basketball-svgrepo-com.svg",
  "bed-svgrepo-com.svg",
  "bowling-svgrepo-com.svg",
  "briefcase-svgrepo-com.svg",
  "cake-svgrepo-com.svg",
  "car-svgrepo-com.svg",
  "carrot-svgrepo-com.svg",
  "chicken-svgrepo-com.svg",
  "dove-svgrepo-com.svg",
  "flower-rose-svgrepo-com.svg",
  "freighter-svgrepo-com.svg",
  "helicopter-svgrepo-com.svg",
  "hen-svgrepo-com.svg",
  "hot-air-balloon-svgrepo-com.svg",
  "house-svgrepo-com.svg",
  "ladybug-svgrepo-com.svg",
  "paper-plane-svgrepo-com.svg",
  "scooter-scooter-svgrepo-com.svg",
  "scraper-svgrepo-com.svg",
];

const matchedCards = [];

cardsContainer.classList.add("disabled");

// add flip logic to all cards
cardElems.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
    if (matchedCards.length === 0 && card.classList.contains("flipped")) {
      matchedCards.push(card);
    } else if (matchedCards.length === 1) {
      if (matchedCards[0] !== card && card.classList.contains("flipped")) {
        matchedCards.push(card);
      } else {
        matchedCards.pop();
      }
    }

    console.log(matchedCards);

    if (matchedCards.length === 2) {
      if (
        matchedCards[0].querySelector(".back-img").src ===
          card.querySelector(".back-img").src &&
        matchedCards[0] !== card
      ) {
        matchedCards[0].classList.add("disabled");
        card.classList.add("disabled");
        matchedCards.length = 0;
      } else {
        setTimeout(() => {
          card.classList.toggle("flipped");
        }, 500);
        matchedCards.pop();
      }
    }
  });
});

function getRandomImages() {
  const randomImages = [];
  while (randomImages.length < guessImgElems.length) {
    const randomImg = images[Math.floor(Math.random() * images.length)];
    console.log(randomImg);

    if (!randomImages.includes(randomImg)) {
      randomImages.push(randomImg, randomImg);
    }
  }
  return randomImages;
}

function shuffleRandomImages(randomImages) {
  const shuffledArr = randomImages.sort(() => Math.random() - 0.5);
  return shuffledArr;
}

function addRandomImagesToCards(imgElems) {
  const shuffledImages = shuffleRandomImages(getRandomImages());
  imgElems.forEach((imgElem, index) => {
    imgElem.src = `./images/images_to_guess/${shuffledImages[index]}`;
    console.log(imgElem.src);
  });
}

function showBack() {
  cardElems.forEach((card) => {
    card.classList.remove("flipped");
  });
}
function showFront() {
  cardElems.forEach((card) => {
    card.classList.add("flipped");
  });
}

function removeDisabled() {
  cardElems.forEach((card) => {
    card.classList.remove("disabled");
  });
}

function restartGame() {
  matchedCards.length = 0;

  removeDisabled();
  addRandomImagesToCards(guessImgElems);
  showFront();
  newGameBtn.disabled = true;
  newGameBtn.classList.add("disabled-btn");
  if (!cardsContainer.classList.contains("disabled")) {
    cardsContainer.classList.add("disabled");
  }
  setTimeout(() => {
    showBack();
    newGameBtn.disabled = false;
    if (cardsContainer.classList.contains("disabled")) {
      cardsContainer.classList.remove("disabled");
    }
    newGameBtn.classList.remove("disabled-btn");
    newGameBtn.classList.add("cursor-pointer");
    cardElems.forEach((card) => {
      card.classList.add("cursor-pointer");
    });
  }, 2000);
}

newGameBtn.addEventListener("click", () => {
  restartGame();
});
