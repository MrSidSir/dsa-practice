
// ListNode class
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
 // 🔧 Key Point: Floyd’s Cycle Detection (slow & fast pointer).
function hasCycle(head) {
    let slow = head, fast = head; 
    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
        if(slow == fast) return true;
    }
    return false;
 }
 // Test with loop

 let node1 = new ListNode(1);
 let node2 = new ListNode(2);
 node1.next = node2;
 node2.next = node1; // loop

 console.log(hasCycle(node1)); // Output: true

//  💡 Explanation:
// If a loop exists, fast will eventually meet slow. Else fast reaches null.