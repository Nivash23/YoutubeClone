import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { FaBucket, FaDeleteLeft, FaEye, FaThumbsUp } from "react-icons/fa6";
import {
  FaBell,
  FaCheckSquare,
  FaPen,
  FaRegThumbsUp,
  FaRemoveFormat,
} from "react-icons/fa";

function Videoplayer() {
  const item = useParams();
  const [selecteditem, setSelecteditem] = useState([]);
  const { videoCollections, token } = useSelector((state) => state.statelists);
  const [allrelatedvideo, setAllrelatedvideo] = useState([]);
  // const [subscribetext1, setSubscribetext1] = useState('');
  const [commentmsg, setCommentmsg] = useState("");
  const [comments, setComments] = useState([]);
  const [likestatus, setLikestatus] = useState(false);
  const [deletecommentbody, setDeletecommentbody] = useState({
    commentid:""
  })
  // const [editedcommentmsg, setEditedcommentmsg] = useState({
  //   message:""
  // });
  const [editcommentstatus, setEditcommentstatus] = useState("ECinactive");
  // const [commentType, setCommentType] = useState("");
  const [editcommentbody, setEditcommentbody] = useState({
    commentid: "",
    editedmessage:"",
  });

  const addcommentshandler = async () => {
    const addbody = {
      token: token,
      itemid: selecteditem[0]._id,
      message:commentmsg
    }
    
    const response = await fetch(
      `http://127.0.0.1:5004/api/users/addcomment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addbody),
      }
    );
    const data = await response.json();

      if (response.status == 200) {
        setCommentmsg("");
        alert(data.message);
        setComments(data.Comments);
      }
    

  };
  const Editcommentshandler = async () => {

    const editbody = {
      token: token,
      commentid:editcommentbody.commentid,
      itemid:selecteditem[0]._id,
      editedmessage:editcommentbody.editedmessage
    }
    
    const response = await fetch(
      `http://127.0.0.1:5004/api/users/editcomment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editbody),
      }
    );
    const data = await response.json();

      if (response.status == 200) {
        setEditcommentbody({commentid:"",itemid:"",editedmessage:""})
        alert(data.message);
        setComments(data.Comments);
        setEditcommentstatus("ECinactive")
      }
    

  };

  useEffect(() => {
    let video = videoCollections.filter((val) => val._id == item._id);

    setSelecteditem(video);
    setComments(video[0].comments);

    let allrelated = videoCollections.filter((v) => v.title !== video[0].title);
    setAllrelatedvideo(allrelated);
  }, []);

  const commentdeletehandler = async(id) => {
    const deletebody = {
      token:token,
      itemid:selecteditem[0]._id,
      commentid: id,
    };

    const response = await fetch('http://127.0.0.1:5004/api/users/deletecomment',
      {
        method: "DELETE",
        headers: {
          'Content-Type':"application/json"
        },
        body:JSON.stringify(deletebody)
      }
    )

    const data = await response.json();

    if (response.status == 200)
    {
      alert(data.message);
      setComments(data.Comments)
    }


    // const response=await fetch('http://127.0.0.1:5004/api/users/deletecomment')
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div id="videoplayerInnerbody">
        <div style={{ backgroundColor: "white" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              {selecteditem.map((val) => (
                <div>
                  {/* <video src={val.videoUrl} controls /> */}
                  <iframe src={val.videoUrl} allowFullScreen></iframe>

                  <div style={{ fontWeight: "bold", height: "30px" }}>
                    {val.title}
                  </div>
                  <div>{val.author}</div>
                  <div style={{ display: "flex", gap: "20px", flex: "2" }}>
                    <div
                      style={{
                        display: "flex",
                        flex: "1",
                        gap: "10px",
                        marginTop: "20px",
                      }}
                    >
                      <div onClick={() => { setLikestatus(!likestatus) }} style={{cursor:"pointer"}}>
                        {
                          likestatus ? <FaThumbsUp size={20} color="black"/>:<FaRegThumbsUp size={20} color="black"  />
                        }
                        
                      </div>
                      <div style={{ paddingTop: "2px" }}>{val.views}</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flex: "1",
                        gap: "10px",
                        marginTop: "20px",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ paddingTop: "5px" }}>
                        <FaBell size={20} color="black" />
                      </div>
                      <div id="subscribebut">{item.subscribingtxt}</div>
                    </div>
                  </div>
                  <div className={editcommentstatus}>
                    <div id="Editcommentinput">
                      <div
                        style={{
                          display: "flex",
                          marginTop: "0px",
                          justifyContent: "end",
                        }}
                      >
                        <div
                          id="xclosebut"
                          style={{ marginTop: "0px" }}
                          onClick={() => {
                            setEditcommentstatus("ECinactive");
                          }}
                        >
                          X
                        </div>
                      </div>
                      <div>Edited comment message</div>
                      <div>
                        <input
                          type="text"
                          placeholder="write a message"
                          onChange={(e) => {
                            setEditcommentbody({...editcommentbody,editedmessage:e.target.value});
                          }}
                          value={editcommentbody.editedmessage}
                        />
                      </div>
                      <div>
                        <button type="button" onClick={() => {
                          if (editcommentbody.editedmessage!== "")
                          {
                          
                            Editcommentshandler();
                          }
                        }} >save</button>
                      </div>
                    </div>
                    <div id="Editcommentbackground"></div>
                  </div>
                  <div id="commentssection">
                    <div>comments</div>
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ fontWeight: "bold" }}>Add a Comment</div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div>
                          <input
                            type="text"
                            placeholder="write a message.."
                            onChange={(e) => {
                              setCommentmsg(e.target.value);
                            }}
                            value={commentmsg}
                          />
                        </div>
                        <div style={{cursor:"pointer"}}
                          onClick={() => {
                            if (commentmsg !== "") {
                              // setCommentType("addcomment"); 
                              addcommentshandler();
    
                            }
                          }}
                        >
                          <FaCheckSquare size={28} />
                        </div>
                      </div>
                      <div id="commentslist">
                        {comments.map((val) => (
                          <div
                            style={{
                              marginTop: "10px",
                              display: "flex",
                              gap: "20px",
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: "bold" }}>
                                {val.Email}
                              </div>
                              <div style={{ marginLeft: "10px" }}>
                                Message : {val.message}
                              </div>
                            </div>
                            <div id="options">
                              <div
                                onClick={() => {
                                  setEditcommentstatus("ECactive");
                                  setEditcommentbody({ ...editcommentbody, commentid: val._id });
                                  
                                }}
                              >
                                <FaPen size={14} style={{ padding: "5px" }} />
                              </div>
                              <div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    // setDeletecommentbody({commentid:val._id})
                                    commentdeletehandler(val._id);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="videosuggestside">
          <div style={{ height: "40px" }}>Other Topics</div>
          <div>
            {allrelatedvideo.map((val) => (
              <div className="item">
                <div style={{ width: "50px", height: "50px" }}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={val.thumbnailUrl}
                  />
                </div>
                <div style={{ fontWeight: "bold" }}>{val.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Videoplayer;
