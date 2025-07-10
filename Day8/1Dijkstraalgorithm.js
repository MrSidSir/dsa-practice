class TreeNode {
    contructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
/*
🔧 Problem: Shortest path in weighted graph using Dijkstra's
📝 Key Point: Priority Queue (min heap), distance update
*/
function dijkstra(graph, start) {
    let distances = {};
    let visited = new Set();
    let pq = [[0, start]];

    for (let node in graph) {
        distances[node] =  Infinity;
    }
    distances[start] = 0;
    while (pq.length) {
        pq.sort((a,b) => a[0]-b[0]); // 🌟 working: sort by distance
        let [dist, node] = pq.shift();

        if (visited.has(node)) continue;
        visited.add(node);

        for (let neighbor in graph[node]) {
            let newDist = dist + graph[node] [neighbor];
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                pq.push([newDist, neighbor]);
            }
        }
    }
    return distances;
}
// 🔧 Test
let graph1 = {
    A: { B: 1, C: 4},
    B: { C: 2, D: 5 },
    C: { D: 1},
    D: {}
};
console.log("q1  dijkstra shortest path:", dijkstra(graph1, 'A'));

/*
💡 Explanation:
Greedy approach picking minimum distance node first.
✅ Real use: GPS route finding, network routing protocols.
*/
// q1  dijkstra shortest path: { A: 0, B: 1, C: 3, D: 4 }
