
// 🔧 Problem: Return true if two strings are anagram.
// 📝 Key Point: Sort and compare.
function isAnagram(s1, s2) {
    return s1.split('').sort().join('') === s2.split('').sort().join('');
}
console.log(isAnagram("listen", "silent"));
console.log(isAnagram("hello", "world"));
