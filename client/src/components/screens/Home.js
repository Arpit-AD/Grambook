/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Home = () => {

    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext);
  
    useEffect(() => {
      fetch("/post/getpost", {
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

    /* 
    map -> forEach     const arr = A.map(e => e*2)      A=[1,2,3] arr=[2,4,6]
    filter             const arr = A.filer(a => a!=2)   A=[1,2,3] arr=[1,3]
    find
 */

    return( 
    <div className= "home">
        {data && data.map(post =>
            (
                <div className= "card home-card" key={post._id}>
                    <h5> {post.postedBy && post.postedBy.name} </h5>
                    <div className="card-image">
                        {post.image && <img src={`/${post.image}`}></img>}
                    </div>
                    <div className="card-content" >
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                        <h6>{post.caption}</h6>
                        <h6>{post.location}</h6>
                        <input type="text" placeholder="Add a comment"></input>
                    </div>
                </div>
            )
        )}

    </div>
  );
}

export default Home