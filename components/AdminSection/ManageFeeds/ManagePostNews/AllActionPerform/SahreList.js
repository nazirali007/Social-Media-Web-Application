import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from '@mui/material';
import React from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList as VirtualizedList } from 'react-window';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadious: "10px"
};
const SahreList = ({ share, setShare, data }) => {
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    console.log("allDataaaa====>", data)
    const Row = () => (
        <Box
        //  style={style}
        >
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="hello"
                    // {comments[index]}
                    secondary="Secondary text"
                />
            </ListItem>
        </Box>
    );

    return (
        <Modal
            open={share}
            onClose={() => setShare(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Grid sx={style}>
                <Typography sx={{ mb: 2 }} variant="h6" component="div">
                    Share By
                </Typography>
                <VirtualizedList
                    height={400}
                    itemCount="10"
                    itemSize={70}  // Adjusted to accommodate the height of ListItem
                    width={"420px"}
                    style={{ overflowX: 'hidden' }}
                >
                    {Row}
                </VirtualizedList>
            </Grid>
        </Modal>
    );
};


SahreList.propTypes = {
    share: PropTypes.bool.isRequired,
    setShare: PropTypes.bool,
    data: PropTypes.any
};
export default SahreList
