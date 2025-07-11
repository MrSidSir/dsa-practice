// 🏠 HOUSE ROBBER ALGORITHM - COMPLETE BREAKDOWN
// Problem: Maximum sum from non-adjacent elements in array

function rob(nums) {
    // 🔍 BASE CASES - Handle edge scenarios
    if (!nums.length) return 0;        // Empty array = no money
    if (nums.length === 1) return nums[0];  // Only one house = rob it
    
    // 🧠 CORE COMPONENTS:
    // 1. DP Array: Stores maximum money robbed up to index i
    // 2. State Transition: dp[i] = max(skip current, rob current + best from i-2)
    
    let dp = [nums[0], Math.max(nums[0], nums[1])];
    
    // 🔄 MAIN ALGORITHM LOOP
    for (let i = 2; i < nums.length; i++) {
        // 🎯 DECISION MAKING: Two choices at each house
        // Choice 1: Skip current house (dp[i-1])
        // Choice 2: Rob current house + best from 2 houses back (dp[i-2] + nums[i])
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    }
    
    return dp[nums.length - 1];
}

// 📊 ALGORITHM COMPONENTS BREAKDOWN:
/* 
🔧 WORKING COMPONENTS:
1. STATE DEFINITION: dp[i] = max money robbed from houses 0 to i
2. RECURRENCE RELATION: dp[i] = max(dp[i-1], dp[i-2] + nums[i])
3. BASE CASES: dp[0] = nums[0], dp[1] = max(nums[0], nums[1])
4. OPTIMAL SUBSTRUCTURE: Solution depends on optimal solutions of subproblems
5. OVERLAPPING SUBPROBLEMS: Same subproblems solved multiple times (hence DP)

⚙️ MECHANISM:
- At each house, we decide: rob or skip
- If rob current: add to best solution from 2 houses back
- If skip current: keep best solution from previous house
- Take maximum of both choices
*/

// 🌍 REAL-WORLD APPLICATIONS:

// 1. 💼 PROJECT SCHEDULING WITH CONFLICTS
function maxProjectProfit(projects) {
    // Projects with start/end times that conflict with adjacent ones
    // Choose non-overlapping projects for maximum profit
    return rob(projects.map(p => p.profit));
}

// 2. 📈 STOCK TRADING WITH COOLDOWN
function maxStockProfit(prices) {
    // Can't buy stock immediately after selling (cooldown period)
    // Similar to house robber: can't take adjacent opportunities
    let profits = [];
    for (let i = 1; i < prices.length; i++) {
        profits.push(Math.max(0, prices[i] - prices[i-1]));
    }
    return rob(profits);
}

// 3. 🎯 MARKETING CAMPAIGN OPTIMIZATION
function maxCampaignReach(audiences) {
    // Can't target adjacent demographics due to message conflict
    // Choose non-adjacent audience segments for maximum reach
    return rob(audiences.map(a => a.reachValue));
}

// 4. 🏭 MACHINE SCHEDULING
function maxProductionOutput(machines) {
    // Adjacent machines interfere with each other
    // Select non-adjacent machines for maximum output
    return rob(machines.map(m => m.output));
}

// 5. 🎮 GAME LEVEL DESIGN
function maxGameScore(levels) {
    // Player can't access adjacent levels due to story/difficulty constraints
    // Choose non-adjacent levels for maximum score potential
    return rob(levels.map(l => l.scoreValue));
}

// 6. 📊 RESOURCE ALLOCATION
function maxResourceUtilization(resources) {
    // Adjacent resources create conflicts/dependencies
    // Allocate non-adjacent resources for maximum utility
    return rob(resources.map(r => r.value));
}

// 7. 🏘️ URBAN PLANNING
function maxZoneValue(zones) {
    // Adjacent zones can't have same development type
    // Choose non-adjacent zones for maximum city value
    return rob(zones.map(z => z.developmentValue));
}

// 8. 🎵 PLAYLIST OPTIMIZATION
function maxPlaylistEngagement(songs) {
    // Adjacent songs of same genre reduce engagement
    // Choose non-adjacent similar songs for maximum engagement
    return rob(songs.map(s => s.engagementScore));
}

// 🧪 TEST CASES WITH EXPLANATIONS
console.log("🏠 Classic House Robber [2,7,9,3,1]:", rob([2,7,9,3,1])); // 12
/* 
Step-by-step:
dp[0] = 2 (rob house 0)
dp[1] = max(2, 7) = 7 (rob house 1)
dp[2] = max(7, 2+9) = 11 (rob houses 0,2)
dp[3] = max(11, 7+3) = 11 (keep previous)
dp[4] = max(11, 11+1) = 12 (rob houses 0,2,4)
*/

console.log("💼 Project Profits [10,5,2,7,8]:", rob([10,5,2,7,8])); // 19
console.log("📈 Stock Opportunities [1,3,6,2,8]:", rob([1,3,6,2,8])); // 14
console.log("🎯 Marketing Reach [100,50,200,75,300]:", rob([100,50,200,75,300])); // 600

// 🔍 ALGORITHM COMPLEXITY:
/* 
⏰ TIME COMPLEXITY: O(n) - Single pass through array
💾 SPACE COMPLEXITY: O(n) - DP array storage

🚀 SPACE OPTIMIZED VERSION:
*/
function robOptimized(nums) {
    if (!nums.length) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = nums[0];  // dp[i-2]
    let prev1 = Math.max(nums[0], nums[1]);  // dp[i-1]
    
    for (let i = 2; i < nums.length; i++) {
        let current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

console.log("🚀 Space Optimized [2,7,9,3,1]:", robOptimized([2,7,9,3,1])); // 12

/* 
🎯 KEY INSIGHTS:
1. Dynamic Programming transforms recursive problem into iterative solution
2. "Adjacent constraint" appears in many real-world optimization problems
3. Pattern: max(include_current + best_before_previous, exclude_current + best_previous)
4. Applicable wherever you need maximum value with exclusion constraints
5. Foundation for more complex DP problems (House Robber II, Paint House, etc.)

🌟 REAL-WORLD IMPACT:
- Resource allocation in distributed systems
- Scheduling algorithms in operating systems  
- Portfolio optimization in finance
- Campaign planning in marketing
- Network routing with interference constraints
*/

//output;-🏠 Classic House Robber [2,7,9,3,1]: 12
// 💼 Project Profits [10,5,2,7,8]: 20
// 📈 Stock Opportunities [1,3,6,2,8]: 15
// 🎯 Marketing Reach [100,50,200,75,300]: 600
// 🚀 Space Optimized [2,7,9,3,1]: 12