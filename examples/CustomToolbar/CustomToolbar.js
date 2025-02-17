import React from "react";
import {
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";

// customize filter tool
function CustomToolbar(
    pageSize,
    changePageSize
) {
    return (
        <Grid
            container
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDirection={"row"}
            ml={1}
        >
            <Grid
                item
                xs={12}
                lg={4}
                display={"flex"}
                justifyContent={"start"}
                gap={1}
            >
                {/* Setting Page Size */}
                <PageSizeSetter pageSize={pageSize} changePageSize={changePageSize} />
            </Grid>
            <Grid item xs={12} lg={7}>
                <Box
                    width="100%"
                    sx={{
                        p: 2,
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {/* Search Toolbar */}
                    <SearchToolbar />

                </Box>
            </Grid>
        </Grid>
    );
}
// Search Toolbar
export const SearchToolbar = () => (
    <>
        <MDTypography sx={{ fontSize: "15px" }}>Search</MDTypography>
        <GridToolbarQuickFilter
            fullWidth
            variant="outlined"
            size="small"
            sx={{
                "& .MuiOutlinedInput-root": {
                    color: "rgba(158, 158, 158, 1)",
                    borderRadius: "10px",
                    borderColor: "rgba(158, 158, 158, 1)",
                },
            }}
        />
    </>
);
CustomToolbar.propTypes = {

    changePageSize: PropTypes.string.isRequired,
    pageSize: PropTypes.string.isRequired,
};
// Page Size Setter

export const PageSizeSetter = ({ pageSize, changePageSize }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <MDTypography mr={1} sx={{ fontSize: "15px" }}>Show</MDTypography>
            <Select
                sx={{ width: "70px", py: .3 }}
                fullWidth
                id="select-user-rows"
                variant="outlined"
                value={String(pageSize)}
                name="pageSize"
                size="small"
                onChange={(e) => {
                    changePageSize(Number(e.target.value));
                }}
            >
                {[5, 10, 20, 50, 100].map((value, index) => (
                    <MenuItem key={index} value={value} >
                        {value}
                    </MenuItem>
                ))}
            </Select>
            <MDTypography ml={1} sx={{ fontSize: "15px" }}>Entries</MDTypography>
        </Box>
    );
};
PageSizeSetter.propTypes = {

    changePageSize: PropTypes.string.isRequired,
    pageSize: PropTypes.string.isRequired,
};
export default CustomToolbar;
