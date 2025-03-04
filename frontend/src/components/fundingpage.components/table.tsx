import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Skeleton,
  Alert,
} from "@mui/material";
import { useGetAllFundingQuery } from "../../services/api";
import PaymentModal from "./PaymentModal";

interface Program {
  _id: string;
  title: string;
  description: string;
  amountGoal: number;
  amountRaised: number;
  duration: number;
}

interface Donation {
  fundingId: string;
  amount: number;
  date: string;
}

const FundingPrograms: React.FC = () => {
  const { data, error, isLoading } = useGetAllFundingQuery();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const recalcDonations = (fundings: Program[]) => {
    const storedDonations = localStorage.getItem("donations");
    const donations: Donation[] = storedDonations
      ? JSON.parse(storedDonations)
      : [];
    const updatedPrograms = fundings.map((program) => {
      const totalRaised = donations
        .filter((donation) => donation.fundingId === program._id)
        .reduce((sum, donation) => sum + donation.amount, 0);
      return { ...program, amountRaised: totalRaised };
    });
    return updatedPrograms;
  };

  useEffect(() => {
    if (data && data.data) {
      const updated = recalcDonations(data.data);
      setPrograms(updated);
    }
  }, [data, openModal]);

  const handleDonateClick = (program: Program) => {
    setSelectedProgram(program);
    setOpenModal(true);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Active Funding Programs
      </Typography>

      {error && (
        <Alert severity="error">Failed to fetch funding programs.</Alert>
      )}

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Program Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Goal ($)
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Raised ($)
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Duration (in days)
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? [...Array(4)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" width={200} height={30} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} height={30} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} height={30} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} height={30} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="rectangular" width={100} height={35} />
                    </TableCell>
                  </TableRow>
                ))
              : programs.map((program) => (
                  <TableRow key={program._id}>
                    <TableCell>{program.title}</TableCell>
                    <TableCell>
                      ${program.amountGoal.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      ${program.amountRaised.toLocaleString()}
                    </TableCell>
                    <TableCell>{program.duration} days</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDonateClick(program)}
                      >
                        Donate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payment Modal */}
      {selectedProgram && (
        <PaymentModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          program={selectedProgram}
        />
      )}
    </Container>
  );
};

export default FundingPrograms;
