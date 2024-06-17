// Header.jsx

import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{
      background: 'linear-gradient(90deg, #001d3d, #525dc3)',
      padding: "50px",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000
    }}>
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>DeveLuv</div>
      <div className="nav-links">
        
        {/* 추가적으로 필요한 링크들을 여기에 추가할 수 있습니다 */}
      </div>
    </header>
  );
}

export default Header;
