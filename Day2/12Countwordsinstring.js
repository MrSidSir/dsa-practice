// 🔧 Problem: Return number of words.
// 📝 Key Point: Split by space.
function countWords(str) {
    return str.trim().split(/\s+/).length;
}
console.log(countWords(" Hello world from Irshad"));