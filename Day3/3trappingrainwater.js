// [Q3] Trapping Rain Water
// 🔧 Key Point: Use leftMax, rightMax arrays.
function trap(height) {
    let n = height.length;
    let left = [], right  = [], water = 0;
    left[0] = height[0];
    for (let i = 1; i < n; i++) {
        left[i] = Math.max(left[i-1], height[i]);
    }
    right[n-1] = height[n-1];
    for (let i = n-2; i >=0; i--) {
        right[i] = Math.max(right[i+1], height[i]);
    }
    for (let i = 0; i < n; i++) {
        water += Math.min(left[i], right[i]) - height[i];
    }
    return water;
}
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))