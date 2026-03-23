import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadState, saveState } from '../utils/storage';

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
  badges: ["rocket_launch", "shield", "hub"],
  rank: "Architect"
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
    return saved?.user || initialUserState;
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
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      let newXPToNext = prev.xpToNext;

      if (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel += 1;
        newXPToNext = Math.floor(newXPToNext * 1.2);
        showToast(`LEVEL UP! You are now Level ${newLevel}`, 'success');
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

  const completeChallenge = (challengeId) => {
    if (activeChallenge && activeChallenge.id === challengeId) {
      addXP(activeChallenge.xpReward);
      setUser(prev => ({
        ...prev,
        completedChallenges: prev.completedChallenges + 1
      }));
      setActiveChallenge(null);
    }
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
    simulation,
    setSimulationState,
    activeChallenge,
    setActiveChallenge,
    addXP,
    completeChallenge,
    setSimulation,
    runSimulation,
    toast,
    setToast
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
