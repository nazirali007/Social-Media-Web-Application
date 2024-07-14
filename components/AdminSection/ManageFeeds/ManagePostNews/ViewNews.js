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
import { Chip, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import MDBox from 'components/MDBox';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiService from '../../../../components/ApiSevices/ApiServices';
import dayjs from 'dayjs';
import LikesList from './AllActionPerform/LikesList';
import CommentList from './AllActionPerform/CommentList';
import SahreList from './AllActionPerform/SahreList';


function ViewNews() {
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
            const data = await apiService.singleUserNews(id)
            console.log("singleDataNewssss==>", data?.newsFeed)
            setData(data?.newsFeed)
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
                <Grid item xs={12} sm={5} md={4}>
                    <Box sx={{ flexGrow: 1 }}>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {/* {console.log("firstSTEP", data)} */}
                            {data?.newsMediaFiles.map((step, index) => (
                                <MDBox key={index} >
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        step?.contentType === "image/jpeg" || step?.contentType === "image/jpg" || step?.contentType === "image/png" || step?.contentType === "image/webp" ? (
                                            <Box
                                                component="img"
                                                sx={{
                                                    height: 255,
                                                    display: 'block',
                                                    maxWidth: 400,
                                                    overflow: 'hidden',
                                                    width: '100%',
                                                }}
                                                src={step.url}
                                                alt="newsPost"
                                            />
                                        ) : (
                                            <Box
                                                component="video"
                                                sx={{
                                                    height: 255,
                                                    display: 'block',
                                                    maxWidth: 400,
                                                    overflow: 'hidden',
                                                    width: '100%',
                                                }}
                                                controls
                                            >
                                                <source src={step.url} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </Box>
                                        )
                                    ) : null}
                                </MDBox>
                            ))}
                        </SwipeableViews>
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={activeStep === maxSteps - 1}
                                >
                                    Next
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowLeft />
                                    ) : (
                                        <KeyboardArrowRight />
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowRight />
                                    ) : (
                                        <KeyboardArrowLeft />
                                    )}
                                    Back
                                </Button>
                            }
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                    <Stack direction={"row"} my={2}>
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
                    }} my={1}  >

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
                            <Link href={data?.newsUrl} target="_blank" rel="noopener" style={{ fontSize: '0.8rem', color: "blue" }}>
                                {`URL:${data?.newsUrl}`}
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

export default ViewNews;
