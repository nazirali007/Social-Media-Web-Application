import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from '@mui/material';
import React from 'react'
import PropTypes from 'prop-types';
import { FixedSizeList as VirtualizedList } from 'react-window';
import { useEffect } from 'react';

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
const LikesList = ({ open, setOpen, data }) => {

    const totalHeight = 400; // Total height of the VirtualizedList
    const itemCount = data?.likes?.length || 0; // Number of items
    const itemSize = itemCount > 0 ? Math.floor(totalHeight / itemCount) : 70; // Ensure a minimum itemSize of 70 if there are no items



    const getTimeDifference = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const diffInMs = now - createdDate;
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays} days ago`;
        }
    };
 


    const Row = () => (
        <Box sx={{ marginRight: "1rem" }}
        >
            {data?.likes?.map((item, index) => {
                return (
                    <ListItem key={index}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" sx={{ fontSize: "13px" }}>
                                {/* <DeleteIcon /> */}
                                {getTimeDifference(item?.createdAt)}
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                {item?.profileImg?.imageUrl}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            secondary={item?.userName}
                        // {comments[index]}
                        // secondary="Secondary text"
                        />
                    </ListItem>
                )
            })}

        </Box>
    );

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Grid sx={style}>
                <Typography sx={{ mb: 2 }} variant="h6" component="div">
                    Likes By
                </Typography>
                <VirtualizedList
                    height={totalHeight}
                    itemCount={itemCount}
                    itemSize={itemSize}  // Adjusted to accommodate the height of ListItem
                    width={"420px"}
                    style={{ overflowX: 'hidden' }}
                >
                    {Row}
                </VirtualizedList>
            </Grid>
        </Modal>
    );
};

LikesList.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.bool,
    data: PropTypes.any
};
export default LikesList


// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Modal, Grid, Typography, IconButton, Box, ListItem, ListItemAvatar, Avatar, ListItemText, Collapse } from '@mui/material';
// import { List, AutoSizer } from 'react-virtualized';


// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 450,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 2,
//     borderRadious: "10px"
// };
// const LikesList = ({ open, setOpen, data }) => {
//     const totalHeight = 400; // Total height of the VirtualizedList
//     const itemCount = data?.likes?.length || 0; // Number of items
//     const itemSize = itemCount > 0 ? Math.floor(totalHeight / itemCount) : 70; // Ensure a minimum itemSize of 70 if there are no items


//     const getTimeDifference = (createdAt) => {
//         const now = new Date();
//         const createdDate = new Date(createdAt);
//         const diffInMs = now - createdDate;
//         const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

//         if (diffInHours < 24) {
//             return `${diffInHours} hours ago`;
//         } else {
//             const diffInDays = Math.floor(diffInHours / 24);
//             return `${diffInDays} days ago`;
//         }
//     };

//     const Row = ({ index, style }) => {

//         return (
//             <Box sx={{ marginRight: "1rem" }} style={style}>
//                 <ListItem
//                     key={index}
//                     secondaryAction={
//                         <IconButton edge="end" aria-label="delete" sx={{ fontSize: "13px" }} onClick={() => toggleExpand(index)}>
//                             {getTimeDifference(item?.createdAt)}
//                         </IconButton>
//                     }
//                 >
//                     <ListItemAvatar>
//                         <Avatar src={item?.profileImg?.imageUrl} />
//                     </ListItemAvatar>
//                     <ListItemText
//                         primary={item?.userName}
//                     />
//                 </ListItem>

//             </Box>
//         );
//     };

//     Row.propTypes = {
//         index: PropTypes.number.isRequired,
//         style: PropTypes.object.isRequired
//     };

//     return (
//         <Modal
//             open={open}
//             onClose={() => setOpen(false)}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//         >
//             <Grid sx={style}>
//                 <Typography sx={{ mb: 2 }} variant="h6" component="div">
//                     Likes By
//                 </Typography>
//                 <AutoSizer>
//                     {({ height, width }) => (
//                         <List
//                             height={height}
//                             rowCount={itemCount}
//                             rowHeight={itemSize}  // Adjusted to accommodate the height of ListItem
//                             width={width}
//                             rowRenderer={({ index, style }) => <Row index={index} style={style} />}
//                         />
//                     )}
//                 </AutoSizer>
//             </Grid>
//         </Modal>
//     );
// };

// LikesList.propTypes = {
//     open: PropTypes.bool.isRequired,
//     setOpen: PropTypes.bool,
//     data: PropTypes.any
// };
// export default LikesList

