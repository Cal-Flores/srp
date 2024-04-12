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
    let res = new Array(nums.length);
    let cur = 1;
    for (let i = 0; i < nums.length; i++) {
        res[i] = cur;
        cur *= nums[i];
    }
    cur = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        res[i] *= cur;
        cur *= nums[i];
    }
    return res;
};
var MinStack = function () {
    this.elements = [];
};

/**

 @param {number} x
 @return {void}
 */
MinStack.prototype.push = function (x) {
    this.elements.push({
        value: x,
        min: this.elements.length === 0 ? x : Math.min(x, this.getMin()),
    });
};
/**

 @return {void}
 */
MinStack.prototype.pop = function () {
    this.elements.pop();
};
/**

 @return {number}
 */
MinStack.prototype.top = function () {
    return this.elements[this.elements.length - 1].value;
};
/**

 @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.elements[this.elements.length - 1].min;
};

var isValidBST = function (root) {

    return validate(root, -Infinity, Infinity);
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
 * @return {boolean}
 */
var isValidBST = function (root) {
    let prev = null;
    function helper(node) {
        if (node === null) return true;
        if (!helper(node.left)) return false;
        if (prev !== null && node.val <= prev.val) return false;
        prev = node;
        return helper(node.right);
    }
    return helper(root);
};


var numIslands = function (grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const m = grid.length;
    const n = grid[0].length;

    let islandCount = 0;

    // Helper function to perform DFS
    const dfs = (row, col) => {
        if (row < 0 || row >= m || col < 0 || col >= n || grid[row][col] === '0') {
            return;
        }

        grid[row][col] = '0'; // Mark the current cell as visited

        // Explore adjacent cells
        dfs(row - 1, col);
        dfs(row + 1, col);
        dfs(row, col - 1);
        dfs(row, col + 1);
    };

    // Iterate through the grid
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                islandCount++;
                dfs(i, j); // Start DFS from the current land cell
            }
        }
    }

    return islandCount;
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

const numIslands = (grid) => {
    let count = 0 // the counted islands
    //Go though each cell of the 2d array/grid
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] == '1') {
                count++
                explore(row, col, grid)
            }
        }
    }
    return count
}



// Takes a cell in a grid with a “1” , turns it into a “0” and explores (DFS) any of the left, right, up, down 1’s
function explore(row, col, grid) {
    //Let's return IF
    // row < 0 OR col < 0 OR row is out of bounds(meaning the row is larger than the number of arrays in the 2d array) OR col is at/out of bounds (meaning the current col is at/over the number of elements a row has.)
    if (row < 0 || col < 0 || row >= grid.length
        || col >= grid[row].length || grid[row][col] === '0') {
        return
    }

    //Otherwise, we should explore it!
    //First let's set the current spot to "0"
    grid[row][col] = '0'

    //Possibilites:
    // 1) 1 to the right, left, top, bottom
    //right
    explore(row, col + 1, grid)
    //Left
    explore(row, col - 1, grid)
    //Down
    explore(row + 1, col, grid)
    //Up
    explore(row - 1, col, grid)

}

const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
let nr = 0;
let nc = 0;

var numIslands = function (grid) {
    if (grid == null || grid.length == 0)
        return 0;

    nr = grid.length;
    nc = grid[0].length;
    let counter = 0;

    for (let r = 0; r < nr; r++) {
        for (let c = 0; c < nc; c++) {
            if (grid[r][c] == '1') {
                counter++;
                // uncomment one of the following lines
                // dfsIterative(grid, r, c);
                // dfs(grid, r, c);
                // bfs(grid, r, c);
            }
        }
    }

    return counter;
};

function outOfBounds(grid, r, c) {
    if (r < 0 || c < 0) return true;
    if (r >= nr || c >= nc) return true;
    if (grid[r][c] == '0') return true;
    return false;
}

function bfs(grid, r, c) {
    let queue = [[r, c]];

    while (queue.length > 0) {
        let [r, c] = queue.shift();

        if (outOfBounds(grid, r, c))
            continue;

        grid[r][c] = '0';

        for (let d of directions) {
            let newRow = (r + d[0]), newColumn = (c + d[1]);
            queue.push([newRow, newColumn]);
        }
    }
}
