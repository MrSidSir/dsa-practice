// Find Missing Number (1 to N)
function findMissingNumber(arr , n) {
    let total = (n * (n+1)) / 2;
    let sum = 0;
    for (let num of arr) {
        sum += num;

    }
    return total - sum;
}
console.log(findMissingNumber([1,2,4,5,6], 6));