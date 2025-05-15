import React from 'react';
import { motion } from 'framer-motion';
import PerfilEmpresa from './PerfilEmpresa.js';


const PerfilEmpresaa = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <PerfilEmpresa />
  </motion.div>
);

export default PerfilEmpresaa;