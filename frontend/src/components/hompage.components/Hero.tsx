import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        p: { xs: 2, md: 4 },
        backgroundImage: "url(/hero.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <Typography variant="h3" fontWeight="bold">
          Empowering Communities, Changing Lives
        </Typography>
        <Typography variant="h6" mt={2}>
          Join us in making a difference by supporting various social causes
          worldwide.
        </Typography>
        <Link to="/funding">
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 3, color: "primary.main", fontWeight: "bold" }}
          >
            Get Involved
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default Hero;
