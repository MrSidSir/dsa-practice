// Left rotate array by D places
function leftRotateByD(arr, d) {
    d = d % arr.length;
    let rotated = arr.slice(d).concat(arr.slice(0,d));
    return rotated;
}
console.log(leftRotateByD([1,2,,3,4,5],2)); 