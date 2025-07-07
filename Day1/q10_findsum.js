// Find Sum of All Elements
function sumArray(arr) {
let sum = 0;
for (let num of arr) {
    sum += num;
}
return sum;
}
console.log(sumArray([2,9,5,3]));
