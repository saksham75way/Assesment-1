import React, { useState } from "react";
import {
  useGetAllFundingQuery,
  useCreateFundingMutation,
} from "../../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const FundingManagement: React.FC = () => {
  const { data, error, isLoading } = useGetAllFundingQuery();
  const [addFunding, { isLoading: adding }] = useCreateFundingMutation();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    amountGoal: 0,
  });

  const handleAddFunding = async () => {
    await addFunding({ ...form, amountGoal: Number(form.amountGoal) });
    setOpen(false);
  };

  return (
    <TableContainer component={Paper} elevation={3}>
      <Typography variant="h5" p={2} fontWeight="bold">
        Funding Programs
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Funding
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Goal ($)</TableCell>
            <TableCell>Raised ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell>Error loading fundings</TableCell>
            </TableRow>
          ) : (
            data?.data?.map((fund) => (
              <TableRow key={fund._id}>
                <TableCell>{fund.title}</TableCell>
                <TableCell>${fund.amountGoal}</TableCell>
                <TableCell>${fund.amountRaised}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Funding Program</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Description"
            margin="dense"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <TextField
            fullWidth
            label="Title"
            margin="dense"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Goal Amount ($)"
            type="number"
            margin="dense"
            onChange={(e) =>
              setForm({ ...form, amountGoal: Number(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddFunding}
            disabled={adding}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default FundingManagement;
