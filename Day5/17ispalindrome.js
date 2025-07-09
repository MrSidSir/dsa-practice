// ListNode class
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
//  Key Point: Reverse second half and compare both halves
// Check if linked list is palindrome
function isPalindrome(head){
    let fast = head, slow= head;
    while(fast && fast.next){
fast = fast.next.next;
slow = slow.next;
    }

    // Reverse second half
    let prev = null;
    while(slow){
        let temp = slow.next;
        slow.next =prev;
        prev = slow;
        slow = temp;
    }
    let left = head, right = prev;
    while(right){
        if(left.val != right.val) return false;
        left = left.next;
        right = right.next;
    }
    return true;
}
// Test 
let phead = new ListNode(1);
phead.next = new ListNode(2);
phead.next.next = new ListNode(2);
phead.next.next.next = new ListNode(1);

console.log(isPalindrome(phead));  // true

//  Explanation:
// Find mid, reverse second half, compare both halves for palindrome.