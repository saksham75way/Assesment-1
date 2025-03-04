import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grow,
  Alert,
} from "@mui/material";
import { useCreateBankMutation } from "../services/api";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Inline validation schema
const bankValidationSchema = z.object({
  accountNumber: z.string().min(9, "Account number must be at least 9 digits"),
  bankName: z.string().min(3, "Bank name is required"),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  balance: z.number().min(0, "Balance must be at least 0"),
});

interface FormData {
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  balance: number;
}

interface FormErrors {
  accountNumber?: string;
  bankName?: string;
  ifscCode?: string;
  balance?: string;
}

const CreateBankPage: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    balance: 0,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [createBank, { isLoading }] = useCreateBankMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "balance"
          ? Number(value)
          : name === "ifscCode"
          ? value.toUpperCase()
          : value,
    }));
    // Clear the error for the field as the user types
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      bankValidationSchema.parse(form);
      setErrors({});
      // Create the bank using the mutation
      await createBank(form).unwrap();
      setSubmitted(true);
      setForm({ accountNumber: "", bankName: "", ifscCode: "", balance: 0 });
      // Redirect to homepage after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        err.errors.forEach((error) => {
          if (error.path && error.path.length > 0) {
            fieldErrors[error.path[0] as keyof FormErrors] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error creating bank:", err);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Create Bank Account
        </Typography>
        <Grow in={submitted}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Bank account created successfully! Redirecting...
          </Alert>
        </Grow>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Account Number"
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
            required
            error={Boolean(errors.accountNumber)}
            helperText={errors.accountNumber}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Bank Name"
            name="bankName"
            value={form.bankName}
            onChange={handleChange}
            required
            error={Boolean(errors.bankName)}
            helperText={errors.bankName}
          />
          <TextField
            fullWidth
            margin="normal"
            label="IFSC Code"
            name="ifscCode"
            value={form.ifscCode}
            onChange={handleChange}
            required
            error={Boolean(errors.ifscCode)}
            helperText={errors.ifscCode || "Format: ABCD0123456"}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Balance"
            name="balance"
            type="number"
            value={form.balance}
            onChange={handleChange}
            required
            error={Boolean(errors.balance)}
            helperText={errors.balance}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "primary.main", color: "white" }}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Bank"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateBankPage;
