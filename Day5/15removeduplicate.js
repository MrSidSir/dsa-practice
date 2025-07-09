// ListNode class
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
//  Remove duplicates from unsorted linked list
// 🔧 Key Point: Use Set to track visited values.
function removeDuplicates(head) {
    let seen = new Set();
    let curr = head, prev = null;

    while(curr){
        if(seen.has(curr.val)){
            prev.next = curr.next; // remove duplicate
        } else {
            seen.add(curr.val); // add unique
            prev = curr;

        }
        curr = curr.next;
    }
     return head;
}
 
// Test
let head3 = new ListNode(1);
head3.next = new ListNode(2);
head3.next.next = new ListNode(2);
head3.next.next.next = new ListNode(3);

let noDup = removeDuplicates(head3);
while(noDup){
    console.log(noDup.val); // Output: 1 2 3
noDup = noDup.next;
}
//  Explanation:
// Iterate list, remove node if value already exists in Set.