import React from 'react';
import { motion } from 'framer-motion';
import VagasCompany from './VagasCompany.js';


const VagasEmpresa = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <VagasCompany />
    <br />
  </motion.div>
);

export default VagasEmpresa;