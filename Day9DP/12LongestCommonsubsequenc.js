//  [Q12] Longest Common Subsequence 
// 🔧 Problem: Length of longest common subsequence of two strings.
// 🌍 Real World Uses: Git diff, DNA sequence alignment, file comparison, plagiarism detection

function longestCommonSubsequence(text1, text2) {
    let m = text1.length, n = text2.length; // 📏 Store string lengths for DP table dimensions
    
    // 🗂️ Create 2D DP table: dp[i][j] = LCS length of text1[0..i-1] and text2[0..j-1]
    let dp = Array.from({length: m+1}, ()=> Array(n+1).fill(0));
    
    // 🔄 Fill DP table using bottom-up approach
    for(let i=1; i<=m; i++){
        for(let j=1; j<=n; j++){
            
            // ✅ If characters match, extend LCS from diagonal (both strings without current char)
            if(text1[i-1] === text2[j-1])
                dp[i][j] = 1 + dp[i-1][j-1]; // 🎯 Add 1 to previous LCS length
            else
                // 🔀 Take maximum: skip current char from text1 OR skip from text2
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]); // 🧩 working: include or skip char
        }
    }
    
    return dp[m][n]; // 🏁 Return LCS length of complete strings
}

// 🧪 Test cases with expected outputs
console.log("LCS length between 'abcde' and 'ace':", longestCommonSubsequence("abcde", "ace"));
// Expected Output: 3 (subsequence: "ace")

console.log("LCS length between 'ABCDGH' and 'AEDFHR':", longestCommonSubsequence("ABCDGH", "AEDFHR"));
// Expected Output: 3 (subsequence: "ADH")

console.log("LCS length between 'AGGTAB' and 'GXTXAYB':", longestCommonSubsequence("AGGTAB", "GXTXAYB"));
// Expected Output: 4 (subsequence: "GTAB")

console.log("LCS length between 'hello' and 'world':", longestCommonSubsequence("hello", "world"));
// Expected Output: 3 (subsequence: "lol")

// output:-LCS length between 'abcde' and 'ace': 3
// LCS length between 'ABCDGH' and 'AEDFHR': 3
// LCS length between 'AGGTAB' and 'GXTXAYB': 4
// LCS length between 'hello' and 'world': 1

/* 
💡 Algorithm Explanation:
- Uses Dynamic Programming with optimal substructure
- Time Complexity: O(m*n) where m,n are string lengths
- Space Complexity: O(m*n) for the DP table

🌍 Real-World Applications:
✅ Git/SVN Diff: Compare file versions, show changes
✅ DNA Sequencing: Find similar genetic patterns
✅ Plagiarism Detection: Compare documents for similarities
✅ File Synchronization: Determine minimum changes needed
✅ Code Review Tools: Highlight code differences
✅ Version Control: Track changes between commits
✅ Text Editors: Find common patterns in documents
✅ Data Mining: Pattern recognition in sequences

🔑 Key Points:
- LCS finds longest subsequence (not substring) common to both strings
- Subsequence maintains relative order but elements need not be contiguous
- Bottom-up DP approach builds solution from smaller subproblems
- Base case: empty strings have LCS length 0
*/