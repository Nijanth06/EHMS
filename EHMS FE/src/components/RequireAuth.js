import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logOut, updateToken } from "../app/features/authSlice";
import RefreshTokenService from "../utils/services/RefreshToken";
import { decrypt, decryptNdecode, encrypt } from "../utils/aes/AES";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import { ROLES } from "../roles";

const RequireAuth = ({ allowedRoles }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const authUser = useSelector((state) => state.auth);
  const refreshToken = { refreshToken: decrypt(authUser.refreshToken) };
  const role = decrypt(authUser.role);
  const Roles = [
    ROLES.admin,
    ROLES.doctor,
    ROLES.nurse,
    ROLES.patient,
    ROLES.receptionist,
    ROLES.recordPerson,
  ];
  useEffect(() => {
    if (location.pathname === "/login") {
      location.pathname = "/";
    }
    if (authUser.refreshToken !== null && authUser.token !== undefined) {
      console.log(authUser.refreshToken);
      const token = decryptNdecode(authUser.token);
      let time = token.exp * 1000 - new Date().getTime();
      const reAuth = async () => {
        console.log("tryig to refresh token");
        try {
          Swal.fire({
            icon: "info",
            title: "Please wait",
            text: "Authenticating...",
            showConfirmButton: false,
          });
          let response;
          if (role === "Patient") {
            response = await RefreshTokenService.refresh(refreshToken);
          } else {
            response = await RefreshTokenService.refreshTokenStaff(
              refreshToken
            );
          }
          if (response) {
            time =
              jwtDecode(response.data.accessToken).exp * 1000 -
              new Date().getTime();
            let authUser = { acessToken: encrypt(response.data.accessToken) };
            dispatch(updateToken(authUser));
            console.log("new access token recived");
            Swal.close();
          }
        } catch (err) {
          console.error(err);
          console.log(err.response.status);
          console.log("refresh token expired");
          Swal.close();
          dispatch(logOut());
          navigate("/login");
          return () => {
            clearInterval(intervalId);
          };
        }
      };
      const intervalId = setInterval(() => {
        reAuth();
      }, time);
      //clearing
      return () => {
        clearInterval(intervalId);
      };
    } else {
      dispatch(logOut());
      navigate("/login");
    }
  }, []);
  // (Object.values(ROLES).includes(decode.role)
  return authUser?.role && allowedRoles?.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/"/>
  );
};

export default RequireAuth;
