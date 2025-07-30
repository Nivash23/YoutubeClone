import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setSubscriptions, setUserInfo, setvideoscollections } from './Reduxslice';

function Loginpage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [statusmsg, setStatusmsg] = useState({
    loginmsg: "",
    logincolor:"red",
    Registermsg: "",
    Registercolor:"red"
  })

  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    name: "",
    password:""
  })
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password:""
  })

  // const [regpagestate, setRegpagestate] = useState('Reginactive');
  const [logboxstate, setLogboxstate] = useState('Logactive');



  const Registerhandler = async (e) => {
    e.preventDefault();

    const regbody = {
      Email: registerDetails.email,
      Name: registerDetails.name,
      Password:registerDetails.password
    }

    const response = await fetch('http://127.0.0.1:5004/api/users/userreg', {
      method: "POST",
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(regbody)
    })

    const data = await response.json();

    if (response.status == 200)
    {
      alert(data.message)
      setStatusmsg({
        loginmsg: "",
        logincolor:"red",
        Registermsg:"Wait a Seconds you will redirect",
        Registercolor:"black"
      })
      setRegisterDetails({
        email: "",
        name: "",
        password:""
      })
      // setRegpagestate('Reginactive');
      setTimeout(() => {
        
        setLogboxstate('Logactive');
      },3000)
    }
    else {
      setStatusmsg({
        loginmsg: "",
        logincolor:"red",
        Registermsg: data.message,
        Registercolor:"red"
      })


    }
    
  }

  const Loginhandler =async(e) => {
    e.preventDefault();

    const loginbody = {
      Email: loginDetails.email,
      Password:loginDetails.password
    }

    const response = await fetch('http://127.0.0.1:5004/api/users/userlogin', {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify(loginbody)
    })

    const data = await response.json();
    if (response.status == 200)
    {
      setStatusmsg({
        loginmsg: data.message,
        logincolor: "black",
        Registermsg: "",
        Registercolor:"red"
      })
      setLoginDetails({
        email: "",
        password:""
      })
      dispatch(setUserInfo({ accountname: data.name, jwtToken: data.token ,Profilesrc:data.Profilesrc,Channels:data.Channels }));

      dispatch(setvideoscollections({ collection: data.videocollections }))
      dispatch(setSubscriptions({lists:data.subscribedvideos}))
        
        navigate('/');
    

    }
    else {
      setStatusmsg({
        loginmsg: data.message,
        logincolor: "red",
        Registermsg: "",
        Registercolor:"red"
      })
    }
  }
  return (
    <div>
      <div id="loginpagenav">
        <div id="logo">
          <div ><ion-icon style={{color:"red"}} name="logo-youtube"></ion-icon></div>
          <div>YouTubeClone</div>
        </div>
        <div id="homebut" onClick={()=>{navigate('/')}}>Home</div>
      </div>
      <div id="loginbody" className={logboxstate}>
          <form onSubmit={Loginhandler}>
          <div id="loginbox">
            <div style={{display:"flex",justifyContent:"center",marginBottom:"40px"}}>
              <h2>LOGIN</h2>
            </div>

          <div className='inputfield'>
            <div>
              <label style={{fontSize:"18px",fontWeight:"bold"}}>Email</label>
            </div>
            <div>
              <input type="text" placeholder='Enter The Email...' required value={loginDetails.email} onChange={(e)=>{setLoginDetails({...loginDetails,email:e.target.value})}}   ></input>
            </div>
          </div>
          <div className='inputfield'>
            <div>
              <label style={{fontSize:"18px",fontWeight:"bold"}}>Password</label>
            </div>
            <div>
              <input type="password" placeholder='Enter The Password...' required value={loginDetails.password} onChange={(e)=>{setLoginDetails({...loginDetails,password:e.target.value})}}   ></input>
            </div>
          </div>
            <div style={{display:"flex",justifyContent:"center"}}>
              <button type="submit" >Login</button>
            </div>
            <div id="loginstatusmsg" style={{display:"flex",justifyContent:"center",marginTop:"20px",color:statusmsg.logincolor}}>{statusmsg.loginmsg }</div>
            <div style={{display:"flex",gap:"10px",justifyContent:"center",marginTop:"20px"}}>Create new Account ? <span onClick={()=>{setLogboxstate('Regactive')}} style={{cursor:"pointer",fontWeight:"bold",textDecoration:"underline"}}>Register </span></div>
            
        </div>
        </form>
        <form onSubmit={Registerhandler}>
          <div id="Registerbox">
            <div style={{display:"flex",justifyContent:"center",marginBottom:"40px"}}>
              <h2>REGISTER</h2>
            </div>

          <div className='inputfield'>
            <div>
              <label style={{fontSize:"18px",fontWeight:"bold"}}>Email</label>
            </div>
            <div>
              <input type="text" placeholder='Enter The Email...' required value={registerDetails.email} onChange={(e)=>{setRegisterDetails({...registerDetails,email:e.target.value})}}   ></input>
            </div>
          </div>
          <div className='inputfield'>
            <div>
              <label style={{fontSize:"18px",fontWeight:"bold"}}>Name</label>
            </div>
            <div>
              <input type="text" placeholder='Enter your Name...' required value={registerDetails.name} onChange={(e)=>{setRegisterDetails({...registerDetails,name:e.target.value})}}   ></input>
            </div>
          </div>
          <div className='inputfield'>
            <div>
              <label style={{fontSize:"18px",fontWeight:"bold"}}>Password</label>
            </div>
            <div>
              <input type="password" placeholder='Enter The Password...' required value={registerDetails.password} onChange={(e)=>{setRegisterDetails({...registerDetails,password:e.target.value})}}   ></input>
            </div>
          </div>
            <div style={{display:"flex",justifyContent:"center"}}>
              <button type="submit" >Register</button>
            </div>
            <div id="Registerstatusmsg" style={{display:"flex",justifyContent:"center",marginTop:"20px",color:statusmsg.Registercolor}}>{statusmsg.Registermsg}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>Already have a account ? <span onClick={() => {
              // setRegpagestate('Reginactive');
              setLogboxstate('Logactive');
            }} style={{fontWeight:"bold",textDecoration:"underline",cursor:"pointer"}}>Login</span></div>
            
        </div>
          </form>
        
      </div>
    </div>
  )
}

export default Loginpage