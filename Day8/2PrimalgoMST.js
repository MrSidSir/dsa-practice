// treeNode class
class TreeNode {
    constructor(val){
        this.val = val;
        this.left = null;
        this.left = null;
        this.right = null;
    }
}
// ✅ [Q2] Prim’s Algorithm (MST)
/*
🔧 Problem: Minimum Spanning Tree using Prim’s
📝 Key Point: Greedy + adding minimal edge each time
*/
function prim(graph) {
    let mst = [];
    let edges =  [];
    let visited = new Set();  // ✅ DECLARED visited
    let startNode = Object.keys(graph)[0];
    visited.add(startNode);
    
    for (let neighbor in graph[startNode]) {
        edges.push([graph[startNode][neighbor], startNode, neighbor]);

    }
    while (edges.length) {
        edges.sort((a,b)=>a[0]-b[0]);
        let [weight, u, v] = edges.shift();
        if (visited.has(v)) continue;

        visited.add(v);
        mst.push([u,v,weight]);

        for (let neighbor in graph[v]) {
            if  (!visited.has(neighbor)) {
                edges.push([graph[v][neighbor], v, neighbor]);
            }
        }
    }
    return mst;
}

// test
let graph2 = {
    A: {B: 2, C:3},
    B: {A: 2, C:1, D: 1},
    C: {A: 3, B: 1, D: 4},
    D: {B: 1, C: 4}
};
console.log("q2 prim mst:", prim(graph2));
/*
💡 Explanation:
Add minimum weight edge connecting visited to unvisited.
✅ Real use: Designing least cost networks, electrical grids.
*/

// q2 prim mst: [ [ 'A', 'B', 2 ], [ 'B', 'C', 1 ], [ 'B', 'D', 1 ] ]