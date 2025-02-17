import React, { useEffect, useState, useRef } from 'react';
import Web3 from 'web3';
import { Button, Typography, Paper, Container, Grid, Box, TextField, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Logo = () => (
  <motion.svg
    width="200"
    height="40"
    viewBox="0 0 200 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.path
      d="M20 0L36.6025 10V30L20 40L3.39746 30V10L20 0Z"
      fill="#3498db"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
    <motion.path
      d="M20 8L28.6603 13V23L20 28L11.3397 23V13L20 8Z"
      fill="white"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    />
    <motion.text
      x="50"
      y="28"
      fontFamily="Arial, sans-serif"
      fontSize="24"
      fontWeight="bold"
      fill="#333333"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      DecentraPay
    </motion.text>
  </motion.svg>
);

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3498db',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '24px',
  textTransform: 'none',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
}));

const MotionContainer = styled(motion.div)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
});

const MotionHeader = styled(motion.header)({
  padding: '1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  zIndex: 10,
});

const MotionFooter = styled(motion.footer)({
  padding: '1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderTop: '1px solid #e9ecef',
  zIndex: 10,
});

const BlockchainBackground = () => {
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

    const blocks = [];
    const numBlocks = 50;
    const connections = [];

    for (let i = 0; i < numBlocks; i++) {
      blocks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 20,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: `rgba(52, 152, 219, ${Math.random() * 0.5 + 0.5})`,
      });
    }

    const drawBlock = (x, y, size, color) => {
      ctx.beginPath();
      ctx.rect(x - size / 2, y - size / 2, size, size);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawConnection = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const createConnection = () => {
      const a = Math.floor(Math.random() * blocks.length);
      let b = Math.floor(Math.random() * blocks.length);
      while (b === a) {
        b = Math.floor(Math.random() * blocks.length);
      }
      connections.push({ a, b, progress: 0 });
    };

    setInterval(createConnection, 1000);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blocks.forEach((block, i) => {
        block.x += block.vx;
        block.y += block.vy;

        if (block.x < 0 || block.x > canvas.width) block.vx *= -1;
        if (block.y < 0 || block.y > canvas.height) block.vy *= -1;

        drawBlock(block.x, block.y, block.size, block.color);
      });

      connections.forEach((connection, index) => {
        const a = blocks[connection.a];
        const b = blocks[connection.b];
        connection.progress += 0.01;

        if (connection.progress >= 1) {
          connections.splice(index, 1);
        } else {
          const x = a.x + (b.x - a.x) * connection.progress;
          const y = a.y + (b.y - a.y) * connection.progress;
          drawConnection(a.x, a.y, x, y);
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

export default function Gateway() {
  const [transactionHash, setTransactionHash] = useState('');
  const [amount, setAmount] = useState('');
  const [subtotal, setSubtotal] = useState('');
  const [apikey, setApikey] = useState('');
  const [loading, setLoading] = useState(false);
  const toAddress = '0x23073E14C00395c4cE85D9f79E2e25759e793a0e';
  const email = 'harsh@gmail.com';

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const subtotalParam = urlParams.get('subtotal');
    if (subtotalParam) {
      setSubtotal(subtotalParam / 10000000);
      setAmount(subtotalParam / 10000000);
    }
  }, []);

  const placeorder = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          productlist: [], // Add your product list here
        }),
      });

      if (response.ok) {
        console.log('Product ordered successfully');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const saveData = async (hash) => {
    const data = {
      email,
      price: subtotal,
      hash,
    };
    const response = await axios.post('http://localhost:3001/payment/request', data);
    console.log(response);
  };

  const fetchandverifykey = async () => {
    const response = await axios.post('http://localhost:3001/get/api/key', { email });
    console.log(response);
    return response.status === 200;
  };

  const handleTransfer = async () => {
    setLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0];

      const abi = [
        {
          inputs: [
            {
              internalType: 'address payable',
              name: 'toAddress',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'transferEther',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
      ];
      const contractAddress = '0x85A7Fa2815E4e486c25D373ca8e0762985aa77b3';
      const contract = new web3.eth.Contract(abi, contractAddress);

      await fetchandverifykey();

      await contract.methods.transferEther(toAddress, web3.utils.toWei(amount, 'ether'))
        .send({ from: fromAddress, value: web3.utils.toWei(amount, 'ether') })
        .on('transactionHash', async (hash) => {
          await placeorder();
          setTransactionHash(hash);
          await saveData(hash);
          setTimeout(() => {
            window.location.href = 'http://localhost:5173/order';
          }, 2000);
        });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BlockchainBackground />
      <MotionHeader
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />
        </Container>
      </MotionHeader>

      <Container maxWidth="md" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <StyledPaper elevation={3}>
            <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', marginBottom: '1.5rem', color: '#333' }}>
              Complete Your Payment
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount to Pay (ETH)"
                  variant="outlined"
                  value={subtotal}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Recipient Address"
                  variant="outlined"
                  value={toAddress}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
       
            </Grid>
            <Box textAlign="center" marginTop="2rem">
              <StyledButton
                onClick={handleTransfer}
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} color="inherit" />}
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </StyledButton>
            </Box>
            <AnimatePresence>
              {transactionHash && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box marginTop="2rem" textAlign="center">
                    <Typography variant="subtitle1" gutterBottom style={{ color: '#28a745' }}>
                      Payment Successful!
                    </Typography>
                    <Typography variant="body2" style={{ wordBreak: 'break-all', color: '#6c757d' }}>
                      Transaction Hash: {transactionHash}
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </StyledPaper>
        </motion.div>
      </Container>

      <MotionFooter
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <Container maxWidth="lg" style={{ textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            &copy; 2024 DecentraPay. All rights reserved.
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: '0.5rem' }}>
            Need help? <a href="mailto:support@decentrapay.com" style={{ color: '#3498db' }}>Contact Support</a>
          </Typography>
        </Container>
      </MotionFooter>
    </MotionContainer>
  );
}