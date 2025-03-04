import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Funding, FundingTableProps } from "../../types";

const recalcRaisedAmount = (fundingId: string): number => {
  const storedDonations = localStorage.getItem("donations");
  const donations = storedDonations ? JSON.parse(storedDonations) : [];
  const totalRaised = donations
    .filter((donation: any) => donation.fundingId === fundingId)
    .reduce((sum: number, donation: any) => sum + donation.amount, 0);
  return totalRaised;
};

const FundingTable = ({ fundings }: FundingTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Goal Amount</TableCell>
            <TableCell align="right">Raised Amount</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fundings.map((funding: Funding) => {
            // Recalculate the raised amount from localStorage on render
            const raisedAmount = recalcRaisedAmount(funding._id);
            return (
              <TableRow key={funding._id}>
                <TableCell>{funding.title}</TableCell>
                <TableCell align="right">${funding.amountGoal}</TableCell>
                <TableCell align="right">${raisedAmount}</TableCell>
                <TableCell align="right">{funding.status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FundingTable;
