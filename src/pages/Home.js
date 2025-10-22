import React, { useState, useEffect } from "react";
import { Typography, Button, Container, Box, AppBar, Toolbar, Card, CardContent, Chip, Grid, TextField, IconButton, Divider, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Fade, Zoom } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PublicIcon from "@mui/icons-material/Public";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo.png";

const cyan = "#00cba9";
const pink = "#ec4899";
const orange = "#f97316";
const purple = "#a855f7";

const courses = [
  {
    id: "ACCA",
    name: "ACCA",
    fullName: "Association of Chartered Certified Accountants",
    level: "Professional",
    rating: 4.9,
    description: "Globally recognized professional accounting qualification with comprehensive coverage of financial reporting, audit, and business strategy.",
    duration: "2-3 Years",
    students: "2000+ Students",
    color: cyan,
    features: ["Live Classes", "Recorded Sessions", "Practice Tests", "Expert Support"]
  },
  {
    id: "CMA",
    name: "CMA",
    fullName: "Certified Management Accountant",
    level: "Advanced",
    rating: 4.8,
    description: "Premier certification for management accounting and financial management professionals focusing on strategic decision-making.",
    duration: "12-18 Months",
    students: "1500+ Students",
    color: pink,
    features: ["Interactive Learning", "Case Studies", "Mock Exams", "Career Guidance"]
  },
  {
    id: "CIA",
    name: "CIA",
    fullName: "Certified Internal Auditor",
    level: "Professional",
    rating: 4.7,
    description: "The only globally accepted certification for internal auditors, demonstrating competency in risk management and governance.",
    duration: "6-12 Months",
    students: "1000+ Students",
    color: orange,
    features: ["Practical Training", "Real-world Projects", "Mentorship", "Job Placement"]
  },
  {
    id: "CFA",
    name: "CFA",
    fullName: "Chartered Financial Analyst",
    level: "Expert",
    rating: 4.9,
    description: "Gold standard for investment professionals covering portfolio management, financial analysis, and ethics.",
    duration: "2-4 Years",
    students: "800+ Students",
    color: purple,
    features: ["Comprehensive Curriculum", "Industry Experts", "Research Tools", "Networking"]
  }
];

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "Courses", action: () => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "About", action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Contact", action: () => {} }
  ];

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <AppBar 
        position="sticky" 
        sx={{ 
          bgcolor: "white", 
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease"
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1, px: 0 }}>
            {/* Left Side - Logo + Contact Info */}
            <Box display="flex" alignItems="center" gap={isMobile ? 2 : 4}>
              <Box display="flex" alignItems="center" gap={2}>
                <img src={logo} alt="Dr. Labeeb Academy Logo" style={{ height: isMobile ? 40 : 50, width: 'auto' }} />
                {!isMobile && (
                  <Box>
                    <Typography 
                      variant="h6" 
                      fontWeight={700}
                      sx={{
                        background: `linear-gradient(135deg, ${cyan}, ${purple})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}
                    >
                      Dr. Labeeb Academy
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Labeeb Management Consultants
                    </Typography>
                  </Box>
                )}
              </Box>
              
              {!isMobile && (
                <Box display="flex" gap={3}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon sx={{ fontSize: 16, color: cyan }} />
                    <Typography 
                      component="a" 
                      href="tel:+96892002435"
                      variant="body2" 
                      color="#64748b" 
                      fontWeight={500} 
                      fontSize={13}
                      sx={{ textDecoration: "none", "&:hover": { color: cyan } }}
                    >
                      +968 9200 2435
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon sx={{ fontSize: 16, color: cyan }} />
                    <Typography 
                      component="a" 
                      href="mailto:info@drlabeebacademy.com"
                      variant="body2" 
                      color="#64748b" 
                      fontWeight={500} 
                      fontSize={13}
                      sx={{ textDecoration: "none", "&:hover": { color: cyan } }}
                    >
                      info@drlabeebacademy.com
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Right Side - Navigation Links */}
            {isMobile ? (
              <IconButton onClick={toggleMobileMenu} sx={{ color: "#64748b" }}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Box display="flex" gap={2}>
                {navItems.map((item) => (
                  <Button 
                    key={item.label}
                    onClick={item.action}
                    sx={{ 
                      color: "#64748b", 
                      fontWeight: 600,
                      position: "relative",
                      "&:hover": {
                        color: cyan,
                        "&::after": {
                          width: "100%"
                        }
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: 0,
                        height: 2,
                        bgcolor: cyan,
                        transition: "width 0.3s ease"
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    background: `linear-gradient(135deg, ${cyan}, ${purple})`,
                    fontWeight: 700,
                    px: 3,
                    borderRadius: 3,
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(0, 203, 169, 0.4)"
                    }
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            bgcolor: "white"
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" fontWeight={700} color={cyan}>
              Menu
            </Typography>
            <IconButton onClick={toggleMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem 
                button 
                key={item.label}
                onClick={() => {
                  item.action();
                  toggleMobileMenu();
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": {
                    bgcolor: `${cyan}10`
                  }
                }}
              >
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    color: "#64748b"
                  }}
                />
              </ListItem>
            ))}
            <ListItem>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  navigate("/login");
                  toggleMobileMenu();
                }}
                sx={{
                  background: `linear-gradient(135deg, ${cyan}, ${purple})`,
                  fontWeight: 700,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none"
                }}
              >
                Login
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: isMobile ? 6 : 10, pb: 8 }}>
        <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems="center" justifyContent="space-between" gap={isMobile ? 6 : 0}>
          <Fade in={visible} timeout={1000}>
            <Box flex={1}>
              <Zoom in={visible} timeout={1200}>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    bgcolor: "#e0f2fe",
                    color: cyan,
                    borderRadius: 2,
                    mb: 2,
                    fontWeight: 600,
                    fontSize: 14
                  }}
                >
                  🏆 Professional Certification Leader
                </Box>
              </Zoom>
              <Typography variant={isMobile ? "h3" : "h2"} fontWeight={900} color="#1e293b" lineHeight={1.2} mb={3}>
                Expert-led{" "}
                <span style={{ background: `linear-gradient(135deg, ${cyan}, ${purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Interactive
                </span>
                <br />
                e-Learning
              </Typography>
              <Typography variant={isMobile ? "body1" : "h6"} color="#64748b" mb={4} lineHeight={1.6}>
                Master financial certifications with TIME, VALUE, and MONEY optimization. Join thousands of professionals advancing their careers through our comprehensive ACCA, CMA, CIA, and CFA programs.
              </Typography>
              <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth={isMobile}
                  endIcon={<PlayArrowIcon />}
                  onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
                  sx={{
                    background: `linear-gradient(135deg, ${cyan}, ${purple})`,
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: 16,
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 203, 169, 0.4)"
                    }
                  }}
                >
                  Explore Courses
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth={isMobile}
                  sx={{
                    color: "#64748b",
                    borderColor: "#cbd5e1",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: 16,
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: cyan,
                      color: cyan,
                      transform: "translateY(-2px)"
                    }
                  }}
                >
                  Watch Demo
                </Button>
              </Box>

              {/* Stats */}
              <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={isMobile ? 3 : 6} mt={6}>
                <Zoom in={visible} timeout={1400}>
                  <Box>
                    <Typography variant="h4" fontWeight={900} color={cyan}>
                      200+
                    </Typography>
                    <Typography variant="body2" color="#64748b">
                      Students
                    </Typography>
                  </Box>
                </Zoom>
                <Zoom in={visible} timeout={1600}>
                  <Box>
                    <Typography variant="h4" fontWeight={900} color={pink}>
                      85%+
                    </Typography>
                    <Typography variant="body2" color="#64748b">
                      Success Rate
                    </Typography>
                  </Box>
                </Zoom>
                <Zoom in={visible} timeout={1800}>
                  <Box>
                    <Typography variant="h4" fontWeight={900} color={orange}>
                      12+
                    </Typography>
                    <Typography variant="body2" color="#64748b">
                      Countries
                    </Typography>
                  </Box>
                </Zoom>
              </Box>
            </Box>
          </Fade>

          {/* Right Side Graphics */}
          {!isMobile && (
            <Fade in={visible} timeout={1500}>
              <Box flex={1} display="flex" justifyContent="center" alignItems="center" position="relative" minHeight={400}>
                {/* Top Triangle */}
                <Box
                  sx={{
                    width: 280,
                    height: 140,
                    bgcolor: cyan,
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pt: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(-50%) translateY(-5px)"
                    }
                  }}
                >
                  <Typography variant="h4" fontWeight={900} color="white">
                    TIME
                  </Typography>
                </Box>

                {/* Left Arrow */}
                <Box
                  sx={{
                    width: 150,
                    height: 110,
                    bgcolor: pink,
                    clipPath: "polygon(0 0, 100% 100%, 100% 0)",
                    position: "absolute",
                    left: 20,
                    bottom: 0,
                    zIndex: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(-5px)"
                    }
                  }}
                />

                {/* Right Arrow */}
                <Box
                  sx={{
                    width: 150,
                    height: 110,
                    bgcolor: orange,
                    clipPath: "polygon(100% 0, 0 100%, 0 0)",
                    position: "absolute",
                    right: 20,
                    bottom: 0,
                    zIndex: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(5px)"
                    }
                  }}
                />

                {/* Center White Card */}
                <Box
                  sx={{
                    width: 320,
                    minHeight: 220,
                    bgcolor: "white",
                    borderRadius: 4,
                    boxShadow: "0 16px 40px rgba(0,0,0,0.1)",
                    position: "absolute",
                    top: 110,
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
                    }
                  }}
                >
                  <PublicIcon sx={{ fontSize: 60, color: cyan, mb: 2 }} />
                  <Typography variant="h6" fontWeight={700} color="#1e293b" mb={1}>
                    Global Access
                  </Typography>
                  <Typography variant="body2" color="#64748b" textAlign="center">
                    Professional Certification & Management Consultancy
                  </Typography>
                </Box>
              </Box>
            </Fade>
          )}
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box display="flex" gap={4} flexWrap="wrap" justifyContent="center">
          {[
            { icon: TrendingUpIcon, title: "TIME", desc: "Optimized learning paths that respect your schedule", color: cyan },
            { icon: SchoolIcon, title: "VALUE", desc: "Maximum return with industry-relevant skills", color: pink },
            { icon: PublicIcon, title: "MONEY", desc: "Cost-effective programs enhancing earning potential", color: orange }
          ].map((feature, index) => (
            <Zoom in={visible} timeout={1000 + index * 200} key={index}>
              <Box 
                sx={{ 
                  textAlign: "center", 
                  p: 4, 
                  bgcolor: "white", 
                  borderRadius: 4, 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  flex: "1 1 300px",
                  maxWidth: 350,
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.1)"
                  }
                }}
              >
                <feature.icon sx={{ fontSize: 60, color: feature.color, mb: 2 }} />
                <Typography variant="h6" fontWeight={700} color="#1e293b" mb={1}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="#64748b">
                  {feature.desc}
                </Typography>
              </Box>
            </Zoom>
          ))}
        </Box>
      </Container>

      {/* Courses Section - 2x2 Grid */}
      <Box id="courses" sx={{ bgcolor: "white", py: 10 }}>
        <Container maxWidth="lg">
          <Fade in={visible} timeout={1000}>
            <Box textAlign="center" mb={6}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 3,
                  py: 1,
                  bgcolor: "#e0f2fe",
                  color: cyan,
                  borderRadius: 3,
                  mb: 3,
                  fontWeight: 700
                }}
              >
                <SchoolIcon sx={{ fontSize: 24 }} />
                <Typography variant="body1" fontWeight={700}>
                  Professional Certifications
                </Typography>
              </Box>
              
              <Typography variant="h3" fontWeight={900} color="#1e293b" mb={2}>
                Financial{" "}
                <span 
                  style={{ 
                    background: `linear-gradient(135deg, ${cyan}, ${pink})`, 
                    WebkitBackgroundClip: "text", 
                    WebkitTextFillColor: "transparent" 
                  }}
                >
                  Certification
                </span>{" "}
                Courses
              </Typography>
              
              <Typography variant="body1" color="#94a3b8" mt={1}>
                Master globally recognized certifications with our expert-led interactive learning platform
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4}>
            {courses.map((course, index) => (
              <Grid item xs={12} md={6} key={course.id}>
                <Zoom in={visible} timeout={1200 + index * 200}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      border: `2px solid ${course.color}20`,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                        transform: "translateY(-8px) scale(1.02)",
                        borderColor: course.color
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                        <Box>
                          <Typography variant="h4" fontWeight={900} color={course.color} mb={0.5}>
                            {course.name}
                          </Typography>
                          <Chip
                            label={course.level}
                            size="small"
                            sx={{
                              bgcolor: `${course.color}20`,
                              color: course.color,
                              fontWeight: 700
                            }}
                          />
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <StarIcon sx={{ color: orange, fontSize: 20 }} />
                          <Typography variant="h6" fontWeight={700} color="#1e293b">
                            {course.rating}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="body1" fontWeight={600} color="#64748b" mb={2}>
                        {course.fullName}
                      </Typography>

                      <Typography variant="body2" color="#64748b" mb={3} lineHeight={1.7} flexGrow={1}>
                        {course.description}
                      </Typography>

                      <Box display="flex" gap={3} mb={3}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <AccessTimeIcon sx={{ color: course.color, fontSize: 20 }} />
                          <Typography variant="body2" color="#64748b" fontWeight={600}>
                            {course.duration}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <PeopleIcon sx={{ color: course.color, fontSize: 20 }} />
                          <Typography variant="body2" color="#64748b" fontWeight={600}>
                            {course.students}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="subtitle2" fontWeight={700} color="#1e293b" mb={1}>
                        Course Features:
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                        {course.features.map((feature, idx) => (
                          <Chip
                            key={idx}
                            label={feature}
                            size="small"
                            sx={{
                              bgcolor: "#f1f5f9",
                              color: "#64748b",
                              fontWeight: 600,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                bgcolor: `${course.color}20`,
                                color: course.color
                              }
                            }}
                          />
                        ))}
                      </Box>

                      <Box display="flex" gap={2}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => navigate("/signup")}
                          sx={{
                            bgcolor: course.color,
                            fontWeight: 700,
                            py: 1.2,
                            borderRadius: 2,
                            textTransform: "none",
                            transition: "all 0.3s ease",
                            "&:hover": { 
                              bgcolor: course.color, 
                              opacity: 0.9,
                              transform: "scale(1.05)"
                            }
                          }}
                        >
                          Enroll Now
                        </Button>
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{
                            borderColor: course.color,
                            color: course.color,
                            fontWeight: 700,
                            py: 1.2,
                            borderRadius: 2,
                            textTransform: "none",
                            transition: "all 0.3s ease",
                            "&:hover": { 
                              borderColor: course.color, 
                              bgcolor: `${course.color}10`,
                              transform: "scale(1.05)"
                            }
                          }}
                        >
                          Learn More
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" sx={{ bgcolor: "#f8fafc", py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Fade in={visible} timeout={1000}>
                <Box>
                  <Box display="flex" alignItems="center" gap={1} mb={3}>
                    <LanguageIcon sx={{ color: cyan }} />
                    <Typography variant="subtitle1" fontWeight={700} color={cyan}>
                      Global Recognition
                    </Typography>
                  </Box>
                  <Typography variant="h3" fontWeight={900} color="#1e293b" mb={3}>
                    Leading Professional Development Platform
                  </Typography>
                  <Typography variant="body1" color="#64748b" mb={4} lineHeight={1.8}>
                    Dr. Labeeb Academy, under Labeeb Management Consultants SPC, has been at the forefront of professional education for over 30 years. We specialize in delivering world-class financial certification programs and management consultancy services to professionals worldwide.
                  </Typography>

                  <Grid container spacing={2}>
                    {[
                      { icon: <CheckCircleIcon sx={{ color: cyan }} />, text: "Expert-led Interactive e-Learning" },
                      { icon: <CheckCircleIcon sx={{ color: cyan }} />, text: "Professional Certification Programs" },
                      { icon: <CheckCircleIcon sx={{ color: cyan }} />, text: "Global Access & Recognition" },
                      { icon: <CheckCircleIcon sx={{ color: cyan }} />, text: "Management & Counselling Services" },
                      { icon: <CheckCircleIcon sx={{ color: cyan }} />, text: "Corporate Training Solutions" },
                      { icon: <CheckCircleIcon sx={{ color: cyan }} />, text: "24/7 Learning Support" }
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Zoom in={visible} timeout={1200 + index * 100}>
                          <Box display="flex" alignItems="center" gap={1}>
                            {item.icon}
                            <Typography variant="body2" color="#64748b" fontWeight={600}>
                              {item.text}
                            </Typography>
                          </Box>
                        </Zoom>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                {[
                  { num: "30+", text: "Years of Excellence" },
                  { num: "100+", text: "Successful Students and affiliates" },
                  { num: "85%", text: "Pass Rate" },
                  { num: "12+", text: "Countries Served" }
                ].map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <Zoom in={visible} timeout={1400 + index * 100}>
                      <Box
                        sx={{
                          bgcolor: cyan,
                          borderRadius: 4,
                          p: 4,
                          textAlign: "center",
                          color: "white",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-10px) scale(1.05)",
                            boxShadow: "0 12px 30px rgba(0, 203, 169, 0.4)"
                          }
                        }}
                      >
                        <Typography variant="h2" fontWeight={900} mb={1}>
                          {stat.num}
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {stat.text}
                        </Typography>
                      </Box>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>

              <Fade in={visible} timeout={1800}>
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: 4,
                    p: 4,
                    mt: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
                    }
                  }}
                >
                  <Typography variant="h6" fontWeight={700} color="#1e293b" mb={2}>
                    Our Mission
                  </Typography>
                  <Typography variant="body2" color="#64748b" lineHeight={1.7}>
                    To empower professionals globally with cutting-edge financial certifications and management expertise, ensuring optimal Time utilization, exceptional Value delivery, and sustainable Money growth for our students and corporate partners.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#f1f5f9", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Company Info */}
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <img src={logo} alt="Dr. Labeeb Academy Logo" style={{ height: 40, width: 'auto' }} />
                <Box>
                  <Typography variant="h6" fontWeight={700} color="#1e293b">
                    Dr. Labeeb Academy
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Labeeb Management Consultants
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="#64748b" mb={3} lineHeight={1.7}>
                Empowering professionals globally with expert-led interactive e-learning, professional certifications, and management consultancy services.
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon sx={{ fontSize: 18, color: cyan }} />
                  <Typography 
                    component="a" 
                    href="tel:+96892002435"
                    variant="body2" 
                    color="#64748b"
                    sx={{ 
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      "&:hover": { color: cyan }
                    }}
                  >
                    +968 9200 2435
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <EmailIcon sx={{ fontSize: 18, color: cyan }} />
                  <Typography 
                    component="a" 
                    href="mailto:info@drlabeebacademy.com"
                    variant="body2" 
                    color="#64748b"
                    sx={{ 
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      "&:hover": { color: cyan }
                    }}
                  >
                    info@drlabeebacademy.com
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon sx={{ fontSize: 18, color: cyan }} />
                  <Typography variant="body2" color="#64748b">
                    Muscat, Oman
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" fontWeight={700} color="#1e293b" mb={3}>
                Quick Links
              </Typography>
              <Box display="flex" flexDirection="column" gap={1.5}>
                {["Home", "Courses", "About Us", "Contact"].map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    color="#64748b"
                    sx={{ 
                      cursor: "pointer", 
                      transition: "all 0.3s ease",
                      "&:hover": { color: cyan, paddingLeft: "8px" } 
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* Certifications */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" fontWeight={700} color="#1e293b" mb={3}>
                Certifications
              </Typography>
              <Box display="flex" flexDirection="column" gap={1.5}>
                {["ACCA Certification", "CMA Program", "CIA Training", "CFA Preparation"].map((cert) => (
                  <Typography
                    key={cert}
                    variant="body2"
                    color="#64748b"
                    sx={{ 
                      cursor: "pointer", 
                      transition: "all 0.3s ease",
                      "&:hover": { color: cyan, paddingLeft: "8px" } 
                    }}
                  >
                    {cert}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* Our Services */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" fontWeight={700} color="#1e293b" mb={3}>
                Our Services
              </Typography>
              <Box display="flex" flexDirection="column" gap={1.5}>
                {["Management Consultancy", "Corporate Training", "Career Counselling", "Online Learning"].map((service) => (
                  <Typography
                    key={service}
                    variant="body2"
                    color="#64748b"
                    sx={{ 
                      cursor: "pointer", 
                      transition: "all 0.3s ease",
                      "&:hover": { color: cyan, paddingLeft: "8px" } 
                    }}
                  >
                    {service}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* Newsletter - Stay Updated (Far Right) */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" fontWeight={700} color="#1e293b" mb={2}>
                Stay Updated
              </Typography>
              <Typography variant="body2" color="#64748b" mb={3}>
                Subscribe to our newsletter for course updates, industry insights, and career tips.
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your email"
                size="small"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }
                  }
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: cyan,
                  fontWeight: 700,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    bgcolor: cyan, 
                    opacity: 0.9,
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0, 203, 169, 0.4)"
                  }
                }}
              >
                Subscribe
              </Button>
              <Box display="flex" gap={1} mt={3}>
                <Typography variant="subtitle2" fontWeight={700} color="#1e293b" mr={1}>
                  Connect with us
                </Typography>
              </Box>
              <Box display="flex" gap={1} mt={1}>
                {[InstagramIcon, LinkedInIcon, YouTubeIcon].map((Icon, index) => (
                  <IconButton 
                    key={index}
                    size="small" 
                    sx={{ 
                      bgcolor: "white", 
                      transition: "all 0.3s ease",
                      "&:hover": { 
                        bgcolor: cyan, 
                        color: "white",
                        transform: "translateY(-3px) scale(1.1)"
                      } 
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" alignItems="center" gap={isMobile ? 2 : 0}>
            <Typography variant="body2" color="#64748b" textAlign={isMobile ? "center" : "left"}>
              © 2025 Dr. Labeeb Academy - Labeeb Management Consultants SPC. All rights reserved.
            </Typography>
            <Box display="flex" gap={3} flexWrap="wrap" justifyContent="center">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <Typography
                  key={link}
                  variant="body2"
                  color="#64748b"
                  sx={{ 
                    cursor: "pointer", 
                    transition: "color 0.3s ease",
                    "&:hover": { color: cyan } 
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
