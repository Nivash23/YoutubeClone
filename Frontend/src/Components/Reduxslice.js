import { createSlice } from "@reduxjs/toolkit";

const Details = createSlice({
    name: "liststates",
    initialState: {
        accountName: "Signin",
        profilesrc: "",
        Channels:[],
        token: "",
        videoCollections: [],
        modifyvideoCollections:[],
        subscriptions:[],
        menustate:"Minactive"
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.accountName = action.payload.accountname;
            state.token = action.payload.jwtToken;
            state.profilesrc = action.payload.Profilesrc;
            state.Channels = action.payload.Channels;
                
        },
        setSubscriptions: (state, action) => {
            state.subscriptions = action.payload.lists;  
        },
        setMenustate: (state, action) => {
            state.menustate = action.payload.state;
        },
        setvideoscollections: (state, action) => {
            state.videoCollections = action.payload.collection;
            state.modifyvideoCollections = action.payload.collection;
        },
        setFilter: (state, action) => {
            if (action.payload.category !== 'all')
            {

                let filtered = state.videoCollections.filter((val) => val.category == action.payload.category);
                state.modifyvideoCollections = filtered;
            }
            else {
                state.modifyvideoCollections = state.videoCollections;
            }
            // alert(state.modifyvideoCollections.length);
        },
        setusersearchitem: (state, action) => {
          state.modifyvideoCollections=state.videoCollections.filter((val)=>val.title.toLowerCase().includes(action.payload.searchitem.toLowerCase()))  
        },
        Addtosubscriptions: (state, action) => {
            let isinlist = state.subscriptions.filter((val) => val._id == action.payload.item._id);

            if (isinlist.length == 0)
            {
                state.subscriptions.push(action.payload.item)
            }
            else {
                alert('This video already in your Subscription')
            }
            
        },
        Removefromsubscription: (state, action) => {
            let filtered = state.subscriptions.filter((val) => val._id !== action.payload.id);
            state.subscriptions = filtered;
        },
        setProfilesrc: (state, action) => {
            state.profilesrc = action.payload.src;
        },
        setChannels: (state, action) => {
            state.Channels = action.payload.channels;
        }
    }
})

export const {setUserInfo,setusersearchitem,setFilter,setvideoscollections,setMenustate,Addtosubscriptions,setProfilesrc,setSubscriptions,Removefromsubscription,setChannels} = Details.actions;

export default Details.reducer;

