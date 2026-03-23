export const animatePacket = (path, totalLatency) => {
  const steps = [];
  const durationPerHop = totalLatency / path.length;

  for (let i = 0; i < path.length; i++) {
    steps.push({
      nodeId: path[i],
      timestamp: i * durationPerHop,
      duration: durationPerHop
    });
  }

  return steps;
};
