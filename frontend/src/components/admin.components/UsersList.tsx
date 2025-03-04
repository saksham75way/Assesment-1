import React from "react";
import { useGetAllUsersQuery } from "../../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const UsersList: React.FC = () => {
  const { data, error, isLoading } = useGetAllUsersQuery();

  return (
    <TableContainer component={Paper} elevation={3}>
      <Typography variant="h5" p={2} fontWeight="bold">
        Registered Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell>Error loading users</TableCell>
            </TableRow>
          ) : (
            data?.data?.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
