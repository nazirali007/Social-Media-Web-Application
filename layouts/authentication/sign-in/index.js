import { useState } from "react";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import BannerImage from "../../../assets/images/authImage.svg";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import "./signIn.css"; // Make sure to import your CSS file

// Images
import { Box, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import apiService from "../../../components/ApiSevices/ApiServices";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const actionDispatcher = useDispatch();
  const [showPassword, setShowPassword] = useState(false);


  // ***********************Eye Section Password *****************************
  const handleChangePassword = (prop) => (event) => {
    setPassword(event.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // *************************************************************************

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // ***********************  Stored Value inside textBox  ***********************************

  const handleChange = (type, e) => {
    if (type === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  // *********************************************************

  // ***********************  Api SignIn Section  ***********************************
  const authentication = async (e) => {
    actionDispatcher(isLoading(true));
    try {
      const data = await apiService.login(email, password);
      // const response = await axios.post(`/api/v1/admin/signIn`, { email, password });
      console.log("=====>", data)
      actionDispatcher(openSnackbar(data?.message, "success"));
      localStorage.setItem("admin", JSON.stringify({ isLoggedIn: true, isAuthenticated: true }));
      navigate("/dashboard", { replace: true });
      actionDispatcher(isLoading(false));
    } catch (error) {
      actionDispatcher(isLoading(false));
      console.log("error", error);
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
    }
  };
  // *********************************************************


  return (
    <BasicLayout>
      <Box>
        <Grid container>
          <Grid item xs={6} sx={6} md={6}>
            <Box className="image-container">
              <img style={{ borderRadius: "10px" }} src={BannerImage} alt="Banner Image" />
            </Box>
          </Grid>
          <Grid item xs={6} sx={6} md={6}>
            <Stack
              sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MDTypography variant="h2" fontWeight="medium" my={1} textAlign="center">
                Sign In
              </MDTypography>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox fullWidth >
                  <MDBox mb={2}>
                    <MDInput type="email" label="Email" fullWidth onChange={(e) => handleChange("email", e)} />
                  </MDBox>
                  <MDBox mb={2}>

                    <TextField
                      size="medium"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      value={password}
                      onChange={handleChangePassword('password')}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={togglePassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </MDBox>
                  {/* <MDBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MDTypography>
                  </MDBox> */}
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="warning" fullWidth onClick={authentication}>
                      sign in
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography
                      // component={Link}
                      // to="/authentication/forgotPassword"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate("/authentication/forgotPassword")}

                    >
                      Forgot Password ?
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </BasicLayout>
  );
}

export default Basic;
