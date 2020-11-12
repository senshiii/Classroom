import React from "react";

import {
  Box,
  Typography,
  makeStyles,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import { DeleteSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    background: "#fff",
    boxShadow: "1px 1px 8px -5px #000",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
      marginLeft: 0,
      marginRight: 0,
    },
  },
  link: {
    color: theme.palette.primary.main,
    marginTop: ".3rem",
    "& a": {
      color: theme.palette.common.black,
      fontWeight: "bold",
    },
  },
  attachment: {
    display: "inline-flex",
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    alignItems: "center",
    borderRadius: 3,
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.dark,
    fontWeight: "bold",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
      margin: theme.spacing(1),
      marginLeft: 0,
      marginRight: 0,
    },
  },
  annTitle: {
    [theme.breakpoints.down("md")]: theme.typography.h6,
  },
  annDesc: {
    [theme.breakpoints.down("md")]: {
      ...theme.typography.body2,
      margin: "10px 0",
      wordBreak: "break-word",
      color: "black",
    },
  },
}));

const AnnouncementCard = ({
  title,
  description,
  attachments,
  links,
  id,
  setId,
  showDialog,
  editable
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.card}>
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Typography
          variant="h4"
          style={{ color: "black" }}
          className={classes.annTitle}
        >
          {title}
        </Typography>
        {editable && (
          <Tooltip title="Delete Announcement">
            <IconButton
              onClick={() => {
                setId(id);
                showDialog();
              }}
              size="small"
              style={{ color: "red", marginLeft: "auto" }}
            >
              <DeleteSharp />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Typography variant="h6" className={classes.annDesc}>
        {description}
      </Typography>
      {attachments.length > 0 && (
        <Box my={0.5}>
          <Typography variant="body1">Attachments</Typography>
          {attachments.map((attach) => (
            <Box
              key={attach._id}
              component="a"
              href={attach.url}
              className={classes.attachment}
            >
              {attach.name}
            </Box>
          ))}
        </Box>
      )}
      {links.length > 0 && (
        <Box my={0.5}>
          <Typography variant="body1">Links</Typography>
          {links.map((link) => (
            <Typography className={classes.link} variant="body2" key={link._id}>
              {link.title}:{" "}
              <a target="_blank" rel="noopener noreferrer" href={link.link}>
                {link.link}
              </a>
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AnnouncementCard;
