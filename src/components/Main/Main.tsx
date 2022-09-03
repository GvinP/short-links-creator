import Grow from "@material-ui/core/Grow";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import Container from "@material-ui/core/Container";
import { LinksTable } from "../Table/Table";
import { CreationLink } from "../CreationLink/CreationLink";

export const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <Grow in>
      <Container component={"main"} maxWidth={"xl"}>
        <CreationLink />
        <Paper>
          <LinksTable />
        </Paper>
      </Container>
    </Grow>
  );
};
