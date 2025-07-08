// ### [Q1] Find subarray with given sum (positive numbers only)
// 🔧 Key Point: Sliding window approach for positive integers.
function subarraySum(arr, sum) {
    let curr_sum = arr[0], start = 0;
    for (let i = 1; i <= arr.length; i++) {
        while (curr_sum > sum && start < i - 1) {
            curr_sum -= arr[start];
            start++;
        }
        if (curr_sum === sum ) {
            return arr.slice(start, i);
        }
        if (i < arr.length) curr_sum += arr[i];
    }
    return[];
}
console.log(subarraySum([1,4,20,3,10,5],33));