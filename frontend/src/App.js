
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CommandArea from './components/CommandArea';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

function App() {
  const [message, setMessage] = useState('Tata Motors Project');

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const getKey = () => {
    switch (message) {
      case '__COMMAND__': return 'command';
      case 'This is the engine division webapp': return 'home';
      case 'The project is made in Tata motors': return 'project';
      default: return 'default';
    }
  };

  return (
    <>
      <Navbar setMessage={setMessage} />
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <AnimatePresence mode="wait">
        {message === '__COMMAND__' ? (
          <motion.div
            key={getKey()}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.4 }}
          >
            <CommandArea />
          </motion.div>
        ) : (
          <motion.div
            key={getKey()}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.4 }}
            style={{
              width: '75%',
              margin: '40px auto',
              background: 'linear-gradient(90deg, #007bff, #0056b3)',
              backgroundSize: '200% 100%',
              animation: 'gradientShift 5s ease infinite',
              borderRadius: '8px',
              padding: '20px 30px',
              fontSize: '1.2rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              textAlign: 'left',
              color: 'white',
            }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
