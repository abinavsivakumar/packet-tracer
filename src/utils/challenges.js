export const challenges = [
  {
    id: 'ch_1',
    level: '01',
    title: 'The First Connection',
    description: 'Establish a simple link between a laptop and a router.',
    difficulty: 'BEGINNER',
    xpReward: 50,
    rewardText: 'New Icon',
    icon: 'hub',
    colorClass: 'bg-secondary-container text-on-secondary-container',
    initialNodes: [
      { id: 'start_node', type: 'laptop', label: 'Laptop_A', x: 200, y: 300, ip: '192.168.1.5' },
      { id: 'end_node', type: 'router', label: 'Router_B', x: 800, y: 300, ip: '192.168.1.1' }
    ],
    initialEdges: [],
    targetNodeId: 'end_node'
  },
  {
    id: 'ch_2',
    level: '02',
    title: 'Routing the Static',
    description: 'Connect multiple devices to a central router and ensure reachability.',
    difficulty: 'INTERMEDIATE',
    xpReward: 120,
    rewardText: 'Silver Badge',
    icon: 'router',
    colorClass: 'bg-primary-container text-white',
    initialNodes: [
        { id: 'l1', type: 'laptop', label: 'Laptop_1', x: 200, y: 200, ip: '192.168.1.2' },
        { id: 'l2', type: 'laptop', label: 'Laptop_2', x: 200, y: 400, ip: '192.168.1.3' },
        { id: 'r1', type: 'router', label: 'Core_Router', x: 600, y: 300, ip: '192.168.1.1' },
        { id: 's1', type: 'server', label: 'Web_Server', x: 800, y: 300, ip: '8.8.8.8' }
    ],
    initialEdges: [],
    targetNodeId: 's1'
  },
  {
    id: 'ch_3',
    level: '03',
    title: 'DNS Detective',
    description: 'Resolve domain names to IP addresses across a complex network.',
    difficulty: 'EXPERT',
    xpReward: 250,
    rewardText: 'Expert Badge',
    icon: 'dns',
    colorClass: 'bg-surface-container-highest text-outline',
    locked: true
  }
];
