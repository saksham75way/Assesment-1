import { Container, Grid, Typography } from "@mui/material";
import { useGetAllFundingQuery } from "../services/api";
import StatsCard from "../components/showanalytics.components/statsCard";
import FundingTable from "../components/showanalytics.components/fundinTable";

const FundingAnalytics = () => {
  const { data, isLoading } = useGetAllFundingQuery();

  if (isLoading) return <Typography>Loading...</Typography>;

  const fundings = data?.data || [];

  // Calculate total raised using the backend's funding.amountRaised values
  const totalRaised = fundings.reduce(
    (acc: number, funding: any) => acc + funding.amountRaised,
    0
  );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Funding Analytics
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <StatsCard title="Total Raised" value={`$${totalRaised}`} />
        </Grid>
        <Grid item>
          <StatsCard title="Total Fundings" value={fundings.length} />
        </Grid>
      </Grid>
      <FundingTable fundings={fundings} />
    </Container>
  );
};

export default FundingAnalytics;
