import React, { useState } from "react";
import { AccountCircle, Lock } from "@mui/icons-material";
import "../Authorized/SignupScreen.css";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/logo1.png';

const SignUpScreen = ({ onSignupSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        // Check if the username and password are correct
        if (username === "admin" && password === "123") {
            // On success, navigate to the admin home page
            navigate("/admin/Trangchu");
        } else {
            // If username or password is incorrect, show an error message
            setError("Tên đăng nhập hoặc mật khẩu không đúng.");
        }
    };

    return (
        <div className="author-container">
            <div className="author-signupBox">
                <div className="author-header">
                    <img src={Logo} className="author-logo" />
                    <h1>Welcome to Admin</h1>
                </div>
                <div className="author-body">
                    <form onSubmit={handleSignUp}>
                        <div className="author-inputWrapper">
                            <AccountCircle className="author-icon" />
                            <input
                                type="text"
                                placeholder="Tên Đăng Nhập"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="author-input"
                            />
                        </div>
                        <div className="author-inputWrapper">
                            <Lock className="author-icon" />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="author-input"
                            />
                        </div>
                        {error && <p className="author-error">{error}</p>}
                        <button type="submit" className="author-button">
                            Đăng Ký
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpScreen;