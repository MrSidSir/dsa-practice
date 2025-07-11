// 🔧 CLIMBING STAIRS ALGORITHM - WORKING & REAL-WORLD APPLICATIONS

// 📊 ALGORITHM WORKING:
function climbStairs(n) {
    // Base cases: 1 step = 1 way, 2 steps = 2 ways
    if (n <= 2) return n;
    
    // Variables to store previous two results (space-optimized DP)
    let first = 1;   // ways(1) = 1
    let second = 2;  // ways(2) = 2
    
    // Build up solution iteratively
    for (let i = 3; i <= n; i++) {
        let third = first + second;  // ways(i) = ways(i-1) + ways(i-2)
        first = second;              // Shift values
        second = third;
    }
    
    return second;
}

// 💡 CORE LOGIC:
// At step 'n', you can either:
// 1. Come from step (n-1) with 1 step
// 2. Come from step (n-2) with 2 steps
// Total ways = ways(n-1) + ways(n-2) [Fibonacci sequence]

// 🧪 TESTING:
console.log("Steps 1:", climbStairs(1)); // 1
console.log("Steps 2:", climbStairs(2)); // 2
console.log("Steps 3:", climbStairs(3)); // 3
console.log("Steps 4:", climbStairs(4)); // 5
console.log("Steps 5:", climbStairs(5)); // 8
console.log("Steps 6:", climbStairs(6)); // 13

// 🌟 REAL-WORLD APPLICATIONS:

// 1. 🤖 ROBOTICS & AUTOMATION
function robotPathPlanning(floors) {
    // Robot can move 1 or 2 floors at a time
    // Calculate total possible paths
    return climbStairs(floors);
}

// 2. 💰 FINANCIAL PLANNING
function investmentStrategies(timeperiods) {
    // Investor can invest for 1 or 2 consecutive periods
    // Calculate total investment combinations
    return climbStairs(timeperiods);
}

// 3. 🏗️ CONSTRUCTION & ARCHITECTURE
function staircaseDesign(totalSteps) {
    // Calculate ways to arrange steps with 1 or 2 step risers
    return climbStairs(totalSteps);
}

// 4. 🎮 GAME DEVELOPMENT
function gamePathCounting(levels) {
    // Player can skip 1 or 2 levels
    // Calculate total ways to complete game
    return climbStairs(levels);
}

// 5. 📊 RESOURCE ALLOCATION
function taskScheduling(tasks) {
    // Worker can handle 1 or 2 tasks per time slot
    // Calculate scheduling combinations
    return climbStairs(tasks);
}

// 6. 🚗 TRANSPORTATION
function routeOptimization(stations) {
    // Vehicle can stop at every station or skip one
    // Calculate possible route combinations
    return climbStairs(stations);
}

// 7. 🏥 MEDICAL THERAPY
function therapyProgression(sessions) {
    // Patient can progress 1 or 2 levels per session
    // Calculate treatment path options
    return climbStairs(sessions);
}

// 8. 📱 USER INTERFACE
function menuNavigation(screens) {
    // User can navigate 1 or 2 screens forward
    // Calculate navigation possibilities
    return climbStairs(screens);
}

// 🔍 ALGORITHM ANALYSIS:
console.log("\n🔍 ALGORITHM ANALYSIS:");
console.log("Time Complexity: O(n)");
console.log("Space Complexity: O(1) - Space optimized!");
console.log("Pattern: Dynamic Programming (Bottom-up)");
console.log("Mathematical Base: Fibonacci Sequence");

// 📈 PERFORMANCE COMPARISON:
function performanceTest() {
    const testCases = [10, 20, 30, 40];
    
    testCases.forEach(n => {
        const start = performance.now();
        const result = climbStairs(n);
        const end = performance.now();
        
        console.log(`n=${n}: ${result} ways, Time: ${(end-start).toFixed(4)}ms`);
    });
}

// 🎯 PRACTICAL IMPLEMENTATION EXAMPLES:

// Example 1: Smart Home Automation
class SmartHomeController {
    calculateRoutineVariations(actions) {
        // Each routine can execute 1 or 2 actions simultaneously
        return climbStairs(actions);
    }
}

// Example 2: Delivery Optimization
class DeliveryService {
    calculateDeliveryPaths(stops) {
        // Driver can combine 1 or 2 nearby stops
        return climbStairs(stops);
    }
}

// Example 3: Learning Management System
class LearningPath {
    calculateStudyPlans(modules) {
        // Student can complete 1 or 2 modules per week
        return climbStairs(modules);
    }
}

// 🚀 REAL-WORLD USAGE SCENARIOS:
const realWorldExamples = {
    robotics: robotPathPlanning(8),          // 34 paths
    finance: investmentStrategies(6),        // 13 strategies
    construction: staircaseDesign(10),       // 89 designs
    gaming: gamePathCounting(7),             // 21 paths
    scheduling: taskScheduling(5),           // 8 combinations
    transport: routeOptimization(9),         // 55 routes
    medical: therapyProgression(4),          // 5 progressions
    ui: menuNavigation(6)                    // 13 navigation paths
};

console.log("\n🌟 REAL-WORLD APPLICATIONS RESULTS:");
Object.entries(realWorldExamples).forEach(([domain, count]) => {
    console.log(`${domain}: ${count} possible combinations`);
});

// 💡 KEY INSIGHTS:
console.log("\n💡 KEY INSIGHTS:");
console.log("• Pattern appears in many combinatorial problems");
console.log("• Efficient space-optimized dynamic programming");
console.log("• Scales well for practical applications");
console.log("• Foundation for more complex path-counting problems");

// Steps 1: 1
// Steps 2: 2
// Steps 3: 3
// Steps 4: 5
// Steps 5: 8
// Steps 6: 13

// 🔍 ALGORITHM ANALYSIS:
// Time Complexity: O(n)
// Space Complexity: O(1) - Space optimized!
// Pattern: Dynamic Programming (Bottom-up)
// Mathematical Base: Fibonacci Sequence

// 🌟 REAL-WORLD APPLICATIONS RESULTS:
// robotics: 34 possible combinations
// finance: 13 possible combinations
// construction: 89 possible combinations
// gaming: 21 possible combinations
// scheduling: 8 possible combinations
// transport: 55 possible combinations
// medical: 5 possible combinations
// ui: 13 possible combinations

// 💡 KEY INSIGHTS:
// • Pattern appears in many combinatorial problems
// • Efficient space-optimized dynamic programming
// • Scales well for practical applications
// • Foundation for more complex path-counting problems