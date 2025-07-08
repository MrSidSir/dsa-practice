// 🔧 Problem: First letter capital of each word.
// 📝 Key Point: Split by space, capitalize, join.
function toTitleCase(str) {
    return str.split('').map(word => word[0].toUpperCase() + word.slice(1)).join('');

}
console.log(toTitleCase("hello world from irshad"));