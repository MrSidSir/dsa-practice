// ### [Q7] Sort 0s,1s,2s without sorting algo (Dutch National Flag)

function sortColors(nums) {
    let low = 0, mid =0, high = nums.length -1;
    while(mid <= high){
        if(nums[mid] == 0){
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++; mid++;
        } else if(nums[mid] == 1){
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
    return nums;
}
console.log(sortColors([2,0,2,1,1,0]));
// 🔑 Key Point: Three pointers approach, O(n) time, O(1) space