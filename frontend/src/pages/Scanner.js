import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { API_AUTH } from "../service/api";

function Scanner() {
  const [passId, setPassId] = useState("");
  const [message, setMessage] = useState("");

  const handleScan = async (data) => {
    if (!data) return;
    const scannedId = data?.text || data;
    setPassId(scannedId);
    try {
      const res = await API_AUTH.post(`/checklogs/checkin/${scannedId}`);
      setMessage(res.data.msg || "Visitor checked in successfully");
    } catch (err) {
      try {
        const res = await API_AUTH.post(`/checklogs/checkout/${scannedId}`);
        setMessage(res.data.msg || "Visitor checked out successfully");
      } catch {
        setMessage("Invalid QR Code");
      }
    }
  };

  return (
    <div className="scanner-container">
      <h1>Security QR Scanner</h1>
      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={(result) => result && handleScan(result)}
        style={{ width: "100%" }}
      />
      <h3>Scanned Pass ID: {passId}</h3>
      <h2>{message}</h2>
    </div>
  );
}

export default Scanner;
