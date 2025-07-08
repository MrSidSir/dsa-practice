// [Q4] Maximum product subarray
// 🔧 Key Point: Track min and max because negative * negative becomes positive.
function maxProduct(nums) {
    let maxProd = nums [0], minTemp = nums[0], maxTemp = nums [0];
    for ( let i = 1; i < nums.length; i++) {
        if (nums[i] < 0) [minTemp, maxTemp] = [maxTemp, minTemp];
        maxTemp = Math.max(nums[i], nums[i] * maxTemp);
        minTemp = Math.min(nums[i], nums[i] * minTemp);
        maxProd = Math.max(maxProd, maxTemp);

    }
    return maxProd;
}
console.log(maxProduct([2,3,-2,4]));