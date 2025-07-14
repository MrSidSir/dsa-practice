/* 🔧 EDIT DISTANCE ALGORITHM (Levenshtein Distance) 
   📝 Problem: Min operations to convert word1 to word2 
   🎯 Approach: Dynamic Programming (Bottom-Up) */

function minDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    
    // Step 1: Create 2D DP table (m+1 x n+1)
    // dp[i][j] = min operations to convert word1[0...i-1] to word2[0...j-1]
    const dp = Array.from({ length: m + 1}, () => Array(n + 1).fill(0));
    
    // Step 2: Initialize base cases
    // Converting empty string to word2[0...j-1] requires j insertions
    for (let i = 0; i <= m; i++) dp[i][0] = i; // Delete all i characters
    for (let j = 0; j <= n; j++) dp[0][j] = j; // Insert all j characters
    
    // Step 3: Fill DP table using recurrence relation
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // Case 1: Characters match - no operation needed
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // Take diagonal value
            }
            // Case 2: Characters don't match - try all 3 operations
            else {
                dp[i][j] = 1 + Math.min(
                    dp[i-1][j],     // Delete from word1
                    dp[i][j-1],     // Insert into word1
                    dp[i-1][j-1]    // Replace in word1
                );
            }
        }
    }
    
    // Step 4: Return result from bottom-right cell
    return dp[m][n];
}

/* 🔄 ALGORITHM WORKFLOW:
   1. Create (m+1) x (n+1) matrix where m=len(word1), n=len(word2)
   2. Initialize first row: [0,1,2,3...n] (insert operations)
   3. Initialize first column: [0,1,2,3...m] (delete operations)
   4. For each cell dp[i][j]:
      - If characters match: dp[i][j] = dp[i-1][j-1]
      - If don't match: dp[i][j] = 1 + min(left, top, diagonal)
   5. Final answer at dp[m][n]
*/

// Test example
console.log(minDistance("horse", "ros")); // Output: 3

/* 📊 DP TABLE VISUALIZATION for "horse" → "ros":
       ""  r  o  s
    "" 0   1  2  3
    h  1   1  2  3
    o  2   2  1  2
    r  3   2  2  2
    s  4   3  3  2
    e  5   4  4  3
    
   Operations: h→r (replace), delete o, delete r, delete s, delete e = 3 operations
*/

/* 🌍 REAL-WORLD APPLICATIONS:
   ✅ Spell Check: Suggest corrections for misspelled words
   ✅ DNA Sequence Alignment: Compare genetic sequences
   ✅ Plagiarism Detection: Find text similarities
   ✅ Version Control: Git diff algorithms
   ✅ Search Engines: Fuzzy search and autocomplete
   ✅ Machine Translation: Align source and target text
   ✅ Data Deduplication: Find similar records in databases
*/

/* ⚡ COMPLEXITY ANALYSIS:
   Time: O(m × n) - fill entire DP table
   Space: O(m × n) - store DP table
   Can be optimized to O(min(m,n)) space using rolling array
*/