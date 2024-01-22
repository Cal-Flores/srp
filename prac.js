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
