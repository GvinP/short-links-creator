import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { createLink, setSuccess } from "../../store/linksReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import useStyles from "./styles";
import { useClipboard } from "use-clipboard-copy";

export const CreationLink = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [newLink, setNewLink] = useState("");
  const clipboard = useClipboard();
  const link = useAppSelector((state) => state.links.link);

  const copyToClipboard = () => {
    clipboard.copy(`http://79.143.31.216/s/${link.short}`);
    dispatch(setSuccess("Link copied!"));
  };

  const handleCreateLink = () => {
    if (newLink.trim()) {
      dispatch(createLink(newLink));
    }
  };
  return (
    <>
      <Typography variant={"h5"} className={classes.title}>
        Create a short link
      </Typography>
      <div className={classes.formContainer}>
        <TextField
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          variant={"outlined"}
          fullWidth
          placeholder="Paste your link"
        />
        <Button
          onClick={handleCreateLink}
          color={"primary"}
          variant={"contained"}
          className={classes.button}
        >
          Create
        </Button>
      </div>
      {!!Object.keys(link).length && (
        <Paper className={classes.linkContainer}>
          <TextField
            value={`http://79.143.31.216/s/${link.short}`}
            variant={"outlined"}
            fullWidth
            onClick={copyToClipboard}
            className={classes.linkField}
          />
          <IconButton onClick={copyToClipboard}>
            <ContentCopyIcon className={classes.icon} fontSize="large" />
          </IconButton>
        </Paper>
      )}
    </>
  );
};
