export const createNode = (id, type, label, x, y, ip = '', failed = false) => ({
  id,
  type,
  label,
  x,
  y,
  ip,
  failed
});

export const createEdge = (id, from, to, bandwidth = 100, latency = 10) => ({
  id,
  from,
  to,
  bandwidth,
  latency
});
