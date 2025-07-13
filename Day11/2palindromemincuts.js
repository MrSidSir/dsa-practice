/* 🔧 Problem: Minimum cuts to partition string into palindromes 
📝 Key Point: DP + palindrome checking */

function minCut(s) {
    const n = s.length;
    const cut = Array(n).fill(0);
    const pal = Array.from({ length: n}, () => Array(n).fill(false));
    
    for (let i = 0; i < n; i++) {
        let min = i;
        for (let j = 0; j <= i; j++) {
            if (s[j] === s[i] && (i - j < 2 || pal[j + 1][i-1])) {
                pal[j][i] = true;
                min = j === 0 ? 0 : Math.min(min, cut[j - 1] + 1);
            }
        }
        cut[i] = min;
    }
    
    return cut[n - 1];
}

console.log(minCut("aab"));  // Output: 1

/* 
Code Workflow:
1. Initialize cut[] array - stores min cuts for each position
2. Initialize pal[][] 2D array - tracks palindrome substrings
3. For each position i, check all possible starting positions j
4. If s[j..i] is palindrome, update cut[i] with minimum cuts
5. Return cut[n-1] as final answer

Real World Applications:
- Text compression algorithms
- DNA sequence analysis for finding repetitive patterns
- Natural Language Processing tokenization
- Data deduplication in storage systems
- Pattern matching in bioinformatics
*/