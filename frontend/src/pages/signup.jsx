import React, { useState } from 'react';
import './sign.css'; // Import CSS file for styling
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:4000/";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let errors = {};
        if (!formData.username) {
            errors.username = "Username is required";
        }
        if (!formData.phone) {
            errors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = "Phone number must be 10 digits";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email address is invalid";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("user/signup", formData);
                localStorage.setItem("token", response.data.token);
                // Clear form data after successful submission if needed
                setFormData({ 
                    username: '',
                    phone: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                navigate("/signin");
            } catch (error) {
                console.error("Error:", error);
                alert("Email id already exists");
            }
        }
    };

    return (
        <div className="signup-form-container">
            <h2>Sign Up</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>
                <div className="form-group">
                    <label>Phone No:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                <button type="submit" className='form_btn'>Sign Up</button>
                <p className='lower_txt'>Already have an account? <Link to='/signin' className='signin_link'>Signin</Link></p>
            </form>
        </div>
    );
};

export default SignupForm;
