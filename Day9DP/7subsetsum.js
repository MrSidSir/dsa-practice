// 🔧 Problem: Can we partition array into two equal sum subsets?
// 💡 Real World Example: Dividing inheritance fairly between two children

function canPartition(nums) {
  console.log("🔍 Input array:", nums);
  
  // Step 1: Calculate total sum
  let sum = nums.reduce((a,b)=>a+b,0);
  console.log("📊 Total sum:", sum);
  
  // Step 2: If sum is odd, impossible to divide equally
  if(sum%2!==0) {
    console.log("❌ Odd sum - impossible to divide equally");
    return false;
  }
  
  // Step 3: Target is half of total sum
  sum/=2;
  console.log("🎯 Target sum for each subset:", sum);
  
  // Step 4: Create DP array - dp[i] = true if sum 'i' is possible
  let dp = new Array(sum+1).fill(false);
  dp[0] = true; // Sum 0 is always possible (empty subset)
  console.log("🔄 Initial DP array:", dp);
  
  // Step 5: Process each number
  for(let num of nums){
    console.log(`\n🔢 Processing number: ${num}`);
    console.log("Before:", dp.slice());
    
    // Step 6: Update DP array backwards (to avoid using same element twice)
    for(let i=sum; i>=num; i--){
      // If we can make sum (i-num), then we can make sum i by adding num
      if(dp[i-num]) {
        dp[i] = true;
        console.log(`✅ Can make sum ${i} by adding ${num} to existing sum ${i-num}`);
      }
    }
    console.log("After:", dp.slice());
  }
  
  console.log(`\n🎯 Can we make target sum ${sum}?`, dp[sum]);
  return dp[sum];
}

// 🧪 Test Cases
console.log("=== TEST CASE 1: Inheritance Division ===");
console.log("🏠 Assets: [1,5,11,5] (in lakhs)");
console.log("Result:", canPartition([1,5,11,5]));
console.log("💰 Possible division: [1,5,5] = 11 lakhs, [11] = 11 lakhs\n");

console.log("=== TEST CASE 2: Team Skill Points ===");
console.log("👥 Skills: [1,1,3,1]");
console.log("Result:", canPartition([1,1,3,1]));
console.log("⚖️ Possible division: [3] = 3 points, [1,1,1] = 3 points\n");

console.log("=== TEST CASE 3: Impossible Case ===");
console.log("📦 Items: [1,2,3,5]");
console.log("Result:", canPartition([1,2,3,5]));
console.log("❌ Total = 11 (odd), cannot divide equally\n");

// 🌟 Real World Applications
console.log("=== REAL WORLD APPLICATIONS ===");
console.log("1. 🏠 Inheritance/Property Division");
console.log("2. 👥 Team Formation (equal skill distribution)");
console.log("3. 📦 Load Balancing (distribute work equally)");
console.log("4. 🎯 Resource Allocation");
console.log("5. 💰 Investment Portfolio Splitting");
console.log("6. 🏭 Manufacturing: Equal batch distribution");
console.log("7. 🎮 Game Design: Balanced team creation");

// 🔍 Algorithm Explanation
console.log("\n=== ALGORITHM EXPLANATION ===");
console.log("🧠 This is a variation of the 0/1 Knapsack Problem");
console.log("⚡ Time Complexity: O(n × sum)");
console.log("💾 Space Complexity: O(sum)");
console.log("🔄 We use Dynamic Programming to build up solutions");
console.log("🎯 Key insight: If we can make sum S, we can also make sum S+num");
console.log("⬅️ We iterate backwards to avoid using same element twice");

