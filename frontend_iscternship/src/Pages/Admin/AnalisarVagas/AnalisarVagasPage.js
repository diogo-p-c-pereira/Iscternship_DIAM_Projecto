import React from 'react';
import { motion } from 'framer-motion';
import AnalisarVagas from './AnalisarVagas.js';


const AnalisarVagasPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <AnalisarVagas />
  </motion.div>
);

export default AnalisarVagasPage;