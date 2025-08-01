import React from 'react';
import { motion } from 'framer-motion';
import Home from './Home.js';


const HomePage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Home />
  </motion.div>
);

export default HomePage;