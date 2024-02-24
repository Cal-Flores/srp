// 53. Maximum Subarray
// Medium
// Topics
// Companies
// Given an integer array nums, find the
// subarray
// with the largest sum, and return its sum.



//     Example 1:

// Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Output: 6
// Explanation: The subarray[4, -1, 2, 1] has the largest sum 6.
// Example 2:

// Input: nums = [1]
// Output: 1
// Explanation: The subarray[1] has the largest sum 1.
// Example 3:

// Input: nums = [5, 4, -1, 7, 8]
// Output: 23
// Explanation: The subarray[5, 4, -1, 7, 8] has the largest sum 23.


// Constraints:

// 1 <= nums.length <= 105
//     - 104 <= nums[i] <= 104


var maxSubArray = function (nums) {
    var maxSubArray = function (nums) {
        if (nums.length === 0) {
            return 0;
        }

        let maxSum = nums[0];
        let currentSum = nums[0];

        for (let i = 1; i < nums.length; i++) {
            // Choose between extending the current subarray or starting a new one
            currentSum = Math.max(nums[i], currentSum + nums[i]);

            // Update the maximum subarray sum
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    };
};


// 57. Insert Interval
// Medium
// Topics
// Companies
// You are given an array of non - overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti.You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

// Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals(merge overlapping intervals if necessary).

// Return intervals after the insertion.



//     Example 1:

// Input: intervals = [[1, 3], [6, 9]], newInterval = [2, 5]
// Output: [[1, 5], [6, 9]]
// Example 2:

// Input: intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval = [4, 8]
// Output: [[1, 2], [3, 10], [12, 16]]
// Explanation: Because the new interval[4, 8] overlaps with [3, 5], [6, 7], [8, 10].
// Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

// The distance between two adjacent cells is 1.

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
    const rows = mat.length;
    const cols = mat[0].length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    const bfs = (queue) => {
        let distance = 0;
        while (queue.length > 0) {
            const size = queue.length;
            for (let i = 0; i < size; i++) {
                const [row, col] = queue.shift();
                if (mat[row][col] === 0) {
                    return distance;
                }
                for (const [dx, dy] of directions) {
                    const newRow = row + dx;
                    const newCol = col + dy;
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        queue.push([newRow, newCol]);
                    }
                }
            }
            distance++;
        }
        return -1; // Should not reach here
    };

    const result = [];
    for (let i = 0; i < rows; i++) {
        result.push([]);
        for (let j = 0; j < cols; j++) {
            if (mat[i][j] === 0) {
                result[i][j] = 0;
            } else {
                const queue = [[i, j]];
                result[i][j] = bfs(queue);
            }
        }
    }

    return result;
};


