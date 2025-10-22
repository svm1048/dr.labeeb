import React, { useEffect, useState } from "react";
import { Typography, Container, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from "@mui/material";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const accentPink = "#ff69b4";
const accentGreen = "#00cba9";
const accentOrange = "#ff8c00";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersData = [];
    querySnapshot.forEach((doc) => {
      usersData.push({ id: doc.id, ...doc.data() });
    });
    setUsers(usersData);
    setLoading(false);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateDoc(doc(db, "users", userId), { role: newRole });
      setMessage(`User role updated to ${newRole} successfully!`);
      fetchUsers(); // Refresh user list
    } catch (err) {
      setMessage("Failed to update role: " + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700} color={accentPink}>
          Manage Users
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" sx={{ bgcolor: accentOrange, fontWeight: 600 }} onClick={() => navigate("/admin")}>
            Back to Dashboard
          </Button>
          <Button variant="outlined" color="error" sx={{ fontWeight: 600 }} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: accentGreen }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Current Role</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Typography
                      fontWeight={700}
                      color={user.role === "admin" ? accentOrange : accentGreen}
                    >
                      {user.role.toUpperCase()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {user.role === "student" ? (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ bgcolor: accentOrange, fontWeight: 600 }}
                        onClick={() => handleRoleChange(user.id, "admin")}
                      >
                        Make Admin
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ color: accentPink, borderColor: accentPink, fontWeight: 600 }}
                        onClick={() => handleRoleChange(user.id, "student")}
                      >
                        Make Student
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default ManageUsers;
