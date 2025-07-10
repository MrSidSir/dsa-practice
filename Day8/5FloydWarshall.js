class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function floydWarshall(graph) {
    let dist = graph.map(row => row.slice());
    let V = graph.length;
    
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                // FIX: Check if both paths exist before comparing
                if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
    }
    return dist;
}

// 🔧 Test
let graph = [
    [0, 5, Infinity, 10],
    [Infinity, 0, 3, Infinity],
    [Infinity, Infinity, 0, 1],
    [Infinity, Infinity, Infinity, 0]
];

console.log("Q5 Floyd-Warshall Output:", floydWarshall(graph));

// Step-by-step explanation
console.log("\n=== STEP BY STEP EXPLANATION ===");
console.log("Initial graph:");
console.log("0 → 1 (cost 5), 0 → 3 (cost 10)");
console.log("1 → 2 (cost 3)");
console.log("2 → 3 (cost 1)");

console.log("\nPaths found:");
console.log("0 → 2: via 1 (5 + 3 = 8)");
console.log("0 → 3: via 1→2 (5 + 3 + 1 = 9, better than direct 10)");
console.log("1 → 3: via 2 (3 + 1 = 4)");

/*
💡 Explanation:
Original code ka issue: Infinity + number = Infinity
Aur Infinity < Infinity = false
Isliye koi updates nahi ho rahe the.

✅ Fixed version: Pehle check karte hain ki dono paths exist karte hain
*/

// Q5 Floyd-Warshall Output: [
//   [ 0, 5, 8, 9 ],
//   [ Infinity, 0, 3, 4 ],
//   [ Infinity, Infinity, 0, 1 ],
//   [ Infinity, Infinity, Infinity, 0 ]
// ]

// === STEP BY STEP EXPLANATION ===
// Initial graph:
// 0 → 1 (cost 5), 0 → 3 (cost 10)
// 1 → 2 (cost 3)
// 2 → 3 (cost 1)

// Paths found:
// 0 → 2: via 1 (5 + 3 = 8)
// 0 → 3: via 1→2 (5 + 3 + 1 = 9, better than direct 10)
// 1 → 3: via 2 (3 + 1 = 4)