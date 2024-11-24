// src/components/AnimationWrapper.js
import React from 'react';
import { motion } from 'framer-motion';

const AnimationWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export default AnimationWrapper;
