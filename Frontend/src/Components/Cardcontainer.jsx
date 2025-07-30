import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBell,FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Addtosubscriptions, setSubscriptions } from './Reduxslice';

function Cardcontainer({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token,subscriptions}=useSelector((state)=>state.statelists)
  const [subscribingtxt, setSubscribingtxt] = useState('');
  const subscriptionhandler = async() => {
    const subscribebody = {
      token: token,
      item:item
    }
    
    const response = await fetch('http://127.0.0.1:5004/api/subscribers/addtosubscription', {
      method: 'POST',
      headers: {
        'Content-Type':"application/json"
      },
      body:JSON.stringify(subscribebody)
    })

    const data = await response.json();
    if (response.status == 200)
    {
      dispatch(Addtosubscriptions({ item: item }))
      // dispatch(setSubscriptions({ lists: data.videolists }));
      setSubscribingtxt('Unsubscribe')
    }
  }
  useEffect(() => {
    let isalready = subscriptions.filter((val) => val.title == item.title);

    if (isalready.length == 0)
    {
      setSubscribingtxt('Subscribe')
    }
    else {
      setSubscribingtxt('Unsubscribe')
    }
  },[])
  return (
    
    
    
      <div id="cardcontainer">
          <div id="image" style={{height:"200px"}}  >
        <img src={item.thumbnailUrl} style={{width:"100%",height:"100%"}} onClick={()=>{navigate(`/videoplayer/${item._id}/${subscribingtxt}`)}} ></img>
        {/* <video
        src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          autoPlay
          muted
        /> */}
        <div style={{fontWeight:"bold"}} onClick={()=>{navigate(`/videoplayer/${item._id}/${subscribingtxt}`)}}>{item.title }</div>
        <div style={{fontSize:"12px"}} onClick={()=>{navigate(`/videoplayer/${item._id}/${subscribingtxt}`)}}>{item.description }</div>
        <div style={{display:'flex',gap:'20px',fontSize:"14px",fontWeight:"bold",color:"GrayText",marginTop:"20px"}}>
            <div style={{display:"flex"}}>
              <div style={{width:"40px",display:"flex",justifyContent:"center"}}><FaEye size={16} color='black'  /></div>
              <div>{item.views}</div>
            </div>
            <div style={{display:"flex"}}>
              <div style={{width:"40px",display:"flex",justifyContent:"center"}}><FaBell size={16} color='black' /></div>
              <div onClick={() => {
                if (subscribingtxt == 'Subscribe')
                {
                  subscriptionhandler();
                
                }
                else {
                  setSubscribingtxt('Unsubscribe')
                }
              }} >{subscribingtxt }</div>
            </div>
        </div>

        
          </div>
    </div>
    
  )
}

export default Cardcontainer