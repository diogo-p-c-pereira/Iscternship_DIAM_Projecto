import React from 'react';
import { motion } from 'framer-motion';
import VagasCandidato from './VagasCandidato.js';


const VagasCandidatoo = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <VagasCandidato />
 </motion.div>
);

export default VagasCandidatoo;