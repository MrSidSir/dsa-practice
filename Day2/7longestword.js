// 🔧 Problem: Return longest word.
// 📝 Key Point: Compare lengths using reduce.
 
function longestWord(str) {
    let words = str.split('');
    return words.reduce((a,b) => a.length > b.length ? a : b);

}
console.log(longestWord("I love programming very much"));