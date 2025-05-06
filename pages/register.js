import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axiosInstance";

function Register () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorPhone, setErrorPhone] = useState("");

    const [errorPassword, setErrorPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorPasswordRepeat, setErrorPasswordRepeat] = useState(''); 
    const router = useRouter();

    const isValidForm = () => {
        let isValid = true;
        
        if (!name) {
            setErrorName("name is required!");
            isValid = false;
        } else {
            setErrorName("");
        }
        if (!phone) {
            setErrorPhone("phone is required!");
            isValid = false;
        } else {
            setErrorPhone("");
        }
        if (!email) {
            setErrorEmail("email is required!");
            isValid = false;
        } else {
            setErrorEmail("");
        }

        if (!password) {
            setErrorPassword("password is required!");
            isValid = false;
        } else {
            setErrorPassword("");
        }

        if (password !== passwordRepeat) {
            setErrorPasswordRepeat('Passwords do not match!');
            isValid = false;
        } else {
            setErrorPasswordRepeat("");

        }
        return isValid;
    }

    const handleChangeEmail = e => {
        setEmail(e.target.value);
        setMessage("");
    }

    const handleChangePassword = e => {
        setPassword(e.target.value);
        setMessage("");
    }

    const handleChangeName = e => {
        setName(e.target.value);
        setMessage("");
    }

    const handleChangePhone = e => {
        setPhone(e.target.value);
        setMessage("");
    }

    const handleChangePasswordRepeat = e => {
        setPasswordRepeat(e.target.value);
        setMessage("");
    }

    const handleChangeRole = e => {
        setRole(e.target.value);
    }

    const handleRegister = async (e) => {
        
        let isValid = isValidForm();
        if (!isValid) {
            setTimeout(() => {
                setErrorName("");
                setErrorPhone("");
                setErrorPassword("");
                setErrorEmail("");
                setErrorPasswordRepeat("");
              }, 500);
              return;
        }
        

        const payload = {
            name : name,
            email : email,
            phone_number : phone,
            password : password,
            c_password : passwordRepeat,
            role : role
        }

        e.preventDefault();

        setLoading(true);

        try {
            const response = await axiosInstance.post('/register', payload);
        setShowSuccess(true);
        setMessage('Registrasi berhasil!');
        setTimeout(() => {
            router.push('/login');
          }, 1000);
        } catch (error) {
            setShowSuccess(false);
            setMessage(error.response?.data?.message || 'Registrasi gagal!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('images/loginImg.jpg')` }}>
            <div className="grid place-items-center h-screen sm:max-w-xl sm:mx-auto">
                <div className="px-4 bg-white w-full shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                    <div>
                        <h1 className="text-2xl font-semibold">Sign Up</h1>
                    </div>
                    {showSuccess && (
                        <div className="mt-2 p-3 bg-green-500 text-white flex justify-center rounded-md">
                        {message || "Register Berhasil"}
                        </div>
                    )}
                    {!showSuccess && message && (
                        <div className="mt-2 p-3 bg-red-800 text-white flex justify-center rounded-md">
                        {message || "Register gagal"}
                        </div>
                    )}
                    <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div className="relative">
                                <input
                                    autoComplete="off"
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                    placeholder="Name"
                                    onChange={handleChangeName}
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Your Name
                                </label>
                                {errorName && <p className="text-red-500 text-sm mt-2">{errorName}</p>}
                            </div>
                            <div className="relative">
                                <input
                                    autoComplete="off"
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                    placeholder="Email address"
                                    onChange={handleChangeEmail}
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Your Email
                                </label>
                                {errorEmail && <p className="text-red-500 text-sm mt-2">{errorEmail}</p>}
                            </div>
                            <div className="relative">
                                <input
                                    autoComplete="off"
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                    placeholder="Phone Number"
                                    onChange={handleChangePhone}
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Phone Number
                                </label>
                                {errorPhone && <p className="text-red-500 text-sm mt-2">{errorPhone}</p>}
                            </div>
                            <div className="relative">
                                <input
                                    autoComplete="off"
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                    placeholder="Password"
                                    onChange={handleChangePassword}
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Password
                                </label>
                                {errorPassword && <p className="text-red-500 text-sm mt-2">{errorPassword}</p>}
                            </div>
                            <div className="relative">
                                <input
                                    autoComplete="off"
                                    id="passwordRepeat"
                                    name="passwordRepeat"
                                    type="password"
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                    placeholder="Password Repeat"
                                    onChange={handleChangePasswordRepeat}
                                />
                                <label
                                    htmlFor="passwordRepeat"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Password Repeat
                                </label>
                                {errorPasswordRepeat && <p className="text-red-500 text-sm mt-2">{errorPasswordRepeat}</p>}
                            </div>
                            <select
                                value={role}
                                onChange={handleChangeRole}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            <div className="relative">
                                <button disabled={loading} className="bg-cyan-500 text-white rounded-md px-2 py-1" onClick={handleRegister}>
                                    {loading? "Loading..." : "Sign Up"}
                                </button>
                            </div>
                            <div>
                                <p className="text-center text-sm text-gray-500">Already have an account ? 
                                    <span 
                                        className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                                        onClick={() => router.push("/login")}>
                                         Sign In
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                </div>
            </div>
        </div>
    );
}

export default Register;