import React from 'react';
import { motion } from 'framer-motion';
import ListCandidates from './ListCandidates.js';


const ListCandidatesPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <ListCandidates />
  </motion.div>
);

export default ListCandidatesPage;