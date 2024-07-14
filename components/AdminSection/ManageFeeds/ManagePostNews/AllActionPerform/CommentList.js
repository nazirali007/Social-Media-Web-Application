import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import PropTypes from 'prop-types';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Avatar, Box, IconButton, Modal, Typography } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadious: "10px",
    bgcolor: 'background.paper'
};

export default function CommentList({ comment, setComment, data }) {
    const [open, setOpen] = React.useState(false);
    const [like, setLike] = React.useState(false);

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

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClickLike = () => {

        setLike(!like);
    };

    return (
        <Modal
            open={comment}
            onClose={() => setComment(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Comments By
                        </ListSubheader>
                    }
                >
                    {data?.comments?.map((item, index) => {
                        return (
                            <>
                                <ListItemButton key={index} ListItemButton  >
                                    <ListItemIcon>
                                        <Avatar>
                                            {/* <InboxIcon /> */}
                                            {item?.user?.profileImg?.imageUrl}
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={item?.user?.userName} />

                                    <ListItemText sx={{ maxWidth: "30px" }} onClick={handleClickLike}>
                                        {like ? <ThumbUpIcon /> : <ThumbUpOffAltIcon sx={{ marginTop: "10px" }} />}
                                    </ListItemText>
                                    <ListItemText sx={{ fontWeight: 600, maxWidth: "60px" }} secondary={`${data?.NumOfComments} likes`} />
                                    <ListItemIcon >
                                        <DeleteOutlineIcon />
                                    </ListItemIcon>
                                    {/* {open ? <ExpandLess /> : <ExpandMore />} */}
                                </ListItemButton >
                                <ListItemText sx={{ marginLeft: "4.3rem" }} secondary={
                                    <Typography component="span" sx={{ fontWeight: 400, fontSize: "1rem" }}>
                                        {item?.comment}
                                    </Typography>
                                } />
                                <ListItemText sx={{ marginLeft: "4.3rem" }} secondary={
                                    <Typography component="span" sx={{ fontWeight: 200, fontSize: "1rem" }}>
                                        {getTimeDifference(item?.createdAt)}
                                    </Typography>
                                } />
                                <ListItemText sx={{ marginLeft: "4.3rem", cursor: "pointer" }} secondary={
                                    <Typography component="span" sx={{ fontWeight: 400, color: "#FF9933", fontSize: "1rem" }} >
                                        {open ? "hide Reply" : `${item?.replies.length} Replies`}
                                    </Typography>
                                } onClick={handleClick} />

                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item?.replies.map((reply, replyIndex) => (
                                            <>
                                                <ListItemButton key={index} ListItemButton  >
                                                    <ListItemIcon>
                                                        <Avatar>
                                                            {/* <InboxIcon /> */}
                                                            {reply?.user?.profileImg?.imageUrl}
                                                        </Avatar>
                                                    </ListItemIcon>
                                                    <ListItemText secondary={
                                                        <Typography component="span" sx={{ fontWeight: 400, fontSize: "1rem" }}>
                                                            {reply?.user?.userName}
                                                        </Typography>
                                                    }

                                                        sx={{ fontWeight: 500, fontSize: "1rem" }} />

                                                    <IconButton edge="end" aria-label="delete" sx={{ fontSize: "13px" }}>

                                                        {getTimeDifference(item?.createdAt)}
                                                    </IconButton>
                                                </ListItemButton >

                                                <ListItemText sx={{ marginLeft: "4.3rem" }} secondary={
                                                    <Typography component="span" sx={{ fontWeight: 200, fontSize: "0.9rem" }}>
                                                        {reply?.reply}
                                                    </Typography>
                                                } />
                                            </>

                                        ))}
                                    </List>
                                </Collapse>
                            </>
                        )
                    })}

                </List >
            </Box >
        </Modal >
    );
}
CommentList.propTypes = {
    comment: PropTypes.bool.isRequired,
    setComment: PropTypes.bool,
    data: PropTypes.any
};

{/* <ListItemButton>
<ListItemIcon>
    <SendIcon />
    <Avatar>
        {item?.user?.profileImg?.imageUrl}
    </Avatar>
</ListItemIcon>
<ListItemText primary="Sent mail" />
</ListItemButton>
<ListItemButton>
<ListItemIcon>
    <DraftsIcon />
</ListItemIcon>
<ListItemText primary="Drafts" />
</ListItemButton> */}