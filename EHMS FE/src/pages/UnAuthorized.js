import React from "react";
import { Typography } from "@mui/material";
import { Button } from "react-bootstrap";
import colors from "../utils/colors/Colors";
import { useNavigate } from "react-router-dom";
import "../styels/home.css";

const primary = colors.light;
const UnAuthorized = () => {
  const navigate = useNavigate();
  return (
    <section className="home">
      <div className="secContainer container">
        
          <Typography variant="h1" style={{ color: colors.info }}>
            404
          </Typography>
          <Typography variant="h6" style={{ color: colors.white }}>
            The page you're looking for doesn't exist.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Back to Home page
          </Button>
      </div>
    </section>
  );
};

export default UnAuthorized;
