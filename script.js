const container = document.querySelector('.container');
const button = document.getElementById('new-grid');

function createGrid(size) {
  container.innerHTML = '';

  const squareSize = 600 / size + 'px';
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = squareSize;
    square.style.height = squareSize;

    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = 'black';
    });

    container.appendChild(square);
  }
}

createGrid(16);
button.addEventListener('click', () => {
  let input = prompt('Enter number of squares per side (max 100):');
  if (input === null) return; 

  const size = parseInt(input);
  if (!Number.isInteger(size) || size < 1 || size > 100) {
    alert('Please enter a number between 1 and 100.');
    return;
  }

  createGrid(size);
});
