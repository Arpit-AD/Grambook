/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import React from 'react';
import { useHistory } from "react-router";



const CreatePost = () => {
    const [caption, setCaption ] = useState();
    const [location, setLocation ] = useState();
    const [image, setImage ] = useState();
    const history = useHistory();


    const PostData = () => {

        const formData = new FormData();
        formData.append("location", location)
        formData.append("caption",caption)
        formData.append("image",image)
        console.log(image);
        fetch("/post/create", {
          method: "post",
          headers: {
            // "Content-Type": "mutiple/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: formData
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
        <div className="card input-filled"
            style={
                {
                    maxWidth: "550px",
                    margin: "50px auto"
                }
        }>
            <div style={
                {padding: "20px"}
            }>
                <input type="text" placeholder="Caption" onChange={(e) => setCaption(e.target.value) } value = {caption} ></input>
                <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value) } value = {location}></input>
                <div className="file-field input-field" >
                    <div className="btn black">
                        <span>File</span> 
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                        <button class="btn waves-effect createpost-button" type="submit" name="action"
                            style={
                                {
                                    marginLeft: "130px",
                                    backgroundColor: "rgb(255, 49, 49)"
                                }
                        } onClick = {PostData}>Post
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost
