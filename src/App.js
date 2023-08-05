import { Navigate, Route, Router, Routes, useNavigate } from "react-router";
import "./App.css";
import Home from "./component/Home/Home";
import Navbar from "./component/Navbar/Navbar";
import app from "./firebase.init";
import Login from "./component/Login/Login";
import { getAuth } from "firebase/auth";
import Register from "./component/Register/Register";
import Services from "./component/Services/Services";
import Header from "./component/Header/Header";
import RequireAuth from "./component/RequireAuth/RequireAuth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import Dashboard from "./component/Dashboard/Dashboard";
import { Box } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleMap from "./component/Map/GoogleMap";
import Contact from "./component/Contact/Contact";
import Help from "./component/Help/Help";
import Profile from "./component/Proflile/Profile";
import SlideBar from "./component/Home/SlideBar/SlideBar";
import BusSearch from "./component/BusSearch.js/BusSearch";
import { useContext } from "react";
import { AuthContext } from "./component/Context/AuthContext";
import DmService from "./component/DmService/DmService";
import Dboard from "./component/Dashboard/Dboard";
import SearchField from "./component/DmService/SearchField";

const getAdmin = () => {
  let admin = localStorage.getItem("admin");
  if (admin) {
    return JSON.parse(localStorage.getItem("admin"));
  } else {
    const data = "empty";
    return data;
  }
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [adminInfo, setAdminInfo] = useState(getAdmin());
  const [ticketDetails, setTicketDetails] = useState([])
  const [ismessage, setIsMessage] = useState('')
  const [searchFieldInput, setSeatFieldInput] = useState('')
  console.log("🚀 ~ file: App.js:42 ~ App ~ ismessage:", ismessage)
  const { currentUser, currentAdmin } = useContext(AuthContext)
  console.log("🚀 ~ file: App.js:44 ~ App ~ currentUser:", currentUser)
  console.log("🚀 ~ file: App.js:44 ~ App ~ currentAdmin:", currentAdmin)

  const auth = getAuth(app);
  const [user] = useAuthState(auth);
  console.log(user);
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      sec: {
        light: "#1de9b6",
        main: "#eeff41",
        dark: "#1de9b6",
        contrastText: "#000",
      },
    },
  });

  console.log(adminInfo);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">

        <Routes>
          <Route path="/map" element={<GoogleMap></GoogleMap>}></Route>
          <Route
            path="/contact"
            element={
              <RequireAuth>
                <Contact
                 searchFieldInput={searchFieldInput}
                 setSeatFieldInput={setSeatFieldInput}
                  setAdminInfo={setAdminInfo}
                  adminInfo={adminInfo}
                  status={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
              </RequireAuth>

            }
          ></Route>

          <Route
            path="/services"
            element={
              <RequireAuth>
                <DmService
                 searchFieldInput={searchFieldInput}
                 setSeatFieldInput={setSeatFieldInput}
                  setAdminInfo={setAdminInfo}
                  adminInfo={adminInfo}
                  status={darkMode}
                  change={() => setDarkMode(!darkMode)}
                  setTicketDetails={setTicketDetails} />

              </RequireAuth>
            }
          ></Route>
          <Route
            path="/searchField"
            element={
              <RequireAuth>
                <SearchField
                  searchFieldInput={searchFieldInput}
                  setSeatFieldInput={setSeatFieldInput}
                  setAdminInfo={setAdminInfo}
                  adminInfo={adminInfo}
                  status={darkMode}
                  change={() => setDarkMode(!darkMode)}
                  setTicketDetails={setTicketDetails} />

              </RequireAuth>
            }
          ></Route>

          <Route
            path="/busSearch"
            element={
              <RequireAuth>
                <BusSearch
                 searchFieldInput={searchFieldInput}
                 setSeatFieldInput={setSeatFieldInput}
                  setAdminInfo={setAdminInfo}
                  adminInfo={adminInfo}
                  status={darkMode}
                  change={() => setDarkMode(!darkMode)}
                  setTicketDetails={setTicketDetails} />
              </RequireAuth>


            }
          ></Route>

          <Route
            path="/help"
            element={
              <RequireAuth>
                <Help
                 searchFieldInput={searchFieldInput}
                 setSeatFieldInput={setSeatFieldInput}
                  setIsMessage={setIsMessage}
                  setAdminInfo={setAdminInfo}
                  adminInfo={adminInfo}
                  status={darkMode}
                  change={() => setDarkMode(!darkMode)}
                  setTicketDetails={setTicketDetails} />
              </RequireAuth>
            }
          ></Route>

          <Route
            path="/login"
            element={<Login setAdminInfo={setAdminInfo} />}
          ></Route>

          <Route path="/register" element={<Register />}></Route>

          <Route
            path="/slidebar"
            element={
              <RequireAuth> <SlideBar /></RequireAuth>
            }
          ></Route>

          <Route
            path="/services"
            element=
            {
              <RequireAuth>
                <Services
                 searchFieldInput={searchFieldInput}
                 setSeatFieldInput={setSeatFieldInput}
                  setAdminInfo={setAdminInfo}
                  adminInfo={adminInfo}
                  status={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
              </RequireAuth>

            }
          ></Route>
          <Route
            path="/dashboard"
            element=
            {
              <RequireAuth>
                <Dashboard
                 searchFieldInput={searchFieldInput}
                 setSeatFieldInput={setSeatFieldInput}
                  setAdminInfo={setAdminInfo}
                  adminInfo={adminInfo}
                  status={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
              </RequireAuth>

            }
          ></Route>

          <Route
            path="/"
            element={
              <RequireAuth>
                <Home
                 searchFieldInput={searchFieldInput}
                 setSeatFieldInput={setSeatFieldInput}
                  ticketDetails={ticketDetails}
                  setAdminInfo={setAdminInfo}
                  adminInfo={adminInfo}
                  status={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
              </RequireAuth>
            }
          />
          <Route path="/profile" element={
            <RequireAuth>
              <Profile
               searchFieldInput={searchFieldInput}
               setSeatFieldInput={setSeatFieldInput}
                ticketDetails={ticketDetails}
                setAdminInfo={setAdminInfo}
                adminInfo={adminInfo}
                status={darkMode}
                change={() => setDarkMode(!darkMode)}
              ></Profile>
            </RequireAuth>
          }>

          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
