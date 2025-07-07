function mergeSortedArrays(arr1, arr2) {
let merged = [];
let i = 0, j = 0;
while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
        merged.push(arr1[i]);
        i++;
    } else {
        merged.push(arr2[j]);
        j++;
    }
}
while (i < arr1.length) {
    merged.push(arr1[i]);
    j++;
}
while (j < arr2.length[j]) {
    merged.push(arr2[j]);
    j++;
}
return merged;

}
console.log(mergeSortedArrays([1,3,5], [2,4,6]));
    
