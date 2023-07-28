import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import colors from "../utils/colors/Colors";
import { useNavigate } from "react-router-dom";

const CustomCardBooking = ({ data }) => {
  console.log(data);
  console.log(data[0]);
  const navigate = useNavigate();
  // console.log(id);
  return (
    <Container className="text-center">
      <div style={{ textAlign: "center" }}>
        <Card>
          <Card.Header className="text-muted">{data.data[4]}</Card.Header>
          <Card.Body>
            <Card.Title>
              Dr. {data.data[7]} {data.data[8]}
            </Card.Title>
            <Card.Text>{data.data[5]}</Card.Text>
            <Card.Text>{data.data[3]} Hospital</Card.Text>
            <Button
              style={{
                background: colors.primary,
              }}
              onClick={() =>
                navigate(`/booking/${data.data[0]}/${data.data[4]}`)
              }
            >
              Book Now
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default CustomCardBooking;
