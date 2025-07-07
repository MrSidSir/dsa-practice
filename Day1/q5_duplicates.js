// Remove duplicates in-place (sorted array)
function removeDuplicates(arr) {
    if (arr.length == 0) return 0;
    let j = 0; 
    for (let i = 1;  i < arr.length; i++) {
        if (arr[i] !=arr[j]) {
            j++;
            arr[j] = arr[i];
        }
    }
    return j + 1;
}
console.log(removeDuplicates([1,1,2,2,3,4,4]));