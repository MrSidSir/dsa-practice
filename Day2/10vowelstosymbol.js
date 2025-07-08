// 🔧 Problem: Replace vowels with '*'.
// 📝 Key Point: Use regex replace
function replaceVowels(str) {
    return str.replace(/[aeiouAEIOU]/g,"%");
}
console.log(replaceVowels("Irshad Ahmad"));