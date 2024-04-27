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
// Function to calculate the expected score of a player
function expectedScore(playerRating, opponentRating) {
    return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
}

// Function to update Elo rating after a match
function updateRating(playerRating, opponentRating, actualScore, kFactor = 32) {
    const expected = expectedScore(playerRating, opponentRating);
    const newRating = playerRating + kFactor * (actualScore - expected);
    return Math.round(newRating);
}

// Example usage
const playerRating = 1200; // Initial rating of the player
const opponentRating = 1000; // Rating of the opponent
const actualScore = 1; // 1 if player wins, 0.5 for a draw, 0 for a loss

const newRating = updateRating(playerRating, opponentRating, actualScore);
console.log("New rating:", newRating);

class EloRatingSystem {
    constructor(kFactor = 32) {
        this.kFactor = kFactor;
    }

    // Function to calculate the expected score of a player
    expectedScore(playerRating, opponentRating) {
        return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    }

    // Function to update Elo rating after a match
    updateRating(playerRating, opponentRating, actualScore) {
        const expected = this.expectedScore(playerRating, opponentRating);
        const newRating = playerRating + this.kFactor * (actualScore - expected);
        return Math.round(newRating);
    }
}

// Example usage

class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    enqueue(value, priority) {
        const newNode = { value, priority };
        this.heap.push(newNode);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        const newNode = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (newNode.priority >= parent.priority) break;
            this.heap[parentIndex] = newNode;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    dequeue() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown();
        }
        return min.value;
    }

    sinkDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

// Example usage:
const pq = new PriorityQueue();
pq.enqueue('A', 2);
pq.enqueue('B', 3);
pq.enqueue('C', 1);

while (!pq.isEmpty()) {
    console.log(pq.dequeue());
}


class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    enqueue(vertex, priority) {
        const newNode = { vertex, priority };
        this.heap.push(newNode);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        const newNode = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (newNode.priority >= parent.priority) break;
            this.heap[parentIndex] = newNode;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    dequeue() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown();
        }
        return min.vertex;
    }

    sinkDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }

    dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let smallest;
        let path = []; // to return at end
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }

        while (!nodes.isEmpty()) {
            smallest = nodes.dequeue().vertex;
            if (smallest === finish) {
                // Build up path to return at end
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    // Find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    // Calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]) {
                        // Updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate;
                        // Updating previous - How we got to neighbor
                        previous[nextNeighbor] = smallest;
                        // Enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    }
}

// Example usage:
const graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

console.log(graph.dijkstra("A", "E")); // Output: [ 'A', 'C', 'D', 'F', 'E' ]



function twoSum(nums, target) {
    const numMap = {};
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.hasOwnProperty(complement)) {
            return [numMap[complement], i];
        }
        numMap[nums[i]] = i;
    }
    return null;
}

// Example usage:

