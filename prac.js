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
