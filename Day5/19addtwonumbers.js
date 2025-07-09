class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// 🔧 Problem: Add two numbers represented by linked lists
// 📝 Key Point: Similar to addition with carry forward

function addTwoNumbers(l1, l2) {
  let dummy = new ListNode(0);
  let curr = dummy;
  let carry = 0;

  while(l1 || l2 || carry){
    let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
    carry = Math.floor(sum/10);
    curr.next = new ListNode(sum%10);
    curr = curr.next;

    if(l1) l1 = l1.next;
    if(l2) l2 = l2.next;
  }

  return dummy.next;
}

// Test input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
let l1 = new ListNode(2);
l1.next = new ListNode(4);
l1.next.next = new ListNode(3);

let l2 = new ListNode(5);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);

let result = addTwoNumbers(l1, l2);

// Function to print linked list
function printList(head){
  let curr = head;
  let arr = [];
  while(curr){
    arr.push(curr.val);
    curr = curr.next;
  }
  console.log(arr.join(" -> "));
}

printList(result); // Expected Output: 7 -> 0 -> 8

/* 💡 Explanation:
  342 + 465 = 807
  Linked list stores it as 7 -> 0 -> 8
*/
