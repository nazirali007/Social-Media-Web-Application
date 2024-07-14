import * as React from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { Chip, Grid, Link, Stack, useTheme } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import MDBox from 'components/MDBox';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiService from 'components/ApiSevices/ApiServices';
import dayjs from 'dayjs';
import LikesList from './AllActionPerform/LikesList';
import CommentList from './AllActionPerform/CommentList';
import SahreList from './AllActionPerform/SahreList';
// import CommentList from './AllActionPerform/CommentList';
// import SahreList from './AllActionPerform/SahreList';



function ViewSocialMedia() {
    const theme = useTheme();
    const id = useParams()
    const [activeStep, setActiveStep] = React.useState(0);
    const [maxSteps, setMaxSteps] = useState([])
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState(false)
    const [share, setShare] = useState(false)
    const [data, setData] = useState()

    const handleOpen = (value) => {

        if (value === "like") {
            setOpen(!open);
        } else if (value === "comment") {
            setComment(!comment)
        } else {
            setShare(!share)
        }


    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    // ***********************  GET SINGLE USER DETAILS  ***********************************
    const getUserDetails = async (e) => {

        try {
            const data = await apiService.singleUserSocialMedia(id)
            console.log("singleSocialMediaPost=====>==>", data)
            setData(data?.post)
            setMaxSteps(data?.mediaFilesLength)

        }
        catch (error) {
            console.log("error", error);

        }
    };
    // *********************************************************\
    useEffect(() => {
        getUserDetails()
    }, []);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={2}>

                <Grid item xs={12} sm={7} md={8}>
                    <Stack direction={"row"}>
                        <MDTypography variant="outline" fontSize={"16px"} fontWeight={"900"}>{data?.title}</MDTypography>

                    </Stack>

                    {/* <MDBox > */}
                    <Stack direction="row" spacing={1} >
                        {data?.hashtags.map((item, index) => {
                            return (
                                <Chip key={index} label={item} />
                            )
                        })}
                    </Stack>
                    {/* </MDBox> */}


                    <MDBox sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }} my={2}  >

                        <MDTypography variant="outline" onClick={() => handleOpen("like")} sx={{ cursor: "pointer" }}>
                            <ThumbUpAltIcon />
                        </MDTypography>&nbsp;
                        <MDTypography mb={1}>{data?.numOfLikes}</MDTypography>&nbsp;&nbsp;

                        <MDTypography variant="outline" onClick={() => handleOpen("comment")} sx={{ cursor: "pointer" }}>
                            <ChatBubbleIcon />
                        </MDTypography>&nbsp;
                        <MDTypography mb={1}>{data?.NumOfComments}</MDTypography>&nbsp;&nbsp;

                        <MDTypography variant="outline" onClick={() => handleOpen("share")} sx={{ cursor: "pointer" }}>
                            <ShareIcon />
                        </MDTypography>&nbsp;
                        <MDTypography mb={1}>{data?.numOfLikes}</MDTypography>&nbsp;

                        <LikesList open={open} setOpen={setOpen} data={data} />
                        <CommentList comment={comment} setComment={setComment} data={data} />
                        <SahreList share={share} setShare={setShare} data={data} />

                    </MDBox>


                    <Stack direction={"row"} >
                        <MDTypography variant="outline" fontSize={"16px"} fontWeight={"900"} maxWidth={"30rem"}>
                            <Link href={data?.mediaUrl} target="_blank" rel="noopener" style={{ fontSize: '0.8rem', color: "blue" }}>
                                {`URL:${data?.mediaUrl}`}
                            </Link>
                        </MDTypography>
                    </Stack>
                </Grid>
                <Grid item container xs={12} sm={12} md={12}>
                    <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"space-between"} alignContent={"center"}>
                        <MDTypography fontWeight={"600px"} fontSize={"16px"}>Description</MDTypography>
                        <MDTypography fontWeight={"600px"} fontSize={"0.9rem"}>
                            {dayjs(data?.craetedAt).format('YYYY-MM-DD , hh:mm A')}
                        </MDTypography>
                    </Grid>
                    <MDTypography fontWeight={"400px"} fontSize={"16px"}>{data?.description}</MDTypography>

                </Grid>
            </Grid>
        </DashboardLayout >
    );
}

export default ViewSocialMedia;

