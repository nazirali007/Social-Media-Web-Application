import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { Stack } from '@mui/material';
import MDBox from 'components/MDBox';
import VerifyMentor from './VerifyMentor';
import AllMentor from './AllMentor';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <MDBox sx={{ p: 3 }}>{children}</MDBox>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState("VerifyMentor");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={4}>
                <MDBox width={"35%"}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="warning"
                        aria-label="secondary tabs example"
                        sx={{ bgcolor: '#f9f9f9 ', padding: "1rem" }}

                    >
                        <Tab value="VerifyMentor" label="Verify Mentor" sx={{
                            bgcolor: 'transparent',
                            color: 'text.primary',
                            '&.Mui-selected': {
                                bgcolor: 'orange',
                                color: 'white !important',
                            },

                        }} />
                        <Tab value="AllMentor" label="All Mentor"
                            sx={{
                                bgcolor: 'transparent',
                                color: 'text.primary',
                                '&.Mui-selected': {
                                    bgcolor: 'orange',
                                    color: 'white !important',
                                },
                            }}
                        />

                    </Tabs>

                </MDBox>
                <Stack mt={2}>
                    {value === "VerifyMentor" && <VerifyMentor />}
                    {value === "AllMentor" && <AllMentor />}

                </Stack>
            </MDBox>
        </DashboardLayout>
    );
}

