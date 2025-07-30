import React, { useState } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux';
import Cardcontainer from './Cardcontainer';
import SubscriptionCard from './SubscriptionCard';
import { useNavigate } from 'react-router-dom';

function Subscriptions() {
    // const [subscripmenustate, setSubscripmenustate] = useState('Sminactive');
    const navigate = useNavigate();
    const {token,menustate,subscriptions}=useSelector((state)=>state.statelists)
  return (
      <div>
      <Header />
      <div className={menustate}>
          <div id="innerbody">
              <div id="sidemenu" style={{padding:"10px 0px 10px 10px"}} >
                  <div className="menu" onClick={()=>{navigate('/')}}>
                      <div><ion-icon name="home"></ion-icon></div>
                      <div className='menuname' >Home</div>
                  </div>
                  <div className="menu">
                      <div><ion-icon name="play-circle-outline"></ion-icon></div>
                      <div className='menuname'>Shorts</div>
                  </div>
                      <div className="menu" onClick={() => {
                          if (token == '')
                          {
                              alert('Please Login to Access Subscriptions')
                          }
                          else {
                              
                              navigate('/subscriptions')
                          }
                      }}>
                     <div><ion-icon name="logo-youtube"></ion-icon></div>
                     <div className='menuname'>Subscriptions</div>
                  </div>
                  <div id="AccountManagement" >
                      <hr></hr>
                      <div id="head">You <span style={{ fontSize: '24px' }}>&#8250;</span></div>
                      <div>
                          <div className="actmenu">
                              <div><ion-icon name="timer-outline"></ion-icon></div>
                              <div className='actmenuname'>History</div>
                          </div>
                          <div className="actmenu">
                              <div><ion-icon name="list"></ion-icon></div>
                              <div className='actmenuname'>Playlists</div>
                          </div>
                          <div className="actmenu">
                              <div><ion-icon name="tv-outline"></ion-icon></div>
                              <div className='actmenuname'>Your videos</div>
                          </div>
                          <div className="actmenu">
                              <div><ion-icon name="time-outline"></ion-icon></div>
                              <div className='actmenuname'>Watch later</div>
                          </div>
                          <div className="actmenu">
                              <div><ion-icon name="thumbs-up-outline"></ion-icon></div>
                              <div className='actmenuname'>Liked videos</div>
                          </div>
                      </div>
    
                  </div>
                  {/* <div id="Subscriptions" >
                      <hr></hr>
                      <div id="head">Subscriptions</div>
                      <div>
                         
                      </div>
    
                  </div> */}
              </div>
                  <div>
                      <div id="subscribecardcontainer">
                          {
                              subscriptions.map((val,i) => 
                                  <div>
                                      
                                      <SubscriptionCard item={val } />
                                  </div>
                              )
                          }
                      </div>
              </div>
          </div>
    </div>
    </div>
  )
}

export default Subscriptions