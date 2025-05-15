import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from './RegisterFormCandidate.js';


const RegisterCompany = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <RegisterForm />
 </motion.div>
);

export default RegisterCompany;