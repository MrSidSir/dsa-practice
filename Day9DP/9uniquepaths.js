// 🔧 Problem: Unique ways to reach bottom-right in m x n grid
// 📖 Algorithm: Dynamic Programming (Bottom-up approach)
// 🎯 Time Complexity: O(m*n), Space Complexity: O(n)

function uniquePaths(m, n) {
  // 🏗️ Initialize: Create 1D array representing first row, all paths = 1
  // क्यों 1? क्योंकि first row में जाने का सिर्फ एक ही तरीका है (सिर्फ right जाना)
  let dp = Array(n).fill(1);
  
  // 🔄 Process each row starting from second row (i=1)
  for(let i = 1; i < m; i++) {
    // 🔄 Process each column starting from second column (j=1)
    for(let j = 1; j < n; j++) {
      // 🧩 Core Logic: dp[j] += dp[j-1]
      // dp[j] = current cell के paths (पहले से stored - top से आने वाले)
      // dp[j-1] = left cell के paths
      // Total paths = top से आने वाले + left से आने वाले
      dp[j] += dp[j-1];
    }
    
    // 📊 Debug: Current row state after processing
    console.log(`Row ${i} processed: [${dp.join(', ')}]`);
  }
  
  // 🎯 Return: Bottom-right corner का total paths
  return dp[n-1];
}

// 🧪 Test Example: 3x7 grid
console.log("=== 3x7 Grid Path Calculation ===");
console.log("Initial state: [1, 1, 1, 1, 1, 1, 1]");
let result = uniquePaths(3, 7);
console.log(`\n🏆 Final Answer: ${result} unique paths`);

// 📚 Step-by-step breakdown for 3x3 grid (easier to visualize)
console.log("\n=== 3x3 Grid Step-by-step ===");
function uniquePathsDetailed(m, n) {
  console.log(`Grid size: ${m}x${n}`);
  let dp = Array(n).fill(1);
  console.log(`Initial (Row 0): [${dp.join(', ')}]`);
  
  for(let i = 1; i < m; i++) {
    console.log(`\nProcessing Row ${i}:`);
    for(let j = 1; j < n; j++) {
      let oldValue = dp[j];
      let leftValue = dp[j-1];
      dp[j] += dp[j-1];
      console.log(`  Cell(${i},${j}): ${oldValue} + ${leftValue} = ${dp[j]}`);
    }
    console.log(`  Row ${i} complete: [${dp.join(', ')}]`);
  }
  
  return dp[n-1];
}

uniquePathsDetailed(3, 3);

// 🌍 Real-world Applications:
console.log("\n🌍 === REAL-WORLD APPLICATIONS ===");
console.log(`
🤖 ROBOTICS & AUTOMATION:
   • Robot path planning in grid-based environments
   • Warehouse automation - optimal route counting
   • Drone navigation in structured airspace
   • Autonomous vehicle route optimization

🎮 GAME DEVELOPMENT:
   • Chess/Board game move calculations
   • Strategy game AI - possible move paths
   • Puzzle game level design
   • RPG character movement options

💰 FINANCE & ECONOMICS:
   • Portfolio optimization paths
   • Market trend analysis routes
   • Risk assessment scenarios
   • Trading strategy combinations

🏗️ ENGINEERING & CONSTRUCTION:
   • Circuit board routing paths
   • Building evacuation route planning
   • Network topology design
   • Pipeline layout optimization

📊 DATA SCIENCE:
   • Feature selection combinations
   • Model hyperparameter tuning paths
   • Decision tree path counting
   • Markov chain state transitions

🧬 BIOINFORMATICS:
   • DNA sequence alignment paths
   • Protein folding route analysis
   • Genetic algorithm pathfinding
   • Evolutionary pathway modeling
`);

// 🔍 Algorithm Variants:
console.log("\n🔍 === ALGORITHM VARIANTS ===");
console.log(`
📈 SPACE-OPTIMIZED VERSION (Current):
   • Uses O(n) space instead of O(m*n)
   • Same time complexity but memory efficient
   • Perfect for large grids

🎯 MATHEMATICAL FORMULA VERSION:
   • Uses combinatorics: C(m+n-2, m-1)
   • O(1) space, O(min(m,n)) time
   • Best for very large grids

🛣️ WITH OBSTACLES VERSION:
   • Handles blocked cells in grid
   • More complex DP transitions
   • Real-world path planning scenarios
`);

// 🧠 Core Concept Explanation:
console.log("\n🧠 === CORE CONCEPT ===");
console.log(`
यह algorithm Dynamic Programming का classic example है:

1️⃣ PROBLEM BREAKDOWN:
   • Grid में (0,0) से (m-1,n-1) तक जाना है
   • सिर्फ RIGHT या DOWN move कर सकते हैं
   • कुल कितने unique paths हैं?

2️⃣ DP APPROACH:
   • छोटे subproblems solve करके बड़ा problem solve करते हैं
   • हर cell में उस तक पहुंचने के total ways store करते हैं
   • Current cell = Top cell ways + Left cell ways

3️⃣ SPACE OPTIMIZATION:
   • पूरा 2D array बनाने की जरूरत नहीं
   • सिर्फ current row track करना काफी है
   • Previous row की values को overwrite करते जाते हैं
`);