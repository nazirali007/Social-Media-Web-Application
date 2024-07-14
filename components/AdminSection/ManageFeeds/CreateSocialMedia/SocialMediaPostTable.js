import {
    Box,
    Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { useDispatch } from 'react-redux';
import { isLoading, openSnackbar } from '../../../../redux/action/defaultActions';
import NodataFound from "examples/NotFoundPage/NodataFound";
import Table from "examples/ReusableTable/Table";
import { useEffect, useState } from "react";
import CustomToolbar from "examples/CustomToolbar/CustomToolbar";
import apiService from "components/ApiSevices/ApiServices";
import DeleteModal from "examples/DeleteModal/DeleteModal";
import MDTypography from "components/MDTypography";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";


const SocialMediaPostTable = () => {
    const navigate = useNavigate();
    const actionDispatcher = useDispatch();
    const [posts, setAllPosts] = useState([])
    // To Open View Profile and delete Popover
    const [anchorEl, setAnchorEl] = useState(
        null
    );

    // For pagination
    const [paginationData, setPaginationData] = useState({
        limitPerPage: 5,
        totalData: 17,
        totalPages: 4,
        currentPage: 1
    });
    // To open delete modal
    const [dialog, setDialog] = useState({
        open: false,
        title: "",
        message: "",
        buttonText: "",
        data: {
            postId: null,
        },
    });

    // console.log("pagination data", paginationData)
    const getSocialMediaPosts = async (e) => {
        try {
            const res = await apiService.getAllSocialMediaPosts(paginationData);
            setPaginationData(res?.data.pageInfo)
            setAllPosts(res?.data.allSocialMediaPosts)
            // console.log("get all social media posts", res)
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Response error:', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Request error:', error.request);
            } else {
                // Something else happened in setting up the request
                console.error('Error', error.message);
            }
        }
    };
    useEffect(() => {
        getSocialMediaPosts()

    }, [paginationData.currentPage, paginationData.limitPerPage]);

    // To change pagination
    const changePage = (currentPage) => {
        setPaginationData({ ...paginationData, currentPage });
    };
    // to close the popover
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    // It is using in popover
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    //  to format the time
    const timeFormater = (date) => {
        const currentTime = dayjs(date);
        const formattedTime = currentTime.format("h:mm A");
        const formatedDate = currentTime.format("DD-MM-YYYY");

        return `${formatedDate} , ${formattedTime}`;
    };
    const changePageSize = (limitPerPage) => {
        setPaginationData({ ...paginationData, currentPage: 1, limitPerPage });
    };
    const handleClose = () => {
        setAnchorEl(null);

        setDialog({
            open: false,
            title: "",
            message: "",
            buttonText: "",
        });
    };
    const handleViewClick = (params) => {
        navigate(`/ManagePost/viewSocialMedia/${params?.row?._id}`);

    };


    const processData = (data) => {
        return data.map((item, index) => ({
            ...item,
            index: index + 1, // Add 1 to start index from 1
        }));
    };
    const rows = processData(posts);
    const columns = [
        {
            field: "index",
            headerName: <MDTypography fontSize="15px">Index</MDTypography>,
            width: 80,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <MDTypography fontSize="15px">
                        {params.value}
                    </MDTypography>
                );
            },
        },
        {
            field: "title",
            headerName: <MDTypography fontSize="15px">Title</MDTypography>,
            width: 250,
            // Height:"auto",
            // valueGetter: (params) => params.value,
            renderCell: (params) => {
                // console.log("business private post table", params)
                return (
                    <>
                        <MDTypography sx={{
                            // ml: .5,
                            fontSize: "15px",
                            width: "230px",
                            textWrap: "wrap",
                            py: 1,
                            // height: 25
                        }}>{params.value}</MDTypography>
                    </>
                );
            },
        },
        {
            field: "createdAt",
            headerName: <MDTypography fontSize="15px">Date & Time</MDTypography>,
            width: 200,
            renderCell: (params) => {
                return (
                    <MDTypography sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        py: 1.6

                    }}>
                        {timeFormater(params.row.dateOfPost)}
                    </MDTypography>
                );
            },
        },
        {
            field: "numOfLikes",
            headerName: <MDTypography fontSize="15px">Likes</MDTypography>,
            width: 120,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return <MDTypography sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    py: 1.6
                }}>{params.value}</MDTypography>;
            },
        },
        {
            field: "NumOfComments",
            headerName: <MDTypography fontSize="15px">Comments</MDTypography>,
            align: "center",
            headerAlign: "center",
            width: 120,
            // valueGetter: (params) => params.value,
            renderCell: (params) => {
                return <MDTypography sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    py: 1.6

                }}>{params.value}</MDTypography>;
            },
        },
        {
            field: "Preview",
            headerName: <MDTypography fontSize="15px">Preview</MDTypography>,
            width: 90,
            align: "center",
            renderCell: (params) => {
                return (
                    <MDTypography
                        sx={{
                            fontSize: "15.33px",
                            fontWeight: "400",
                            color: "#FF8906",
                            cursor: "pointer",
                            py: 1.6
                        }}
                        onClick={() => handleViewClick(params)}
                    >
                        View
                    </MDTypography >

                );
            },
        },
        {
            field: "Action",
            headerName: <MDTypography fontSize="15px">Action</MDTypography>,
            width: 120,
            renderCell: (params) => {
                return (
                    <>
                        <MDTypography
                            sx={{
                                fontSize: "20.33px",
                                fontWeight: "400",
                                cursor: "pointer",
                                py: 1.6

                            }}
                            onClick={() => {
                                setDialog({
                                    open: true,
                                    title: ``,
                                    message: "post",
                                    buttonText: "",
                                    data: {
                                        postId: params.row._id,
                                    },
                                });
                                setAnchorEl(null);
                            }}>
                            <DeleteOutlineIcon />
                        </MDTypography>

                    </>
                );
            },
        },
    ];
    const DeletePost = async () => {
        actionDispatcher(isLoading(true));
        try {
            const res = await apiService.deletePost(dialog.data.postId)
            // console.log("response", res)
            actionDispatcher(openSnackbar("Social Media Post deleted SuccessFully", "success"));
            actionDispatcher(isLoading(false));
            getSocialMediaPosts()
        } catch (error) {
            actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
            actionDispatcher(isLoading(false));
            console.log("error", error);
        }
    }
    return (
        <>
            <Stack direction={"column"}>
                <Box mt={2}>
                    {/* Table component */}
                    {posts.length == 0 ? (
                        <NodataFound />
                    ) : (
                        <Table
                            rows={rows}
                            columns={columns}
                            CustomToolbar={() =>
                                CustomToolbar(paginationData.limitPerPage, changePageSize)
                            }
                            pageCount={paginationData.totalPages}
                            pageInfo={paginationData}
                            changePage={changePage}
                        />
                    )}
                </Box>
            </Stack>
            {
                dialog.open && <DeleteModal
                    open={dialog.open}
                    handleClose={handleClose}
                    dialog={dialog}
                    deleteFunc={() => DeletePost()}
                />
            }
        </>

    );
}

export default SocialMediaPostTable