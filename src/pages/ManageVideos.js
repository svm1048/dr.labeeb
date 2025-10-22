import React, { useState, useEffect } from "react";
import { Typography, Button, TextField, Container, Box, AppBar, Toolbar, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Alert, IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

const cyan = "#00cba9";
const pink = "#ec4899";
const orange = "#f97316";
const purple = "#a855f7";

function ManageVideos() {
  const [videos, setVideos] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const videosSnapshot = await getDocs(collection(db, "videos"));
    setVideos(videosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      await deleteDoc(doc(db, "videos", id));
      fetchVideos();
    }
  };

  const handleEditClick = (video) => {
    setSelectedVideo(video);
    setEditTitle(video.title);
    setEditDescription(video.description);
    setOpenEditDialog(true);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setOpenVideoDialog(true);
  };

  const handleUpdate = async () => {
    if (!selectedVideo) return;

    await updateDoc(doc(db, "videos", selectedVideo.id), {
      title: editTitle,
      description: editDescription
    });

    setOpenEditDialog(false);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
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
                Video Management
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/admin-dashboard")}
              sx={{
                borderColor: cyan,
                color: cyan,
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2
              }}
            >
              Back to Dashboard
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
          background: `linear-gradient(135deg, ${purple}, ${cyan})`,
          py: 6,
          color: "white"
        }}
      >
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h3" fontWeight={900} mb={1}>
                Manage Videos
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Preview, edit, or delete uploaded course videos
              </Typography>
            </Box>
            <VideoLibraryIcon sx={{ fontSize: 120, opacity: 0.3 }} />
          </Box>
        </Container>
      </Box>

      {/* Video Player Dialog */}
      <Dialog 
        open={openVideoDialog} 
        onClose={() => setOpenVideoDialog(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle sx={{ 
          background: `linear-gradient(135deg, ${cyan}, ${purple})`,
          color: "white",
          fontWeight: 700,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span>🎥 {selectedVideo?.title}</span>
          <IconButton 
            onClick={() => setOpenVideoDialog(false)}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {selectedVideo && (
            <Box>
              <video
                controls
                autoPlay
                style={{
                  width: "100%",
                  height: "auto",
                  backgroundColor: "#000"
                }}
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Box sx={{ p: 3 }}>
                <Typography variant="body1" color="#64748b" mb={2}>
                  {selectedVideo.description}
                </Typography>
                <Typography variant="caption" color="#94a3b8">
                  📅 Uploaded: {selectedVideo.createdAt?.toDate().toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          background: `linear-gradient(135deg, ${cyan}, ${purple})`,
          color: "white",
          fontWeight: 700
        }}>
          ✏️ Edit Video
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Video Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: cyan },
                "&.Mui-focused fieldset": { borderColor: cyan }
              }
            }}
          />
          <TextField
            fullWidth
            label="Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: cyan },
                "&.Mui-focused fieldset": { borderColor: cyan }
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setOpenEditDialog(false)} 
            sx={{ 
              color: "#64748b",
              textTransform: "none",
              fontWeight: 600
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpdate}
            variant="contained"
            sx={{
              background: `linear-gradient(135deg, ${cyan}, ${purple})`,
              fontWeight: 700,
              px: 3,
              textTransform: "none"
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {updateSuccess && (
          <Alert
            icon={<CheckCircleIcon />}
            severity="success"
            sx={{ mb: 3, borderRadius: 2 }}
          >
            Video updated successfully!
          </Alert>
        )}

        <Box mb={3}>
          <Typography variant="h5" fontWeight={800} color="#1e293b" mb={1}>
            All Videos ({videos.length})
          </Typography>
          <Typography variant="body1" color="#64748b">
            Click play to preview, edit to modify, or delete to remove videos
          </Typography>
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
            <Typography variant="body2" color="#cbd5e1" mb={3}>
              Go to dashboard to upload your first video
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/admin-dashboard")}
              sx={{
                background: `linear-gradient(135deg, ${cyan}, ${purple})`,
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none"
              }}
            >
              Go to Dashboard
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid item xs={12} md={6} key={video.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    height: "100%",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      transform: "translateY(-5px)"
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Video Thumbnail with Play Button */}
                    <Box 
                      sx={{ 
                        position: "relative",
                        width: "100%",
                        height: 200,
                        bgcolor: "#1e293b",
                        borderRadius: 2,
                        mb: 2,
                        overflow: "hidden",
                        cursor: "pointer"
                      }}
                      onClick={() => handleVideoClick(video)}
                    >
                      <video
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                      </video>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "rgba(0,0,0,0.4)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: "rgba(0,0,0,0.6)"
                          }
                        }}
                      >
                        <PlayCircleOutlineIcon 
                          sx={{ 
                            fontSize: 80, 
                            color: "white",
                            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                          }} 
                        />
                      </Box>
                    </Box>

                    <Typography variant="h6" fontWeight={700} color="#1e293b" mb={2}>
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="#64748b" mb={3} sx={{ minHeight: 40 }}>
                      {video.description}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                      <Typography variant="caption" color="#94a3b8" fontWeight={600}>
                        📅 {video.createdAt?.toDate().toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color={cyan} fontWeight={700}>
                        🎥 Video
                      </Typography>
                    </Box>
                    <Box display="flex" gap={2}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<PlayCircleOutlineIcon />}
                        onClick={() => handleVideoClick(video)}
                        sx={{
                          borderColor: purple,
                          color: purple,
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: "none",
                          "&:hover": {
                            borderColor: purple,
                            bgcolor: `${purple}10`
                          }
                        }}
                      >
                        Play
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditClick(video)}
                        sx={{
                          borderColor: cyan,
                          color: cyan,
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: "none",
                          "&:hover": {
                            borderColor: cyan,
                            bgcolor: `${cyan}10`
                          }
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(video.id)}
                        sx={{
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: "none"
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
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

export default ManageVideos;
