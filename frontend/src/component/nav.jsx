import { Link } from "react-router-dom";
import "./nav.css"
import { useRecoilState } from "recoil";
import { pageState } from "../../state";

export default function Navbar() {
    const [page,setPage] = useRecoilState(pageState)
    return(
        <>
        <div className="navbar">
            <div className="logo">
                <h1>MoneyFy</h1>
            </div>
            <div >
                <ul>
                    <li >Avtar</li>
                    <li onClick={()=>setPage("home")}>Home
                        
                        </li>
                    <li onClick={()=>setPage("add")}>Billing</li>
                    <li onClick={()=>setPage("visualize")}>Thrive</li>
                </ul>
            </div>
            <div className="logout_btn">
                <button>
                    Log out
                </button>
            </div>
        </div>
        </>
    );
}