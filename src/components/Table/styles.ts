import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
  linkContainer: { 
    wordBreak: "break-all", 
    maxWidth: "200px" 
  },
  link: {
    cursor: "pointer",
    textDecoration: "underline",
    color: "blue",
  },
}));
