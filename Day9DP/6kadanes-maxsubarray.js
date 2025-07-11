// Kadane's Algorithm - Maximum Subarray Sum
// Time Complexity: O(n), Space Complexity: O(1)

function maxSubArray(nums) {
    if (nums.length === 0) return 0;
    
    let maxSoFar = nums[0];        // Global maximum
    let maxEndingHere = nums[0];   // Local maximum ending at current position
    
    for (let i = 1; i < nums.length; i++) {
        // Key decision: extend existing subarray or start new one
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        
        // Update global maximum if current is better
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Enhanced version that also returns the subarray indices
function maxSubArrayWithIndices(nums) {
    if (nums.length === 0) return { sum: 0, start: -1, end: -1 };
    
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    let start = 0, end = 0, tempStart = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > maxEndingHere + nums[i]) {
            maxEndingHere = nums[i];
            tempStart = i;
        } else {
            maxEndingHere = maxEndingHere + nums[i];
        }
        
        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            start = tempStart;
            end = i;
        }
    }
    
    return { 
        sum: maxSoFar, 
        start: start, 
        end: end,
        subarray: nums.slice(start, end + 1)
    };
}

// Test cases
console.log("=== Basic Kadane's Algorithm ===");
console.log("Array: [-2,1,-3,4,-1,2,1,-5,4]");
console.log("Max subarray sum:", maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Output: 6

console.log("\n=== With Indices ===");
let result = maxSubArrayWithIndices([-2,1,-3,4,-1,2,1,-5,4]);
console.log("Result:", result);
console.log("Subarray [4,-1,2,1] has sum:", result.sum);

console.log("\n=== More Test Cases ===");
console.log("All negative:", maxSubArray([-5,-2,-8,-1])); // -1
console.log("All positive:", maxSubArray([1,2,3,4,5])); // 15
console.log("Mixed:", maxSubArray([5,-3,2,-1,4])); // 7

// Real-world applications
console.log("\n=== Real-World Applications ===");

// 1. Stock Trading - Maximum Profit
function maxProfit(prices) {
    if (prices.length < 2) return 0;
    
    let profits = [];
    for (let i = 1; i < prices.length; i++) {
        profits.push(prices[i] - prices[i-1]);
    }
    
    return Math.max(0, maxSubArray(profits));
}

let stockPrices = [7,1,5,3,6,4];
console.log("Stock prices:", stockPrices);
console.log("Max profit:", maxProfit(stockPrices));

// 2. Game Score Analysis
function bestScoringStreak(scores) {
    let result = maxSubArrayWithIndices(scores);
    return {
        bestStreak: result.sum,
        gameRange: `Games ${result.start + 1} to ${result.end + 1}`,
        games: result.subarray
    };
}

let gameScores = [10, -5, 8, -3, 12, -2, 15, -8, 6];
console.log("\nGame scores:", gameScores);
console.log("Best scoring streak:", bestScoringStreak(gameScores));

// 3. Business Revenue Analysis
function bestRevenueQuarter(monthlyRevenue) {
    // Find best consecutive 3-month period
    let bestSum = -Infinity;
    let bestQuarter = [];
    let bestStart = 0;
    
    for (let i = 0; i <= monthlyRevenue.length - 3; i++) {
        let quarterSum = monthlyRevenue.slice(i, i + 3).reduce((a, b) => a + b, 0);
        if (quarterSum > bestSum) {
            bestSum = quarterSum;
            bestQuarter = monthlyRevenue.slice(i, i + 3);
            bestStart = i;
        }
    }
    
    return {
        revenue: bestSum,
        quarter: `Q${Math.floor(bestStart / 3) + 1}`,
        months: bestQuarter
    };
}

let monthlyRevenue = [100, -20, 80, 150, -50, 200, 90, -30, 120];
console.log("\nMonthly revenue:", monthlyRevenue);
console.log("Best quarter:", bestRevenueQuarter(monthlyRevenue));

// output:-=== Basic Kadane's Algorithm ===
// Array: [-2,1,-3,4,-1,2,1,-5,4]
// Max subarray sum: 6

// === With Indices ===
// Result: { sum: 6, start: 3, end: 6, subarray: [ 4, -1, 2, 1 ] }        
// Subarray [4,-1,2,1] has sum: 6

// === More Test Cases ===
// All negative: -1
// All positive: 15
// Mixed: 7

// === Real-World Applications ===
// Stock prices: [ 7, 1, 5, 3, 6, 4 ]
// Max profit: 5

// Game scores: [
//   10, -5,  8, -3, 12,
//   -2, 15, -8,  6
// ]
// Best scoring streak: {
//   bestStreak: 35,
//   gameRange: 'Games 1 to 7',
//   games: [
//     10, -5,  8, -3,
//     12, -2, 15
//   ]
// }

// Monthly revenue: [
//   100, -20, 80, 150,
//   -50, 200, 90, -30,
//   120
// ]
// Best quarter: { revenue: 300, quarter: 'Q2', months: [ 150, -50, 200 ] }

// Real-World Projects:
// 1. Financial Trading Systems

// Use Case: Maximum profit from stock trading
// How it works: Convert price array to profit/loss array, find best buying period
// Implementation: Trading algorithms, portfolio optimization

// 2. Gaming Analytics

// Use Case: Best performance streaks in games
// How it works: Analyze score sequences to find peak performance periods
// Implementation: Player analytics, achievement systems

// 3. Business Intelligence

// Use Case: Revenue/profit analysis
// How it works: Find best performing quarters/periods
// Implementation: Sales dashboards, performance metrics

// 4. Network Traffic Analysis

// Use Case: Peak usage periods
// How it works: Analyze bandwidth usage to optimize resources
// Implementation: Load balancing, capacity planning

// 5. Sports Analytics

// Use Case: Player performance streaks
// How it works: Find best scoring/performance periods
// Implementation: Team strategy, player evaluation

// 6. E-commerce Analytics

// Use Case: Best selling periods
// How it works: Analyze daily sales to find optimal marketing windows
// Implementation: Inventory management, marketing campaigns

// Time Complexity: O(n)
// Space Complexity: O(1)
// Ye algorithm single pass mein optimal solution deta hai, isliye real-time applications mein bahut useful hai!RetryClaude does not have the ability to run the code it generates yet.Claude can make mistakes. Please double-check responses.