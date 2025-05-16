import React from 'react';
import { motion } from 'framer-motion';
import CandidaturasCandidato from './CandidaturasCandidato.js';


const CandidaturasCandidatoPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <CandidaturasCandidato/>
 </motion.div>
);

export default CandidaturasCandidatoPage;