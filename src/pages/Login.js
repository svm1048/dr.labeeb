import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const cyan = "#00cba9";
const purple = "#a855f7";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Step 1: Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User logged in:", user.uid);

      // Step 2: Get user document from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        console.log("User data:", userData);
        console.log("User role:", role);

        // Step 3: Navigate based on role
        if (role === "admin") {
          console.log("Navigating to admin dashboard");
          navigate("/admin-dashboard", { replace: true });
        } else if (role === "student") {
          console.log("Navigating to student dashboard");
          navigate("/student-dashboard", { replace: true });
        } else {
          setError("Invalid role. Please contact support.");
          setLoading(false);
        }
      } else {
        setError("User profile not found. Please contact support.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
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
          background: `linear-gradient(135deg, ${cyan}15, ${purple}15)`,
          position: "relative",
          overflow: "hidden"
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
            background: `${cyan}20`,
            top: -100,
            right: -100
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
            background: `${purple}20`,
            bottom: -50,
            left: -50
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
                backdropFilter: "blur(10px)"
              }}
            >
              {/* Logo & Title */}
              <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                <motion.img
                  src={logo}
                  alt="Dr. Labeeb Academy"
                  style={{ height: 60, marginBottom: 16 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <Typography
                  variant="h4"
                  fontWeight={900}
                  sx={{
                    background: `linear-gradient(135deg, ${cyan}, ${purple})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in to continue your learning journey
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleLogin}>
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
                          <EmailIcon sx={{ color: cyan }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(0,203,169,0.2)"
                        },
                        "&.Mui-focused": {
                          boxShadow: "0 4px 16px rgba(0,203,169,0.3)"
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
                          <LockIcon sx={{ color: cyan }} />
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
                          boxShadow: "0 4px 12px rgba(0,203,169,0.2)"
                        },
                        "&.Mui-focused": {
                          boxShadow: "0 4px 16px rgba(0,203,169,0.3)"
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

                {/* Login Button */}
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
                      background: `linear-gradient(135deg, ${cyan}, ${purple})`,
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
                    {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign In"}
                  </Button>
                </motion.div>

                {/* Sign Up Link */}
                <motion.div variants={itemVariants}>
                  <Box display="flex" justifyContent="center" mt={3}>
                    <Typography variant="body2" color="text.secondary">
                      Don't have an account?{" "}
                      <Typography
                        component="span"
                        sx={{
                          color: cyan,
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            textDecoration: "underline",
                            color: purple
                          }
                        }}
                        onClick={() => navigate("/signup")}
                      >
                        Sign Up
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
                          color: cyan
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

export default Login;
