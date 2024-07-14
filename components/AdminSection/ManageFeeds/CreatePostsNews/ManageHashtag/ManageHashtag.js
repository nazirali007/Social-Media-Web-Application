import { Chip, Stack } from '@mui/material'
import apiService from 'components/ApiSevices/ApiServices'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDButton from 'components/MDButton'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { isLoading, openSnackbar } from '../../../../../redux/action/defaultActions'


const ManageHashtag = () => {
    const actionDispatcher = useDispatch();
    const [options, setOptions] = useState([]);
    const [selectedHashtags, setSelectedHashtags] = useState([]);

    // Function to handle deleting a hashtag
    const selectedHashtag = (id) => {
        setSelectedHashtags((prevSelected) => {
            // Add or remove the ID from the selectedHashtags array
            if (prevSelected.includes(id)) {
                return prevSelected.filter((hashtagId) => hashtagId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    // ******************************* GET ALL HASHTAG *********************************
    const getAllhashTagFunc = async (e) => {
        try {
            const res = await apiService.getAllhashTag();
            // console.log("alllhashtag===>", res)
            setOptions(res?.allHashtags)
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
    // ***************************************************************************
    // ******************************* DELETE SELECTED HASHTAG *********************************
    const handleDelete = async (id) => {
        actionDispatcher(isLoading(true));
        try {
            const res = await apiService.deleteHashtags(selectedHashtags);
            // console.log("alllhashtag===>", res)
            actionDispatcher(isLoading(false));
            getAllhashTagFunc()
            actionDispatcher(openSnackbar(res?.message, "success"));
        } catch (error) {
            actionDispatcher(isLoading(false));
            console.log("error", error);
            actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
        }
    };
    // ***************************************************************************

    useEffect(() => {
        getAllhashTagFunc()

    }, []);

    return (

        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mx={2} sx={{ display: "grid", alignitem: "center", justifycontent: "start" }}>
                <MDBox display="flex" alignItems="center" justifyContent="space-between" my={2}>
                    <MDTypography variant="outline" fontSize="16px" fontWeight="medium">
                        Hashtags
                    </MDTypography>
                    <MDButton size={"medium"} variant={"contained"} color={"warning"} my={2} onClick={handleDelete}> < DeleteOutlineIcon fontSize='2rem !important' />  &nbsp; Delete selected files</MDButton>
                </MDBox>
                <Stack direction="row"
                    spacing={1}
                    sx={{

                        marginTop: "1rem",
                        flexWrap: 'wrap',
                        gap: 1
                    }}
                    maxWidth="100vw">
                    {options.map((option, index) => {
                        const isSelected = selectedHashtags.includes(option._id);
                        return (
                            <MDBox
                                key={index}
                                style={{
                                    cursor: 'pointer',
                                    display: 'inline-block',
                                    margin: '5px', // Adjust margin as needed
                                }}
                                onClick={() => selectedHashtag(option._id)}
                            >
                                <Chip
                                    style={{
                                        backgroundColor: isSelected ? '#f53f36' : '#918a8a',
                                        color: 'white',
                                    }}
                                    label={option?.hashtag}
                                    onDelete={() => selectedHashtag(option._id)}
                                />
                            </MDBox>
                        )
                    })}

                </Stack>

            </MDBox>
        </DashboardLayout>

    )
}

export default ManageHashtag
