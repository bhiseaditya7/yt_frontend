import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AlertsContextType {
  isAlertsCollapsed: boolean;
  alertType: 'recognition' | 'detection' | 'vehicle';
  toggleAlertsPanel: () => void;
  setAlertType: (type: 'recognition' | 'detection' | 'vehicle') => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }
  return context;
};

interface AlertsProviderProps {
  children: ReactNode;
}

export const AlertsProvider: React.FC<AlertsProviderProps> = ({ children }) => {
  const [isAlertsCollapsed, setIsAlertsCollapsed] = useState(true);
  const [alertType, setAlertType] = useState<'recognition' | 'detection' | 'vehicle'>('recognition');

  const toggleAlertsPanel = () => {
    setIsAlertsCollapsed(!isAlertsCollapsed);
  };

  return (
    <AlertsContext.Provider value={{ 
      isAlertsCollapsed, 
      alertType, 
      toggleAlertsPanel, 
      setAlertType 
    }}>
      {children}
    </AlertsContext.Provider>
  );
};