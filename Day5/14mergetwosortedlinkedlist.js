// ListNode class
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// [Q14] Merge two sorted linked lists
// 🔧 Key Point: Compare nodes recursively.
function mergeTwoLists(l1, l2) {
    if(!l1) return l2;
    if(!l2) return l1;

    if(l1.val < l2.val){
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;

    }
}

// test
let l1 = new ListNode(1);
l1.next = new ListNode(3);
l1.next.next = new ListNode(5);

let l2 = new ListNode(2);
l2.next = new ListNode(4);
l2.next.next = new ListNode(6);

let merged = mergeTwoLists(l1, l2);
while(merged){
    console.log(merged.val); 
    merged = merged.next; // Output: 1 2 3 4 5 6
}

// Explanation:
// Pick smaller node recursively and connect next of it to merged rest.