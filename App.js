import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/apdoAbhimanui2.png";
import brandDark from "assets/images/apdoAbhimanui2.png";
import Loader from "components/MDLoder/Loader";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "./redux/action/defaultActions";

// Routes All Components
import SignIn from "./layouts/authentication/sign-in"
import Resetpassword from "./layouts/authentication/reset-password"
import Verification from "layouts/authentication/otpVerification-auth/Verification";
import ForgotPassword from "layouts/authentication/ForgotPassword/ForgotPassword";
import CreatePostsHero from "./components/AdminSection/ManageFeeds/CreatePostsNews/CreatePostsHero";
import ManagePostHero from "./components/AdminSection/ManageFeeds/ManagePostNews/ManagePostHero";
import ViewPost from "./components/AdminSection/ManageFeeds/ManagePostNews/ViewPost";
import ViewNews from "components/AdminSection/ManageFeeds/ManagePostNews/ViewNews";
import ManageHashtag from "components/AdminSection/ManageFeeds/CreatePostsNews/ManageHashtag/ManageHashtag";
import CreateSocialMediaPosts from "components/AdminSection/ManageFeeds/CreateSocialMedia/CreateSocialMediaPosts";
import ViewSocialMedia from "components/AdminSection/ManageFeeds/ManagePostNews/ViewSocialMedia";
import MentorVerificationHero from "components/AdminSection/MentorShip/MentorShipVerification/MentorVerificationHero";
import MentorShipProgramHero from "components/AdminSection/MentorShip/MentorShipProgram/MentorShipProgramHero";
import LogoutModal from "layouts/logout/LogoutModal";
import SingleUserPreview from "components/AdminSection/MentorShip/MentorShipProgram/AllStudyMaterial/SingleUserPreview";
import PrivacyAndPolicy from "components/AdminSection/CMS/PrivacyAndPolicy/PrivacyAndPolicy";
import TermsAndCondition from "components/AdminSection/CMS/TermsAnd Conditions/TermsAndCondition";

export default function App() {
  const { snackbar } = useSelector((state) => state);
  const actionDispatcher = useDispatch();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // ******************logout function logic **********************

  const handleOpenLogout = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out");
    handleClose();
  };
  // ******************logout function logic **********************

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // close snackabar
  const handleClose = () => {
    actionDispatcher(closeSnackbar());
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      if (route.route) {
        // Check if the route is for logout
        if (route.key === 'logout') {
          return (
            <Route
              exact
              path={route.route}
              element={<div onClick={handleOpen}>{route.component}</div>}
              key={route.key}
            />
          );
        }
      }
      return null;
    });
  const admin = JSON.parse(localStorage.getItem("admin"))

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (

    // direction === "rtl" ? (
    //   <CacheProvider value={rtlCache}>
    //     <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
    //       <CssBaseline />
    //       {layout === "dashboard" && (
    //         <>
    //           <Sidenav
    //             color={sidenavColor}
    //             brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
    //             brandName="Material Dashboard 3"
    //             routes={routes}
    //             onMouseEnter={handleOnMouseEnter}
    //             onMouseLeave={handleOnMouseLeave}
    //           />
    //           <Configurator />
    //           {configsButton}
    //         </>
    //       )}
    //       {layout === "vr" && <Configurator />}
    //       <Routes>
    //         {getRoutes(routes)}
    //         <Route path="*" element={<Navigate to="/dashboard" />} />
    //       </Routes>
    //     </ThemeProvider>
    //   </CacheProvider>
    // ) : (
    <>
      <Loader />
      <Snackbar
        open={snackbar?.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={snackbar?.severity}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName=""
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        <Routes>

          {getRoutes(routes)}
          <Route path="/" element={admin && admin?.isLoggedIn && admin?.isAuthenticated
            ? <Navigate to="/dashboard" /> :
            <Navigate to="/authentication/sign-in" />} />
          {!admin && !admin?.isLoggedIn && !admin?.isAuthenticated ? <>
            <Route path="/authentication/sign-in" element={<SignIn />} />
            <Route path="/authentication/forgotPassword" element={<Resetpassword />} />
            <Route path="/authentication/optVerification" element={<Verification />} />
            <Route path="/authentication/resetPassword" element={<ForgotPassword />} />

            {/* <Route path="/authentication/forget-password/:token" element={<ForgetPassword />} />
            <Route path="/authentication/reset-password" element={<ResetPassword />} /> */}
          </> : <>
            <Route path="/Logout" element={<LogoutModal />} />
            <Route path="/CreatePosts" element={<CreatePostsHero />} />
            <Route path="/ManagePost" element={<ManagePostHero />} />
            <Route path="/CreateSocialMedia" element={<CreateSocialMediaPosts />} />
            <Route path="/ManagePost/viewPost/:id" element={<ViewPost />} />
            <Route path="/ManagePost/viewNews/:id" element={<ViewNews />} />
            <Route path="/ManageHashtag" element={<ManageHashtag />} />
            <Route path="/ManagePost/viewSocialMedia/:id" element={<ViewSocialMedia />} />
            <Route path="/MentorShipVerification" element={<MentorVerificationHero />} />
            <Route path="/MentorShipProgram" element={<MentorShipProgramHero />} />
            <Route path="/SingleUserPreview" element={<SingleUserPreview />} />
            <Route path="/PrivacyAndPolicy" element={<PrivacyAndPolicy />} />
            <Route path="/TermsAndConditions" element={<TermsAndCondition />} />
          </>
          }
        </Routes>
        <MDBox>
          {routes.map((route, index) => (
            <MDBox key={index} onClick={route.key === 'logout' ? handleOpenLogout : null}>
              {/* {route.icon}
              <span>{route.name}</span> */}
            </MDBox>
          ))}
        </MDBox>

        <LogoutModal open={open} handleOpenLogout={handleOpenLogout} handleLogout={handleLogout} />
      </ThemeProvider >
    </>
  );
}






