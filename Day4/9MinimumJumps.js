function minJumps(arr){
    if(arr.length <=1) return 0;
    if(arr[0]==0) return -1;
    let maxReach = arr[0], steps = arr[0], jumps = 1;
    for(let i=1; i<arr.length; i++){
        if(i == arr.length-1) return jumps;

        maxReach = Math.max(maxReach, i + arr[i]);
        steps--;

        if(steps == 0){
            jumps++;
            if(i >= maxReach) return -1;
            steps = maxReach -i;
        }
    }
    return -1
}
console.log(minJumps([1,3,5,8,9,2,7,6,8,9]));
// 🔑 Key Point: Greedy, optimal O(n) solution