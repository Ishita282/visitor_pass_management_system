import { useState } from "react";
import { API_AUTH } from "../service/api";
import { QRCodeCanvas } from "qrcode.react";

function Pass() {
  const [appointmentId, setAppointmentId] = useState("");
  const [pass, setPass] = useState(null);
  const generatePass = async (e) => {
    e.preventDefault();
    if (!appointmentId) {
      alert("Please enter Appointment ID");
      return;
    }
    try {
      const res = await API_AUTH.post(`/pass/generate/${appointmentId}`);
      setPass(res.data.pass);
    } catch (error) {
      console.log(error);
      alert("Failed to generate pass");
    }
  };

  return (
    <div>
      <h1>Generate Visitor Pass</h1>

      <form onSubmit={generatePass}>
        <label>Appointment ID</label>

        <input
          type="text"
          placeholder="Enter Appointment ID"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
        />

        <button type="submit">Generate Pass</button>
      </form>

      {pass && (
        <div>
          <h2>Visitor QR Pass</h2>

          <QRCodeCanvas value={pass._id} size={200} />

          <p>
            <b>Pass ID:</b> {pass._id}
          </p>
        </div>
      )}
    </div>
  );
}

export default Pass;
