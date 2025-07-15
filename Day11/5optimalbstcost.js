// [Q5] Optimal BST Cost
/* 🔧 Problem: Minimum search cost for keys with frequencies 
   📝 Key Point: DP interval cost */

function optimalBST(freq) {
    const n = freq.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));
    const sum = Array.from({ length: n }, () => Array(n).fill(0));
    
    // Fill sum array for range sums
    for (let i = 0; i < n; i++) {
        sum[i][i] = freq[i];
        for (let j = i + 1; j < n; j++) {
            sum[i][j] = sum[i][j - 1] + freq[j];
        }
    }
    
    // Fill DP table for all possible subtrees
    for (let l = 1; l <= n; l++) {
        for (let i = 0; i <= n - l; i++) {
            let j = i + l - 1;
            dp[i][j] = Infinity;
            
            // Try all possible roots in range [i, j]
            for (let r = i; r <= j; r++) {
                let cost = (r > i ? dp[i][r - 1] : 0) + 
                          (r < j ? dp[r + 1][j] : 0) + 
                          sum[i][j];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    
    return dp[0][n - 1];
}

console.log(optimalBST([10, 12, 20])); // Output: 72

/* 💡 Explanation: DP for minimal weighted tree height 
   ✅ Real use: Optimal search trees in compilers and database indexing. */

/* 🔄 Workflow:
   1. Create DP table and sum array
   2. Fill sum array for range frequency sums
   3. For each subtree length, try all possible roots
   4. Choose root that minimizes total search cost
   5. Return cost of full tree [0, n-1]
   
   🌍 Real-world applications:
   - Database query optimization
   - Compiler symbol tables
   - Autocomplete systems
   - File system indexing */