import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Removefromsubscription } from './Reduxslice';
import { FaEye,FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function SubscriptionCard({ item }) {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token}=useSelector((state)=>state.statelists)
  
  const subscriptionhandler = async () => {
    const subscribebody = {
      token:token,
      itemid:item._id
    }
    const res = await fetch('http://127.0.0.1:5004/api/subscribers/delete', {
      method: "DELETE",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify(subscribebody)
    })

  }
    
  return (
     <div id="cardcontainer">
               <div id="image" style={{height:"200px"}}  >
             <img src={item.thumbnailUrl} style={{width:"100%",height:"100%"}} onClick={()=>{navigate(`/videoplayer/${item.itemid}/Unsubscribe`)}} ></img>
             {/* <video
             src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
               autoPlay
               muted
             /> */}
             <div style={{fontWeight:"bold"}} onClick={()=>{navigate(`/videoplayer/${item.itemid}/Unsubscribe`)}}>{item.title }</div>
             <div style={{fontSize:"12px"}} onClick={()=>{navigate(`/videoplayer/${item.itemid}/Unsubscribe`)}}>{item.description }</div>
             <div style={{display:'flex',gap:'20px',fontSize:"14px",fontWeight:"bold",color:"GrayText",marginTop:"20px"}}>
                 <div style={{display:"flex"}}>
                   <div style={{width:"40px",display:"flex",justifyContent:"center"}}><FaEye size={16} color='black'  /></div>
                   <div>{item.views}</div>
                 </div>
                 <div style={{display:"flex"}}>
                   <div style={{width:"40px",display:"flex",justifyContent:"center"}}><FaBell size={16} color='black' /></div>
                   <div onClick={() => {
              dispatch(Removefromsubscription({ id: item._id }))
              subscriptionhandler();
                   }} >Unsubscribe</div>
                 </div>
             </div>
     
             
               </div>
         </div>
  )
}

export default SubscriptionCard