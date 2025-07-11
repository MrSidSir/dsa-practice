
// 🔧 Problem: Number of ways to decode digit string
// Real World Applications: Data Compression, Cryptography, Bioinformatics, NLP
function numDecodings(s){
    // Edge case: String starting with '0' cannot be decoded
    if(s[0] === '0') return 0;

    // DP array: dp[i] = number of ways to decode string up to position i
    let dp = [1,1];  // dp[0]=1 (empty string), dp[1]=1 (first char)

    // Process each position from 2 to string length
    for(let i = 2; i <= s.length; i++) {
        dp[i] = 0; // Initialize current position

        // Case 1: Single digit decoding
        // Check if current digit (s[i-1]) is not '0'
        if(s[i-1] = '0') {
            dp[i] += dp[i-1];  // Add ways from previous position
        }
        // Case 2: Two digit decoding (10-26 are valid)
    // Check if two-digit number is valid (10-19 or 20-26)
if(s[i-2] === '1' || (s[i-2] === '2' && '0123456'.includes(s[i-1]))) {
   dp[i] += dp[i-2];  // Add ways from two positions back
}
    }
     return dp[s.length];
}
// Test cases with explanations
console.log("=== DECODE WAYS ALGORITHM ===");
console.log("Decoding way for '226:", numDecodings("102"));
// '226' can be decoded as: "2-2-6"(BBF), "22-6"(VF), "2-26"(BZ) = 3 ways

console.log("Decoding ways for '12:", numDecodings("12"));
// '12' can be decoded as: "1-2"(AB), "12"(L) = 2 ways

console.log("Decoding ways  for  '102:", numDecodings("102"));
// '102' can be decoded as: "10-2"(JB) = 1 way

console.log("Decoding ways for '027':", numDecodings("027"));
// '027' cannot be decoded (starts with 0) = 0 ways

//output:- === DECODE WAYS ALGORITHM ===
// Decoding way for '226: 2
// Decoding ways for '12: 2
// Decoding ways  for  '102: 2
// Decoding ways for '027': 0

/*
💡 REAL WORLD APPLICATIONS:

1. DATA COMPRESSION & DECOMPRESSION
   - Huffman coding uses variable-length codes
   - Example: "001101" might have multiple interpretations
   - Used in: ZIP files, JPEG compression, video codecs

2. CRYPTOGRAPHY & SECURITY
   - Encrypted messages may have multiple valid decryptions
   - Steganography: hidden messages in digital media
   - Used in: Secure communications, digital signatures

3. BIOINFORMATICS
   - DNA/RNA sequences to amino acid translation
   - Genetic codes have multiple reading frames
   - Used in: Gene sequencing, protein structure prediction

4. NATURAL LANGUAGE PROCESSING
   - Text segmentation without spaces
   - Example: "thisisatest" → "this is a test"
   - Used in: Chinese/Japanese text processing, spell checkers

5. BARCODE & QR CODE SYSTEMS
   - Error correction and redundancy handling
   - Multiple valid interpretations for damaged codes
   - Used in: Retail systems, inventory management

6. TELECOMMUNICATIONS
   - Signal decoding in noisy channels
   - Multiple possible bit interpretations
   - Used in: Mobile networks, satellite communications

7. AUDIO/VIDEO CODECS
   - Frame reconstruction from compressed data
   - Multiple reconstruction possibilities
   - Used in: MP3, H.264, streaming services

ALGORITHM COMPLEXITY:
- Time Complexity: O(n) where n is string length
- Space Complexity: O(n) for DP array
- Can be optimized to O(1) space using two variables

WORKING MECHANISM:
- Uses Dynamic Programming bottom-up approach
- Each position depends on previous 1 or 2 characters
- Builds solution incrementally from smaller subproblems
*/
