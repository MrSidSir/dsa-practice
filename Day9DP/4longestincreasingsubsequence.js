// 🔧 Problem: Find LIS length using Dynamic Programming
// 🔑 Key: DP table where dp[i] stores LIS ending at index i.

function lengthOfLIS(nums) {
    // Step 1: Initialize DP array - har element ke liye minimum LIS length = 1 (element khud)
    let dp = new Array(nums.length).fill(1);
    
    // Step 2: Har element ke liye check karo ki kya previous elements se extend kar sakte hain
    for (let i = 1; i < nums.length; i++) {
        
        // Step 3: Current element se pehle ke saare elements check karo
        for (let j = 0; j < i; j++) {
            
            // Step 4: Agar current element > previous element, toh subsequence extend kar sakte hain
            if (nums[i] > nums[j]) {
                // dp[i] = maximum of (current LIS length, previous LIS length + 1)
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    // Step 5: Sabse bada LIS length return karo
    return Math.max(...dp);
}

// Test case
console.log("Length of LIS:", lengthOfLIS([10,9,2,5,3,7,101,18]));

/* 
💡 Step-by-step Working:
Array: [10,9,2,5,3,7,101,18]
dp:    [1, 1,1,2,2,3,4,  4]

i=0: dp[0] = 1 (only element 10)
i=1: dp[1] = 1 (element 9, no smaller element before it)
i=2: dp[2] = 1 (element 2, no smaller element before it)
i=3: dp[3] = 2 (element 5, can extend from 2: [2,5])
i=4: dp[4] = 2 (element 3, can extend from 2: [2,3])
i=5: dp[5] = 3 (element 7, can extend from [2,5]: [2,5,7])
i=6: dp[6] = 4 (element 101, can extend from [2,5,7]: [2,5,7,101])
i=7: dp[7] = 4 (element 18, can extend from [2,5,7]: [2,5,7,18])

Final LIS: [2,5,7,101] or [2,5,7,18] with length = 4
*/

// 🌟 Real-world Applications:

// 1. Stock Price Analysis
function stockPriceAnalysis(prices) {
    console.log("📈 Stock Price LIS Analysis:");
    console.log("Prices:", prices);
    console.log("Longest increasing trend days:", lengthOfLIS(prices));
    // Use case: Identify longest bull run period
}

// 2. Version Control System
function versionCompatibility(versions) {
    console.log("🔄 Version Compatibility Check:");
    console.log("Versions:", versions);
    console.log("Max compatible upgrade path:", lengthOfLIS(versions));
    // Use case: Find longest upgrade path without breaking compatibility
}

// 3. Employee Performance Tracking
function performanceGrowth(scores) {
    console.log("📊 Performance Growth Analysis:");
    console.log("Monthly scores:", scores);
    console.log("Longest improvement streak:", lengthOfLIS(scores));
    // Use case: Track employee's consistent performance improvement
}

// 4. Gaming Level Progression
function gameLevelProgression(levels) {
    console.log("🎮 Game Level Progression:");
    console.log("Levels completed:", levels);
    console.log("Longest skill improvement chain:", lengthOfLIS(levels));
    // Use case: Analyze player's consistent skill development
}

// Example implementations
stockPriceAnalysis([100, 95, 110, 105, 120, 115, 125, 130]);
versionCompatibility([1.0, 1.2, 1.1, 1.3, 1.5, 1.4, 1.6, 1.8]);
performanceGrowth([75, 80, 78, 85, 82, 88, 90, 92]);
gameLevelProgression([1, 3, 2, 5, 4, 7, 8, 6]);

/*
🔥 Key Benefits:
- Time Complexity: O(n²) - manageable for most datasets
- Space Complexity: O(n) - efficient memory usage
- Versatile: Works with any comparable data type
- Practical: Solves many real-world optimization problems

🎯 Industry Uses:
- Financial Trading: Bull market analysis
- Software Engineering: Dependency resolution
- Data Science: Trend analysis
- Operations Research: Resource allocation
- Machine Learning: Feature selection
*/

// 📈 Stock Price LIS Analysis:
// Prices: [
//   100,  95, 110,
//   105, 120, 115,
//   125, 130
// ]
// Longest increasing trend days: 5
// 🔄 Version Compatibility Check:
// Versions: [
//     1, 1.2, 1.1, 1.3,
//   1.5, 1.4, 1.6, 1.8
// ]
// Max compatible upgrade path: 6
// 📊 Performance Growth Analysis:
// Monthly scores: [
//   75, 80, 78, 85,
//   82, 88, 90, 92
// ]
// Longest improvement streak: 6
// 🎮 Game Level Progression:
// Levels completed: [
//   1, 3, 2, 5,
//   4, 7, 8, 6
// ]
// Longest skill improvement chain: 5