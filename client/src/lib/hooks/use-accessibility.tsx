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
      // Apply font size using data attribute
      const htmlElement = document.documentElement;
      
      // Remove any existing data-font-size attributes
      htmlElement.removeAttribute('data-font-size');
      
      // Calculate font size multiplier
      if (options.fontSize > 100) {
        const fontSizeMultiplier = options.fontSize / 100;
        if (fontSizeMultiplier >= 1.25) {
          if (fontSizeMultiplier >= 2) {
            htmlElement.setAttribute('data-font-size', '2');
          } else if (fontSizeMultiplier >= 1.75) {
            htmlElement.setAttribute('data-font-size', '1.75');
          } else if (fontSizeMultiplier >= 1.5) {
            htmlElement.setAttribute('data-font-size', '1.5');
          } else {
            htmlElement.setAttribute('data-font-size', '1.25');
          }
        }
      }
      
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