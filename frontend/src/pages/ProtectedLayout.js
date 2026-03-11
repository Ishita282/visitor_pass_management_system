import React from 'react'
import Navbar from '../components/Navbar';
import "./style.css"


function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default ProtectedLayout

