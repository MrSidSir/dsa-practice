function moveZeros(arr) {
    let count = 0;
    for (i=0; i< arr.length; i++) {
        if (arr[i] != 0) {
            arr[count++] = arr[i];
        }
    }
    while (count < arr.length) {
        arr[count++] = 0;
    }
    return arr;
}
console.log(moveZeros([0,1,0,3,12]));