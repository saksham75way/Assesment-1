import { Card, CardContent, Typography } from "@mui/material";
import { StatsCardProps } from "../../types";

const StatsCard = ({ title, value }: StatsCardProps) => {
  return (
    <Card sx={{ minWidth: 200, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
