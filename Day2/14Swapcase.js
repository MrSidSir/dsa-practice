// 🔧 Problem: Upper to lower and vice versa.
// 📝 Key Point: Use ternary for each char.
function swapCase(str) {
    return str.split('').map(ch =>
        ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase()
    )
}
console.log(swapCase("Irshad"));