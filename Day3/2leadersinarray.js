// [Q2] Find leaders in array
// 🔧 Key Point: Traverse from right, keep track of max.
function findLeaders(arr) {
    let n = arr.length;
    let max = arr[n-1];
    let leaders = [max];
    for (let i = n-2; i >= 0; i--) {
        if (arr[i] > max) {
            max = arr[i];
            leaders.push(max);
        }
        return leaders.reverse();
    }
}
console.log(findLeaders([16,17,4,3,5,2]));