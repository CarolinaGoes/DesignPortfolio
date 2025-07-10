import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiRefreshCw } from 'react-icons/fi';
import { slideFromLeft } from '@/lib/animations';
import { useAccessibility } from '@/lib/hooks/use-accessibility';
import { Label } from '@/components/ui/label';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    options, 
    setFontSize, 
    toggleHighContrast,
    toggleReduceMotion,
    resetSettings
  } = useAccessibility();

  return (
    <div className="fixed top-24 left-0 z-50 transform transition-transform duration-300">
      <Button 
        variant="default"
        size="icon"
        className="rounded-r-lg rounded-l-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Opções de acessibilidade"
        aria-expanded={isOpen}
        aria-controls="accessibility-menu-panel"
      >
        <FiEye className="h-5 w-5" />
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="accessibility-menu-panel"
            className="bg-card rounded-r-lg shadow-xl p-4 mt-2 w-64"
            variants={slideFromLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h3 className="text-lg font-semibold mb-4">Acessibilidade</h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="font-size" className="text-sm font-medium mb-1 block">
                  Tamanho da fonte: {options.fontSize}%
                </Label>
                <Slider 
                  id="font-size" 
                  min={80} 
                  max={200} 
                  step={10}
                  value={[options.fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="py-4"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="text-sm font-medium cursor-pointer">
                  Alto contraste
                </Label>
                <Switch 
                  id="high-contrast" 
                  checked={options.highContrast}
                  onCheckedChange={toggleHighContrast}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="reduce-motion" className="text-sm font-medium cursor-pointer">
                  Reduzir animações
                </Label>
                <Switch 
                  id="reduce-motion" 
                  checked={options.reduceMotion}
                  onCheckedChange={toggleReduceMotion}
                />
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={resetSettings}
              >
                <FiRefreshCw className="h-4 w-4" />
                <span>Resetar configurações</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
