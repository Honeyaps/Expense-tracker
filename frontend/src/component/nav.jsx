import "./nav.css";
import { useRecoilState } from "recoil";
import { pageState } from "../../state";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";

export default function Navbar() {
  const [page, setPage] = useRecoilState(pageState);
  const [showMobileLinks, setShowMobileLinks] = useState(false);

  const handleLinkClick = () => {
    setShowMobileLinks(false);
  };

  return (
    <>
      <div className="navbar">
        <div>
          <h1 className="logo">
            MONEYFY <FaMoneyBillTrendUp />
          </h1>
        </div>
        <div>
          <ul className="links">
            <li onClick={() => { setPage("home"); handleLinkClick(); }}>Home</li>
            <li onClick={() => { setPage("add"); handleLinkClick(); }}>Add</li>
            <li onClick={() => { setPage("visualize"); handleLinkClick(); }}>Thrive</li>
          </ul>
        </div>
        <div>
          <button className="avtar">Avtar</button>
          <button className="logout_btn">Log out</button>
          <button className="menu_btn" onClick={() => setShowMobileLinks(!showMobileLinks)}>
            <BiMenu />
          </button>
        </div>
      </div>

      {showMobileLinks && (
        <div className="mobile_navbar">
          <ul className="mobile_links">
            <li onClick={() => { setPage("home"); handleLinkClick(); }}>Home</li>
            <li onClick={() => { setPage("add"); handleLinkClick(); }}>Add</li>
            <li onClick={() => { setPage("visualize"); handleLinkClick(); }}>Thrive</li>
            <li>Log out</li>
          </ul>
        </div>
      )}
    </>
  );
}
