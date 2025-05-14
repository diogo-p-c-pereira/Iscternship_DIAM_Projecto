import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../Login/LoginFormCandidate.js';


const Login = () => (


  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <LoginForm />
  </motion.div>
);

export default Login;