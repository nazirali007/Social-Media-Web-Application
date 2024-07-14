import React from "react";
import { Backdrop, Box, Button, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalComponent from "examples/ModalComponent/ModalComponent";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import DeleteIconNew from '../../assets/images/GroupDelete.png'

const DeleteModal = ({ open, handleClose, dialog, deleteFunc }) => {
    return (
        <>
            <ModalComponent open={open} handleClose={handleClose} type={"delete"} BackdropComponent={Backdrop}
                BackdropProps={{
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(10px)',
                    },
                }}>
                <Stack
                    spacing={2}
                    sx={{

                        bgcolor: "background.paper",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* <img src={DeleteIconNew} /> */}
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Box sx={{ borderRadius: "50%", border: "2px solid red", width: "45px", height: "45px", p: .8 }}>

                            <DeleteIcon sx={{ width: "30px", height: "30px", color: "red" }} />
                        </Box>

                    </Box>
                    <Typography
                        sx={{
                            color: "black",
                            fontSize: "17px",
                        }}
                    >
                        {dialog.buttonText == ""
                            ? `Are you sure you want to delete this ${dialog?.title} ${dialog?.message} ?`
                            : `${dialog?.title} ${dialog?.message}`}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            bgcolor: "background.paper",
                            my: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            // bgcolor="secondary"
                            // color="primary"
                            sx={{ color: "white !important", backgroundColor: "#FF8906" }}
                            size="medium"
                            onClick={() => {
                                deleteFunc();
                                handleClose();
                            }}
                        >
                            {dialog.buttonText ? dialog.buttonText : "Delete"}
                            {/* delete */}
                        </Button>
                        <Button
                            sx={{ color: "gray" }}
                            size="medium" variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Box>
                </Stack>
            </ModalComponent>
        </>
    );
};
DeleteModal.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    dialog: PropTypes.object,
    handleClose: PropTypes.func,
    deleteFunc: PropTypes.func,
};
export default DeleteModal;
