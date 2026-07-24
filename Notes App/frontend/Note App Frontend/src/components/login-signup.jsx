import React, { useState } from "react";
import { useAuth } from "../context/authContext";

const LoginSignUp = () => {
    const { isLoggedIn, setIsLoggedIn, loginMsg, setLoginMsg } = useAuth();
    const existingUsers = JSON.parse(localStorage.getItem("existingUsers")) || []
    const [currPass, setCurrPass] = useState("");
    const [users, setUsers] = useState(existingUsers);
    const [loginMode, setLoginMode] = useState(true);
    

    const handleAuth = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const currEmail = formData.get("email");
        const currPassword = formData.get("password");

        if (loginMode) {
            // --Login logic--
            const foundUser = users.find(
                (u) => u.email === currEmail && u.password === currPass,
            );
            if (foundUser) {
                setLoginMsg("Login successful!");
                console.log("Logged in user:", foundUser);
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedInState", "true");
                setTimeout(() => setLoginMsg(''), 1300)
            } else {
                setLoginMsg("Invalid email or password!")
                setTimeout(() => setLoginMsg(''), 700)
            }

        } else {
            // --SignUp logic--
            const existsUser = users.some((u) => u.email === currEmail);
            if (existsUser) {
                setLoginMsg("User with this email already exists!");
                setTimeout(() => setLoginMsg(''), 700)
                return;
            } else {
                // --Create new user--
                const newUser = { email: currEmail, password: currPassword };
                const updatedUsers = [...users, newUser]
                setUsers(updatedUsers);
                localStorage.setItem("existingUsers", JSON.stringify(updatedUsers))
                setIsLoggedIn(true);
                setLoginMsg('user added successfully!')
                localStorage.setItem("isLoggedInState", "true");
                console.log([...users, newUser]);
                setTimeout(() => setLoginMsg(''), 1500)
            }
        }
    };

    return (
        <>
            <form onSubmit={handleAuth} className="flex flex-col gap-4">
                <label htmlFor="email"></label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="youremail@gmail.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={currPass}
                    onChange={(e) => setCurrPass(e.target.value)}
                    placeholder="******"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <button
                    type="submit"
                    className="w-full py-3 mt-2 bg-amber-700 text-white font-bold rounded-lg shadow-md hover:bg-amber-800 transition duration-200"
                >
                    {loginMode ? "Login" : "Signup"}
                </button>
                <button
                    type="button"
                    onClick={() => setLoginMode((prev) => !prev)}
                    className="text-sm text-amber-700 hover:underline font-medium mt-2 focus:outline-none"
                >
                    {loginMode
                        ? "Don't have an account? Signup"
                        : "Already have an account? Login"}
                </button>
            </form>
        </>
    );
};

export default LoginSignUp;
