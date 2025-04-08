import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AccessibilityOptions {
  fontSize: number;
  highContrast: boolean;
  reduceMotion: boolean;
}

interface AccessibilityContextType {
  options: AccessibilityOptions;
  setFontSize: (size: number) => void;
  toggleHighContrast: () => void;
  toggleReduceMotion: () => void;
  resetSettings: () => void;
}

const defaultOptions: AccessibilityOptions = {
  fontSize: 100,
  highContrast: false,
  reduceMotion: false
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<AccessibilityOptions>(() => {
    if (typeof window !== 'undefined') {
      const savedOptions = localStorage.getItem('accessibilityOptions');
      if (savedOptions) {
        return JSON.parse(savedOptions);
      }
    }
    return defaultOptions;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Apply font size
      document.documentElement.style.fontSize = `${options.fontSize}%`;
      
      // Apply high contrast
      if (options.highContrast) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
      
      // Apply reduced motion
      if (options.reduceMotion) {
        document.body.classList.add('reduce-motion');
      } else {
        document.body.classList.remove('reduce-motion');
      }
      
      // Save settings to localStorage
      localStorage.setItem('accessibilityOptions', JSON.stringify(options));
    }
  }, [options]);

  const setFontSize = (size: number) => {
    setOptions(prev => ({ ...prev, fontSize: size }));
  };

  const toggleHighContrast = () => {
    setOptions(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleReduceMotion = () => {
    setOptions(prev => ({ ...prev, reduceMotion: !prev.reduceMotion }));
  };

  const resetSettings = () => {
    setOptions(defaultOptions);
  };

  return (
    <AccessibilityContext.Provider 
      value={{
        options, 
        setFontSize, 
        toggleHighContrast, 
        toggleReduceMotion, 
        resetSettings 
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  
  return context;
}