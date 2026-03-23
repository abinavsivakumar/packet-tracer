export const runSimulation = (nodes, edges, sourceId, targetId) => {
  const logs = [];
  const queue = [{ nodeId: sourceId, path: [sourceId], latency: 0 }];
  const visited = new Set();
  visited.add(sourceId);

  let result = {
    path: [],
    totalLatency: 0,
    packetLoss: 0,
    efficiency: 100,
    success: false,
    logs: []
  };

  while (queue.length > 0) {
    const { nodeId, path, latency } = queue.shift();
    const currentNode = nodes.find(n => n.id === nodeId);

    if (nodeId === targetId) {
      result.success = true;
      result.path = path;
      result.totalLatency = latency;
      result.logs = [...logs, `Reached destination: ${currentNode.label}`];
      return result;
    }

    logs.push(`At node: ${currentNode.label}`);

    const neighbors = edges.filter(e => e.from === nodeId || e.to === nodeId);

    for (const edge of neighbors) {
      const neighborId = edge.from === nodeId ? edge.to : edge.from;
      const neighborNode = nodes.find(n => n.id === neighborId);

      if (!visited.has(neighborId)) {
        if (neighborNode.failed) {
          logs.push(`Failed to reach ${neighborNode.label}: Node is down`);
          continue;
        }

        // Apply constraints
        const newLatency = latency + edge.latency;
        // Simple bandwidth constraint simulation
        if (edge.bandwidth < 10) {
            result.packetLoss += 20;
            result.efficiency -= 10;
        }

        visited.add(neighborId);
        queue.push({
          nodeId: neighborId,
          path: [...path, neighborId],
          latency: newLatency
        });
      }
    }
  }

  result.logs = logs;
  result.logs.push("Target unreachable");
  return result;
};
