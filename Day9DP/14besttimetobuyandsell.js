// [Q15] Best Time to Buy and Sell Stock - CORRECTED VERSION
// 🔧 Problem: Max profit from single buy-sell transaction

function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (let price of prices) {
        // Update minimum price seen so far
        minPrice = Math.min(minPrice, price);
        
        // Calculate profit if we sell at current price
        let currentProfit = price - minPrice;
        
        // Update maximum profit
        maxProfit = Math.max(maxProfit, currentProfit);
    }
    
    return maxProfit;
}

// Test cases
console.log("Test 1:", maxProfit([7,1,5,3,6,4])); // Expected: 5 (buy at 1, sell at 6)
console.log("Test 2:", maxProfit([7,6,4,3,1]));   // Expected: 0 (prices always falling)
console.log("Test 3:", maxProfit([1,2,3,4,5]));   // Expected: 4 (buy at 1, sell at 5)
console.log("Test 4:", maxProfit([2,4,1,7,3]));   // Expected: 6 (buy at 1, sell at 7)

// output:-Test 1: 5
// Test 2: 0
// Test 3: 4
// Test 4: 6

/* 
💡 Algorithm Explanation:
- Track the minimum price seen so far
- For each price, calculate potential profit if we sell at that price
- Keep track of maximum profit possible

⚡ Time Complexity: O(n) - single pass through array
🧠 Space Complexity: O(1) - only using two variables

✅ Real-world Applications:
1. Stock Trading - Find optimal buy/sell points
2. Cryptocurrency Trading - Maximize profit from price movements
3. Commodity Trading - Oil, gold, agricultural products
4. Real Estate - Property value analysis over time
5. Forex Trading - Currency exchange optimization
6. Supply Chain - Inventory buying/selling decisions
7. Energy Markets - Electricity price arbitrage
8. Retail - Purchase timing for seasonal goods
*/