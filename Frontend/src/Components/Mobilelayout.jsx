import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notloginuserpage from './Notloginuserpage'
import Loginuserpage from './Loginuserpage'
import { setFilter } from './Reduxslice';

function Mobilelayout({filtersmenustate,setFiltersmenustate}) {
    const { token, menustate } = useSelector((state) => state.statelists);
    const dispatch = useDispatch();
    

  return (
      <div>
          <div className={menustate}>
          <div id="Minnerbody">
              <div id="sidemenu" style={{padding:"10px 0px 10px 10px"}} >
                  <div className="menu">
                      <div><ion-icon name="home"></ion-icon></div>
                      <div className='menuname' >Home</div>
                  </div>
                  <div className="menu">
                      <div><ion-icon name="play-circle-outline"></ion-icon></div>
                      <div className='menuname'>Shorts</div>
                  </div>
                  <div className="menu">
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
                  <div id="filters">
                      <div className={filtersmenustate.All} onClick={() => {
                          setFiltersmenustate({
                            All: "Factive",
                            Music: "Finactive",
                            Recruitment: "Finactive",
                            Podcast: "Finactive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Finactive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                          })
                          dispatch(setFilter({category:"all"})) 
                          
                          }}>All</div>
                      <div className={filtersmenustate.Music} onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Factive",
                            Recruitment: "Finactive",
                            Podcast: "Finactive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Finactive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                          })
                          dispatch(setFilter({category:"music"})) 
                          
                          }}>Music</div>
                      {/* <div className={filtersmenustate.Recruitment} onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Factive",
                            Podcast: "Finactive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Finactive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                      })}}>Recrui..</div> */}
                      {/* <div className={filtersmenustate.Podcast}  onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Finactive",
                            Podcast: "Factive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Finactive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                      })}}>Podcasts</div> */}
                      <div className={filtersmenustate.tamilcinema} onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Finactive",
                            Podcast: "Finactive",
                            tamilcinema: "Factive",
                            publicspeaking: "Finactive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                          })
                          dispatch(setFilter({category:"tamilcinema"})) 
                          
                          }}>Tamilci..</div>
                      {/* <div className={filtersmenustate.publicspeaking} onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Finactive",
                            Podcast: "Finactive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Factive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                      })}}>Publicspe...</div> */}
                      <div className={filtersmenustate.live} onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Finactive",
                            Podcast: "Finactive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Finactive",
                            live: "Factive",
                            Computerscience:"Finactive"
                          })
                          dispatch(setFilter({category:"news"})) 
                          
                          }}>News</div>
                      <div className={filtersmenustate.Computerscience} onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Finactive",
                            Podcast: "Finactive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Finactive",
                            live: "Finactive",
                            Computerscience:"Factive"
                          })
                          dispatch(setFilter({category:"computerscience"})) 
                          
                          }}>Compsc..</div>
                  </div>
                  <div>
                      {
                          token!=="" ? <Loginuserpage/> : <Notloginuserpage/>
                      }
                  </div>
              </div>
          </div>
    </div>
    </div>
  )
}

export default Mobilelayout