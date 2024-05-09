import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Add from "./pages/Add";
import Visualize from "./pages/Visualize";
import {RecoilRoot} from "recoil"
import Navbar from "./component/nav";
import Landing from "./modal/Landing"

export default function App() {
  return (
    <>
    <RecoilRoot>
      <Navbar/>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/visualize" element={<Visualize />}></Route>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
    </>
  );
}
