function findMin(arr){
    let min = arr[0];
    for (i=1; i < arr.length; i++) {
     if (arr[i] < min) {
        min = arr[i];
     }
     return min;
    }
}
console.log(findMin([2,9,5,3]));