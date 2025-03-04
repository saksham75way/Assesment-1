import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  let bank = null;
  try {
    const bankStr = localStorage.getItem("bank");
    if (bankStr) {
      bank = JSON.parse(bankStr);
    }
  } catch (e) {
    console.error("Error parsing bank from localStorage", e);
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const navButtons = (
    <>
      <Button
        variant="outlined"
        onClick={() => navigate("/admin")}
        sx={{
          backgroundColor: "white",
          color: "secondary",
          border: "1px solid lightblue",
          borderRadius: 1,
          textTransform: "none",
          mr: 1,
          "&:hover": { backgroundColor: "secondary", color: "white" },
        }}
      >
        Admin Panel
      </Button>
      <Button
        variant="outlined"
        onClick={() => navigate("/analytics")}
        sx={{
          backgroundColor: "white",
          color: "secondary",
          border: "1px solid lightblue",
          borderRadius: 1,
          textTransform: "none",
          mr: 1,
          "&:hover": { backgroundColor: "secondary", color: "white" },
        }}
      >
        Analytics
      </Button>
      {bank ? (
        <Button
          variant="outlined"
          onClick={() => navigate(`/bankpage`)}
          sx={{
            backgroundColor: "white",
            color: "secondary",
            border: "1px solid lightblue",
            borderRadius: 1,
            textTransform: "none",
            "&:hover": { backgroundColor: "secondary", color: "white" },
          }}
        >
          {bank.data.bankName}
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={() => navigate("/bank")}
          sx={{
            backgroundColor: "white",
            color: "secondary",
            border: "1px solid lightblue",
            borderRadius: 1,
            textTransform: "none",
            "&:hover": { backgroundColor: "secondary", color: "white" },
          }}
        >
          Add Bank
        </Button>
      )}
    </>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          NGO
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => handleNavigation("/admin")}>
                Admin Panel
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/analytics")}>
                Analytics
              </MenuItem>
              {bank ? (
                <MenuItem onClick={() => handleNavigation(`/bank/${bank._id}`)}>
                  {bank.bankName}
                </MenuItem>
              ) : (
                <MenuItem onClick={() => handleNavigation("/bank")}>
                  Add Bank
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <Box>{navButtons}</Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
