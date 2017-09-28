import React, { Component } from "react";
import { connect } from "react-redux";
import ValveAlert from "./ValveAlert";
import { CSSTransitionGroup } from "react-transition-group";
import "./Alerts.css";

import { getAlerts, showValve } from "../../actions";

class AlertsComponent extends Component {
  constructor(props) {
    super(props);
    this.setAlertCheck();
  }
  setAlertCheck = () => {
    this.props.handleGetAlerts(30);
    this.timeout = setTimeout(() => {
      this.setAlertCheck();
    }, 5000);
  };
  render() {
    const { alerts, snoozedAlerts, handleAlertClick } = this.props;
    let renderActive, renderSnoozed;

    if (alerts.length > 0) {
      console.log("The alerts are: ", alerts);
      console.log("The snoozed alerts are: ", snoozedAlerts);
      let snoozedAlertList = alerts.filter(alert => {
        return (
          snoozedAlerts.length > 0 &&
          snoozedAlerts.some(snoozed => {
            let snoozedAlertType = Object.keys(snoozed.valveAlertId)[0];
            let snoozedAlertId = snoozed.valveAlertId[snoozedAlertType];
            console.log(
              snoozedAlertType +
                " === " +
                alert.alertType +
                " and " +
                snoozedAlertId +
                " === " +
                alert.id
            );
            console.log(
              snoozedAlertType === alert.alertType &&
                snoozedAlertId === alert.id
            );
            return (
              snoozedAlertType === alert.alertType &&
              snoozedAlertId === alert.id
            );
          })
        );
      });

      let activeAlertList = alerts;

      if(snoozedAlertList.length > 0 && snoozedAlerts.length > 0) {
          activeAlertList = alerts.filter(alert => {
              return (
                  snoozedAlertList.length > 0 && !snoozedAlerts.some(snoozed => {
                      let snoozedAlertType = Object.keys(snoozed.valveAlertId)[0];
                      let snoozedAlertId = snoozed.valveAlertId[snoozedAlertType];
                      return (
                          snoozedAlertType === alert.alertType &&
                          snoozedAlertId === alert.id
                      );
                  })
              );
          });
      }

      snoozedAlertList.sort(
        (a, b) =>
          new Date(a.detectionTime) < new Date(b.detectionTime)
            ? 1
            : new Date(a.detectionTime) > new Date(b.detectionTime) ? -1 : 0
      );
      activeAlertList.sort(
        (a, b) =>
          new Date(a.detectionTime) < new Date(b.detectionTime)
            ? 1
            : new Date(a.detectionTime) > new Date(b.detectionTime) ? -1 : 0
      );

      console.log("The active alert list is: ", activeAlertList);
      console.log("The snoozed alert list is: ", snoozedAlertList);

      renderActive = activeAlertList.map((alert, i) => (
        <ValveAlert
          key={"alert-" + i}
          id={"alert-" + alert.id}
          alert={alert}
          leftIcon
          isActive={true}
          isSnoozed={false}
          alertType={alert.alertType}
          time={alert.detectionTime}
          onAlertClick={handleAlertClick}
        />
      ));

      renderSnoozed = snoozedAlertList.map(alert => (
        <ValveAlert
          key={alert.id}
          id={alert.id}
          leftIcon
          isActive={true}
          isSnoozed={true}
          alertType={alert.alertType}
          time={alert.detectionTime}
        />
      ));
    } else {
      return (
        <div className="alertBar">
          <div className="alertsContainer">
            <p>No Alerts</p>
          </div>
        </div>
      );
    }
    return (
      <div className="alertBar">
        <div className="alertsContainer">
          <CSSTransitionGroup
            transitionName="alerts"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={100}
          >
            {renderActive}
            {renderSnoozed}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    alerts: state.alerts,
    snoozedAlerts: state.snoozedAlerts
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleAlertClick: function(valve) {
      dispatch(showValve(valve));
    },
    handleGetAlerts: function(count) {
      dispatch(getAlerts(count));
    }
  };
}

const Alerts = connect(mapStateToProps, mapDispatchToProps)(AlertsComponent);

export default Alerts;
