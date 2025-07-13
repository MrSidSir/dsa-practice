/*
EXPAND AROUND CENTERS - PALINDROME DETECTION ALGORITHM
=====================================================

🔍 ALGORITHM OVERVIEW:
- Har possible center se expand karke palindromes dhundhta hai
- Odd aur even length palindromes dono handle karta hai
- Time Complexity: O(n²), Space Complexity: O(1)

💡 CORE WORKFLOW:
1. Har character ko center maan kar expand karo (odd length)
2. Har adjacent pair ko center maan kar expand karo (even length)
3. Left aur right pointers ko expand karte jao jab tak match kare
4. Longest palindrome track karo

🧬 REAL-WORLD APPLICATIONS:
- DNA Sequence Analysis (palindromic sequences detection)
- Data Compression (symmetry patterns)
- Text Processing (pattern matching)
- Bioinformatics (restriction enzyme sites)
- String Matching Algorithms
*/

function expandAroundCenters(s) {
    /**
     * 🎯 MAIN FUNCTION: Longest palindromic substring dhundhta hai
     * 
     * WORKFLOW:
     * 1. Empty string check
     * 2. Har position pe odd/even length palindromes check karo
     * 3. Maximum length palindrome return karo
     */
    if (!s || s.length === 0) {
        return "";
    }
    
    let start = 0;
    let maxLen = 0;
    
    console.log(`🔍 Input String: '${s}'`);
    console.log(`📏 String Length: ${s.length}`);
    console.log("\n" + "=".repeat(60));
    
    for (let i = 0; i < s.length; i++) {
        // Component 1: ODD LENGTH PALINDROMES (single center)
        let oddLen = expandFromCenter(s, i, i);
        console.log(`🔸 Center at index ${i} ('${s[i]}'): Odd length palindrome = ${oddLen}`);
        
        // Component 2: EVEN LENGTH PALINDROMES (two centers)
        let evenLen = expandFromCenter(s, i, i + 1);
        console.log(`🔹 Center between ${i}-${i+1}: Even length palindrome = ${evenLen}`);
        
        // Component 3: MAXIMUM TRACKING
        let currentMax = Math.max(oddLen, evenLen);
        if (currentMax > maxLen) {
            maxLen = currentMax;
            start = i - Math.floor((currentMax - 1) / 2);
            console.log(`✅ NEW MAXIMUM FOUND: Length = ${maxLen}, Starting at index ${start}`);
        }
        
        console.log("-".repeat(40));
    }
    
    let result = s.substring(start, start + maxLen);
    console.log(`\n🎉 FINAL RESULT: '${result}' (Length: ${maxLen})`);
    return result;
}

function expandFromCenter(s, left, right) {
    /**
     * 🔄 EXPANSION FUNCTION: Center se expand karke palindrome length nikalta hai
     * 
     * PROCESS:
     * 1. Left aur right pointers set karo
     * 2. Characters match karte tak expand karo
     * 3. Final length return karo
     */
    let expansionSteps = 0;
    
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        expansionSteps++;
        console.log(`   🔄 Step ${expansionSteps}: s[${left}]='${s[left]}' == s[${right}]='${s[right]}' ✓`);
        left--;
        right++;
    }
    
    let palindromeLength = right - left - 1;
    if (palindromeLength > 0) {
        let palindromeText = s.substring(left + 1, right);
        console.log(`   📝 Found palindrome: '${palindromeText}' (Length: ${palindromeLength})`);
    }
    
    return palindromeLength;
}

