// TreeNode class 
class TreeNode {
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
/*
🔧 Problem: Minimum Spanning Tree using Kruskal’s
📝 Key Point: Sort edges + Union Find for cycle detection
*/
class UnionFind {
    constructor(n){
        this.parent = Array.from({lenght:n}, (_,i)=>i);

    }
    find(x){
        if(this.parent[x] != x)  this.find(this.parent[x]);
        return this.parent[x];

    }
    union(x,y){
        let px = this.find(x), py = this.find(y);
        if(px==py) return false;
        this.parent[px] = py;
        return true;
    }
}
function kruskal(n, edges){

    edges.sort((a,b)=>a[2]-b[2]);
    let uf = new UnionFind(n);
    let mst = [];
    for(let [u,v,w] of edges){
        if(uf.union(u,v)){
            mst.push([u,v,w]);
        }
    }
    return mst;
}
// 🔧 Test
let edges = [
    [0,1,10],
    [0,2,6],
    [0,3,5],
    [0,3,15],
    [2,3,4]
];
console.log("Q3 kruskal MST:", kruskal(4, edges));
/*
💡 Explanation:
Sort edges by weight, add edge if it doesn’t form cycle.
✅ Real use: Network design with minimal cost (LAN, pipelines).
*/

// Q3 kruskal MST: [] : outpur