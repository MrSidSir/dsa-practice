/* 🔧 Problem: Handles negative weights 📝 Key Point: Relax edges |V|-1 times + check negative cycle */
function bellmanFord(edges, n, src) {
    let dist = Array(n).fill(Infinity);
    dist[src] = 0;
    
    for (let i = 0; i < n-1; i++) {
        for (let [u,v,w] of edges) {
            if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
        }
    }
    
    // Check negative cycle
    for (let [u,v,w] of edges) {
        if (dist[u] + w < dist[v]) return "Negative cycle exists";
    }
    
    return dist;
}

// 🔧 Test
let edges6 = [[0,1,5], [1,2,3],[2,3,1],[3,1,-9]];
console.log("Bellman-Ford:", bellmanFord(edges6, 4, 0));

// output:-Bellman-Ford: Negative cycle exists

/* 💡 Explanation: Slower than Dijkstra but handles negative edges.
✅ Real Use: Currency arbitrage detection, economic graph analysis. */