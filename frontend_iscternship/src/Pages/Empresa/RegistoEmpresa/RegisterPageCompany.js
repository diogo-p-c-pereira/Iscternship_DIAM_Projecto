import React from 'react';
import { motion } from 'framer-motion';
import RegisterFormCompany from './RegisterFormCompanies.js';


const RegisterCompany = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <RegisterFormCompany />
  </motion.div>
);

export default RegisterCompany;