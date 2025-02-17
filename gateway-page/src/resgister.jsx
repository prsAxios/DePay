  import React, { useEffect, useState, useRef } from 'react';
  import { Alert, Button, Snackbar, Typography, Container, Box } from '@mui/material';
  import { Link } from 'react-scroll';
  import { useNavigate } from 'react-router-dom';
  import { motion, AnimatePresence } from 'framer-motion';
  import Navbar from './components/navbar';
  import Footer from './components/footer';
  import Card from './components/cards';
  import Schemes from './components/schemes';
  import tagSideImage from './assets/homepagewallpaper.png';
  import './App.css';

  const BlockchainAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      const particles = [];
      const connections = [];

      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }

      const drawParticle = (x, y, radius) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(3, 4, 94, 0.5)';
        ctx.fill();
      };

      const drawConnection = (x1, y1, x2, y2) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(3, 4, 94, 0.2)';
        ctx.stroke();
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          drawParticle(particle.x, particle.y, particle.radius);

          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particle.x;
            const dy = particles[j].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              drawConnection(particle.x, particle.y, particles[j].x, particles[j].y);
            }
          }
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
  };

  function Homapage() {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem('email');
    const [Token, setToken] = useState(null);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    
    const handleClose = () => {
      setOpen(false);
    };
    
    const openbox = (message, severity) => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    };

    useEffect(() => {
      setToken(token);
    }, [token]);

    return (
      <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <BlockchainAnimation />
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}>
            <Box sx={{ maxWidth: '50%' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#03045e' }}>
                  Seamless Crypto Payments
                </Typography>
                <Typography variant="body1" paragraph>
                  Welcome to our blockchain payment gateway, designed to revolutionize the e-commerce landscape by providing a secure, efficient, and transparent payment solution.
                  Our gateway integrates seamlessly with your e-commerce platform, allowing customers to make purchases using various cryptocurrencies.
                  Experience the future of payments with our cutting-edge technology.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ 
                    backgroundColor: "#03045e",
                    '&:hover': {
                      backgroundColor: "#020230"
                    }
                  }}
                  onClick={() => {
                    if (email) {
                      navigate('/userdashboard');
                    } else {
                      openbox("Signup before making a key", "error");
                    }
                  }}
                >
                  Make an API Key
                </Button>
              </motion.div>
            </Box>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src={tagSideImage} alt="Blockchain illustration" style={{ maxWidth: '100%', height: 'auto' }} />
            </motion.div>
          </Box>
        </Container>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Schemes />
          </motion.div>
        </Container>
        <Footer />
      </Box>
    );
  }

  export default Homapage;