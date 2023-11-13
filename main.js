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

cardsContainer.classList.add("disabled-cards");

// add flip logic to all cards
cardElems.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
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

function restartGame() {
  addRandomImagesToCards(guessImgElems);
  showFront();
  newGameBtn.disabled = true;
  newGameBtn.classList.add("disabled-btn");
  if (!cardsContainer.classList.contains("disabled-cards")) {
    cardsContainer.classList.add("disabled-cards");
  }
  setTimeout(() => {
    showBack();
    newGameBtn.disabled = false;
    if (cardsContainer.classList.contains("disabled-cards")) {
      cardsContainer.classList.remove("disabled-cards");
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
