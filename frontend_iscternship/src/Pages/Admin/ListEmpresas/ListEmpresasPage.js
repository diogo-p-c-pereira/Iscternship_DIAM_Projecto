import React from 'react';
import { motion } from 'framer-motion';
import ListEmpresas from './ListEmpresas.js';


const ListEmpresasPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <ListEmpresas />
  </motion.div>
);

export default ListEmpresasPage;