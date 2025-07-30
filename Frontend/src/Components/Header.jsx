import React, { useRef, useState } from 'react'
import logo from '../images/youtubelogo.png'
import { useDispatch, useSelector } from 'react-redux';
// import { setIsuserlogin } from './Reduxslice';
import { useNavigate } from 'react-router-dom';
import { setMenustate, setProfilesrc, setUserInfo, setusersearchitem } from './Reduxslice';
import axios from 'axios';

function Header() {
  
  const dispatch = useDispatch();
  const { accountName,menustate,profilesrc,token } =useSelector((state)=>state.statelists)
  const navigate = useNavigate();
  const [uploadimg, setUploadimg] = useState();

  const [searchItem, setSearchItem] = useState('');

  


  const imageuploadhandler = async () => {
    
    
    const formdata = new FormData();

    formdata.append('image', uploadimg);
    formdata.append('token',token)

    const response = await axios.post('http://127.0.0.1:5004/api/uploadimg',
      formdata,
      {

        headers: {
          'Content-Type':'multipart/form-data'
        }

      }

    )
    const data = await response.data;
    if (response.status == 200)
    {
      dispatch(setProfilesrc({ src: data.profilesrc }))
      setAccountmenustate('Aminactive')
    
    }
  }

  const searchhandler = async() => {
    dispatch(setusersearchitem({searchitem:searchItem}))
  }



  const [accountmenustate, setAccountmenustate] = useState('Aminactive');
  const imageselectionref = useRef();
  return (
      <div style={{overflow:"hidden"}}>
      <div id="Navigation">
        <div style={{flex:'2',display:"flex"}}>
          
          <div id="menuline" onClick={() => {
            if (menustate == 'Minactive')
            {
              dispatch(setMenustate({state:'Mactive'}))
            }
            else {
              dispatch(setMenustate({state:'Minactive'}));
            }
              }}><ion-icon name="menu-outline"></ion-icon></div>
              <div id="logo"><img src={logo}></img></div>
             </div>
              <div id="searchbar">
                  <div id="searchbox">
                      <div>
                          
              <input type="text" placeholder='Search' onChange={(e) => { setSearchItem(e.target.value) }} value={searchItem } />
                      </div>
                      <div id="searchicon" onClick={()=>{searchhandler()}}><ion-icon name="search-outline"></ion-icon></div>
                  </div>
              </div>
        <div id="account" onClick={() => {
          if (accountName == 'Signin')
          {

            navigate('/userlogin')
          }
          else {
            if (accountmenustate == 'Aminactive') {
              setAccountmenustate('Amactive');
            }
            else {
              setAccountmenustate('Aminactive')
            }
          }
        }} style={{ display: "flex" }}>
          <div>
            {
              profilesrc=="" || profilesrc==undefined ? <ion-icon name="person-circle-outline"></ion-icon>:<img style={{ width: '30px', height: '30px', borderRadius: '30px' }} src={`http://127.0.0.1:5004/images/${profilesrc}`}></img>
            }
            
          </div>
          <div style={{ padding: "5px 2px 0px 3px" }}>{accountName }</div>
        </div>
      </div>
      <div id="accountmenucontainer" className={accountmenustate}>
        <div id="accountinfomenu" >
          
            {/* <input style={{width:'180px'}} type="file" accept='image/*' onChange={(e) => { setUploadimg(e.target.files[0]) }} /> */}
          <div >
            <input style={{display:"none"}} ref={imageselectionref}  type="file" accept='image/*' onChange={(e) => { setUploadimg(e.target.files[0]) }} />
            <div style={{textAlign:"center"}} onClick={() => { imageselectionref.current.click() }}>
              <div>
                {
                  profilesrc == "" ? <ion-icon name="person-circle-outline"></ion-icon> : <img style={{ width: '30px', height: '30px', borderRadius: '30px' }} src={`http://127.0.0.1:5004/images/${profilesrc}`}></img>
                }
              </div>
              <div>Profile picture</div>
            </div>
          </div>
          <div style={{textAlign:"center"}}>
            <button type="button" onClick={() => {
              imageuploadhandler();
              // console.log(profilesrc)
            }}>save</button>
          </div>
            <div id="mychannel" onClick={()=>{navigate('/mychannel')}}>My Channels</div>
          

        <div id="logoutbut" onClick={() => {
          dispatch(setUserInfo({ accountname: "Signin", jwtToken: "" }));
          navigate('/')
          setAccountmenustate('Aminactive')
          
        }}>Logout</div>
      </div>
      </div>
    </div>
  )
}

export default Header