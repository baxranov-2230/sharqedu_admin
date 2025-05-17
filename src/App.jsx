import React, {useState, useEffect} from "react";
import {

    Routes,
    Route,
    useLocation, useNavigate, Navigate,
} from "react-router-dom";
import {Menu as MenuIcon, Bell} from "lucide-react";
import HemisLogo from "./components/HemisLogo";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";


import {Toaster} from "react-hot-toast";

import LoginPage from "./pages/LoginPage.jsx";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

import {logout} from "./Api/LoginApi.jsx";
import ListStudents from "./pages/Device/ListStudents.jsx";


function ProtectedRoute({children}) {
    const token = JSON.parse(localStorage.getItem("token"));

    const location = useLocation();

    if (!token) {
        // Agar token mavjud bo'lmasa, login sahifasiga yo'naltirish
        return <Navigate to="/login" state={{from: location}} replace/> ;

    }
    return children;
}

function App() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation(); // Get current route location
    const isLoginPage = location.pathname === "/login";

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            {!isLoginPage && (
                <header className="bg-[#3697A5]  text-white fixed w-full z-10">
                    <div className="px-4">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-4">
                                <MenuIcon
                                    className="h-6 w-6 cursor-pointer"
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                />
                                <HemisLogo className="h-8"/>
                            </div>
                            <div className="flex items-center space-x-6">
                                {/* <Globe2 className="h-5 w-5 cursor-pointer" /> */}
                                <Bell className="h-5 w-5 cursor-pointer"/>

                                <div>
                                    <Button
                                        id="fade-button"
                                        aria-controls={open ? "fade-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        onClick={handleClick}
                                    >
                                        <div className="flex items-center space-x-3 text-white">
                                            <div
                                                className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                                                <span className="text-sm font-medium">DF</span>
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="text-sm font-medium">Diyor Farxodov</div>
                                                <div className="text-xs text-gray-300">admin</div>
                                            </div>
                                        </div>
                                    </Button>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            "aria-labelledby": "fade-button",
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                        <MenuItem
                                            onClick={() => {
                                                handleLogout();
                                                handleClose();
                                            }}
                                        >
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            )}
            <div className={`flex ${!isLoginPage ? "pt-16" : ""}`}>
                {!isLoginPage && <Sidebar isOpen={isSidebarOpen}/>}
                <main
                    className={`flex-1 p-6 transition-all duration-300 ${
                        !isLoginPage && isSidebarOpen
                            ? "ml-64"
                            : !isLoginPage
                                ? "ml-20"
                                : ""
                    }`}
                >
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>

                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Dashboard/>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/list-students"
                            element={
                                <ProtectedRoute>
                                    <ListStudents/>
                                </ProtectedRoute>
                            }
                        />

                    </Routes>
                    <Toaster/>
                </main>
            </div>
        </div>
    );
}

export default App;