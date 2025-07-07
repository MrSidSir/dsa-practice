function averageArray(arr) {
    if (arr.length === 0) return 0;
    let sum = 0;
    for (let num of arr) {
        sum += num;
    }
    return sum 
    /
    arr.length;
}
console.log(averageArray([2,9,5,3]));