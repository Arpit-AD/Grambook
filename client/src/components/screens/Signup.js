import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Signup = () => {

    const [name, setName ] = useState();
    const [email, setEmail ] = useState();
    const [password, setPassword ] = useState();
    const history = useHistory();


    const PostData = () => {
        if (
          !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          )
        ) {
        //   M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" });
          return;
        }
        fetch("https://grambook.herokuapp.com/user/signup", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            password,
            email,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              console.log(data.error);
            //   M.toast({ html: data.error, classes: "#c62828 red darken-3" });
            } else {
              console.log(data.message);
            //   M.toast({ html: data.message, classes: "$43a047 green darken-1" });
              history.push("/login");
            }
          })
          .catch((err) => {
            console.log(err, "45");
          });
      };
    


    return (
        <div className="mycard">
            <div className=" card user-card">
                <h2>
                    GRAMBOOK
                </h2>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                <input type="text" placeholder="Email"  onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button className="btn waves-effect black"  onClick={PostData}>Signup</button>
            </div>
        </div>
    );
}

export default Signup
