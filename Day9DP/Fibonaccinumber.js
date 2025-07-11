// [Q1] Fibonacci Number (Top-down & Bottom-up)
// 🔧 Problem: nth Fibonacci number using DP
// 📝 Key Point: Memoization (Top-down) and Tabulation (Bottom-up)

// TOP-DOWN APPROACH (Memoization)
function fibTopDown(n, memo = {}) {
    // Base case: F(0) = 0, F(1) = 1
    if (n <= 1) return n;
    
    // Check if already computed (memoization)
    if (memo[n]) return memo[n];
    
    // Recursive relation: F(n) = F(n-1) + F(n-2)
    memo[n] = fibTopDown(n - 1, memo) + fibTopDown(n - 2, memo);
    return memo[n];
}

// BOTTOM-UP APPROACH (Tabulation)
function fibBottomUp(n) {
    // Base case
    if (n <= 1) return n;
    
    // Initialize DP array
    let dp = [0, 1];
    
    // Build up from bottom
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// SPACE-OPTIMIZED BOTTOM-UP
function fibOptimized(n) {
    if (n <= 1) return n;
    
    let prev2 = 0, prev1 = 1;
    
    for (let i = 2; i <= n; i++) {
        let current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Testing all approaches
console.log("=== FIBONACCI IMPLEMENTATIONS ===");
console.log("Q1 Fib Top-down (6):", fibTopDown(6));     // 8
console.log("Q1 Fib Bottom-up (6):", fibBottomUp(6));   // 8
console.log("Q1 Fib Optimized (6):", fibOptimized(6));  // 8

// Performance comparison
console.log("\n=== PERFORMANCE TEST ===");
console.time("Top-down (35)");
console.log("Top-down (35):", fibTopDown(35));
console.timeEnd("Top-down (35)");

console.time("Bottom-up (35)");
console.log("Bottom-up (35):", fibBottomUp(35));
console.timeEnd("Bottom-up (35)");

console.time("Optimized (35)");
console.log("Optimized (35):", fibOptimized(35));
console.timeEnd("Optimized (35)");

/* 
=== COMPONENT BREAKDOWN ===

1. TOP-DOWN (Memoization):
   - Uses recursion with caching
   - memo = {} stores computed results
   - Avoids redundant calculations
   - Time: O(n), Space: O(n)

2. BOTTOM-UP (Tabulation):
   - Uses iteration to build solution
   - dp[] array stores all values
   - Computes from base cases upward
   - Time: O(n), Space: O(n)

3. SPACE-OPTIMIZED:
   - Only stores last 2 values
   - Most efficient approach
   - Time: O(n), Space: O(1)

=== REAL-WORLD APPLICATIONS ===

1. Finance:
   - Compound interest calculations
   - Stock market analysis patterns
   - Investment growth modeling

2. Biology:
   - Population growth models
   - DNA sequence analysis
   - Branching patterns in plants

3. Computer Graphics:
   - Golden ratio in UI design
   - Spiral generation
   - Fractal patterns

4. Algorithm Design:
   - Base pattern for DP problems
   - Optimization techniques
   - Recursive problem solving

5. Mathematics:
   - Number theory research
   - Mathematical proofs
   - Pattern recognition

=== WORKING MECHANISM ===

Top-down: Breaks problem into subproblems recursively
Bottom-up: Builds solution iteratively from base cases
Both avoid redundant calculations through different strategies
*/

// === FIBONACCI IMPLEMENTATIONS ===
// Q1 Fib Top-down (6): 8
// Q1 Fib Bottom-up (6): 8
// Q1 Fib Optimized (6): 8

// === PERFORMANCE TEST ===
// Top-down (35): 9227465
// Top-down (35): 0.252ms
// Bottom-up (35): 9227465
// Bottom-up (35): 0.153ms
// Optimized (35): 9227465
// Optimized (35): 0.183ms