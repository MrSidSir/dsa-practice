// 🔧 Problem: Return array of duplicate characters.
// 📝 Key Point: Use object to count frequency
function findDuplicates(str) {
    let count = {};
    let duplicates = []; 
    for (let ch of str) {
        count [ch] = (count[ch] || 0) + 1;
    }
    for (let ch in count) {
        if (count[ch] > 1) duplicates.push(ch);

    }
    return duplicates;
}
console.log(findDuplicates("programming"));