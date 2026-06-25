import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const login = async () => {
        if (!email || !password) {
          alert("Please fill all fields");
          return;
        }
        try{
            const res= await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                email,
                password
            })
            localStorage.setItem("token", res.data.token);
            setEmail("");
            setPassword("");
            alert(res.data.msg);
            navigate("/home");

        } catch (error) {
           alert(error.response.data.msg);
         }
        
    };
    return(
        <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">Login</h2>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-success w-100"
            onClick={login}
          >
            Login
          </button>

          <p className="text-center mt-3">
            Don't have an account? <a href="/">Register</a>
          </p>
        </div>
      </div>
    </div>
  </div>
    );
}
export default Login;