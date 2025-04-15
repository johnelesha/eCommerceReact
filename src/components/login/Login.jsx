import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UserContext";

const Login = () => {
    const navigate = useNavigate();
    const { users, setCurrentUser } = useContext(UsersContext);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("userRole");

        if (userId) {
            if (userRole === "admin") {
                navigate("/dashboard");
            } else {
                navigate("/");
            }
        }
    }, [navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const user = users.find(
                (u) => u.email === email && u.password === password
            );

            if (user) {
                localStorage.setItem("userId", user.id);
                localStorage.setItem("userRole", user.role);
                setCurrentUser(user);

                const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
                localStorage.setItem("wishlist", JSON.stringify(storedWishlist));

                if (user.role === "admin") {
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }
            } else {
                setError("Invalid email or password.");
            }
        } catch (err) {
            console.error("Error logging in:", err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <form onSubmit={handleLogin} className="p-6 bg-white shadow-lg rounded-lg w-2xl">
                    <h2 className="text-2xl mb-4">Login</h2>

                    {error && <p className="text-error">{error}</p>}

                    <label className="input validator mb-4 flex items-center gap-2 w-full">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </g>
                        </svg>
                        <input
                            type="email"
                            placeholder="mail@site.com"
                            value={email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="grow"
                        />
                    </label>

                    <label className="input validator mb-4 flex items-center gap-2 w-full">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                            </g>
                        </svg>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password || ""}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            className="grow"
                        />
                    </label>

                    <p className="validator-hint hidden text-sm text-gray-500 mb-4">
                        Must be more than 8 characters, including<br />
                        At least one number<br />
                        At least one lowercase letter<br />
                        At least one uppercase letter
                    </p>
                    <button type="submit" className="btn btn-primary w-full mb-4">Login</button>
                    <div className="text-center">
                        <span className="text-sm text-gray-600">Don't have an account?</span>
                        <button type="button" onClick={() => navigate("/register")} className="btn btn-outline btn-sm mt-2 ml-2">Create Account</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
