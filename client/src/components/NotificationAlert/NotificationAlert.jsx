import React, { useContext, useState } from "react";
import axios from "axios";
import { AlarmContext } from "../context/AlarmProvider";
import { authContext } from "../../providers/AuthProvider";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function NotificationAlert(props) {
  const { notification, setNotification, 
    // notificationDetails, 
    soundItems } =
    useContext(AlarmContext);
  const { user } = useContext(authContext);
  const [snooze, setSnooze] = useState([]);

  // hard coded notification details object for testing purposes

  const notificationDetails = {
    alarm_time: "11:37 AM:00",
    contact_name: "Dylan",
    contact_number: "7802386933",
    sound_name: "Test recording ",
    sound_url: "1673633900965.ogg"}

  const twilioData = {
    contact_name: notificationDetails.contact_name,
    contact_number: notificationDetails.contact_number,
    user_name: user.name,
  };
  const contactName = notificationDetails.contact_name;

  function snoozeAlarm() {
    console.log(`text sent to:${notificationDetails.contact_number}`)
    setSnooze(notificationDetails)
    setTimeout(() => {
      setNotification(true)
    }, 30000);
    setNotification(false);
    axios.post("/api/v1/sendSMS", { twilioData }).then((res) => {
      console.log(`text sent to ${twilioData}`);
    });
    return;
  }

  function acceptNotification() {
    setNotification(false);
    console.log("accept button pressed");
    return;
  }

  return (
    <div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}
  >
    <Modal
    show="true"
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Your Alarm Has Gone Off!!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Hello {notificationDetails.contact_name} Your {notificationDetails.alarm_time} alarm has gone off</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={acceptNotification}>Accept Alarm</Button>
        <Button variant="primary" onClick={snoozeAlarm}>Snooze Alarm</Button>
      </Modal.Footer>
    </Modal.Dialog>
    </Modal>
  </div>

    
  );
}


    // <div>
    //   <h1>THE ALARM HAS GONE OFF!!!!</h1>
    //   <button onClick={acceptNotification}>ACCEPT</button>
    //   <button onClick={snoozeAlarm}>SNOOZE</button>
    // </div>