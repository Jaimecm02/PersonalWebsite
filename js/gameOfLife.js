class GameOfLifeSimulation {
    constructor(canvasId) {
        // Initialize canvas and context
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Set up initial dimensions
        this.resizeCanvas();
        
        // Set up grid parameters
        this.cellSize = 10;
        this.updateGridDimensions();
        
        // Initialize game state
        this.grid = this.createEmptyGrid();
        this.isRunning = false;
        this.intervalId = null;
        
        // Bind methods
        this.handleClick = this.handleClick.bind(this);
        this.toggleSimulation = this.toggleSimulation.bind(this);
        this.clearGrid = this.clearGrid.bind(this);
        this.randomize = this.randomize.bind(this);
        this.handleResize = this.handleResize.bind(this);
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Add resize event listener
        window.addEventListener('resize', this.handleResize);
        
        // Initial render
        this.render();
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const maxWidth = Math.min(containerWidth, 600); // Maximum width of 600px
        
        this.canvas.width = maxWidth;
        this.canvas.height = maxWidth; // Keep it square
    }
    
    updateGridDimensions() {
        this.cols = Math.floor(this.canvas.width / this.cellSize);
        this.rows = Math.floor(this.canvas.height / this.cellSize);
    }
    
    handleResize() {
        this.resizeCanvas();
        this.updateGridDimensions();
        
        // Create new grid with new dimensions
        const newGrid = this.createEmptyGrid();
        
        // Copy existing grid data to new grid
        for (let row = 0; row < Math.min(this.grid.length, this.rows); row++) {
            for (let col = 0; col < Math.min(this.grid[0].length, this.cols); col++) {
                newGrid[row][col] = this.grid[row][col];
            }
        }
        
        this.grid = newGrid;
        this.render();
    }

    createEmptyGrid() {
        return Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }

    handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
        
        const cellWidth = this.canvas.width / this.cols;
        const cellHeight = this.canvas.height / this.rows;
        
        const col = Math.floor(x / cellWidth);
        const row = Math.floor(y / cellHeight);
    
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            this.grid[row][col] = this.grid[row][col] ? 0 : 1;
            this.render();
        }
    }

    setupEventListeners() {
        // Canvas click handler
        if (this.canvas) {
            this.canvas.addEventListener('click', this.handleClick);
            console.log('Canvas click listener added');
        }

        // Button handlers
        const startStopBtn = document.getElementById('startStop');
        const clearBtn = document.getElementById('clear');
        const randomBtn = document.getElementById('random');

        if (startStopBtn) {
            startStopBtn.addEventListener('click', this.toggleSimulation);
            console.log('Start/Stop button listener added');
        } else {
            console.warn('Start/Stop button not found');
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', this.clearGrid);
            console.log('Clear button listener added');
        } else {
            console.warn('Clear button not found');
        }

        if (randomBtn) {
            randomBtn.addEventListener('click', this.randomize);
            console.log('Random button listener added');
        } else {
            console.warn('Random button not found');
        }
    }

    toggleSimulation() {
        console.log('Toggle simulation clicked');
        this.isRunning = !this.isRunning;
        if (this.isRunning) {
            this.intervalId = setInterval(() => this.update(), 100);
        } else {
            clearInterval(this.intervalId);
        }
    }

    clearGrid() {
        console.log('Clear grid clicked');
        this.grid = this.createEmptyGrid();
        this.render();
    }

    randomize() {
        console.log('Randomize clicked');
        this.grid = Array(this.rows).fill().map(() => 
            Array(this.cols).fill().map(() => Math.random() > 0.7 ? 1 : 0)
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
        const newGrid = this.createEmptyGrid();
        
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
        
        const cellWidth = this.canvas.width / this.cols;
        const cellHeight = this.canvas.height / this.rows;
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = col * cellWidth;
                const y = row * cellHeight;
    
                this.ctx.strokeStyle = '#ddd';
                this.ctx.strokeRect(x, y, cellWidth, cellHeight);
    
                if (this.grid[row][col]) {
                    this.ctx.fillStyle = getComputedStyle(document.documentElement)
                        .getPropertyValue('--primary-color').trim() || '#000';
                    this.ctx.fillRect(x, y, cellWidth, cellHeight);
                }
            }
        }
    }
}

// Export the class to window object
window.GameOfLifeSimulation = GameOfLifeSimulation;