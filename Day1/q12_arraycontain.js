function containsElement(arr, target) {
    for (let num of arr) {
        if (num === target) return true;
}
return false;
}
console.log(containsElement([2,9,5,3], 5));
console.log(containsElement([2,9,5,3], 7));