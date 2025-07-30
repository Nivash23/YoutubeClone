import React, { useRef, useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUser } from "react-icons/fa";
import { setChannels } from "./Reduxslice";

function ChannelManagement() {
  const navigate = useNavigate();
  const { token, menustate, Channels, profilesrc, accountName } =
    useSelector((state) => state.statelists);
  const dispatch = useDispatch();
  const [channelcreatestate, setChannelcreatestate] = useState("Chinactive");
  // const [channelavatar, setChannelavatar] = useState("");

  const [channeldetails, setChanneldetails] = useState({
    avatarimg: "",
    channelname: "",
    contenttype: "",
    description:""
  })
  const channelhandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append('image',channeldetails.avatarimg)
    formdata.append('token',token)
    formdata.append('Channelname',channeldetails.channelname)
    formdata.append('Contenttype',channeldetails.contenttype)

    const response = await fetch('http://127.0.0.1:5004/api/users/createchannel', {
      method: "POST",
      body:formdata

    })

    const data = await response.json();

    if (response.status == 200)
    {
      alert(data.message);
      setChannelcreatestate('Chinactive')
      dispatch(setChannels({channels: data.Channels }))
      setChanneldetails({
        avatarimg: "",
        channelname: "",
        contenttype: "",
        description:""
      })

    }
  }

  const channelimgref = useRef();
  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "center" }} className={channelcreatestate }>
        <form onSubmit={channelhandler}>

          <div id="channelcreationbox">
            <div style={{display:"flex",justifyContent:"end"}}>

            <div id="xclose" onClick={()=>{setChannelcreatestate('Chinactive')}}>X</div>
            </div>
          <div>
            <input
              type="file"
              ref={channelimgref}
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                setChanneldetails({ ...channeldetails, avatarimg: e.target.files[0] })
          
              }}
            />
            <div
              onClick={() => {
                channelimgref.current.click();
              }}
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>
                {channeldetails.avatarimg == "" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "orange",
                      color: "white",
                    }}
                  >
                    AR
                  </div>
                ) : (
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    src={`http://127.0.0.1:5004/images/${channeldetails.avatarimg}`}
                    alt="avatar"
                  ></img>
                )}
                </div>
                <div>{channeldetails.avatarimg.name }</div>
              <div>Choose Avatar</div>
                      </div>
                      <div style={{marginTop:"20px",textAlign:"center"}}>
                          <input type="text" placeholder="Channel Name" required value={channeldetails.channelname} onChange={(e) => {
                setChanneldetails({...channeldetails,channelname:e.target.value})
              }} />
                      </div>
                      <div style={{marginTop:"20px",textAlign:"center"}}>
                          <input type="text" placeholder="Posting Content Type" required value={channeldetails.contenttype} onChange={(e) => {
                setChanneldetails({...channeldetails,contenttype:e.target.value})
              }}/>
                      </div>
                      <div style={{marginTop:"20px",textAlign:"center"}}>
                          <textarea placeholder="Give Some Description about your channel" required value={channeldetails.description} onChange={(e) => {
                setChanneldetails({...channeldetails,description:e.target.value})
              }}></textarea>
                      </div>
                      <div style={{marginTop:"20px",display:"flex",justifyContent:"center"}} >
                          <button type="submit" >create</button>
                      </div>
          </div>
        </div>
        </form>
      <div id="channelcreationbackground"></div>
      </div>
      <div className={menustate}>
        <div id="innerbody">
          <div id="sidemenu" style={{ padding: "10px 0px 10px 10px" }}>
            <div
              className="menu"
              onClick={() => {
                navigate("/");
              }}
            >
              <div>
                <ion-icon name="home"></ion-icon>
              </div>
              <div className="menuname">Home</div>
            </div>
            <div className="menu">
              <div>
                <ion-icon name="play-circle-outline"></ion-icon>
              </div>
              <div className="menuname">Shorts</div>
            </div>
            <div
              className="menu"
              onClick={() => {
                if (token == "") {
                  alert("Please Login to Access Subscriptions");
                } else {
                  navigate("/subscriptions");
                }
              }}
            >
              <div>
                <ion-icon name="logo-youtube"></ion-icon>
              </div>
              <div className="menuname">Subscriptions</div>
            </div>
            <div id="AccountManagement">
              <hr></hr>
              <div id="head">
                You <span style={{ fontSize: "24px" }}>&#8250;</span>
              </div>
              <div>
                <div className="actmenu">
                  <div>
                    <ion-icon name="timer-outline"></ion-icon>
                  </div>
                  <div className="actmenuname">History</div>
                </div>
                <div className="actmenu">
                  <div>
                    <ion-icon name="list"></ion-icon>
                  </div>
                  <div className="actmenuname">Playlists</div>
                </div>
                <div className="actmenu">
                  <div>
                    <ion-icon name="tv-outline"></ion-icon>
                  </div>
                  <div className="actmenuname">Your videos</div>
                </div>
                <div className="actmenu">
                  <div>
                    <ion-icon name="time-outline"></ion-icon>
                  </div>
                  <div className="actmenuname">Watch later</div>
                </div>
                <div className="actmenu">
                  <div>
                    <ion-icon name="thumbs-up-outline"></ion-icon>
                  </div>
                  <div className="actmenuname">Liked videos</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }} >
            <div id="channelcontainer">
              <div id="profile">
                <div>
                  <img
                    style={{
                      width: "200px",
                      height: "200",
                      borderRadius: "50%",
                    }}
                    src={`http://127.0.0.1:5004/images/${profilesrc}`}
                  ></img>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {accountName}
                  </div>
                </div>
                <div
                  style={{ display: "flex", gap: "10px", cursor: "pointer" }}
                >
                  <div>
                    <FaPlus size={16} />
                  </div>
                  <div onClick={() => {
                    setChannelcreatestate('Chactive')
                  }}>Create Channel</div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  My Channels
                </div>
                <div id="channelslist">
                  {
                    Channels.map((val, i) =>
                      <div className="item">
                        <div>
                          <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src={`http://127.0.0.1:5004/images/${val.avatarimg}`}></img>
                        </div>
                        <div>
                          <div>{val.name}</div>
                          <div>{val.contenttype}</div>
                        </div>
                        <div></div>
                    </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelManagement;
