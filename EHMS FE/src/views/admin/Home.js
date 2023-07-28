import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import CustomCard from "../../components/CustomCard";
import { useSelector } from "react-redux";
import { decrypt } from "../../utils/aes/AES";
import StaffServices from "../../utils/services/StaffServices";


const Home = () => {
  const [response, setResponse] = useState();
  const authUser = useSelector((state) => state.auth);
  const accesstoken = decrypt(authUser.token);
  const [chartData, setChartData] = useState();
  const [dataCount, setdatacount] = useState([]);
  const [dataType, setdataType] = useState([]);

  //Config for backend call.
  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
    responseType: "json",
  };

  const getAllData = async () => {
    try {
      const responseData = await StaffServices.getStaffCount(config);
      setResponse(responseData.data);
      for (let i = 0; i < responseData.data.length; i++) {
        if (dataCount.length < responseData.data.length) {
          dataCount.push(responseData.data[i][0]);
          dataType.push(responseData.data[i][1]);
        }
      }
      setChartData({
        labels: dataCount,
        datasets: [
          {
            label: "System Users",
            data: dataType,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
       <Container className="text-center">
      <div style={{ textAlign: "center" }}>
      <h2
        className="text-secondary"
        style={{ marginTop: "0px", marginBottom: "40px" }}
      >
        Admin Dashboard
      </h2>
      {response ? (
        <Row>
          {response.map((res, id) => {
            return (
              <>
                <CustomCard title={res[0]} value={res[1]} />
              </>
            );
          })}
        </Row>
      ) : null}

      <h2
        className="text-secondary"
        style={{ marginTop: "50px", marginBottom: "40px" }}
      >
        User Data
      </h2>
      <Container style={{ width: "100%", height: "300px"}}>
        {chartData ? <Bar data={chartData} /> : "No data"}
      </Container>
      </div>
      </Container>
    </>
  );
};

export default Home;
