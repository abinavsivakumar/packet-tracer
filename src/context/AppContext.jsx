import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadState, saveState } from '../utils/storage';
import { challenges } from '../utils/challenges';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const initialUserState = {
  name: "Sam Miller",
  level: 12,
  xp: 1240,
  xpToNext: 2000,
  unlockedDevices: 18,
  completedChallenges: 42,
  completedChallengeIds: ['ch_1'], // Starting with first one done
  badges: ["rocket_launch", "shield", "hub"],
  rank: "Architect",
  completedModules: ["intro-networking", "ip-addressing", "routing-basics", "subnetting"] 
};

const initialSimulationState = {
  nodes: [],
  edges: [],
  result: null,
  isRunning: false
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = loadState();
    if (saved && saved.user === null) return null;
    if (!saved?.user) return initialUserState;
    // Merge saved user with initialUserState to ensure new fields are present
    return { ...initialUserState, ...saved.user };
  });

  const [simulation, setSimulationState] = useState(() => {
    const saved = loadState();
    return saved?.simulation || initialSimulationState;
  });

  const [activeChallenge, setActiveChallenge] = useState(() => {
    const saved = loadState();
    return saved?.activeChallenge || null;
  });

  const [toast, setToast] = useState(null);

  // Persist state on change
  useEffect(() => {
    saveState({ user, simulation, activeChallenge });
  }, [user, simulation, activeChallenge]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const addXP = (amount) => {
    setUser(prev => {
      if (!prev) return null;
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      let newXPToNext = prev.xpToNext;

      if (newXP >= newXPToNext) {
        newLevel += 1;
        newXP -= newXPToNext;
        newXPToNext = Math.floor(newXPToNext * 1.5);
        
        // Notify of level up
        showToast(`🎉 Level Up! You are now Level ${newLevel}`, 'success');

        // Check for device unlocks
        if (newLevel === 3) showToast('🔓 UNLOCKED: Routers are now available in the Builder!', 'info');
        if (newLevel === 5) showToast('🔓 UNLOCKED: Servers are now available in the Builder!', 'info');
        if (newLevel === 8) showToast('🔓 UNLOCKED: Advanced security tools are now available!', 'info');
      } else {
        showToast(`+${amount} XP Earned`, 'info');
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNext: newXPToNext
      };
    });
  };

  const login = () => {
    setUser(initialUserState);
    showToast('Welcome back, Sam Miller!', 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out successfully', 'info');
  };

  const completeChallenge = (challengeId) => {
    const challenge = challenges.find(ch => ch.id === challengeId);
    if (!challenge) return;

    setUser(prev => {
        if (!prev) return null;
        const safeIds = prev.completedChallengeIds || [];
        if (safeIds.includes(challengeId)) return prev;
        return {
            ...prev,
            completedChallengeIds: [...safeIds, challengeId],
            completedChallenges: (prev.completedChallenges || 0) + 1
        };
    });
    addXP(challenge.xpReward || 100);
    showToast(`Challenge Completed! +${challenge.xpReward || 100} XP`, 'success');
    setActiveChallenge(null); // Clear active challenge on success
  };

  const completeModule = (moduleId) => {
    setUser(prev => {
      if (!prev) return null;
      const safeCompletedModules = prev.completedModules || [];
      if (safeCompletedModules.includes(moduleId)) return prev;
      return {
        ...prev,
        completedModules: [...safeCompletedModules, moduleId],
        completedChallenges: (prev.completedChallenges || 0) + 1
      };
    });
    addXP(500); // Reward for completion
    showToast('Module Completed! Level up your skills.', 'success');
  };

  const setSimulation = (nodes, edges) => {
    setSimulationState(prev => ({
      ...prev,
      nodes,
      edges
    }));
  };

  const runSimulation = () => {
    setSimulationState(prev => ({ ...prev, isRunning: true }));
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    simulation,
    setSimulationState,
    activeChallenge,
    setActiveChallenge,
    addXP,
    completeChallenge,
    completeModule,
    setSimulation,
    runSimulation,
    toast,
    setToast,
    showToast
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
