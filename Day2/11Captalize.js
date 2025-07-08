// 🔧 Problem: Return string with first and last capitalized.
// 📝 Key Point: Convert to array, modify, join.
function firstLastCap(str) {
    if (str.length < 2) return str.toUpperCase();
    return str[0].toUpperCase() + str.slice(1, -1) + str[str.length-1].toUpperCase();

}
console.log(firstLastCap("irshad"));