var lengthOfLongestSubstring = function (s) {
    let charIndexMap = {};
    let start = 0;
    let maxLength = 0;

    for (let end = 0; end < s.length; end++) {
        const char = s[end];

        if (char in charIndexMap && charIndexMap[char] >= start) {
            start = charIndexMap[char] + 1;
        }

        charIndexMap[char] = end;
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
};

//

var MinStack = function () {
    this.items = [];
    this.min = []
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    this.items.push(val)
    let lastMinItem = this.min.at(-1);
    let minVal = Math.min(this.min.length > 0 ? lastMinItem : val, val)
    this.min.push(minVal)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    if (this.items.length !== 0) {
        this.items.pop()
        this.min.pop()
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.items.at(-1);
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.min.at(-1)
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 *
 *

 */


const coinChange = (coins, amount) => {
    const dp = Array(amount + 1).fill(Infinity); // This arr tells us how many coins we need for each amount.
    dp[0] = 0; // To make 0, we need 0 coins.
    for (let coin of coins) { // Check each coin
        for (let i = coin; i <= amount; i++) { // Iterate through the entire amount from coin
            dp[i] = Math.min(dp[i], dp[i - coin] + 1); // Update minimum number of needed coins.
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]; // If the last element is Infinity, then we cannot make the amount.
};


/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    // First, create a prefix array that moves from the left,
    // gathering the running product of the prefix at each index
    const prefix = []

    // Move left in the input array
    for (let i = 0; i < nums.length; i++) {
        // If i === 0, start with `1`, since there is no prefix
        if (i === 0) {
            prefix[i] = 1
        } else {
            // Otherwise, multiply nums[i-1] times the prefix at position i-1,
            // and add that to the prefix array at position i
            prefix[i] = nums[i - 1] * prefix[i - 1]
        }
    }

    // Then, let's create a suffix array
    const suffix = []

    // Move right in the input array
    for (let i = nums.length - 1; i >= 0; i--) {
        // For the last index, we have no suffix, so just add a 1 to that position
        if (i === nums.length - 1) {
            suffix[i] = 1
        } else {
            // Otherwise, we multiply nums[i+1] by the suffix at position i+1
            // and add that to the suffix array at position i
            suffix[i] = nums[i + 1] * suffix[i + 1]
        }
    }

    // Finally, our result array should be the products of prefix * suffix for each position
    const result = []

    for (let i = 0; i < nums.length; i++) {
        result[i] = prefix[i] * suffix[i]
    }

    return result
};

// Time complexity: O(mn)
// Space complexity: O(mn)

var numIslands = function (grid) {
    let count = 0;

    function callDFS(grid, i, j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length || grid[i][j] == '0') {
            return;
        }

        grid[i][j] = '0';

        callDFS(grid, i + 1, j); // down
        callDFS(grid, i - 1, j); // up
        callDFS(grid, i, j + 1); // right
        callDFS(grid, i, j - 1); // left
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == '1') {
                count += 1;
                callDFS(grid, i, j);
            }
        }
    }

    return count;
};


/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
    const queue = [root];
    while (queue.length) {
        const size = queue.length;
        let foundX = false;
        let foundY = false;
        // iterate through one level
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            // check if children are x and y
            if (node.left && node.right) {
                if (
                    (node.left.val === x && node.right.val === y) ||
                    (node.left.val === y && node.right.val === x)
                )
                    return false;
            }
            // find x and y at the same level
            if (node.val === x) foundX = true;
            if (node.val === y) foundY = true;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        if (foundX && foundY) return true;
    }
    return false;
};


/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    if (!hasFreshOranges(grid)) {
        return 0;
    }
    const rottenOranges = getRottenOranges(grid);
    const minutes = rottenOranges.length > 0
        ? bfs(grid, rottenOranges)
        : 0;
    return hasFreshOranges(grid) ? -1 : minutes;
};

const getRottenOranges = (grid) => {
    const rottenOranges = [];
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 2) {
                rottenOranges.push([r, c]);
            }
        }
    }
    return rottenOranges;
}

const hasFreshOranges = (grid) => {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 1) {
                return true;
            }
        }
    }
    return false;
}

const getPosKey = (r, c) => `${r},${c}`;

const getPosFromKey = (key) => key.split(',').map(Number);

const isOutOfBounds = (grid, r, c) => r < 0 || r > grid.length - 1 || c < 0 || c > grid[0].length - 1;

const isEmptyCell = (grid, r, c) => grid[r][c] === 0;
/**
 * @param {number[][]} grid
 * @return {number}
 */

const bfs = (timestamp, grid, ROWS, COLS) => {
    let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    // flag to indicate if the rotting process should be continued
    let toBeContinued = false;
    for (let row = 0; row < ROWS; ++row) {
        for (let col = 0; col < COLS; ++col) {
            if (grid[row][col] == timestamp) {
                // current contaminated cell
                for (let d of directions) {
                    let nRow = row + d[0]
                    let nCol = col + d[1];
                    if (nRow >= 0 && nRow < ROWS && nCol >= 0 && nCol < COLS) {
                        if (grid[nRow][nCol] == 1) {
                            // this fresh orange would be contaminated next
                            grid[nRow][nCol] = timestamp + 1;
                            toBeContinued = true;
                        }
                    }
                }
            }
        }
    }
    return toBeContinued;
}

