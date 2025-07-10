/*
🔧 Problem: Traverse graph using BFS
📝 Key Point: Queue + visited set
*/
// 🔧 Adjacency List Representation
let graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};

function bfs(graph, start) {

let visited = new Set();
let queue = [start];

while (queue.length > 0) {
    let node = queue.shift();
    if (!visited.has(node)) {
        console.log(node); // 🌟 working: visiting each node once
        visited.add(node);
        for (let neighbor of graph[node]) {
            queue.push(neighbor);
        }
    }
}
}
// 🔧 Test
console.log("\ q1 bfs trversal output:",);
bfs(graph, "A");
 
//  q1 bfs trversal output:
// A
// B
// C
// D
// E
// F

/*
💡 Explanation:
Visit start, then neighbors level by level using queue.
✅ Real use: Shortest path in unweighted graphs (e.g. social networks).
*/

//  Real World Use
// BFS is used in:

// Finding shortest route in Google Maps (unweighted roads).

// Finding minimum moves in puzzles like Rubik’s cube or Knight’s shortest path in Chess.