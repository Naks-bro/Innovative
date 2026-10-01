import React from 'react';
import { motion } from 'motion/react';
import { Shield, Loader2 } from 'lucide-react';

/**
 * Loading screen shown during lazy loading of components
 */
export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-24 h-24 bg-gradient-to-br from-primary-blue via-accent-cyan to-accent-teal rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
        >
          <Shield className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center justify-center gap-2 text-foreground"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-lg">Loading...</span>
        </motion.div>

        <p className="text-sm text-muted-foreground mt-4">
          Preparing your training environment
        </p>
      </motion.div>
    </div>
  );
}
