//  [Q14] Jump Game
// 🔧 Problem: Can reach last index?
//  [Q14] Jump Game // 🔧 Problem: Can reach last index?
function canJump(nums){
    let maxReach = 0;
    for(let i=0;i<nums.length;i++){
        if(i>maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]); //🧩 working: update max reachable index     
    }
    return true;
}

console.log("Can jump to last:", canJump([2,3,1,1,4]));  //output :-Can jump to last: true

/* 
💡 Function Working:
- We track the maximum distance we can reach from each position
- If current position > maxReach, it's impossible (we're stuck)
- At each step, we update maxReach: current index + jump value
- If we can iterate through all positions, we can reach the end

🌍 Real World Applications:
1. 🎮 Game Development: Level progression check, platform jumping games
2. 🔋 Battery Management: Can device reach charging station with current battery?
3. 🚗 Fuel Stations: Can car reach destination with available fuel stops?
4. 🏃‍♂️ Sports Analytics: Track & field jump analysis, parkour route planning
5. 📡 Network Routing: Can data packet reach destination through available hops?
6. 🧗‍♂️ Rock Climbing: Route feasibility based on climber's reach capability
7. 💰 Investment Portfolio: Can reach target return with available investment jumps?
8. 🚀 Space Mission: Trajectory planning with fuel constraints
9. 🎯 Resource Allocation: Can complete tasks with available resource jumps?
10. 🏥 Emergency Response: Can ambulance reach hospital with available routes?

✅ Pattern: Greedy + DP - always choose best immediate option while tracking global possibility
*/

//output :-Can jump to last: true
/*
💡 Explanation:
Greedy + DP pattern.
✅ Real use: Game level reachability, battery charge jumps.
*/