import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";

const Features: React.FC = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        color="primary"
      >
        Our Mission
      </Typography>
      <Grid container spacing={4} mt={3}>
        <Grid item xs={12} sm={4}>
          <Box textAlign="center">
            <VolunteerActivismIcon color="primary" sx={{ fontSize: 60 }} />
            <Typography variant="h6" fontWeight="bold">
              Help the Needy
            </Typography>
            <Typography>
              Providing support to underprivileged communities.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box textAlign="center">
            <PeopleIcon color="primary" sx={{ fontSize: 60 }} />
            <Typography variant="h6" fontWeight="bold">
              Volunteer
            </Typography>
            <Typography>
              Join hands with us and contribute your time to a noble cause.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box textAlign="center">
            <PublicIcon color="primary" sx={{ fontSize: 60 }} />
            <Typography variant="h6" fontWeight="bold">
              Global Impact
            </Typography>
            <Typography>
              Expanding our reach to create a better world.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Features;
