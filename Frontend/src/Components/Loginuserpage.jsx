import React from 'react'
import Cardcontainer from './Cardcontainer'
import { useSelector } from 'react-redux'

function Loginuserpage() {

  const videoslist=useSelector((state)=>state.statelists.modifyvideoCollections)
  return (
    <div id="videoscontainer" >
      {/* <div style={{fontWeight:"bold"}}>Now you can Acess The videos</div> */}
      {
        videoslist.map((val, i) =>
        
          <Cardcontainer item={val} />
        )
      }
    </div>
  )
}

export default Loginuserpage