import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import "../styels/sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { decrypt } from "../utils/aes/AES";
import { logOut } from "../app/features/authSlice";
import { setFloded } from "../app/features/slider";
import { Button } from "react-bootstrap";
import colors from "../utils/colors/Colors";
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmergencyNotify from '@mui/icons-material/LocalHospital';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Box';
import Ticked from '@mui/icons-material/OpenInNew';
import TextField from '@mui/material/TextField';
import Notify from '@mui/icons-material/NextPlan';
import Cancel from '@mui/icons-material/Cancel';
import Confirm from '@mui/icons-material/Send';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PatientServices from "../utils/services/PatientServices";
import AlertServices from "../utils/services/AlertServices";
import Ok from "@mui/icons-material/Close";

const Sidebar = () => {

  const authUser = useSelector((state) => state.auth);
  const user = decrypt(authUser.user);
  const side = useSelector((state) => state.slider);
  const role = decrypt(authUser.role);
  const isValidRole = (allowedRoles) => {
    return allowedRoles?.includes(role);
  };
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let slider = {
    isFloded: sidebar,
  };
  dispatch(setFloded(slider));

  const [row, setRow] = useState();
  const [count, setCount] = useState();
  const [open, setOpen] = useState(false);
  const [openPatient, setOpenPatient] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSee, setOpenSee] = useState(false);
  const accesstoken = decrypt(authUser.token);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState('');
  const [notification, setNotification] = useState([]);
  const [updateId, setUpdateId] = useState();

  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
    // setRow(notification.length)

  }
  useEffect(() => {
    getCurrentLoginId();

  }, []);

  const handleClosePatient = () => setOpenPatient(false);
  const handleOpenPatient = () => {
    setOpenPatient(true);
  }

  const handleCloseConfirm = () => setOpenConfirm(false);
  const handleOpenConfirm = () => {
    if (desc === "") {
      alert("Please mention your emergency!");
    }
    else {
      setOpenConfirm(true);
    }
  }

  

  const handleCloseSee = () => {setOpenSee(false); updateSeenAlert();}
  function handleOpenSee(id){
    setOpenSee(true);
    // console.log("---clicked id---- :", id );

    setUpdateId(id); // set clicked-id as UpdateId.
    
  }


  function getNotification() {

    AlertServices.getAlert().then((res) => {
      setNotification(res.data);
    });

    AlertServices.getNewAlertCount().then((res) => {
      setCount(res.data);
    });

    
  };

  useEffect(() => { getNotification()});
  useEffect(() => { setRow(count) });


  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
    responseType: "json",
  };

  //get Current login userId...
  const getCurrentLoginId = async () => {
    try {
      setLoading(true);
      const _data = await PatientServices.getPatientProfile(config);
      setUserId(_data.data.id);
      // console.log("Current User Id: ", _data.data.id);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
    // console.log("Current User Id: ", userId);
  };

  //update seen Alerts...
  const updateSeenAlert = async () => {
    try {
      setLoading(true);
      await AlertServices.updateAlert(updateId, config);
      getNotification();
      // console.log("Current Update User Id: ", userId);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
    // console.log("Current User Id: ", userId);
  };

  //send alerts to backend
  const sendNote = async () => {
    if (userId === " ") {
      alert("failed attempt!");
      navigate("/patient-dashboard");
    }
    else {

      const alerts_Obj = { description: desc, userId: userId };
      // console.log("after json: ", alerts_Obj);

      const result = await AlertServices.sendAlert(alerts_Obj);
      if (result) {
        alert("Alert sent sucessfully");
        handleCloseConfirm();
        handleClosePatient();
        setDesc(" ");

      }

    }

  }

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div className="nav">
        <Link to="#" className="nav-icon">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <div className="centered-text">
          <strong>
            <span>
              {" "}
              <h2>
                EmoCare ✚ <sub> {"   "}EHMS</sub>
              </h2>
            </span>
          </strong>
        </div>
        <div className="mr-2">
          {/* for patient send alert*/}
          {role === "Patient" ? <>
            <MenuItem onClick={handleOpenPatient}>
              <IconButton
                size="small"
                aria-label="show new notifications"
                color="inherit"
              >
                <Badge >
                  <EmergencyNotify className="text-danger" />
                </Badge>
              </IconButton>
            </MenuItem>
          </> : null}


          <Modal open={openPatient} onClose={handleClosePatient} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style_patient}>
              <Paper style={{ padding: 10 }}>
                <h3 className="text-danger">Send Your Emergency</h3><br />
                <TextField
                  id="outlined-multiline-static"
                  multiline={true}
                  rows={4}
                  fullWidth
                  name="Description"
                  label="Description"
                  placeholder="Type here..."
                  autoComplete="off"
                  variant="outlined"

                  value={desc}
                  onChange={(e) => { setDesc(e.target.value) }}
                />
              </Paper>
              <br /><br />
              <Box textAlign='center'> <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleOpenConfirm}
              >
                <b>Notify  <Notify /></b>
              </Button></Box>

              {/* confirm model box */}
              <Modal open={openConfirm} onClose={handleCloseConfirm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style_confirm} className="bg-light">
                    <h3 className="text-dark">Are you sure to send?</h3><br /> <br />                    
                    <Row>
                      <Col md={6} className="mx-auto">
                        <Box textAlign='center'> <Button
                          variant="contained"
                          className="bg-danger text-light p-2"
                          type="submit "
                          onClick={handleCloseConfirm}
                        >
                          <b>Cancel  <Cancel /></b>
                        </Button></Box>
                      </Col>
                      <Col md={6} className="mx-auto">
                        <Box textAlign='center'> <Button
                          variant="contained"
                          className="bg-success text-light p-2"
                          type="submit"
                          onClick={sendNote}
                        >
                          <b>Confirm  <Confirm /></b>
                        </Button></Box>
                      </Col>
                    </Row>
                </Box>
              </Modal>

            </Box>
          </Modal>
        </div>
        <div className="mr-4">
          {/* for reception alert */}
          {role === "Receptionist" ? <>
            <MenuItem onClick={handleOpen}>
              <IconButton
                size="small"
                aria-label="show new notifications"
                color="inherit"
                marginBottom="0px"
              >
                <Badge badgeContent={row === '0' ? "0" : row} color="error">
                  <NotificationsIcon className="text-light" />
                </Badge>
              </IconButton>
            </MenuItem>

          </> : null}
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Grid container spacing={2}>

                <Grid xs={12}>
                  <TableContainer component={Paper}>
                    <h4 className="text-center text-danger">Emergency Alerts</h4>
                    <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow style={{backgroundColor:"#181D31"}}>
                          <TableCell className="text-light"><b>User Id</b></TableCell>
                          <TableCell className="text-light"><b>Description</b></TableCell>
                          <TableCell className="text-light"><b>See More</b></TableCell>
                        </TableRow>
                      </TableHead>
                      {notification.map((noti) => ( 
                      <TableBody>
                          {noti[3]===false?
                          // if new msg....
                          <TableRow style={{backgroundColor:"#F94C66"}}>
                            <TableCell className="text-light"> {noti[1]} </TableCell>
                            <TableCell className="text-light"> {noti[2]} </TableCell>
                            <TableCell >  <Button variant="contained" className="bg-secondary btn-sm" onClick={(event)=>handleOpenSee(noti[0])} ><Ticked /></Button>
                            </TableCell>
                          </TableRow>
                          // if seen msg....
                          :<TableRow className="bg-light">
                          <TableCell > {noti[1]} </TableCell>
                          <TableCell> {noti[2]} </TableCell>
                          <TableCell>  <Button variant="contained" className="bg-secondary btn-sm" onClick={(event)=>handleOpenSee(noti[0])} ><Ticked /></Button>
                          </TableCell>
                        </TableRow> }
                        
                      </TableBody>))}
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              {/* model for open notification */}
              <Modal open={openSee} onClose={handleCloseSee} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style_msg} className="bg-light">
                  <h4 className="text-center text-primary">Full Details</h4>
                  <TableContainer component={Paper}>
                    <Table >
                      <TableHead>
                        <TableRow>
                          <TableCell component="th" ><b>Patient Id - </b></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" ><b>Patient Name - </b></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" ><b>Contact Number - </b></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" ><b>Patient Location - </b></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" ><b>Emergency Description - </b></TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                  <br />
                  <Button className="bg-primary" onClick={handleCloseSee}><Ok /></Button>

                </Box>
              </Modal>
              <br /><br />
              {/* <Box textAlign='center'> <Button
                variant="contained"
                color="primary"
                type="submit"
              // onClick={updateNotification}
              >
                Ok
              </Button></Box> */}

            </Box>
          </Modal>
        </div>
        <div style={{ cursor: "pointer" }}>
          <div
            className="logout-icon"
            onClick={() => {
              dispatch(logOut());
              navigate("/");
            }}
          >
            <AiIcons.AiOutlineLogout />
          </div>
        </div>
      </div>
      <div className={`sidebar-nav ${sidebar ? "sidebar" : ""}`}>
        <div className="sidebar-wrap" style={{ marginTop: "30px" }}>
          {/* <Link to="#" className="nav-icon">
            <AiIcons.AiOutlineClose onClick={showSidebar} />
          </Link> */}
          {SidebarData.map((item, index) => {
            return isValidRole(item.allowedRoles) ? (
              <SubMenu item={item} key={index} />
            ) : null;
          })}
          <div style={{ position: "relative", minHeight: "50vh" }}>
            {/* Other content */}
            <div className="user-wrapper">
              <Button size="lg" style={{ backgroundColor: colors.dark }}>{user}</Button>
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Sidebar;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 780,
  height:600,
  bgcolor: 'background.paper',
  border: '1px solid white',
  boxShadow: 24,
  p: 4,
  overflow:'auto'
};
const style_patient = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid ace',
  boxShadow: 24,
  p: 4,
  textAlign: 'center'
};

const style_confirm = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 430,
  boxShadow: 24,
  p: 10,
  textAlign: 'center'
};
const style_msg = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 5,
  textAlign: 'center'
};
