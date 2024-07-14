import * as React from 'react';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import ModalComponent from 'examples/ModalComponent/ModalComponent';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isLoading, openSnackbar } from '../../redux/action/defaultActions';
import apiService from 'components/ApiSevices/ApiServices';


export default function LogoutModal() {
    const actionDispatcher = useDispatch();
    const navigate = useNavigate();
    const [openNew, setOpen] = useState(false);
    const handleChange = () => {
        // handleOpenLogout();
        setOpen(false)
        navigate(-1);
    }


    // ****************************Admin Logout Section*********************************

    const handleLogout = async () => {
        actionDispatcher(isLoading(true));
        try {
            const res = await apiService.logout();

            if (res?.success === true) {
                actionDispatcher(isLoading(false));
                localStorage.removeItem("admin")
                navigate("/authentication/sign-in", { replace: true });
                actionDispatcher(openSnackbar(res?.message, "success"));
                setOpen(false)
            }
        } catch (error) {
            actionDispatcher(isLoading(false));
            actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
            console.log("error===>", error);
        }
    };

    // ****************************************************************************************

    return (
        <ModalComponent open={openNew} handleClose={() => setOpen(false)}>
            <MDBox >
                <MDTypography id="modal-modal-title" variant="h6" component="h2">
                    LOGOUT
                </MDTypography>
                <MDTypography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure to want to logout ?
                </MDTypography>
                <MDBox mt={2} sx={{ display: "flex", justifyContent: "space-evenly", alignItem: "center" }}>
                    <MDButton onClick={handleLogout} color={"warning"}>YES</MDButton>
                    <MDButton onClick={handleChange} variant={"outlined"} color={"warning"}>NO</MDButton>
                </MDBox>
            </MDBox>
        </ModalComponent>
    );
}