var orangesRotting = function (grid) {
    let ROWS = grid.length;
    let COLS = grid[0].length;
    let timestamp = 2;
    while (bfs(timestamp, grid, ROWS, COLS)) {
        timestamp++;
    }

    // end of process, to check if there are still fresh oranges left
    for (let row of grid) {
        for (let cell of row) {
            // still got a fresh orange left
            if (cell == 1) {
                return -1;
            }
        }
    }

    // return elapsed minutes if no fresh orange left
    return timestamp - 2;
};

// public List < List < Integer >> subsets(int[] nums) {
//     List < List < Integer >> list = new ArrayList <> ();
//     Arrays.sort(nums);
//     backtrack(list, new ArrayList <> (), nums, 0);
//     return list;
// }

// private void backtrack(List < List < Integer >> list, List < Integer > tempList, int[] nums, int start){
//     list.add(new ArrayList <> (tempList));
//     for (int i = start; i < nums.length; i++) {
//         tempList.add(nums[i]);
//         backtrack(list, tempList, nums, i + 1);
//         tempList.remove(tempList.size() - 1);
//     }
// }

const isMatch = function (string, pattern) {
    let s = 0, p = 0;
    let starIdx = -1, pointer = -1;

    while (s < string.length) {
        if ((p < pattern.length && string[s] === pattern[p]) || pattern[p] === "?") {
            s++;
            p++;
        }
        else if (p < pattern.length && pattern[p] === "*") {
            starIdx = p;
            pointer = s;
            p++;
        }
        else if (starIdx === -1) return false;
        else {
            p = starIdx + 1;
            s = pointer + 1;
            pointer = s;
        }
    }
    for (let idx = p; idx < pattern.length; idx++) {
        if (pattern[idx] !== "*") return false;
    }
    return true;
};
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    if (!intervals || intervals.length === 0) {
        return [];
    }

    let merged = [];
    intervals.sort((a, b) => a[0] - b[0]);

    let mergedInterval = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        let interval = intervals[i];

        if (interval[0] <= mergedInterval[1]) {
            mergedInterval[1] = Math.max(mergedInterval[1], interval[1]);
        } else {
            merged.push(mergedInterval);
            mergedInterval = interval;
        }
    }

    merged.push(mergedInterval);

    return merged;
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        max = Math.max(nums[i] + i, max);
        if (max >= nums.length - 1) return true;
        if (max == i && nums[i] == 0) return false;
    }

    return false;
};

var sortColors = function (nums) {

    let obj = {}

    for (let num of nums) {
        if (!obj[num]) obj[num] = 0
        obj[num]++
    }

    let len = nums.length

    for (let i = 0; i < len; i++) {
        if (obj[0]) {
            nums[i] = 0
            obj[0]--
        } else if (obj[1]) {
            nums[i] = 1
            obj[1]--
        } else if (obj[2]) {
            nums[i] = 2
            obj[2]--
        }
    }
};

class LRUCache {
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }

    get(key) {
        if (!this.cache.has(key)) return -1;

        const v = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, v);
        return this.cache.get(key);
    };

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            this.cache.delete(this.cache.keys().next().value);  // keys().next().value returns first item's key
        }
    };
}
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function (head) {
    //declare empty array
    let arr = [];
    while (head) {
        //loop : push all list value in array
        arr.push(head.val)
        head = head.next
    }
    //sort the array
    arr.sort((a, b) => a - b)

    let res = new ListNode(arr[0])
    let result = res
    for (let i = 1; i < arr.length; i++) {
        // now sorted array value in list
        result.next = new ListNode(arr[i])
        result = result.next
    }
    //return the final solution
    return res
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
    const arr = []; //To store all the numbers
    let node = head; //helper node to iterate the linked list

    //Fill the array
    while (head) {
        arr.push(head.val);
        head = head.next;
    }

    //Sort the numbers
    arr.sort((a, b) => a - b);


    head = node; // We want to return the same head, and we already changed its value when filling the array

    for (const n of arr) {
        node.val = n; //Change list value
        node = node.next; //Go next
    }

    //Finally return the head of the new linked list
    return head;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
    let n = 0
    let stack = []
    let current = root
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current)
            current = current.left
        }
        current = stack.pop()
        n += 1
        if (n === k) return current.val
        current = current.right
    }
}
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
    let n = 0
    let stack = []
    let current = root
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current)
            current = current.left
        }
        current = stack.pop()
        n += 1
        if (n === k) return current.val
        current = current.right
    }
};

