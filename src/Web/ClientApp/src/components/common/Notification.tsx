import React, { FC } from "react";
import { Alert, Snackbar } from "@mui/material";

export type NotificationState = {
  severity: "success" | "warning" | "info" | "error";
  message: string;
  isOpen: boolean;
};

export const NotificationInitState: NotificationState = {
  severity: "success",
  message: "",
  isOpen: false,
};

export class NotificationStateInteractor {
  readonly state: NotificationState;
  private readonly setState: React.Dispatch<
    React.SetStateAction<NotificationState>
  >;

  constructor(
    useState: [
      NotificationState,
      React.Dispatch<React.SetStateAction<NotificationState>>
    ]
  ) {
    [this.state, this.setState] = useState;
  }

  setMessageState(
    severity: "success" | "warning" | "info" | "error",
    message: string
  ) {
    this.setState({
      severity: severity,
      message: message,
      isOpen: true,
    });
  }

  hideDisplay() {
    this.setState({
      ...this.state,
      isOpen: false,
    });
  }
}

interface NotificationProps {
  open: boolean;
  severity: string;
  message: string;
  onClose: (event: React.SyntheticEvent<Element, Event>) => void;
}

export const Notification: FC<NotificationProps> = (props): JSX.Element => {
  const duration = 3000;
  const vertical = "bottom";
  const horizontal = "right";

  const alert =
    props.severity === "success" ? (
      <Alert severity="success" onClose={props.onClose}>
        {props.message}
      </Alert>
    ) : props.severity === "error" ? (
      <Alert severity="error" onClose={props.onClose}>
        {props.message}
      </Alert>
    ) : (
      <></>
    );

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={duration}
      onClose={props.onClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      {alert}
    </Snackbar>
  );
};