import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
         if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
        }
        if(!email.includes('@')){
          alert("invalid email syntax")
          return;
        }
        try {
            const res= await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
                name,
                email,
                password,
            });
            setName("");
            setEmail("");
            setPassword("");
            alert(res.data.msg)
            navigate("/login");
        }catch (error) {
         alert(error.response.data.msg);
        }
    };

    return (
       <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">Register</h2>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            className="btn btn-primary w-100"
            onClick={register}
          >
            Register
          </button>

          <p className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  </div>
    );
}

export default Register;