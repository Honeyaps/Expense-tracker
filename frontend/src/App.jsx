import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Add from "./pages/Add";
import Visualize from "./pages/Visualize";
import { RecoilRoot } from "recoil";
import Landing from "./modal/Landing";
import SigninForm from "./Register/signin";
import SignupForm from "./Register/signup";
import Email from "./Register/Forgot Pass/email";
import Otp from "./Register/Forgot Pass/otp";
import Reset from "./Register/Forgot Pass/reset";

export default function App() {
  return (
    <>
      <RecoilRoot>
        
        <BrowserRouter>
        
          <Routes>
          
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/add" element={<Add />}></Route>
            <Route path="/visualize" element={<Visualize />}></Route>
            <Route path="/signup" element={<SignupForm />}></Route>
            <Route path="/" element={<SigninForm />}></Route>
            <Route path="/email" element={<Email />}></Route>
            <Route path="/otp" element={<Otp />}></Route>
            <Route path="/reset" element={<Reset />}></Route>

          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
