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


function CustomCard({value, title, button}) {
  const navigate = useNavigate()
  return (
    
    
   
        <Card variant="outlined" sx={{ minWidth: 220, maxWidth:220, boxShadow: 4}} style={{margin:"auto", backgroundColor:"#d5f4e6"}}>
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
              <Button size="lg" onClick={()=>{ navigate("/viewHospitals");}}>View</Button>
            </CardActions>}
          </React.Fragment>
        </Card>
 

  );
}

export default CustomCard;
