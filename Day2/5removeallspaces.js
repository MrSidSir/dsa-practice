// 🔧 Problem: Return string without spaces.
// 📝 Key Point: Use regex replace.
function removeSpaces(str) {
    return str.replace(/\s/g, '');
}
console.log(removeSpaces("a b c d"));