// 🎯 Step by Step Visualization
function visualizeAlgorithm(nums) {
  console.log("\n=== STEP BY STEP VISUALIZATION ===");
  console.log("🔢 Array:", nums);
  
  let sum = nums.reduce((a,b)=>a+b,0);
  if(sum%2!==0) return false;
  
  let target = sum/2;
  let dp = new Array(target+1).fill(false);
  dp[0] = true;
  
  console.log("🎯 Target:", target);
  console.log("📊 DP Table shows which sums are possible:");
  
  for(let step = 0; step <= nums.length; step++) {
    if(step === 0) {
      console.log(`Step ${step}: Initial - Only sum 0 is possible`);
    } else {
      console.log(`Step ${step}: After processing ${nums[step-1]}`);
    }
    
    let possibleSums = [];
    for(let i = 0; i <= target; i++) {
      if(dp[i]) possibleSums.push(i);
    }
    console.log(`   Possible sums: [${possibleSums.join(', ')}]`);
    
    if(step < nums.length) {
      let num = nums[step];
      for(let i = target; i >= num; i--) {
        dp[i] = dp[i] || dp[i-num];
      }
    }
  }
  
  return dp[target];
}

// console.log("\n" + "=".repeat(50));
// visualizeAlgorithm([1,5,11,5]);

// === TEST CASE 2: Team Skill Points ===
// 👥 Skills: [1,1,3,1]
// 🔍 Input array: [ 1, 1, 3, 1 ]
// 📊 Total sum: 6
// 🎯 Target sum for each subset: 3
// 🔄 Initial DP array: [ true, false, false, false ]

// 🔢 Processing number: 1
// Before: [ true, false, false, false ]
// ✅ Can make sum 1 by adding 1 to existing sum 0
// After: [ true, true, false, false ]

// 🔢 Processing number: 1
// Before: [ true, true, false, false ]
// ✅ Can make sum 2 by adding 1 to existing sum 1
// ✅ Can make sum 1 by adding 1 to existing sum 0
// After: [ true, true, true, false ]

// 🔢 Processing number: 3
// Before: [ true, true, true, false ]
// ✅ Can make sum 3 by adding 3 to existing sum 0
// After: [ true, true, true, true ]

// 🔢 Processing number: 1
// Before: [ true, true, true, true ]
// ✅ Can make sum 3 by adding 1 to existing sum 2
// ✅ Can make sum 2 by adding 1 to existing sum 1
// ✅ Can make sum 1 by adding 1 to existing sum 0
// After: [ true, true, true, true ]

// 🎯 Can we make target sum 3? true
// Result: true
// ⚖️ Possible division: [3] = 3 points, [1,1,1] = 3 points

// === TEST CASE 3: Impossible Case ===
// 📦 Items: [1,2,3,5]
// 🔍 Input array: [ 1, 2, 3, 5 ]
// 📊 Total sum: 11
// ❌ Odd sum - impossible to divide equally
// Result: false
// ❌ Total = 11 (odd), cannot divide equally

// === REAL WORLD APPLICATIONS ===
// 1. 🏠 Inheritance/Property Division
// 2. 👥 Team Formation (equal skill distribution)
// 3. 📦 Load Balancing (distribute work equally)
// 4. 🎯 Resource Allocation
// 5. 💰 Investment Portfolio Splitting
// 6. 🏭 Manufacturing: Equal batch distribution
// 7. 🎮 Game Design: Balanced team creation

// === ALGORITHM EXPLANATION ===
// 🧠 This is a variation of the 0/1 Knapsack Problem
// ⚡ Time Complexity: O(n × sum)
// 💾 Space Complexity: O(sum)
// 🔄 We use Dynamic Programming to build up solutions
// 🎯 Key insight: If we can make sum S, we can also make sum S+num       
// ⬅️ We iterate backwards to avoid using same element twice

// ==================================================

// === STEP BY STEP VISUALIZATION ===
// 🔢 Array: [ 1, 5, 11, 5 ]
// 🎯 Target: 11
// 📊 DP Table shows which sums are possible:
// Step 0: Initial - Only sum 0 is possible
//    Possible sums: [0]
// Step 1: After processing 1
//    Possible sums: [0, 1]
// Step 2: After processing 5
//    Possible sums: [0, 1, 5, 6]
// Step 3: After processing 11
//    Possible sums: [0, 1, 5, 6, 11]
// Step 4: After processing 5
//    Possible sums: [0, 1, 5, 6, 10, 11