// Left rotate array by one place
function leftRotateByOne(arr) {
    let first = arr.shift();
    arr.push(first);
    return arr;
}
console.log(leftRotateByOne([1,2,3,4,5]));