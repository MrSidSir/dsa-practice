function maxSubArray(nums){
    let maxSum = nums[0], currSum = nums[0], start=0, end=0, s=0;
    for(let i=1; i<nums.length; i++){
        if(nums[i] > currSum + nums[i]){
            currSum = nums[i];
            s = i;
        } else {
            currSum += nums[i];
        }
    
    if(currSum > maxSum){
        maxSum = currSum;
        start = s;
        end = i;
    }
    }
    return {maxSum, start, end};
}
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
// Output: { maxSum: 6, start: 3, end: 6 } (subarray: [4,-1,2,1])

// 🔑 Key Point: Kadane’s algorithm, maintain start-end index