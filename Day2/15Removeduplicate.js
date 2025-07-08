// 🔧 Problem: Return string with unique chars only.
// 📝 Key Point: Use Set to remove duplicates.
function removeDuplicates(str) {
    return [...new Set(str)].join('');

}
console.log(removeDuplicates("programming"));