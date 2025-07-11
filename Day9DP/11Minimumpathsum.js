// 🔧 Minimum Path Sum Algorithm - Simple Explanation

function minPathSum(grid) {
    let m = grid.length;      // Number of rows
    let n = grid[0].length;   // Number of columns
    
    // 🔧 Working Step 1: Fill first column (can only come from above)
    // Add current cell cost + cumulative cost from cell above
    for(let i = 1; i < m; i++) {
        grid[i][0] += grid[i-1][0];  // Current cell + cell above
        console.log(`Column[${i}][0]: ${grid[i][0]} (came from above)`);
    }
    
    // 🔧 Working Step 2: Fill first row (can only come from left)  
    // Add current cell cost + cumulative cost from left cell
    for(let j = 1; j < n; j++) {
        grid[0][j] += grid[0][j-1];  // Current cell + cell to left
        console.log(`Row[0][${j}]: ${grid[0][j]} (came from left)`);
    }
    
    // 🔧 Working Step 3: Fill remaining cells (choose minimum from top or left)
    // Each cell has 2 options: come from top or come from left
    // Choose whichever path has minimum cost
    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            let fromTop = grid[i-1][j];    // Cost if coming from top
            let fromLeft = grid[i][j-1];   // Cost if coming from left
            let minCost = Math.min(fromTop, fromLeft);
            
            grid[i][j] += minCost;  // Add minimum cost to current cell
            console.log(`Cell[${i}][${j}]: ${grid[i][j]} (min of top:${fromTop} left:${fromLeft})`);
        }
    }
    
    return grid[m-1][n-1];  // Return bottom-right cell value (final answer)
}

// 📊 Example Usage
console.log("=== Minimum Path Sum Example ===");
let grid = [[1,3,1],[1,5,1],[4,2,1]];
console.log("Original Grid:");
console.log(grid);

let result = minPathSum(grid);
console.log("\nMinimum Path Sum:", result);
console.log("Final Grid (with cumulative costs):");
console.log(grid);

// 🔍 How it works:
console.log("\n🔍 Step-by-step explanation:");
console.log("1. Start from top-left (1,0) → goal: bottom-right (2,2)");
console.log("2. Can only move RIGHT or DOWN");
console.log("3. Each cell stores minimum cost to reach that position");
console.log("4. Choose path: 1→3→1→1→1 = 7 (minimum possible)");

// 🌍 Real-world applications:
console.log("\n🌍 Real-world uses:");
console.log("• GPS Navigation: Find shortest route with traffic costs");
console.log("• Game Development: AI pathfinding with terrain costs");
console.log("• Network Routing: Minimum cost data transmission");
console.log("• Logistics: Cheapest delivery route planning");
console.log("• Resource Management: Optimal resource allocation");

// 📈 Expected Output
console.log("\n📈 Expected Output: 7");
console.log("Path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2)");
console.log("Cost: 1 + 3 + 1 + 1 + 1 = 7");

// === Minimum Path Sum Example ===
// Original Grid:
// [ [ 1, 3, 1 ], [ 1, 5, 1 ], [ 4, 2, 1 ] ]
// Column[1][0]: 2 (came from above)
// Column[2][0]: 6 (came from above)
// Row[0][1]: 4 (came from left)
// Row[0][2]: 5 (came from left)
// Cell[1][1]: 7 (min of top:4 left:2)
// Cell[1][2]: 6 (min of top:5 left:7)
// Cell[2][1]: 8 (min of top:7 left:6)
// Cell[2][2]: 7 (min of top:6 left:8)

// Minimum Path Sum: 7
// Final Grid (with cumulative costs):
// [ [ 1, 4, 5 ], [ 2, 7, 6 ], [ 6, 8, 7 ] ]

// 🔍 Step-by-step explanation:
// 1. Start from top-left (1,0) → goal: bottom-right (2,2)
// 2. Can only move RIGHT or DOWN
// 3. Each cell stores minimum cost to reach that position
// 4. Choose path: 1→3→1→1→1 = 7 (minimum possible)

// 🌍 Real-world uses:
// • GPS Navigation: Find shortest route with traffic costs
// • Game Development: AI pathfinding with terrain costs
// • Network Routing: Minimum cost data transmission
// • Logistics: Cheapest delivery route planning
// • Resource Management: Optimal resource allocation

// 📈 Expected Output: 7
// Path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2)
// Cost: 1 + 3 + 1 + 1 + 1 = 7