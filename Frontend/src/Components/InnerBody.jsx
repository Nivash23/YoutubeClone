import React, { useState } from 'react'
import Loginuserpage from './Loginuserpage';
import Notloginuserpage from './Notloginuserpage';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Mobilelayout from './Mobilelayout'
import Desktoplayout from './Desktoplayout';

function InnerBody() {
    const [filtersmenustate, setFiltersmenustate] = useState({
        All: "Factive",
        Music: "Finactive",
        Recruitment: "Finactive",
        Podcast: "Finactive",
        tamilcinema: "Finactive",
        publicspeaking: "Finactive",
        live: "Finactive",
        Computerscience:"Finactive"
        
    })
    

    // const [isuserlogined, setIsuserlogined] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 600 });

    const dispatch = useDispatch();
    return (
        <div>
            {
                isMobile ? <Mobilelayout  filtersmenustate={filtersmenustate} setFiltersmenustate={setFiltersmenustate} /> : <Desktoplayout  filtersmenustate={filtersmenustate} setFiltersmenustate={setFiltersmenustate} />
            }
      </div>
      
  )
}

export default InnerBody