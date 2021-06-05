/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Profile = () => {

    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext);
  
    useEffect(() => {
      fetch("https://grambook.herokuapp.com/post/getpostbyuser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setData(result.post);
        });
    }, []);

    if(data) console.log(data);
    if(data) console.log(data[1]);
    
    
    return( 
        <div >
            <div >
                <h4>
                {/* ARPIT */}
                  <div> {state && state.name} </div>
                  <div> {state && state.email} </div>
                </h4>
            </div>
           
            <div className = "gallery" style={{display: "flex"}}>
            {data && data.map(post => 
                <div style={{width: "32%"}} key={data._id}>
               { post.image && <img className= "item" src={`https://grambook.herokuapp.com/${post.image}`}></img>}
                <div>{post.caption}</div>
                <div>{post.location}</div>
                </div>
                
            )}    
            </div>
        </div>


    ); 
}

export default Profile