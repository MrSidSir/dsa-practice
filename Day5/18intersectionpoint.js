// ListNode class
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
// Intersection point of two linked lists
// 🔧 Key Point: Two pointer switching approach.
function getIntersectionNode(headA, headB) {
    let a = headA, b = headB;
    while(a != b){
        a = a ? a.next : headB;
        b = b ? b.next : headA;
    }
    return a;
}
// Test 
let inter1 = new ListNode(4);
let inter2 = new ListNode(1);
let inter3 = new ListNode(8);
let inter4 = new ListNode(4);
let inter5 = new ListNode(5);
let headA = inter1;
headA.next = inter2;
inter2.next = inter3;
inter3.next = inter4;
inter4.next = inter5;

let headB = new ListNode(5);
headB.next = new ListNode(6);
headB.next.next = inter3;

console.log(getIntersectionNode(headA, headB).val); // 8


//  Explanation:
// Switch head when reaching end to equalize path lengths, they meet at intersection