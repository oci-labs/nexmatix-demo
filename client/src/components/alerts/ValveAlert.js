import React, { Component } from "react";
import { Alert } from "reactstrap";
import Disconnect from "../icons/Disconnect";
import Gauge from "../icons/Gauge";
import { IconAlarm } from "../icons/NexmatixIcons";
import "./Alerts.css";

class ValveAlert extends Component {
  render() {
    const {
      leftIcon,
      alertType,
      isActive,
      isSnoozed,
      time,
      handleUpdate,
      onAlertClick
    } = this.props;
    const alertTypes = {
      DATA_FAULT: "Data Fault",
      DISCONNECTED: "Disconnected",
      LEAK: "Leak",
      CYCLE_THRESHOLD: "Cycle Count",
      LIFECYCLE_COUNT_FAULT: "Count Fault",
      LIFECYCLE_COUNT_WARNING: "Count Warning",
      PRESSURE_FAULT: "Pressure Fault",
      PRESSURE_WARNING: "Pressure Warning",
      VALVE_FAULT: "Valve Fault"
    };
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today = today.setMilliseconds(0);
    let thrownAt = new Date(time);
    let displayTime = thrownAt
      .toLocaleString([], {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      })
      .replace(/,/g, "");
    const handleClick = () => {
      handleUpdate(this);
    };
    const handleAlertClick = () => {
      if (onAlertClick) {
        onAlertClick(this.props.alert.valve);
      }
    };
    return (
      <Alert
        color={isSnoozed ? "info" : isActive && !isSnoozed ? "danger" : ""}
        className={!isActive ? "disabled" : ""}
        onClick={handleAlertClick}
      >
        {leftIcon &&
          <div className="alert-icon-left" style={{ height: "24px" }}>
            {(() => {
              switch (alertType) {
                case "DISCONNECTED":
                case "DATA_FAULT":
                  return (
                    <Disconnect size="24" color={isActive ? "white" : "#777"} />
                  );
                default:
                  return (
                    <Gauge size="24" color={isActive ? "white" : "#777"} />
                  );
              }
            })()}
          </div>}
        {/* this.props.alertContent */}
        <div className="alert-content">
          <strong>
            {alertTypes[alertType]}
          </strong>
          <br />
          <span className="alert-details">
            {displayTime}
          </span>
        </div>
        <div
          className="alert-icon-right"
          style={{ height: "24px" }}
          onClick={handleClick}
        >
          {isActive &&
            !isSnoozed &&
            <IconAlarm width="24" height="24" color="#fff" />}
        </div>
      </Alert>
    );
  }
}

export default ValveAlert;
