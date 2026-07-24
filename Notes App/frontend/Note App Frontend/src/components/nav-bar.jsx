import { useAuth } from "../context/authContext";

const NavBar = ({ userProfilePic, userName }) => {
    const { isLoggedIn, setIsLoggedIn, loginMsg } = useAuth();
    return (
        <nav className="flex items-center justify-between px-6 h-[10vh] bg-white shadow-md">
            <div className="flex items-center gap-3">
                <img
                    src={userProfilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <span className="font-medium text-gray-700">
                    Hi, {userName}{" "}
                    <button
                        onClick={() => {
                            setIsLoggedIn(false);
                            localStorage.setItem("isLoggedInState", "false");
                        }}
                        className="ml-2 text-sm text-red-600 hover:underline focus:outline-none"
                    >
                        Logout
                    </button>
                </span>
            </div>

            <div className="flex items-center relative">
                {loginMsg && (
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 px-6 py-2 whitespace-nowrap bg-amber-100 text-black text-sm font-medium rounded-full shadow-lg animate-fade-in ">
                        {loginMsg}
                    </div>
                )}
                <img src="/note.png" alt="App Logo and Name" className="h-10" />
            </div>

            <button className="text-gray-600 focus:outline-none">
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>
        </nav>
    );
};

export default NavBar;
