class GameOfLife {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = 20;
        this.cols = Math.floor(this.canvas.width / this.cellSize);
        this.rows = Math.floor(this.canvas.height / this.cellSize);
        this.grid = this.createGrid();
        this.isRunning = false;
        this.intervalId = null;

        // Bind event listeners
        this.canvas.addEventListener('click', this.handleClick.bind(this));
        document.getElementById('startStop').addEventListener('click', this.toggleSimulation.bind(this));
        document.getElementById('clear').addEventListener('click', this.clearGrid.bind(this));
        document.getElementById('random').addEventListener('click', this.randomize.bind(this));

        // Initial render
        this.render();
    }

    createGrid() {
        return Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }

    handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const col = Math.floor(x / this.cellSize);
        const row = Math.floor(y / this.cellSize);

        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            this.grid[row][col] = this.grid[row][col] ? 0 : 1;
            this.render();
        }
    }

    toggleSimulation() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.isRunning = false;
        } else {
            this.intervalId = setInterval(() => this.update(), 100);
            this.isRunning = true;
        }
    }

    clearGrid() {
        this.grid = this.createGrid();
        this.render();
    }

    randomize() {
        this.grid = this.grid.map(row => 
            row.map(() => Math.random() > 0.7 ? 1 : 0)
        );
        this.render();
    }

    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newRow = (row + i + this.rows) % this.rows;
                const newCol = (col + j + this.cols) % this.cols;
                count += this.grid[newRow][newCol];
            }
        }
        return count;
    }

    update() {
        const newGrid = this.createGrid();
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const neighbors = this.countNeighbors(row, col);
                const cell = this.grid[row][col];

                if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
                    newGrid[row][col] = 0;
                } else if (cell === 0 && neighbors === 3) {
                    newGrid[row][col] = 1;
                } else {
                    newGrid[row][col] = cell;
                }
            }
        }

        this.grid = newGrid;
        this.render();
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = col * this.cellSize;
                const y = row * this.cellSize;

                this.ctx.strokeStyle = '#ddd';
                this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);

                if (this.grid[row][col]) {
                    this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
                    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
                }
            }
        }
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GameOfLife('gameOfLife');
});