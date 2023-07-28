import React from "react";
import {
    Card,
    Box,
    CardActions,
    CardContent,
    Button,
    Typography,
    Container,
  } from "@mui/material";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

function CustomCardAdd({value, title, button}) {
  const navigate = useNavigate();

  return (
    
      
        <Card variant="outlined" style={{margin:"auto", backgroundColor:"#d5f4e6"}} sx={{ minWidth: 250, maxWidth:250, boxShadow: 4 }}>
          <React.Fragment>
            <CardContent>
              <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
              >
                {title}
              </Typography>
              <Typography variant="h4" component="div">
                {value}+
              </Typography>
            </CardContent>
            {button && <Container style={{margin:'5px'}}>
                {button}</Container>}
            {!button && <CardActions>
              <Button size="small" onClick={()=>{ navigate("/view");}}>View</Button>
            </CardActions>}
          </React.Fragment>
        </Card>
    
    
  );
}

export default CustomCardAdd;
