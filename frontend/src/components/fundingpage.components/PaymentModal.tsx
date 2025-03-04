import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useCreatePaymentMutation } from "../../services/api";

interface PaymentModalProps {
  open: boolean;
  handleClose: () => void;
  program: {
    _id: string;
    title: string;
  };
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  handleClose,
  program,
}) => {
  const [amount, setAmount] = useState("");
  const [donate, { isLoading }] = useCreatePaymentMutation();

  const handlePayment = async () => {
    try {
      await donate({
        fundingId: program._id,
        amount: Number(amount),
      }).unwrap();
      alert("Donation successful!"); // Show success message
      handleClose(); // Close modal
      window.location.reload(); // Reload data (optional)
    } catch (error) {
      alert("Payment failed. Try again.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Donate to {program?.title}
        </Typography>
        <TextField
          fullWidth
          type="number"
          label="Amount ($)"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePayment}
          disabled={isLoading || !amount}
        >
          {isLoading ? <CircularProgress size={24} /> : "Donate"}
        </Button>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
