import axios from "axios";
import { useContext } from "react";
import { AlarmContext } from "../context/AlarmProvider";
import "../Contacts.css";

export default function ContactListItem(props) {
  const { contact_name, contact_number, id } = props;
  const { setContactItems } = useContext(AlarmContext);

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return null;
  }

  const removeContact = (id) => {
    const filtered = (current) =>
      current.filter((contact) => {
        return contact.id !== id;
      });
      setContactItems(filtered)
      console.log(id)
      axios.delete(`api/v1/contactItems/${id}`).then((res) => {
      console.log("deleted contact with id:", id )
  })
};

  return (
    <li className="ContactListItem">
      <div key={id}>
        <p>Contact Name: {contact_name}</p>
        <p>Phone Number: {formatPhoneNumber(contact_number)}</p>
        <button onClick={() => removeContact(id)} className="deleteButton">Delete</button>
      </div>
      <br></br>
    </li>
  );
}
