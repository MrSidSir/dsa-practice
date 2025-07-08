// 🔧 Problem: Return object with char frequency.
// 📝 Key Point: Loop through and store counts.
function charFrequency(str) {
    let freq = {};
    for (let ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
}
 return freq;
 }
 console.log(charFrequency("hello"));