import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notloginuserpage from './Notloginuserpage'
import Loginuserpage from './Loginuserpage'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import { setFilter } from './Reduxslice'

function Desktoplayout({filtersmenustate,setFiltersmenustate}) {
    const {token,menustate} = useSelector((state) => state.statelists)
    
    const isresponsivefilter = useMediaQuery({ maxWidth: 870 });
    const dispatch = useDispatch();

    const navigate = useNavigate();
    
  return (
      <div>
          <div className={menustate}>
          <div id="innerbody">
              <div id="sidemenu" style={{padding:"10px 0px 10px 10px"}} >
                  <div className="menu">
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
                      {
                          menustate=="Minactive"?<div id="filters">
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
                    
                      <div className={filtersmenustate.Podcast}  onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Finactive",
                            Podcast: "Factive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Finactive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                          })
                          dispatch(setFilter({category:"podcasts"})) 
                              
                              }}>Podcasts</div>
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
                              
                              }}>Tamil Cinema</div>
                      <div className={filtersmenustate.publicspeaking} onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Finactive",
                            Podcast: "Finactive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Factive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                          })
                          dispatch(setFilter({category:"publicspeaking"})) 
                              
                              }}>Public speaking</div>
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
                      <div className={`${filtersmenustate.Computerscience} csfilter`} onClick={() => {
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
                              }}>Computer Science</div>
                  </div>: isresponsivefilter ? <div id="filters">
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
                      <div className={filtersmenustate.Recruitment} onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Factive",
                            Podcast: "Finactive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Finactive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                          })
                          dispatch(setFilter({category:"recruitment"})) 
                                  
                                  }}>Recruitment</div>
                      <div className={filtersmenustate.Podcast}  onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Finactive",
                            Podcast: "Factive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Finactive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                          })
                          dispatch(setFilter({category:"podcasts"})) 
                                  
                                  }}>Podcasts</div>
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
                                  
                                  }}>Tamil Cinema</div>

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
    
                  </div>:<div id="filters">
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
                      <div className={filtersmenustate.Recruitment} onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Factive",
                            Podcast: "Finactive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Finactive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                          })
                          dispatch(setFilter({category:"recruitment"})) 
                                      
                                      }}>Recru..</div>
                      <div className={filtersmenustate.Podcast}  onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Finactive",
                            Podcast: "Factive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Finactive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                          })
                          dispatch(setFilter({category:"podcasts"})) 
                                      
                                      }}>Podcasts</div>
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
                                      
                                      }}>Tamil Cinema</div>
                      <div className={filtersmenustate.publicspeaking} onClick={() => {
                          setFiltersmenustate({
                            All: "Finactive",
                            Music: "Finactive",
                            Recruitment: "Finactive",
                            Podcast: "Finactive",
                            tamilcinema: "Finactive",
                            publicspeaking: "Factive",
                            live: "Finactive",
                            Computerscience:"Finactive"
                          })
                          dispatch(setFilter({category:"publicspeaking"})) 
                                      
                                      }}>Public speaking</div>
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
                      <div className={`${filtersmenustate.Computerscience} csfilter`} onClick={() => {
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
                                      
                                      }}>Computer Science</div>
                  </div>
                      }
                  
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

export default Desktoplayout