document.addEventListener('DOMContentLoaded', () => {
  window.intervalID;
  window.second = 0;
  window.minute = 0;
  
  window.timer = () => {
    const timer = document.getElementById('timer');
    window.intervalID = setInterval(() => {
      window.second += 1;
      timer.textContent = `0${window.minute}:0${window.second}`;

      if (window.second.toString().length === 2) {
        timer.textContent = `0${window.minute}:${window.second}`;
      }
      if (window.second > 59) {
        window.minute += 1;
        window.second = 0;
        timer.textContent = `0${window.minute}:0${window.second}`;
      }
    }, 1000);

    return window.intervalID;
  };

  window.initializeGame = () => {
    window.matchedPairs = 0;
    window.isChecking = false;
    window.totalPairs;

    const board = document.querySelector('.board');
    board.style.filter = 'blur(3px)';

    gridItemContent();

    const h2 = document.getElementsByTagName('h2')[0];
    h2.style.display = 'none';

    const instructions = document.getElementById('instructions');
    instructions.style.display = 'none';

    const resetBtn = document.getElementById('reset');
    resetBtn.style.display = 'none';

    const gameStatus = document.getElementById('gameStatus');
    gameStatus.style.display = 'none';

    const gridSizeSelector = document.getElementById('gridSizeSelector');
    gridSizeSelector.style.display = 'block';

    const gridSelector = document.getElementById('grid-size');
    gridSelector.value = '4by4';

    window.gridConfiguration();
  };

  window.gridConfiguration = () => {
    const gridSizeSelector = document.getElementById('gridSizeSelector');
    const gridSelector = document.getElementById('grid-size');
    const board = document.querySelector('.board');
    const h2 = document.getElementsByTagName('h2')[0];
    const instructions = document.getElementById('instructions');
    const gridValue = gridSelector.value;

    let rows;
    let columns;

    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }

    switch (gridValue) {
      case '2by2':
        rows = 2;
        columns = 2;
        window.totalPairs = 2;
        gridSizeSelector.style.display = 'none';
        window.timer();
        break;
      case '3by2':
        rows = 2;
        columns = 3;
        window.totalPairs = 3;
        gridSizeSelector.style.display = 'none';
        window.timer();
        break;
      case '4by3':
        rows = 3;
        columns = 4;
        window.totalPairs = 6;
        gridSizeSelector.style.display = 'none';
        window.timer();
        break;
      case '4by4':
        const selectedOption = gridSelector.options[gridSelector.selectedIndex];
        if (selectedOption.innerHTML !== '-- select --') {
          gridSizeSelector.style.display = 'none';
          window.timer();
        }
        rows = 4;
        columns = 4;
        window.totalPairs = 8;
        break;
    }

    board.style.display = 'grid';
    h2.style.display = 'block';
    instructions.style.display = 'block';

    board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    const shuffledItems = window.shuffleItems();

    shuffledItems.forEach((item, index) => {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      gridItem.classList.add(`item${index + 1}`);
      resetGridItem(gridItem, item);
      gridItem.addEventListener('click', () =>
        window.handleCardClick(gridItem, window.flippedCards)
      );
      board.appendChild(gridItem);
    });

    const cards = document.querySelectorAll('.grid-item');
    cards.forEach((card) => card.classList.add('disabled'));
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

    const gridSelector = document.getElementById('grid-size');
    const gridValue = gridSelector.value;

    let rows;
    let columns;
    let gridSizeItemsToMatch;

    switch (gridValue) {
      case '2by2':
        rows = 2;
        columns = 2;
        gridSizeItemsToMatch = itemsToMatch.slice(0, rows * columns);
        break;
      case '3by2':
        rows = 2;
        columns = 3;
        gridSizeItemsToMatch = itemsToMatch.slice(0, rows * columns);
        break;
      case '4by3':
        rows = 3;
        columns = 4;
        gridSizeItemsToMatch = itemsToMatch.slice(0, rows * columns);
        break;
      case '4by4':
        rows = 4;
        columns = 4;
        gridSizeItemsToMatch = itemsToMatch.slice(0, rows * columns);
        break;
    }

    for (let i = gridSizeItemsToMatch.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gridSizeItemsToMatch[i], gridSizeItemsToMatch[j]] = [
        gridSizeItemsToMatch[j],
        gridSizeItemsToMatch[i],
      ];
    }

    return gridSizeItemsToMatch;
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

      if (window.matchedPairs === window.totalPairs) {
        window.showGameStatus();
        clearInterval(window.intervalID);
        window.second = 0;
        window.minute = 0;

        const playedTime = document.getElementById('played-time');
        const timer = document.getElementById('timer');
        const [minutes, seconds] = timer.textContent.split(':');
        playedTime.textContent = `You played for ${minutes} mins ${seconds} secs`;
        playedTime.style.fontSize = '19px';
        timer.textContent = '00:00';
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

    const resetBtn = document.getElementById('reset');
    resetBtn.style.display = 'none';
  };

  window.hideCards = (firstCard, secondCard, flippedCards) => {
    firstCard.style.display = 'none';
    secondCard.style.display = 'none';
    firstCard.parentElement.style.cursor = 'pointer';
    secondCard.parentElement.style.cursor = 'pointer';

    flippedCards.length = 0;
    window.isChecking = false;
  };

  const gridSelector = document.getElementById('grid-size');
  gridSelector.addEventListener('change', () => {
    window.gridConfiguration();

    const cards = document.querySelectorAll('.grid-item');
    cards.forEach((card) => card.classList.remove('disabled'));

    const board = document.querySelector('.board');
    board.style.filter = 'none';
  });

  const resetBtn = document.getElementById('reset');
  resetBtn.addEventListener('click', () => {
    resetBtn.style.display = 'none';
    clearInterval(window.intervalID);
    window.second = 0;
    window.minute = 0;

    const timer = document.getElementById('timer');
    timer.textContent = '00:00';

    window.initializeGame();

    const gridSizeSelector = document.getElementById('gridSizeSelector');
    gridSizeSelector.style.display = 'block';

    const h2 = document.getElementsByTagName('h2')[0];
    h2.style.display = 'block';

    const instructions = document.getElementById('instructions');
    instructions.style.display = 'block';

    window.flippedCards = [];
  });

  const newGameBtn = document.getElementById('newGame');
  newGameBtn.addEventListener('click', () => {
    window.initializeGame();
  });

  window.initializeGame();
});
