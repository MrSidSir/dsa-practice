//[Q12] DP SOS (Sum over Subset)

/*
🔧 Problem: Calculate f(S) = sum of g(T) for all T ⊆ S efficiently.
📝 Key Point: Used in subset sum enumeration in O(n 2^n).
*/
function sos(f) {
    let n = f.length, logn = Math.log2(n);
    for (let i = 0; i < logn; i++) {
        for (let mask = 0; mask < n; mask++) {
            if (mask & (1 << i)) {
                f[mask] += f[mask ^ (1 << i)];
            }
        }
    }
     return f;
}
console.log(sos([1,2,3,4])); //example usage //[ 1, 3, 4, 10 ]

/*
💡 Explanation:
Dynamic programming over bitmasks for subset sums.
✅ Real use: Counting subset contributions, polynomial convolution.
*/