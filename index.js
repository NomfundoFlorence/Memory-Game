document.addEventListener('DOMContentLoaded', () => {
  window.initializeGame = () => {
    window.matchedPairs = 0;
    window.isChecking = false;

    gridItemContent();

    const resetBtn = document.getElementById('reset');
    resetBtn.style.display = 'none';

    const gameStatus = document.getElementById('gameStatus');
    gameStatus.style.display = 'none';
  };

  window.shuffleItems = () => {
    const items = {
      1: 'https://static.vecteezy.com/system/resources/previews/021/815/623/original/triangle-shape-icon-sign-free-png.png',
      2: 'https://freepngimg.com/thumb/shape/29779-8-circle-file.png',
      3: 'https://svgsilh.com/svg/152660-ff9800.svg',
      4: 'https://freepngimg.com/svg/image/shape/115970-red-color-square-shape.svg',
      5: 'https://svgsilh.com/svg/1070800-e91e63.svg',
      6: 'https://svgsilh.com/svg/547476-9c27b0.svg',
      7: 'https://svgsilh.com/svg/2789625-03a9f4.svg',
      8: 'https://svgsilh.com/svg/312669-009688.svg',
    };

    const itemsToMatch = [
      items[1],
      items[1],
      items[2],
      items[2],
      items[3],
      items[3],
      items[4],
      items[4],
      items[5],
      items[5],
      items[6],
      items[6],
      items[7],
      items[7],
      items[8],
      items[8],
    ];

    for (let i = itemsToMatch.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [itemsToMatch[i], itemsToMatch[j]] = [itemsToMatch[j], itemsToMatch[i]];
    }

    return itemsToMatch;
  };

  window.flippedCards = [];

  window.gridItemContent = () => {
    const values = shuffleItems();
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach((item, index) => {
      resetGridItem(item, values[index]);
      item.addEventListener('click', () =>
        window.handleCardClick(item, window.flippedCards)
      );
    });
  };

  window.resetGridItem = (item, value) => {
    item.textContent = '';
    const img = document.createElement('img');
    img.src = value;
    img.style.display = 'none';
    img.classList.add('grid-image');
    item.appendChild(img);

    item.style.cursor = 'pointer';
  };

  window.handleCardClick = (card, flippedCards) => {
    const img = card.querySelector('img');

    if (img.style.display === 'block' || isChecking) {
      return;
    }

    img.style.display = 'block';
    flippedCards.push(img);

    card.style.cursor = 'default';

    const resetBtn = document.getElementById('reset');
    if (resetBtn.style.display === 'none') {
      resetBtn.style.display = 'block';
    }

    if (flippedCards.length === 2) {
      window.checkForMatch(flippedCards);
    }
  };

  window.checkForMatch = (flippedCards) => {
    window.isChecking = true;
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.src === secondCard.src) {
      window.matchedPairs += 1;

      if (window.matchedPairs === 8) {
        window.showGameStatus();
      }

      flippedCards.length = 0;
      window.isChecking = false;
    } else {
      setTimeout(() => hideCards(firstCard, secondCard, flippedCards), 1000);
    }
  };

  window.showGameStatus = () => {
    const gameStatus = document.getElementById('gameStatus');
    gameStatus.style.display = 'block';
  };

  window.hideCards = (firstCard, secondCard, flippedCards) => {
    firstCard.style.display = 'none';
    secondCard.style.display = 'none';
    firstCard.parentElement.style.cursor = 'pointer';
    secondCard.parentElement.style.cursor = 'pointer';

    flippedCards.length = 0;
    window.isChecking = false;
  };

  const resetBtn = document.getElementById('reset');
  resetBtn.addEventListener('click', () => {
    resetBtn.style.display = 'none';

    window.initializeGame();
  });

  const newGameBtn = document.getElementById('newGame');
  newGameBtn.addEventListener('click', () => {
    window.initializeGame();
  });

  window.initializeGame();
});
