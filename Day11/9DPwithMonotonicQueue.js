//  [Q9] DP with Monotonic Queue Optimization
/*
🔧 Problem: Sliding Window Maximum Sum with DP
📝 Key Point: Use deque to maintain max in window efficiently.
*/

function maxSumSlidingWindow(nums, k)  {
    const n = nums.length;
    const dp = Array(n).fill(0);
    const deque = []; //stores  indices

    for (let i = 0; i < n; i++) {
        if (deque.length && deque[0] < i - k) deque.shift();
        while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();
        deque.push(i);
        dp[i] = nums[deque[0]];
    }
    return dp;
}
console.log(maxSumSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); //[
//   1, 3, 3, 3,
//   5, 5, 6, 7
// ]

/*
💡 Explanation:
Maintains decreasing deque for sliding window max in O(n).
✅ Real use: Stock analysis, dynamic range maximum queries.
*/