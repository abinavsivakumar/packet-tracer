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

  let step = 1;

  while (queue.length > 0) {
    const { nodeId, path, latency } = queue.shift();
    const currentNode = nodes.find(n => n.id === nodeId);

    logs.push(`Step ${step++}: Exploring node [${currentNode.label}] at ${currentNode.ip || 'no-ip'} (Current path: ${path.join(' → ')})`);

    if (nodeId === targetId) {
      result.success = true;
      result.path = path;
      result.totalLatency = latency;
      result.logs = [...logs, `🏁 SUCCESS: Destination [${currentNode.label}] reached at ${currentNode.ip || 'no-ip'} in ${latency}ms`];
      return result;
    }

    const neighbors = edges.filter(e => e.from === nodeId || e.to === nodeId);

    for (const edge of neighbors) {
      const neighborId = edge.from === nodeId ? edge.to : edge.from;
      const neighborNode = nodes.find(n => n.id === neighborId);

      if (!visited.has(neighborId)) {
        // Subnet Validation: Devices on different subnets need a router
        const isSameSubnet = (ip1, ip2) => {
            if (!ip1 || !ip2) return true; // Default to allow if IP not set yet
            const p1 = ip1.split('.').slice(0, 3).join('.');
            const p2 = ip2.split('.').slice(0, 3).join('.');
            return p1 === p2;
        };

        const needsRouter = currentNode.type !== 'router' && neighborNode.type !== 'router';
        
        if (needsRouter && !isSameSubnet(currentNode.ip, neighborNode.ip)) {
            logs.push(`🚫 BLOCKED: [${currentNode.label}] and [${neighborNode.label}] are on different subnets! (${currentNode.ip} vs ${neighborNode.ip}). Connection requires a Router.`);
            continue;
        }

        if (neighborNode.failed) {
          logs.push(`⚠️ DISRUPTION: Cannot pass through [${neighborNode.label}]. Node is down!`);
          continue;
        }

        const newLatency = latency + (edge.latency || 10);
        
        // Bandwidth simulation impact
        if ((edge.bandwidth || 100) < 20) {
            result.packetLoss += 25;
            result.efficiency -= 15;
            logs.push(`🐢 CONGESTION: Low bandwidth detected between ${currentNode.label} and ${neighborNode.label}.`);
        }

        visited.add(neighborId);
        queue.push({
          nodeId: neighborId,
          path: [...path, neighborId],
          latency: newLatency
        });
        logs.push(`➕ QUEUED: Next hop [${neighborNode.label}] (${neighborNode.ip || 'no-ip'}) (+${edge.latency || 10}ms)`);
      }
    }
  }

  result.logs = logs;
  result.logs.push("❌ FAILURE: Packet dropped. No valid path to destination found.");
  return result;
};
