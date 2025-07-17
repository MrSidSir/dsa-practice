// [Q8] Bitmask DP – Travelling Salesman Problem

/*
🔧 Problem: Find minimum cost to visit all cities exactly once returning to start.
📝 Key Point: DP + Bitmask to represent visited cities.
*/
function tsp(graph) {
    const n = graph.length;
    const dp = Array(1 << n).fill(null).map(() => Array(n).fill(Infinity));
    dp[1][0] = 0; // start at city 0 with only city 0 visited

    for (let mask = 1; mask < (1<< n); mask++) {
        for (let u = 0; u < n; u++) {
        if (!(mask & (1 << u))) continue;
        for (let v = 0; v < n; v++)  {
            if (mask & (1 << v)) continue;
            dp[mask | (1 << v)] [v] = Math.min(dp[mask | ( 1 << v)][v], dp[mask][u] + graph[u][v]);
        }
        }
    }
    let res = Infinity;
    for (let u = 1; u < n; u++) {
        res = Math.min(res, dp[(1 << n) - 1][u] + graph[u][0]);
    }
    return res;
}
let graph = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
];

console.log("TSP Minimum Cost:", tsp(graph)); //TSP Minimum Cost: 80

/*
💡 Explanation:
dp[mask][i]: min cost to reach i with visited mask.
✅ Real use: Route optimization in logistics, robotics path planning.
*/