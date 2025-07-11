// Edit Distance (Levenshtein Distance) Algorithm
// 🎯 Problem: Find minimum operations to convert word1 to word2
// Operations: Insert, Delete, Replace

function minDistance(word1, word2) {
    let m = word1.length, n = word2.length;
    
    // Create DP table: dp[i][j] = min operations to convert word1[0...i-1] to word2[0...j-1]
    let dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    
    // Base cases:
    // Converting empty string to word2[0...j-1] requires j insertions
    for(let j = 0; j <= n; j++) dp[0][j] = j;
    
    // Converting word1[0...i-1] to empty string requires i deletions
    for(let i = 0; i <= m; i++) dp[i][0] = i;
    
    // Fill the DP table
    for(let i = 1; i <= m; i++) {
        for(let j = 1; j <= n; j++) {
            if(word1[i-1] == word2[j-1]) {
                // Characters match, no operation needed
                dp[i][j] = dp[i-1][j-1];
            } else {
                // Characters don't match, try all 3 operations and take minimum
                dp[i][j] = 1 + Math.min(
                    dp[i-1][j-1],  // Replace: word1[i-1] with word2[j-1]
                    dp[i-1][j],    // Delete: word1[i-1]
                    dp[i][j-1]     // Insert: word2[j-1] at position i
                );
            }
        }
    }
    
    return dp[m][n];
}

// Enhanced version with operation tracking
function minDistanceWithPath(word1, word2) {
    let m = word1.length, n = word2.length;
    let dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    let operations = [];
    
    // Base cases
    for(let j = 0; j <= n; j++) dp[0][j] = j;
    for(let i = 0; i <= m; i++) dp[i][0] = i;
    
    // Fill DP table
    for(let i = 1; i <= m; i++) {
        for(let j = 1; j <= n; j++) {
            if(word1[i-1] == word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    // Backtrack to find operations
    let i = m, j = n;
    while(i > 0 && j > 0) {
        if(word1[i-1] == word2[j-1]) {
            i--; j--;
        } else if(dp[i][j] == dp[i-1][j-1] + 1) {
            operations.unshift(`Replace '${word1[i-1]}' with '${word2[j-1]}' at position ${i-1}`);
            i--; j--;
        } else if(dp[i][j] == dp[i-1][j] + 1) {
            operations.unshift(`Delete '${word1[i-1]}' at position ${i-1}`);
            i--;
        } else {
            operations.unshift(`Insert '${word2[j-1]}' at position ${i}`);
            j--;
        }
    }
    
    // Handle remaining characters
    while(i > 0) {
        operations.unshift(`Delete '${word1[i-1]}' at position ${i-1}`);
        i--;
    }
    while(j > 0) {
        operations.unshift(`Insert '${word2[j-1]}' at position 0`);
        j--;
    }
    
    return { distance: dp[m][n], operations };
}

// Test cases
console.log("=== Basic Edit Distance ===");
console.log("horse → ros:", minDistance("horse", "ros"));
console.log("intention → execution:", minDistance("intention", "execution"));
console.log("sunday → saturday:", minDistance("sunday", "saturday"));

console.log("\n=== With Operation Details ===");
let result1 = minDistanceWithPath("horse", "ros");
console.log("horse → ros:");
console.log("Distance:", result1.distance);
console.log("Operations:", result1.operations);

let result2 = minDistanceWithPath("cat", "dog");
console.log("\ncat → dog:");
console.log("Distance:", result2.distance);
console.log("Operations:", result2.operations);

// Real-world applications
console.log("\n=== Real-world Applications ===");

// 1. Spell Checker
function spellChecker(word, dictionary) {
    let suggestions = [];
    for(let dictWord of dictionary) {
        let distance = minDistance(word, dictWord);
        if(distance <= 2) { // Threshold for suggestions
            suggestions.push({word: dictWord, distance});
        }
    }
    return suggestions.sort((a, b) => a.distance - b.distance);
}

let dictionary = ["hello", "world", "programming", "algorithm", "computer"];
console.log("Spell check for 'progamming':", spellChecker("progamming", dictionary));

// 2. DNA Sequence Alignment
function dnaAlignment(seq1, seq2) {
    return minDistance(seq1, seq2);
}

console.log("DNA alignment distance:", dnaAlignment("ATCG", "AGTC"));

// 3. Text Similarity
function textSimilarity(text1, text2) {
    let maxLen = Math.max(text1.length, text2.length);
    let distance = minDistance(text1, text2);
    return ((maxLen - distance) / maxLen * 100).toFixed(2) + "%";
}

console.log("Text similarity:", textSimilarity("hello world", "helo wrld"));

// 4. Auto-complete/Search suggestions
function searchSuggestions(query, items, maxDistance = 2) {
    return items
        .map(item => ({item, distance: minDistance(query.toLowerCase(), item.toLowerCase())}))
        .filter(result => result.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance)
        .map(result => result.item);
}

let products = ["iPhone", "iPad", "MacBook", "iMac", "iPod"];
console.log("Search suggestions for 'iPhon':", searchSuggestions("iPhon", products));

/*
🧠 Algorithm Explanation:

1. **Dynamic Programming Approach**:
   - dp[i][j] = minimum operations to convert word1[0...i-1] to word2[0...j-1]
   - Base cases: dp[0][j] = j (insertions), dp[i][0] = i (deletions)

2. **Three Operations**:
   - Replace: dp[i-1][j-1] + 1 (if characters don't match)
   - Delete: dp[i-1][j] + 1 (remove from word1)
   - Insert: dp[i][j-1] + 1 (add to word1)

3. **Time Complexity**: O(m * n) where m, n are string lengths
4. **Space Complexity**: O(m * n) for the DP table

🌍 Real-world Applications:

1. **Spell Checkers**: Find closest dictionary words
2. **DNA Sequencing**: Compare genetic sequences
3. **Search Engines**: Fuzzy search and autocomplete
4. **Version Control**: Git diff algorithms
5. **Plagiarism Detection**: Compare text similarity
6. **Data Deduplication**: Find similar records
7. **OCR Error Correction**: Fix optical character recognition errors
8. **Machine Translation**: Align source and target text
9. **File Comparison**: Tools like diff, merge
10. **Natural Language Processing**: Text preprocessing and cleaning

💡 Key Insight: This algorithm forms the foundation for many text processing
and bioinformatics applications where measuring "difference" is crucial.
*/

// output:-=== Basic Edit Distance ===
// horse → ros: 3
// intention → execution: 5
// sunday → saturday: 3

// === With Operation Details ===
// horse → ros:
// Distance: 3
// Operations: [
//   "Replace 'h' with 'r' at position 0",
//   "Delete 'r' at position 2",
//   "Delete 'e' at position 4"
// ]

// cat → dog:
// Distance: 3
// Operations: [
//   "Replace 'c' with 'd' at position 0",
//   "Replace 'a' with 'o' at position 1",
//   "Replace 't' with 'g' at position 2"
// ]

// === Real-world Applications ===
// Spell check for 'progamming': [ { word: 'programming', distance: 1 } ] 
// DNA alignment distance: 2
// Text similarity: 81.82%
// Search suggestions for 'iPhon': [ 'iPhone', 'iPod' ]
// PS C:\Users\irsha\OneDrive\Desktop\dsa> 