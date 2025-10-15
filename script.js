const container = document.querySelector('.container');
const newGridBtn = document.getElementById('new-grid');
const modeButtons = document.querySelectorAll('.mode-btn');

let mode = 'normal';
const GRID_SIZE = 600;

function setMode(newMode) {
  mode = newMode;
  modeButtons.forEach(btn => btn.classList.remove('active'));
  document.getElementById(`${newMode}-mode`).classList.add('active');
}

function createGrid(size) {
  container.innerHTML = '';
  const squareSize = GRID_SIZE / size + 'px';

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = squareSize;
    square.style.height = squareSize;
    square.dataset.darkness = 0;
    square.dataset.baseColor = '';

    square.addEventListener('mouseover', () => {
      if (mode === 'normal') {
        square.style.backgroundColor = 'black';

      } else if (mode === 'random') {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        square.style.backgroundColor = `rgb(${r},${g},${b})`;

      } else if (mode === 'shadow') {
        let dark = parseInt(square.dataset.darkness);

        if (dark < 10) {
          let newColor;
          const currentColor = getComputedStyle(square).backgroundColor;

          if (currentColor === 'rgb(255, 255, 255)') {
            const shade = 255 - (dark + 1) * 25.5;
            const value = Math.max(0, Math.floor(shade));
            newColor = `rgb(${value},${value},${value})`;
            square.dataset.baseColor = `255,255,255`;
          } else {
            if (!square.dataset.baseColor || square.dataset.baseColor === '') {
              const rgb = currentColor.match(/\d+/g).map(Number);
              square.dataset.baseColor = rgb.join(',');
            }
            const [r, g, b] = square.dataset.baseColor.split(',').map(Number);
            const factor = 1 - dark * 0.1;
            const newR = Math.floor(r * factor);
            const newG = Math.floor(g * factor);
            const newB = Math.floor(b * factor);
            newColor = `rgb(${newR},${newG},${newB})`;
          }

          square.style.backgroundColor = newColor;
          square.dataset.darkness = dark + 1;
        }

      } else if (mode === 'eraser') {
        square.style.backgroundColor = 'white';
        square.dataset.darkness = 0;
        square.dataset.baseColor = '';
      }
    });

    container.appendChild(square);
  }
}

createGrid(16);

newGridBtn.addEventListener('click', () => {
  let input = prompt('Enter squares per side (1–100):');
  if (input === null) return;
  const size = parseInt(input);
  if (!Number.isInteger(size) || size < 1 || size > 100) {
    alert('Please enter a number between 1 and 100.');
    return;
  }
  createGrid(size);
});

modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.id.replace('-mode', '');
    setMode(id);
  });
});