// 🧬 DNA SEQUENCE ANALYSIS EXAMPLE
function dnaAnalysis(dnaSequence) {
    /**
     * 🧬 DNA ANALYSIS: Palindromic sequences ko detect karta hai
     * - Restriction enzyme sites detection
     * - Hairpin loop structures
     */
    console.log("\n🧬 DNA PALINDROME ANALYSIS");
    console.log("=".repeat(50));
    console.log(`DNA Sequence: ${dnaSequence}`);
    
    let palindromes = [];
    
    for (let i = 0; i < dnaSequence.length; i++) {
        // Check odd length palindromes
        let oddLen = expandFromCenterSimple(dnaSequence, i, i);
        if (oddLen >= 4) { // Minimum biological significance
            let start = i - Math.floor((oddLen - 1) / 2);
            palindromes.push({
                sequence: dnaSequence.substring(start, start + oddLen),
                start: start,
                length: oddLen
            });
        }
        
        // Check even length palindromes
        let evenLen = expandFromCenterSimple(dnaSequence, i, i + 1);
        if (evenLen >= 4) {
            let start = i - Math.floor((evenLen - 2) / 2);
            palindromes.push({
                sequence: dnaSequence.substring(start, start + evenLen),
                start: start,
                length: evenLen
            });
        }
    }
    
    console.log(`\n🔍 Found ${palindromes.length} significant palindromes:`);
    palindromes.forEach(p => {
        console.log(`   📍 Position ${p.start}: '${p.sequence}' (Length: ${p.length})`);
    });
    
    return palindromes;
}

function expandFromCenterSimple(s, left, right) {
    /* Simplified expansion without debug prints */
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

// 📊 DATA COMPRESSION SYMMETRY EXAMPLE
function compressionSymmetryAnalysis(data) {
    /**
     * 📊 DATA COMPRESSION: Symmetry patterns detect karta hai
     * - Redundancy identification
     * - Pattern-based compression opportunities
     */
    console.log("\n📊 DATA COMPRESSION SYMMETRY ANALYSIS");
    console.log("=".repeat(50));
    console.log(`Data: ${data}`);
    
    let symmetryPatterns = [];
    
    for (let i = 0; i < data.length; i++) {
        // Find palindromic patterns
        for (let j = i + 1; j <= data.length; j++) {
            let substring = data.substring(i, j);
            if (substring.length >= 3 && isPalindrome(substring)) {
                let compressionRatio = ((substring.length - 1) / substring.length) * 100;
                symmetryPatterns.push({
                    pattern: substring,
                    start: i,
                    ratio: compressionRatio
                });
            }
        }
    }
    
    console.log(`\n🔍 Symmetry patterns found:`);
    symmetryPatterns.forEach(p => {
        console.log(`   📍 Position ${p.start}: '${p.pattern}' (Compression potential: ${p.ratio.toFixed(1)}%)`);
    });
    
    return symmetryPatterns;
}

function isPalindrome(s) {
    /* Check if string is palindrome */
    return s === s.split('').reverse().join('');
}

// 🧪 TESTING & DEMONSTRATION
function main() {
    console.log("🚀 PALINDROME DETECTION ALGORITHM DEMONSTRATION");
    console.log("=".repeat(60));
    
    // Test Case 1: Basic palindrome
    let testString = "babad";
    console.log(`\n📝 TEST CASE 1: Basic String`);
    let result1 = expandAroundCenters(testString);
    
    // Test Case 2: DNA sequence
    let dnaSeq = "GAATTCGAATTC"; // Contains EcoRI restriction sites
    dnaAnalysis(dnaSeq);
    
    // Test Case 3: Data compression
    let dataString = "abccbaxyzzyx";
    compressionSymmetryAnalysis(dataString);
    
    // Algorithm Components Summary
    console.log("\n🔧 ALGORITHM COMPONENTS:");
    console.log("=".repeat(40));
    console.log("1. 🎯 Center Selection: Har possible center choose karo");
    console.log("2. 🔄 Expansion Process: Left-right pointers expand karo");
    console.log("3. 📏 Length Tracking: Maximum palindrome length maintain karo");
    console.log("4. 🎪 Dual Mode: Odd aur even length palindromes handle karo");
    console.log("5. 📊 Result Extraction: Final palindrome substring extract karo");
    
    console.log("\n🌟 REAL-WORLD APPLICATIONS:");
    console.log("=".repeat(40));
    console.log("🧬 Bioinformatics: DNA restriction enzyme site detection");
    console.log("📊 Data Compression: Symmetry pattern identification");
    console.log("🔍 Text Processing: Pattern matching algorithms");
    console.log("🧮 Algorithm Design: Substring matching optimizations");
    console.log("🔬 Research: Sequence analysis in computational biology");
}

// 🚀 ALGORITHM EXECUTION
main();

// 💡 ADDITIONAL UTILITY FUNCTIONS
function quickTest(str) {
    console.log(`\n⚡ QUICK TEST: "${str}"`);
    let result = expandAroundCenters(str);
    console.log(`Result: "${result}"`);
    return result;
}

// Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        expandAroundCenters,
        dnaAnalysis,
        compressionSymmetryAnalysis,
        quickTest
    };
}

