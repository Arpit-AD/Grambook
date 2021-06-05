import React, { createContext, useContext, useEffect, useReducer } from "react";
import NavBar from "./components/navbar.js";
import {BrowserRouter, Route, useHistory, Switch} from "react-router-dom";
import "./App.css"
import  Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import { initialState, reducer } from "./reducer/userReducer";
// import EditPost from "./components/screens/EditPost";


export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      if (!history.location.pathname.startsWith("/reset")) {
        history.push("/login");
      }
    }
  }, []);
  return (
    <Switch>
     <Route exact path="/"> 
        <Home />
     </Route>
     <Route path="/signup"> 
        <Signup />
     </Route>
     <Route path="/login"> 
        <Login />
     </Route>
     <Route path="/profile"> 
        <Profile />
     </Route>
     <Route path="/createpost"> 
        <CreatePost />
     </Route>
    </Switch>
  );
};



function App() {
   const [state, dispatch] = useReducer(reducer, initialState);
 
   return (
     <UserContext.Provider value={{ state, dispatch }}>
         <BrowserRouter>
            <NavBar />

            <Routing />
         </BrowserRouter>
     </UserContext.Provider>
   );
 }

export default App;
