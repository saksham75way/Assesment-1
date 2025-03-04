import React from "react";
import {
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetBankByIdQuery } from "../services/api";

const BankDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetBankByIdQuery(id!, { skip: !id });

  if (isLoading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !data || !data.data) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          Failed to load bank details.
        </Typography>
      </Container>
    );
  }

  const bank = data.data;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Bank Account Details
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">
                Bank Name:
              </Typography>
              <Typography variant="body1">{bank.bankName}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">
                Account Number:
              </Typography>
              <Typography variant="body1">{bank.accountNumber}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">
                IFSC Code:
              </Typography>
              <Typography variant="body1">{bank.ifscCode}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">
                Balance:
              </Typography>
              <Typography variant="body1">
                ${bank.balance.toLocaleString()}
              </Typography>
            </Box>
            {bank.createdAt && (
              <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  Created At:
                </Typography>
                <Typography variant="body1">
                  {new Date(bank.createdAt).toLocaleString()}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default BankDetailsPage;
