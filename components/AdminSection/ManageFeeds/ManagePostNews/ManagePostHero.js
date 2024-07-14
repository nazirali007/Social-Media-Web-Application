import { Stack, Tab, Tabs } from '@mui/material'
import MDBox from 'components/MDBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'
import { useState } from 'react'
import ManagePostTable from './ManagePostTable'
import ManageNewsTable from './ManageNewsTable'
import SocialMediaPostTable from '../CreateSocialMedia/SocialMediaPostTable'
import { useLocation } from 'react-router-dom'

const ManagePostHero = () => {
    const { state } = useLocation()
    // const [value, setValue] = useState(state.value === undefined || null ? "ManagePost" : state.value);
    const [value, setValue] = useState("ManagePost");
    // console.log("location", state.value)
    // console.log("value", value)
    const handleChange = (event, newValue) => {
        setValue(newValue);

    };
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={4}>
                <MDBox width={"70%"}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="warning"
                        aria-label="secondary tabs example"
                        sx={{ bgcolor: 'transparent' }}

                    >
                        <Tab value="ManagePost" label="Manage Post" sx={{
                            bgcolor: 'transparent',
                            color: 'text.primary',
                            '&.Mui-selected': {
                                bgcolor: 'orange',
                                color: 'white !important',
                            },

                        }} />
                        <Tab value="ManageNews" label="Manage News"
                            sx={{
                                bgcolor: 'transparent',
                                color: 'text.primary',
                                '&.Mui-selected': {
                                    bgcolor: 'orange',
                                    color: 'white !important',
                                },
                            }}
                        />
                        <Tab value="ManageSocialMediaPost" label="Manage Social Media Post" sx={{
                            bgcolor: 'transparent',
                            color: 'text.primary',
                            '&.Mui-selected': {
                                bgcolor: 'orange',
                                color: 'white !important',
                            },

                        }} />
                    </Tabs>

                </MDBox>
                <Stack mt={2}>
                    {value === "ManagePost" && <ManagePostTable />}
                    {value === "ManageNews" && <ManageNewsTable />}
                    {value === "ManageSocialMediaPost" && <SocialMediaPostTable />}
                </Stack>
            </MDBox>
        </DashboardLayout>
    )
}

export default ManagePostHero;