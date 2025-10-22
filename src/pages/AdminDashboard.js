import React, { useState, useEffect } from "react";
import { Typography, Button, TextField, Container, Box, AppBar, Toolbar, Card, CardContent, Grid, LinearProgress, Alert, Paper } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";

const cyan = "#00cba9";
const pink = "#ec4899";
const orange = "#f97316";
const purple = "#a855f7";

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videos, setVideos] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const videosSnapshot = await getDocs(collection(db, "videos"));
    setVideos(videosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) return;

    const storageRef = ref(storage, `videos/${Date.now()}_${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "videos"), {
          title,
          description,
          videoUrl: downloadURL,
          createdAt: new Date()
        });
        setTitle("");
        setDescription("");
        setVideoFile(null);
        setUploadProgress(0);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
        fetchVideos();
      }
    );
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "videos", id));
    fetchVideos();
  };

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
            <SchoolIcon sx={{ fontSize: 40, color: pink }} />
            <Box>
              <Typography variant="h6" fontWeight={700} color="#1e293b">
                Dr. Labeeb Academy
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Admin Portal
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => navigate("/manage-videos")}
              sx={{
                borderColor: purple,
                color: purple,
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                "&:hover": {
                  borderColor: purple,
                  bgcolor: `${purple}10`
                }
              }}
            >
              Manage Videos
            </Button>
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
          background: `linear-gradient(135deg, ${pink}, ${orange})`,
          py: 6,
          color: "white"
        }}
      >
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h3" fontWeight={900} mb={1}>
                Admin Dashboard
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Manage course videos and content
              </Typography>
            </Box>
            <VideoLibraryIcon sx={{ fontSize: 120, opacity: 0.3 }} />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Upload Section */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                background: "white",
                border: `2px solid ${pink}20`,
                position: "sticky",
                top: 20
              }}
            >
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <CloudUploadIcon sx={{ fontSize: 40, color: pink }} />
                <Typography variant="h5" fontWeight={800} color="#1e293b">
                  Upload New Video
                </Typography>
              </Box>

              {uploadSuccess && (
                <Alert
                  icon={<CheckCircleIcon />}
                  severity="success"
                  sx={{ mb: 3, borderRadius: 2 }}
                >
                  Video uploaded successfully!
                </Alert>
              )}

              <form onSubmit={handleUpload}>
                <TextField
                  fullWidth
                  label="Video Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": { borderColor: pink },
                      "&.Mui-focused fieldset": { borderColor: pink }
                    }
                  }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  multiline
                  rows={3}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": { borderColor: pink },
                      "&.Mui-focused fieldset": { borderColor: pink }
                    }
                  }}
                />
                <Button
                  fullWidth
                  variant="outlined"
                  component="label"
                  sx={{
                    borderColor: pink,
                    color: pink,
                    fontWeight: 600,
                    py: 1.5,
                    borderRadius: 2,
                    mb: 3,
                    textTransform: "none",
                    "&:hover": { borderColor: pink, bgcolor: `${pink}10` }
                  }}
                >
                  {videoFile ? videoFile.name : "Choose Video File"}
                  <input
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={(e) => setVideoFile(e.target.files[0])}
                  />
                </Button>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <Box mb={3}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="#64748b" fontWeight={600}>
                        Uploading...
                      </Typography>
                      <Typography variant="body2" color={pink} fontWeight={700}>
                        {Math.round(uploadProgress)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: `${pink}20`,
                        "& .MuiLinearProgress-bar": {
                          background: `linear-gradient(90deg, ${pink}, ${orange})`
                        }
                      }}
                    />
                  </Box>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!videoFile || uploadProgress > 0}
                  sx={{
                    background: `linear-gradient(135deg, ${pink}, ${orange})`,
                    fontWeight: 700,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: 16,
                    textTransform: "none"
                  }}
                >
                  Upload Video
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Videos List */}
          <Grid item xs={12} md={7}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography variant="h5" fontWeight={800} color="#1e293b" mb={1}>
                  Uploaded Videos ({videos.length})
                </Typography>
                <Typography variant="body1" color="#64748b">
                  Manage your course content
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => navigate("/manage-videos")}
                sx={{
                  background: `linear-gradient(135deg, ${purple}, ${cyan})`,
                  fontWeight: 700,
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none"
                }}
              >
                Manage All Videos
              </Button>
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
                <VideoLibraryIcon sx={{ fontSize: 80, color: "#cbd5e1", mb: 2 }} />
                <Typography variant="h6" color="#94a3b8" fontWeight={600}>
                  No videos uploaded yet
                </Typography>
                <Typography variant="body2" color="#cbd5e1">
                  Upload your first video to get started
                </Typography>
              </Box>
            ) : (
              <Box display="flex" flexDirection="column" gap={2}>
                {videos.map((video) => (
                  <Card
                    key={video.id}
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 4px 16px rgba(0,0,0,0.12)"
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="start">
                        <Box flex={1}>
                          <Typography variant="h6" fontWeight={700} color="#1e293b" mb={1}>
                            {video.title}
                          </Typography>
                          <Typography variant="body2" color="#64748b" mb={2}>
                            {video.description}
                          </Typography>
                          <Typography variant="caption" color="#94a3b8">
                            Uploaded: {video.createdAt?.toDate().toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(video.id)}
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AdminDashboard;
