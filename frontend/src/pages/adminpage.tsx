import React from "react";
import { Container, Typography, Box } from "@mui/material";
import UsersList from "../components/admin.components/UsersList";
import FundingManagement from "../components/admin.components/FundingsList";

const AdminDashboard: React.FC = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Admin Dashboard
      </Typography>

      <Box mb={5}>
        <UsersList />
      </Box>

      <FundingManagement />
    </Container>
  );
};

export default AdminDashboard;
