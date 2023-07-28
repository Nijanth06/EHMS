import React, { } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from '@mui/material/Card';
import MovingComponent from "react-moving-text";

const HotlinePage = () => {

    return (
        <section className="home">
            <div className="secContainer container">
                <Container>
                    <Row className="justify-content-center mt-5">
                        <Col
                            md={5}
                            sm={12}
                            className="shadow-sm mt-5 text-center text-center rounded"
                        >
                            <Card style={{ padding: 20, backgroundColor: "lightblue" }}>
                                <h3 className="text-danger mb-3"> <b>Emergency Contact Number</b></h3>
                                <h4><b>+94 771234567</b><MovingComponent style={{fontSize:"medium", color:"red", marginTop:"5px"}}
                                    type="fadeIn"
                                    duration="1000ms"
                                    delay="0s"
                                    direction="normal"
                                    timing="ease"
                                    fillMode="none">
                                    24 Hours Service
                                </MovingComponent></h4>
                                

                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    )

}

export default HotlinePage;