var calculate = function (s) {
    let sign = 1, sum = 0;

    const stack = [];
    for (let i = 0; i < s.length; i += 1) {
        if (s[i] >= '0' && s[i] <= '9') {
            let num = 0
            // num can be multiple digits, iterate to build full num.
            while (s[i] >= '0' && s[i] <= '9') {
                num = (num * 10) + (s[i] - '0');
                i += 1;
            }
            // add your completed sum.
            sum += (num * sign);
            // while loop from earlier causes our index to move forward once, bring it back
            i -= 1;
        } else if (s[i] === '+') {
            sign = 1;
        } else if (s[i] === '-') {
            sign = -1;
        } else if (s[i] === '(') {
            // open parens signifies that we should calculate the inside of the parens first and store the outer sum and sign in stack.
            // we can later retrieve the values in our stack once we find a closing bracket.
            stack.push(sum);
            stack.push(sign);
            sum = 0
            // we used our sign, reset it to default.
            sign = 1;
        } else if (s[i] === ')') {
            // closing bracket assumes we've calculated the sum inside the parens.
            // Earlier, we pushed the sum first into our stack. First pop will be the sign. Second pop will be the outer sum.
            sum = stack.pop() * sum;
            sum += stack.pop();
        }
    }

    return sum;
};

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
function ladderLength(beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) {
        return 0;
    }

    const wordSet = new Set(wordList);
    const dp = {};
    dp[beginWord] = 1;

    const queue = [beginWord];

    while (queue.length > 0) {
        const currentWord = queue.shift();

        for (let i = 0; i < currentWord.length; i++) {
            const wordArray = currentWord.split('');
            for (let j = 0; j < 26; j++) {
                wordArray[i] = String.fromCharCode(97 + j); // Generating new words by changing one character
                const newWord = wordArray.join('');

                if (wordSet.has(newWord) && !dp.hasOwnProperty(newWord)) {
                    dp[newWord] = dp[currentWord] + 1;
                    if (newWord === endWord) {
                        return dp[newWord];
                    }
                    queue.push(newWord);
                }
            }
        }
    }

    return 0;
}


/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    if (nums.length == 0) return 0;
    let s = new Set()
    let res = 1
    for (let i = 0; i < nums.length; i++) {
        s.add(nums[i])
    }
    for (const value of s.values()) {
        if (!s.has(value - 1) && s.has(value + 1)) {
            let k = 1;
            while (s.has(value + k)) { k++ }
            res = Math.max(res, k)
        }
    }
    return res

};


