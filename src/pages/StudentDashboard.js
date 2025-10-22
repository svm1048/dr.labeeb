import React, { useState, useEffect } from "react";
import { Typography, Button, Container, Box, AppBar, Toolbar, Card, CardContent, CardMedia, Grid, Chip } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

const cyan = "#00cba9";
const pink = "#ec4899";
const orange = "#f97316";
const purple = "#a855f7";

function StudentDashboard() {
  const [videos, setVideos] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      const videosSnapshot = await getDocs(collection(db, "videos"));
      setVideos(videosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDocs(collection(db, "users"));
        const currentUser = userDoc.docs.find((doc) => doc.id === user.uid);
        if (currentUser) {
          setUserName(currentUser.data().name);
        }
      }
    };

    fetchVideos();
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ bgcolor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <SchoolIcon sx={{ fontSize: 40, color: cyan }} />
            <Box>
              <Typography variant="h6" fontWeight={700} color="#1e293b">
                Dr. Labeeb Academy
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Student Portal
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" fontWeight={600} color="#64748b">
              Welcome, {userName}!
            </Typography>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                borderColor: "#cbd5e1",
                color: "#64748b",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Header Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${cyan}, ${purple})`,
          py: 6,
          color: "white"
        }}
      >
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h3" fontWeight={900} mb={1}>
                My Learning Dashboard
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Continue your journey to professional certification
              </Typography>
            </Box>
            <OndemandVideoIcon sx={{ fontSize: 120, opacity: 0.3 }} />
          </Box>
        </Container>
      </Box>

      {/* Video Library */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="#1e293b" mb={1}>
              Course Videos
            </Typography>
            <Typography variant="body1" color="#64748b">
              {videos.length} video{videos.length !== 1 ? "s" : ""} available
            </Typography>
          </Box>
          <Chip
            label={`${videos.length} Total Videos`}
            sx={{
              background: `linear-gradient(135deg, ${cyan}, ${purple})`,
              color: "white",
              fontWeight: 700,
              px: 2,
              fontSize: 16
            }}
          />
        </Box>

        {videos.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              bgcolor: "white",
              borderRadius: 4,
              border: "2px dashed #cbd5e1"
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: 80, color: "#cbd5e1", mb: 2 }} />
            <Typography variant="h6" color="#94a3b8" fontWeight={600}>
              No videos available yet
            </Typography>
            <Typography variant="body2" color="#cbd5e1">
              Check back soon for new course content
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid item xs={12} md={6} lg={4} key={video.id}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      transform: "translateY(-4px)"
                    }
                  }}
                >
                  <Box sx={{ position: "relative", bgcolor: "#f1f5f9", height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PlayCircleIcon sx={{ fontSize: 80, color: cyan, opacity: 0.7 }} />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={700} color="#1e293b" mb={1}>
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="#64748b" mb={2}>
                      {video.description}
                    </Typography>
                    <video
                      width="100%"
                      controls
                      style={{
                        borderRadius: 12,
                        outline: `2px solid ${cyan}`
                      }}
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                      <source src={video.videoUrl} type="video/quicktime" />
                      Your browser does not support this video format.
                    </video>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default StudentDashboard;
