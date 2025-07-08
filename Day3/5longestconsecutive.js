// Q5] Longest consecutive subsequence
// 🔧 Key Point: Use Set for O(n) solution.
function longestConsecutive(nums) {
    let set = new Set(nums);
    let maxLen = 0;
    for (let num of set) {
        if 
        (!set.has(num - 1)) {
            let current = num;
            let length = 1;

            while (set.has(current + 1)) {
                current++; 
                length++;
            }
            maxLen = Math.max(maxLen, length);
        }
    }
    return maxLen;
}
console.log(longestConsecutive([100,4,200,1,3,2]));