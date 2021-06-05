import React, { useContext, useState } from 'react';
import {Link, useHistory} from "react-router-dom";
import { UserContext } from '../../App';


const Login = () => {

    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const PostData = () => {
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            )
        ) {
            //   M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" });
             return;
        }
        fetch("https://grambook.herokuapp.com/user/login", {
        method: "post",
        // headers: {
        //     // "Content-Type": "application/json",
        // },
        body: JSON.stringify({
            password,
            email,
        }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.error) {
                console.log(data.error);
            //   M.toast({ html: data.error, classes: "#c62828 red darken-3" });
            } else {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({ type: "USER", payload: data.user });
            //   M.toast({ html: "Login Success", classes: "$43a047 green darken-1" });
            history.push("/");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

        return( 
        <div className= "mycard">
            <div className=" card user-card">
                <h2> GRAMBOOK </h2>
                <input type="text" placeholder="Email"  onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button className="btn waves-effect black" onClick={PostData} >Login</button>
                <div>
                <h7><Link to="/signup">Don't Have an account?</Link></h7>
                </div>
            </div>
        </div>
        );
    }

export default Login