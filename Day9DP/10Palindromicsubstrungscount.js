// 🌟 [Q10] Palindromic Substrings Count
// 🔧 Problem: Count all palindromic substrings.
function countSubstrings(s) {
    let count = 0;

     // Check every possible center point for palindromes
     for(let i = 0; i < s.length; i++) {
       // Count odd-length palindromes (center at i)
       count += expand(s, i, i); 
    //    Count even-length palindromes (center between i and i+1)
    count += expand(s, i, i+1);
     }
     return count;
     // Helper function: expand from center and count palindromes
     function expand(s, left, right){
        let cnt = 0;
        // Expand outward while characters match
        while(left >= 0 && right < s.length && s[left] == s[right]) {
            cnt++; // Found a palindrome
            left--; // Move left pointer outward
            right++; // Move right pointer outward


        }
        return cnt;
     }
}
// Test case
console.log("Total palindromic substrings in 'aaa':", countSubstrings("aaa"));

// ouput :- Total palindromic substrings in 'aaa': 6


/*
🔍 How it works:
- Uses "expand around center" technique
- Each position can be center of odd-length palindrome
- Each pair of positions can be center of even-length palindrome
- Expands outward until characters don't match

⚡ Time Complexity: O(n²) - worst case when string is all same characters
💾 Space Complexity: O(1) - only using few variables

🌍 Real-world applications:
✅ DNA sequence analysis - finding palindromic sequences (restriction sites)
✅ Text processing - detecting symmetrical patterns in documents
✅ Bioinformatics - identifying reverse complement sequences
✅ Data compression - finding repeating patterns
✅ Pattern recognition - symmetric feature detection
✅ Cybersecurity - detecting suspicious palindromic patterns in code
*/
