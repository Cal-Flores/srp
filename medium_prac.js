/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    if (!head || !head.next) {
        return false;
    }

    let slow = head;
    let fast = head;

    while (fast.next && fast.next.next) {
        fast = fast.next.next;
        slow = slow.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
};
