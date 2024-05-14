import "./nav.css";
import { useRecoilState } from "recoil";
import { pageState } from "../../state";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FcMoneyTransfer } from "react-icons/fc";

export default function Navbar() {
  const navigate = useNavigate()
  const [page, setPage] = useRecoilState(pageState);
  const [showMobileLinks, setShowMobileLinks] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogin(true);
    }
  }, []);

  const avtar = localStorage.getItem("name")?.slice(0, 1);

  function logOut() {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/");
  }

  const handleLinkClick = () => {
    setShowMobileLinks(false);
  };

  return (
    <>
      <div className="navbar">
        <div>
          <h1 className="logo">
            MONEYFY <FcMoneyTransfer className="money_logo"/>
          </h1>
        </div>
        <div>
          <ul className="links">
            <li onClick={() => { setPage("home"); handleLinkClick(); }} className="home">Home</li>
            <li onClick={() => { setPage("add"); handleLinkClick(); }} className="add">Add</li>
            <li onClick={() => { setPage("visualize"); handleLinkClick(); }} className="thrive">Thrive</li>
          </ul>
        </div>
        <div>
        {login ? (
          <button className="avtar_nav"  onClick={handleLinkClick}>{avtar}</button>
        ) : null}

          {login ? (
            <button className="logout-btn" onClick={logOut}>
              Logout
            </button>
          ) : null}
          
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
            {login ? (
            <li  onClick={logOut}>
              Logout
            </li>
          ) : null}
          </ul>
        </div>
      )}
    </>
  );
}
