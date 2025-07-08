// 🔧 Problem: Return true if string is same backward.
// 📝 Key Point: Compare original with reversed string.
function isPalindrome(str) {
    let rev = str.split('').reverse().join('');
    return str === rev;
}
console.log(isPalindrome("madam")); 
console.log(isPalindrome("hello"));