import { useState } from "react";
import { API_AUTH } from "../service/api";
import { QRCodeCanvas } from "qrcode.react";
import "./style.css"


function Pass() {
  const [appointmentId, setAppointmentId] = useState("");
  const [pass, setPass] = useState(null);

  const generatePass = async (e) => {
    e.preventDefault();

    const res = await API_AUTH.post(`/pass/generate/${appointmentId}`);

    setPass(res.data.pass);
  };

  return (
    <div>
      <h1>Generate Visitor Pass</h1>

      <form onSubmit={generatePass}>
        <input
          placeholder="Appointment ID"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
        />

        <button type="submit">Generate Pass</button>
      </form>

      {pass && (
        <div className="qr-box">
          <h2>Visitor QR Pass</h2>

          <QRCodeCanvas value={pass._id} size={200} />

          <p>Pass ID: {pass._id}</p>
        </div>
      )}
    </div>
  );
}

export default Pass;
