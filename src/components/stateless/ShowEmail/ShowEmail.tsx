import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Avatar, Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedEmailAction } from "../../../store/actions/email.action";
import { getSelectedEmail } from "../../../store/selectors/email.selector";
import { IState } from "../../../interfaces/State";

export default function ShowEmail() {
  const defaultStyling = { boxSizing: "border-box", padding: "10px" };
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const selectedEmail = useSelector((state: IState) => getSelectedEmail(state));

  useEffect(() => {
    console.log("called", selectedEmail, id);
    if (selectedEmail === undefined && id) {
      dispatch(
        getSelectedEmailAction(
          id,
          () => {
            //success
            console.log(selectedEmail);
          },
          () => {
            //not found
            console.log(selectedEmail);
            history.replace("/email");
          }
        )
      );
    }
  }, [selectedEmail, history, id, dispatch]);

  return (
    <React.Fragment>
      <Grid container item xs={12} spacing={0}>
        <Grid item xs={12}>
          <Paper style={defaultStyling as any} square>
            <Avatar component="span" src={selectedEmail?.avatar}>
              ?
            </Avatar>
            <Typography component="span">From: {selectedEmail?.id}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={defaultStyling as any} square>
            <Typography component="h3">
              Subject: {selectedEmail?.subject}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={defaultStyling as any} square>
            <Typography component="span" variant="body2" color="textPrimary">
              Content:{" "}
            </Typography>
            {selectedEmail?.description}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
