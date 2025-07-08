// 🔧 Problem: Return count of vowels and consonants.
// 📝 Key Point: Check each char against vowels.
function countVowelsConsonants(str) {
    let vowels = 'aeiouAEIOU';
 let v = 0, c = 0;
 for (let ch of str) {
    if (/[a-zA-Z]/.test(ch)) {
        if (vowels.includes(ch)) v++;
        else c++;
    }
 }
 return {vowels: v, consonants: c};
}
console.log(countVowelsConsonants("hello world"));
