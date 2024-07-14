
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import LogoutIcon from '@mui/icons-material/Logout';
// import LogoutIcon from './assets/images/icons/logout.svg';
import Groups2Icon from '@mui/icons-material/Groups2';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManagePostHero from "components/AdminSection/ManageFeeds/ManagePostNews/ManagePostHero";
import CreatePostsHero from "components/AdminSection/ManageFeeds/CreatePostsNews/CreatePostsHero";
import ManageHashtag from "components/AdminSection/ManageFeeds/CreatePostsNews/ManageHashtag/ManageHashtag";
import CreateSocialMediaPosts from "components/AdminSection/ManageFeeds/CreateSocialMedia/CreateSocialMediaPosts";
import MentorVerificationHero from "components/AdminSection/MentorShip/MentorShipVerification/MentorVerificationHero";
import MentorShipProgramHero from "components/AdminSection/MentorShip/MentorShipProgram/MentorShipProgramHero";
import LogoutModal from "layouts/logout/LogoutModal";
import PrivacyAndPolicy from "components/AdminSection/CMS/PrivacyAndPolicy/PrivacyAndPolicy";
import TermsAndCondition from "components/AdminSection/CMS/TermsAnd Conditions/TermsAndCondition";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  {
    type: "collapse",
    name: "Manage Feed",
    key: "ManageFeed",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    subRoutes: [
      {
        type: "route",
        name: "Create Posts/News",
        key: "CreatePostsNews",
        route: "/CreatePosts",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <CreatePostsHero />,
      },
      {
        type: "route",
        name: "Create via Social Media Account",
        key: "CreateSocialMedia",
        route: "/CreateSocialMedia",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <CreateSocialMediaPosts />,
      },
      {
        type: "route",
        name: "Manage Post/News ",
        key: "ManagePost/News ",
        route: "/ManagePost",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <ManagePostHero />,
      },
      {
        type: "route",
        name: "Manage Hashtags",
        key: "ManageHashtags",
        route: "/ManageHashtag",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <ManageHashtag />,
      },

    ],
  },

  {
    type: "collapse",
    name: "Mentorship Program",
    key: "mentorshipProgram",
    icon: <Icon fontSize="small"><Groups2Icon /></Icon>,
    route: "/MentorShipProgram",
    component: <MentorShipProgramHero />,
  },
  {
    type: "collapse",
    name: "Mentor Verification",
    key: "mentorVerification",
    icon: <Icon fontSize="small"><AdminPanelSettingsIcon /></Icon>,
    route: "/MentorShipVerification",
    component: <MentorVerificationHero />,
  },
  {
    type: "collapse",
    name: "CMS",
    key: "CMS",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    subRoutes: [
      {
        type: "route",
        name: "Privacy And Policy",
        key: "PrivacyAndPolicy",
        route: "/PrivacyAndPolicy",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <PrivacyAndPolicy />,
      },
      {
        type: "route",
        name: "Terms And Conditions",
        key: "TermsAndConditions",
        route: "/TermsAndConditions",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <TermsAndCondition />,
      },

    ],
  },

  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },


  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">< LogoutIcon /></Icon>,
    route: "/logout",
    component: <LogoutModal />,
    clickHandler: null,
  },

  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
