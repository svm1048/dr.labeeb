import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const cyan = "#00cba9";
const purple = "#a855f7";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: "student", // Always set as student by default
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const successVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: `linear-gradient(135deg, ${purple}15, ${cyan}15)`,
          position: "relative",
          overflow: "hidden",
          py: 4
        }}
      >
        {/* Animated Background Circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `${purple}20`,
            top: -100,
            left: -100
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `${cyan}20`,
            bottom: -50,
            right: -50
          }}
        />

        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                bgcolor: "white",
                borderRadius: 4,
                p: 5,
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                backdropFilter: "blur(10px)",
                position: "relative"
              }}
            >
              {/* Success Overlay */}
              {success && (
                <motion.div
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${cyan}, ${purple})`,
                    borderRadius: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    color: "white"
                  }}
                >
                  <motion.div
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        bgcolor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2
                      }}
                    >
                      <Typography variant="h2">✓</Typography>
                    </Box>
                  </motion.div>
                  <Typography variant="h4" fontWeight={900} mb={1}>
                    Account Created!
                  </Typography>
                  <Typography variant="body1">
                    Redirecting to login...
                  </Typography>
                </motion.div>
              )}

              {/* Logo & Title */}
              <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                <motion.img
                  src={logo}
                  alt="Dr. Labeeb Academy"
                  style={{ height: 60, marginBottom: 16 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <Typography
                  variant="h4"
                  fontWeight={900}
                  sx={{
                    background: `linear-gradient(135deg, ${purple}, ${cyan})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1
                  }}
                >
                  Join Dr. Labeeb Academy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start your professional certification journey
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSignup}>
                {/* Name Field */}
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: purple }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(168,85,247,0.2)"
                        },
                        "&.Mui-focused": {
                          boxShadow: "0 4px 16px rgba(168,85,247,0.3)"
                        }
                      }
                    }}
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: purple }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(168,85,247,0.2)"
                        },
                        "&.Mui-focused": {
                          boxShadow: "0 4px 16px rgba(168,85,247,0.3)"
                        }
                      }
                    }}
                  />
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: purple }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(168,85,247,0.2)"
                        },
                        "&.Mui-focused": {
                          boxShadow: "0 4px 16px rgba(168,85,247,0.3)"
                        }
                      }
                    }}
                  />
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                      {error}
                    </Typography>
                  </motion.div>
                )}

                {/* Signup Button */}
                <motion.div variants={itemVariants}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    component={motion.button}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    sx={{
                      mt: 3,
                      py: 1.5,
                      fontSize: 16,
                      fontWeight: 700,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${purple}, ${cyan})`,
                      textTransform: "none",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                        transition: "left 0.5s"
                      },
                      "&:hover::before": {
                        left: "100%"
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Create Account"}
                  </Button>
                </motion.div>

                {/* Login Link */}
                <motion.div variants={itemVariants}>
                  <Box display="flex" justifyContent="center" mt={3}>
                    <Typography variant="body2" color="text.secondary">
                      Already have an account?{" "}
                      <Typography
                        component="span"
                        sx={{
                          color: purple,
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            textDecoration: "underline",
                            color: cyan
                          }
                        }}
                        onClick={() => navigate("/login")}
                      >
                        Sign In
                      </Typography>
                    </Typography>
                  </Box>
                </motion.div>

                {/* Back to Home */}
                <motion.div variants={itemVariants}>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748b",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: purple
                        }
                      }}
                      onClick={() => navigate("/")}
                    >
                      ← Back to Home
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </motion.div>
  );
}

export default Signup;