// 🚀 PALINDROME DETECTION ALGORITHM DEMONSTRATION
// ============================================================

// 📝 TEST CASE 1: Basic String
// 🔍 Input String: 'babad'
// 📏 String Length: 5

// ============================================================
//    🔄 Step 1: s[0]='b' == s[0]='b' ✓
//    📝 Found palindrome: 'b' (Length: 1)
// 🔸 Center at index 0 ('b'): Odd length palindrome = 1
// 🔹 Center between 0-1: Even length palindrome = 0
// ✅ NEW MAXIMUM FOUND: Length = 1, Starting at index 0
// ----------------------------------------
//    🔄 Step 1: s[1]='a' == s[1]='a' ✓
//    🔄 Step 2: s[0]='b' == s[2]='b' ✓
//    📝 Found palindrome: 'bab' (Length: 3)
// 🔸 Center at index 1 ('a'): Odd length palindrome = 3
// 🔹 Center between 1-2: Even length palindrome = 0
// ✅ NEW MAXIMUM FOUND: Length = 3, Starting at index 0
// ----------------------------------------
//    🔄 Step 1: s[2]='b' == s[2]='b' ✓
//    🔄 Step 2: s[1]='a' == s[3]='a' ✓
//    📝 Found palindrome: 'aba' (Length: 3)
// 🔸 Center at index 2 ('b'): Odd length palindrome = 3
// 🔹 Center between 2-3: Even length palindrome = 0
// ----------------------------------------
//    🔄 Step 1: s[3]='a' == s[3]='a' ✓
//    📝 Found palindrome: 'a' (Length: 1)
// 🔸 Center at index 3 ('a'): Odd length palindrome = 1
// 🔹 Center between 3-4: Even length palindrome = 0
// ----------------------------------------
//    🔄 Step 1: s[4]='d' == s[4]='d' ✓
//    📝 Found palindrome: 'd' (Length: 1)
// 🔸 Center at index 4 ('d'): Odd length palindrome = 1
// 🔹 Center between 4-5: Even length palindrome = 0
// ----------------------------------------

// 🎉 FINAL RESULT: 'bab' (Length: 3)

// 🧬 DNA PALINDROME ANALYSIS
// ==================================================
// DNA Sequence: GAATTCGAATTC

// 🔍 Found 0 significant palindromes:

// 📊 DATA COMPRESSION SYMMETRY ANALYSIS
// ==================================================
// Data: abccbaxyzzyx

// 🔍 Symmetry patterns found:
//    📍 Position 0: 'abccba' (Compression potential: 83.3%)
//    📍 Position 1: 'bccb' (Compression potential: 75.0%)
//    📍 Position 6: 'xyzzyx' (Compression potential: 83.3%)
//    📍 Position 7: 'yzzy' (Compression potential: 75.0%)

// 🔧 ALGORITHM COMPONENTS:
// ========================================
// 1. 🎯 Center Selection: Har possible center choose karo
// 2. 🔄 Expansion Process: Left-right pointers expand karo
// 3. 📏 Length Tracking: Maximum palindrome length maintain karo
// 4. 🎪 Dual Mode: Odd aur even length palindromes handle karo
// 5. 📊 Result Extraction: Final palindrome substring extract karo       

// 🌟 REAL-WORLD APPLICATIONS:
// ========================================
// 🧬 Bioinformatics: DNA restriction enzyme site detection
// 📊 Data Compression: Symmetry pattern identification
// 🔍 Text Processing: Pattern matching algorithms
// 🧮 Algorithm Design: Substring matching optimizations
// 🔬 Research: Sequence analysis in computational biology