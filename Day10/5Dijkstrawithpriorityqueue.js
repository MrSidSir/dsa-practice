/*
🔧 Problem: Single source shortest path
📝 Key Point: Greedy using MinHeap
*/

const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

function dijkstra(graph, n, src) {
  let dist = Array(n).fill(Infinity);
  dist[src] = 0;
  let pq = new MinPriorityQueue({ priority: x => x[1] });
  pq.enqueue([src, 0]);

  while (!pq.isEmpty()) {
    let [u, d] = pq.dequeue().element;
    if (d > dist[u]) continue;

    for (let [v, w] of graph[u]) {
      if (dist[v] > dist[u] + w) {
        dist[v] = dist[u] + w;
        pq.enqueue([v, dist[v]]);
      }
    }
  }

  return dist;
}

// 🔧 Test
let graph5 = [
  [[1,4],[2,1]],
  [[3,1]],
  [[1,2],[3,5]],
  []
];
console.log("Dijkstra:", dijkstra(graph5, 4, 0));

/*
💡 Explanation:
Always pick minimum distance node first.

✅ Real Use: GPS navigation, router packet routing.
*/
 