import {useState} from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Cookies from "js-cookie";

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false); 

    const router = useRouter();

    const handleChangeEmail = e => {
        console.log(e.target.value);
        setEmail(e.target.value);
    }

    const handleChangePassword = e => {
        console.log(e);
        setPassword(e.target.value);
    }

    const isValidForm = () => {
        let isValid = true;
        
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
        return isValid;
    }

    const handleSignIn = async (e) => {
        setLoading(true);
        let isValid = isValidForm();

        if (!isValid) {
            setTimeout(() => {
                setErrorPassword("");
                setErrorEmail("");
              }, 500);
              return;
        }
        
        
        
        const payload = {
            email : email,
            password : password,
        }

        e.preventDefault();
        try{
            const response = await axios.post('https://api-bootcamp.do.dibimbing.id/api/v1/login', payload, {
                headers : {
                    'apiKey' : 'w05KkI9AWhKxzvPFtXotUva-',
                    
                }
            });
            Cookies.set("accessToken", response.data.token, { expires: 1 });
            setMessage(`Login berhasil: ${response.data.message}`);
            router.push('/');
        } catch (error) {
            setMessage('Login gagal : ${error.response?.data?.message || error.message}');
        } finally {
            setLoading(false);
          }
        
    };


    return (
        <div className="h-screen bg-cover bg-fixed" style={{ backgroundImage: `url('images/loginImg.jpg')` }}>
            <div className="grid place-items-center h-screen sm:max-w-xl sm:mx-auto">
                <div className="px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                    
                    <div>
                        <h1 className="text-2xl font-semibold">Login</h1>
                    </div>
                    {showSuccess && (
                        <div className="mt-2 p-3 bg-green-500 text-white flex justify-center rounded-md">
                        Login Berhasil
                        </div>
                    )}
                    {error && (
                        <div className="mt-2 p-3 bg-red-600 text-white flex justify-center rounded-md">
                        incorrect email or password
                        </div>

                    )}
                    <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div className="relative">
                                <input
                                    autoComplete="off"
                                    id="email"
                                    name="email"
                                    type="text"
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                    placeholder="Email address"
                                    onChange={handleChangeEmail}
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Email Address
                                </label>
                                {errorEmail && <p className="text-red-500 text-sm mt-2">{errorEmail}</p>}
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
                                    required
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
                                <button disabled={loading} className="bg-cyan-500 text-white rounded-md px-2 py-1" onClick={handleSignIn}>
                                    {loading? "Loading..." : "Sign In"}
                                </button>
                            </div>
                            <div>
                                <p className="text-center text-sm text-gray-500">Don't have an account yet ?  
                                    <span 
                                        className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                                        onClick={() => router.push("/register")}>
                                         Sign up
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg
                        className="h-6 w-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="800px"
                        height="800px"
                        viewBox="-0.5 0 48 48"
                        version="1.1"
                    >
                        {" "}
                        <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                        <defs> </defs>{" "}
                        <g
                        id="Icons"
                        stroke="none"
                        strokeWidth={1}
                        fill="none"
                        fillRule="evenodd"
                        >
                        {" "}
                        <g id="Color-" transform="translate(-401.000000, -860.000000)">
                            {" "}
                            <g id="Google" transform="translate(401.000000, 860.000000)">
                            {" "}
                            <path
                                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                id="Fill-1"
                                fill="#FBBC05"
                            >
                                {" "}
                            </path>{" "}
                            <path
                                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                id="Fill-2"
                                fill="#EB4335"
                            >
                                {" "}
                            </path>{" "}
                            <path
                                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                id="Fill-3"
                                fill="#34A853"
                            >
                                {" "}
                            </path>{" "}
                            <path
                                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                id="Fill-4"
                                fill="#4285F4"
                            >
                                {" "}
                            </path>{" "}
                            </g>{" "}
                        </g>{" "}
                        </g>{" "}
                    </svg>
                    <span>Continue with Google</span>
                    </button>
                </div>
                </div>
            </div>
        </div>
        );
}

export default Login;