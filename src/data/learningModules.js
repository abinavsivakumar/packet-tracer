export const learningModules = [
  {
    id: "intro-networking",
    moduleNumber: "01",
    title: "Intro to Networking",
    shortDescription: "The absolute basics of how computers talk to each other.",
    fullDescription: "Discover the foundational concepts of networking, from LANs and WANs to the basic hardware that powers the internet.",
    xp: 250,
    time: "10 min",
    icon: "language",
    category: "Basics",
    analogy: "Think of a network like a neighborhood where houses (computers) are connected by roads (cables) so neighbors can talk to each other.",
    concepts: [
      { title: "What is a network?", description: "A group of two or more computer systems linked together.", icon: "group_work", colorClass: "bg-blue-50 text-blue-600" },
      { title: "LAN vs WAN", description: "Local Area Networks vs Wide Area Networks.", icon: "public", colorClass: "bg-green-50 text-green-600" }
    ]
  },
  {
    id: "ip-addressing",
    moduleNumber: "02",
    title: "IP Addressing Basics",
    shortDescription: "Understand how every device gets a unique digital address.",
    fullDescription: "Learn about IPv4, IPv6, and how logical addresses allow data to find its way across the globe.",
    xp: 350,
    time: "12 min",
    icon: "location_on",
    category: "Core",
    analogy: "An IP address is just like your home mailing address. Without it, the mailman (the network) wouldn't know which house to deliver your package to.",
    concepts: [
      { title: "IPv4 Anatomy", description: "Understanding the 32-bit address structure.", icon: "segment", colorClass: "bg-purple-50 text-purple-600" },
      { title: "Public vs Private", description: "Why we need NAT and private IP ranges.", icon: "vpn_lock", colorClass: "bg-amber-50 text-amber-600" }
    ]
  },
  {
    id: "routing-basics",
    moduleNumber: "03",
    title: "The Digital Traffic Cop",
    shortDescription: "How routers make intelligent decisions about data paths.",
    fullDescription: "Routers don't just connect cables; they make intelligent decisions about where your data needs to go next.",
    xp: 450,
    time: "15 min",
    icon: "router",
    category: "Advanced",
    analogy: "A router is like a GPS for your data. It looks at the destination address and finds the best route through many different 'streets' to get there.",
    concepts: [
      { title: "IP Addressing", description: "Every packet has a destination IP. The router reads this to sort incoming traffic.", icon: "location_on", colorClass: "bg-blue-50 text-blue-600" },
      { title: "Routing Tables", description: "A map of the network stored in memory telling the router the fastest path.", icon: "alt_route", colorClass: "bg-green-50 text-green-600" },
      { title: "Next Hop", description: "Passing the packet to the next 'hop' in the chain.", icon: "forward", colorClass: "bg-amber-50 text-amber-600" }
    ]
  },
  {
    id: "subnetting",
    moduleNumber: "04",
    title: "Subnetting Masterclass",
    shortDescription: "Divide and conquer large networks for efficiency.",
    fullDescription: "Master the art of binary math and subnet masks to organize complex networks.",
    xp: 600,
    time: "20 min",
    icon: "grid_view",
    category: "Pro",
    analogy: "Subnetting is like dividing a large office building into different departments. It keeps the marketing people's chatter from distracting the accounting team.",
    concepts: [
      { title: "CIDR Notation", description: "The modern way to represent subnet masks.", icon: "format_list_numbered", colorClass: "bg-red-50 text-red-600" },
      { title: "Broadcast Domains", description: "Reducing traffic by segmenting networks.", icon: "rss_feed", colorClass: "bg-cyan-50 text-cyan-600" }
    ]
  },
  {
    id: "switching",
    moduleNumber: "05",
    title: "Switching Fundamentals",
    shortDescription: "The magic of MAC addresses and frame forwarding.",
    fullDescription: "Learn how switches build MAC address tables and make line-speed decisions.",
    xp: 300,
    time: "15 min",
    icon: "settings_ethernet",
    category: "Basics",
    analogy: "A switch is like a smart receptionist in a large company. Instead of shouting every message to everyone, they only send the mail to the specific person's desk.",
    concepts: [
      { title: "MAC Tables", description: "How switches map ports to device addresses.", icon: "table_rows", colorClass: "bg-blue-50 text-blue-600" },
      { title: "Store & Forward", description: "Different switching methods for speed and accuracy.", icon: "speed", colorClass: "bg-purple-50 text-purple-600" }
    ]
  },
  {
    id: "vlans",
    moduleNumber: "06",
    title: "VLANs & Trunking",
    shortDescription: "Segment your network without buying new hardware.",
    fullDescription: "Master virtual LANs and the 802.1Q standard for efficient traffic management.",
    xp: 500,
    time: "18 min",
    icon: "layers",
    category: "Core",
    analogy: "VLANs are like having different 'members-only' clubs sharing the same community center. Even though everyone is in the same building, they can't see into each other's meetings.",
    concepts: [
      { title: "VLAN Tagging", description: "How 802.1Q works at the packet level.", icon: "label", colorClass: "bg-amber-50 text-amber-600" },
      { title: "Access vs Trunk", description: "Configuring ports for single or multi-VLAN traffic.", icon: "alt_route", colorClass: "bg-green-50 text-green-600" }
    ]
  },
  {
    id: "wireless",
    moduleNumber: "07",
    title: "Wireless Networking",
    shortDescription: "Connecting the world without a single wire.",
    fullDescription: "Explore 802.11 standards, SSIDs, and modern WiFi security protocols.",
    xp: 400,
    time: "15 min",
    icon: "wifi",
    category: "Core",
    analogy: "WiFi is like a conversation at a crowded party. Everyone is talking through the air, so you have to learn how to hear only your friend and ignore the background noise.",
    concepts: [
      { title: "WPA3 Security", description: "The latest in wireless encryption standards.", icon: "security", colorClass: "bg-blue-50 text-blue-600" },
      { title: "Channels & Bands", description: "Optimizing 2.4GHz and 5GHz performance.", icon: "signal_cellular_alt", colorClass: "bg-teal-50 text-teal-600" }
    ]
  },
  {
    id: "network-security",
    moduleNumber: "08",
    title: "Security Hardening",
    shortDescription: "Protecting your infrastructure from common attacks.",
    fullDescription: "Implement port security, DHCP snooping, and basic authentication protocols.",
    xp: 700,
    time: "25 min",
    icon: "shield_lock",
    category: "Advanced",
    analogy: "Network security is like having a bouncer at a club who checks IDs and makes sure nobody sneaks in through the back window or the kitchen door.",
    concepts: [
      { title: "Port Security", description: "Limiting MAC addresses per switch port.", icon: "lock", colorClass: "bg-red-50 text-red-600" },
      { title: "DHCP Snooping", description: "Preventing rogue DHCP servers from hijacking traffic.", icon: "visibility", colorClass: "bg-indigo-50 text-indigo-600" }
    ]
  },
  {
    id: "firewalls",
    moduleNumber: "09",
    title: "Firewall Policy",
    shortDescription: "Defining the perimeter of your digital fortress.",
    fullDescription: "Learn to write effective ACLs and stateful inspection policies.",
    xp: 650,
    time: "22 min",
    icon: "door_front",
    category: "Advanced",
    analogy: "A firewall is like a security gate at a gated community. It has a list of 'invited guests' and won't let anyone in (or out) unless they are on the approved list.",
    concepts: [
      { title: "Access Lists", description: "Permit vs Deny based on IP and Port.", icon: "list", colorClass: "bg-slate-50 text-slate-600" },
      { title: "Stateful Inspection", description: "How firewalls track established connections.", icon: "track_changes", colorClass: "bg-cyan-50 text-cyan-600" }
    ]
  },
  {
    id: "wan-tech",
    moduleNumber: "10",
    title: "WAN & Site Connectivity",
    shortDescription: "Bridging the gap between distant offices.",
    fullDescription: "Explore MPLS, SD-WAN, and the fundamentals of site-to-site VPNs.",
    xp: 800,
    time: "30 min",
    icon: "public",
    category: "Advanced",
    analogy: "WAN is like a system of inter-state highways and international flights that connect cities (networks) that are hundreds of miles apart.",
    concepts: [
      { title: "SD-WAN", description: "Software-defined wide area networking explained.", icon: "terminal", colorClass: "bg-blue-50 text-blue-600" },
      { title: "IPsec VPNs", description: "Encrypting traffic across the public internet.", icon: "vpn_key", colorClass: "bg-amber-50 text-amber-600" }
    ]
  },
  {
    id: "monitoring",
    moduleNumber: "11",
    title: "Observability & Monitoring",
    shortDescription: "Keeping a constant eye on network health.",
    fullDescription: "Use SNMP, Syslog, and NetFlow to identify issues before they happen.",
    xp: 450,
    time: "20 min",
    icon: "monitoring",
    category: "Advanced",
    analogy: "Network monitoring is like the health app on your phone. It keeps track of your heart rate (traffic) and lets you know if anything looks unusual before you get sick.",
    concepts: [
      { title: "SNMP Traps", description: "Getting real-time alerts from your hardware.", icon: "notification_important", colorClass: "bg-orange-50 text-orange-600" },
      { title: "Syslog Analysis", description: "Reading the story told by device logs.", icon: "description", colorClass: "bg-blue-50 text-blue-600" }
    ]
  },
  {
    id: "cloud-networking",
    moduleNumber: "12",
    title: "Cloud Infrastructure",
    shortDescription: "Networking in the era of virtualization.",
    fullDescription: "Learn how VPCs, Gateways, and Cloud Routers mirror physical hardware.",
    xp: 900,
    time: "35 min",
    icon: "cloud",
    category: "Pro",
    analogy: "Cloud networking is like renting a magic invisible warehouse. You don't have to build the walls or buy the shelves; you just use them whenever you need more space.",
    concepts: [
      { title: "VPC Peering", description: "Connecting isolated cloud networks.", icon: "hub", colorClass: "bg-blue-50 text-blue-600" },
      { title: "Cloud Gateways", description: "The interface between local and cloud infrastructure.", icon: "gate", colorClass: "bg-purple-50 text-purple-600" }
    ]
  }
];