var MedianFinder = function () {
    this.minHeap = [] // for storing second half of sorted numbers
    this.maxHeap = [] // for storing first half of sorted numbers
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    if (this.maxHeap.length == 0) {
        this.maxHeap.push(num)
        return
    }

    if (this.minHeap.length == 0) {
        if (this.maxHeap[0] > num) {
            this.minHeap.push(this.maxHeap[0])
            this.maxHeap[0] = num
        } else {
            this.minHeap.push(num)
        }

        return
    }

    if (this.maxHeap[0] < num) { // add to min heap
        this.minHeap.push(num)

        let idx = this.minHeap.length - 1
        let parent = Math.floor(idx / 2)
        let heap = this.minHeap

        while (parent >= 0 && heap[parent] > heap[idx]) {
            let swap = heap[parent]
            heap[parent] = heap[idx]
            heap[idx] = swap

            idx = parent
            parent = Math.floor(idx / 2)
        }
    } else { // add to max heap
        this.maxHeap.push(num)

        let idx = this.maxHeap.length - 1
        let parent = Math.floor(idx / 2)
        let heap = this.maxHeap

        while (parent >= 0 && heap[parent] < heap[idx]) {
            let swap = heap[parent]
            heap[parent] = heap[idx]
            heap[idx] = swap

            idx = parent
            parent = Math.floor(idx / 2)
        }
    }

    const maxHeapLength = this.maxHeap.length
    const minHeapLength = this.minHeap.length

    const isEven = (maxHeapLength + minHeapLength) % 2
    if (maxHeapLength < minHeapLength) {
        if (isEven == 0) {
            while (this.maxHeap.length != this.minHeap.length) {
                // pick root from min, and add it to max
                let minRoot = this.minHeap[0]

                // heapify min heap
                this.minHeap[0] = this.minHeap[this.minHeap.length - 1]
                this.minHeap.pop()

                let idx = 0
                let l = 2 * idx
                let r = 2 * idx + 1
                let heap = this.minHeap

                while (idx < heap.length && l < heap.length && (
                    heap[l] < heap[idx]
                    || heap[r] < heap[idx]
                )) {
                    let min = l
                    if (heap[r] < heap[l])
                        min = r

                    let swap = heap[idx]
                    heap[idx] = heap[min]
                    heap[min] = swap

                    idx = min
                    l = 2 * idx
                    r = 2 * idx + 1
                }

                // add min root to max heap
                this.maxHeap.push(minRoot)

                idx = this.maxHeap.length - 1
                let parent = Math.floor(idx / 2)
                heap = this.maxHeap
                while (parent >= 0 && heap[parent] < heap[idx]) {
                    let swap = heap[parent]
                    heap[parent] = heap[idx]
                    heap[idx] = swap

                    idx = parent
                    parent = Math.floor(idx / 2)
                }
            }
        } else {
            while (this.maxHeap.length <= this.minHeap.length) {
                // pick root from min, and add it to max
                let minRoot = this.minHeap[0]

                // heapify min heap
                this.minHeap[0] = this.minHeap[this.minHeap.length - 1]
                this.minHeap.pop()

                let idx = 0
                let l = 2 * idx
                let r = 2 * idx + 1
                let heap = this.minHeap

                while (idx < heap.length && l < heap.length && (
                    heap[l] < heap[idx]
                    || heap[r] < heap[idx]
                )) {
                    let min = l
                    if (heap[r] < heap[l])
                        min = r

                    let swap = heap[idx]
                    heap[idx] = heap[min]
                    heap[min] = swap

                    idx = min
                    l = 2 * idx
                    r = 2 * idx + 1
                }

                // add min root to max heap
                this.maxHeap.push(minRoot)

                idx = this.maxHeap.length - 1
                let parent = Math.floor(idx / 2)
                heap = this.maxHeap
                while (parent >= 0 && heap[parent] < heap[idx]) {
                    let swap = heap[parent]
                    heap[parent] = heap[idx]
                    heap[idx] = swap

                    idx = parent
                    parent = Math.floor(idx / 2)
                }
            }
        }
    } else if (maxHeapLength - minHeapLength > 1) {
        if (isEven == 0) {
            while (this.maxHeap.length != this.minHeap.length) {
                // pick root from max, and add it to min
                let maxRoot = this.maxHeap[0]

                // heapify min heap
                this.maxHeap[0] = this.maxHeap[this.maxHeap.length - 1]
                this.maxHeap.pop()

                let idx = 0
                let l = 2 * idx
                let r = 2 * idx + 1
                let heap = this.maxHeap

                while (idx < heap.length && l < heap.length && (
                    heap[l] > heap[idx]
                    || heap[r] > heap[idx]
                )) {
                    let max = l
                    if (heap[r] > heap[l])
                        max = r

                    let swap = heap[idx]
                    heap[idx] = heap[max]
                    heap[max] = swap

                    idx = max
                    l = 2 * idx
                    r = 2 * idx + 1
                }

                // add max root to min heap
                this.minHeap.push(maxRoot)

                idx = this.minHeap.length - 1
                let parent = Math.floor(idx / 2)
                heap = this.minHeap
                while (parent >= 0 && heap[parent] > heap[idx]) {
                    let swap = heap[parent]
                    heap[parent] = heap[idx]
                    heap[idx] = swap

                    idx = parent
                    parent = Math.floor(idx / 2)
                }
            }
        } else {
            while (this.maxHeap.length - this.minHeap.length > 1) {
                // pick root from max, and add it to min
                let maxRoot = this.maxHeap[0]

                // heapify min heap
                this.maxHeap[0] = this.maxHeap[this.maxHeap.length - 1]
                this.maxHeap.pop()

                let idx = 0
                let l = 2 * idx
                let r = 2 * idx + 1
                let heap = this.maxHeap

                while (idx < heap.length && l < heap.length && (
                    heap[l] > heap[idx]
                    || heap[r] > heap[idx]
                )) {
                    let max = l
                    if (heap[r] > heap[l])
                        max = r

                    let swap = heap[idx]
                    heap[idx] = heap[max]
                    heap[max] = swap

                    idx = max
                    l = 2 * idx
                    r = 2 * idx + 1
                }

                // add max root to min heap
                this.minHeap.push(minRoot)

                idx = this.minHeap.length - 1
                let parent = Math.floor(idx / 2)
                heap = this.minHeap
                while (parent >= 0 && heap[parent] > heap[idx]) {
                    let swap = heap[parent]
                    heap[parent] = heap[idx]
                    heap[idx] = swap

                    idx = parent
                    parent = Math.floor(idx / 2)
                }
            }
        }
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    const maxHeapLength = this.maxHeap.length
    const minHeapLength = this.minHeap.length

    const isEven = (maxHeapLength + minHeapLength) % 2

    if (isEven == 0) {
        return (this.minHeap[0] + this.maxHeap[0]) / 2
    }

    return this.maxHeap[0]
};

/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function (startTime, endTime, profit) {
    const numJobs = profit.length; // Number of jobs
    const jobs = new Array(numJobs);

    for (let i = 0; i < numJobs; ++i) {
        jobs[i] = [endTime[i], startTime[i], profit[i]];
    }

    jobs.sort((a, b) => a[0] - b[0]);
    const dp = new Array(numJobs + 1).fill(0);

    for (let i = 0; i < numJobs; ++i) {
        const [endTime, startTime, profit] = jobs[i];

        const latestNonConflictJobIndex = upperBound(jobs, i, startTime);
        dp[i + 1] = Math.max(dp[i], dp[latestNonConflictJobIndex] + profit);
    }

    return dp[numJobs];
};

/**
 * @param {number[][]} jobs
 * @param {number} endIndex
 * @param {number} targetTime
 * @return {number}
 */
function upperBound(jobs, endIndex, targetTime) {
    let low = 0;
    let high = endIndex;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (jobs[mid][0] <= targetTime) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
};

const mergeKLists = function (lists) {
    const queue = new MinPriorityQueue({ priority: x => x.val })

    for (const head of lists) {
        if (head) {
            queue.enqueue(head)
        }
    }

    let result = new ListNode()
    const head = result

    while (!queue.isEmpty()) {
        const { val, next } = queue.dequeue().element

        result.next = new ListNode(val)
        result = result.next

        if (next) {
            queue.enqueue(next)
        }
    }

    return head.next
}

