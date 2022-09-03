import React, { ChangeEvent, FormEvent, useState } from "react";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { login, registration, setIsRegistered } from "../../store/authReducer";

const initialState = {
  username: "",
  password: "",
};

export type FormDataType = typeof initialState;

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isRegister, setIsRegister] = useState(false);
  const isRegistered = useAppSelector(state=> state.auth.isRegistered)
  const username = useAppSelector(state=> state.auth.username)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(registration({ formData, navigate }));
    } else {
      dispatch(login({ formData, navigate }));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => setIsRegister((prevState) => !prevState);

  return (
    <Container component={"main"} maxWidth={"xs"}>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant={"h5"}>
          {isRegister ? "Register" : "Login"}
        </Typography>
        {!isRegistered
        ?
        (<form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name={"username"}
              label={"Username"}
              handleChange={handleChange}
              type={"text"}
            />
            <Input
              name={"password"}
              label={"Password"}
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handlerShowPassword={() =>
                setShowPassword((prevState) => !prevState)
              }
            />
          </Grid>
          <Button
            type={"submit"}
            fullWidth
            variant={"contained"}
            color={"primary"}
            className={classes.submit}
          >
            {isRegister ? "Register" : "Login"}
          </Button>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Button onClick={switchMode}>
                {isRegister
                  ? "Already have an account? Login"
                  : "Dont't have an account? Register"}
              </Button>
            </Grid>
          </Grid>
        </form>)
        : (
          <Grid container spacing={2}>
            <Typography variant={"h5"}>User {username} is successefully registered. Please login.</Typography>
            <Button
            type={"submit"}
            fullWidth
            variant={"contained"}
            color={"primary"}
            onClick={()=>{
              setIsRegister(false)
              dispatch(setIsRegistered(false))
            }}
            className={classes.submit}
          >Login</Button>
          </Grid>
        )
        }
      </Paper>
    </Container>
  );
};
