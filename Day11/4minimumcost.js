// [Q4] Minimum Cost to Merge Stones
/* 🔧 Problem: Merge stones with minimal cost (Greedy + DP)
   📝 Key Point: Interval DP */

function mergeStones(stones, K) {
  const n = stones.length;
  
  // Edge case: Check if merging is possible
  // To merge n piles into 1 pile, we need exactly (n-1)/(K-1) operations
  if ((n - 1) % (K - 1) !== 0) return -1;
  
  // Prefix sum for quick range sum calculation
  const prefix = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + stones[i];
  }
  
  // DP table: dp[i][j] = minimum cost to merge stones[i...j]
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  
  // Interval DP: Try all possible lengths
  for (let len = K; len <= n; len++) {
    for (let i = 0; i + len <= n; i++) {
      let j = i + len - 1;
      dp[i][j] = Infinity;
      
      // Try all possible middle points with step (K-1)
      for (let m = i; m < j; m += K - 1) {
        dp[i][j] = Math.min(dp[i][j], dp[i][m] + dp[m + 1][j]);
      }
      
      // If current range can be merged into 1 pile, add merge cost
      if ((len - 1) % (K - 1) === 0) {
        dp[i][j] += prefix[j + 1] - prefix[i];
      }
    }
  }
  
  return dp[0][n - 1];
}

// Test cases
console.log("Test Case 1:", mergeStones([3,2,4,1], 2)); // Output: 20
console.log("Test Case 2:", mergeStones([3,5,1,2,6], 3)); // Output: 25
console.log("Test Case 3:", mergeStones([1,2,3,4], 3)); // Output: -1 (impossible)

/* 
🔄 CODE WORKFLOW:

1. INPUT VALIDATION:
   - Check if merging is mathematically possible
   - Formula: (n-1) % (K-1) === 0

2. PREPROCESSING:
   - Create prefix sum array for O(1) range sum queries
   - Initialize DP table with zeros

3. INTERVAL DP PROCESSING:
   - For each possible interval length (K to n)
   - For each starting position i
   - Try all valid middle points with step (K-1)
   - Calculate minimum cost to split interval

4. MERGE COST CALCULATION:
   - If interval can be merged to 1 pile: add merge cost
   - Merge cost = sum of all stones in the interval

5. RESULT:
   - Return dp[0][n-1] (cost to merge entire array)

⚡ TIME COMPLEXITY: O(n³/K)
💾 SPACE COMPLEXITY: O(n²)

🌍 REAL-WORLD APPLICATIONS:

1. 🏭 MANUFACTURING & PRODUCTION:
   - Batch processing optimization in factories
   - Minimizing setup costs when combining production runs
   - Chemical process optimization (mixing batches)

2. 💾 DATA PROCESSING:
   - File merge operations in databases
   - Log file aggregation with minimal I/O cost
   - MapReduce job optimization

3. 🏗️ CONSTRUCTION & LOGISTICS:
   - Material batching for concrete mixing
   - Warehouse inventory consolidation
   - Supply chain batch optimization

4. 💰 FINANCIAL SYSTEMS:
   - Transaction batching to minimize processing fees
   - Portfolio rebalancing with minimal transaction costs
   - Cryptocurrency exchange order batching

5. 🔬 SCIENTIFIC COMPUTING:
   - Parallel algorithm optimization
   - Matrix multiplication scheduling
   - Distributed computing task merging

6. 🎮 GAME DEVELOPMENT:
   - Resource gathering optimization
   - Inventory management systems
   - Crafting recipe optimization

7. 🌐 NETWORK SYSTEMS:
   - Packet aggregation for efficient transmission
   - Network routing optimization
   - Bandwidth allocation strategies

8. 📊 BUSINESS OPERATIONS:
   - Meeting scheduling optimization
   - Resource allocation planning
   - Project milestone merging

💡 KEY INSIGHTS:
- This is a classic interval DP problem
- The constraint (n-1) % (K-1) === 0 is crucial for feasibility
- Real-world applications focus on minimizing operational costs
- The algorithm balances between immediate vs. deferred merging costs
*/