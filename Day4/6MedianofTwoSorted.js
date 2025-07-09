//  Brute Force Code
// Merge both arrays and find median
function findMedianSortedArrays(nums1, nums2) {
    let merged = nums1.concat(nums2).sort((a,b)=>a-b);
    let  n = merged.length;
    if(n%2 === 0){
return (merged[n/2 -1] + merged[n/2])/2;
    } else {
        return merged[Math.floor(n/2)];
    }
}

console.log(findMedianSortedArrays([1,3],[2]));   
console.log(findMedianSortedArrays([1,2],[3,4])); 
// 🔑 Key Point: Brute force O((m+n)log(m+n)) due to sorting