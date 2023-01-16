import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentConversation, setCurrentConversationId, setDynamicConversation, setMessageFromDB, setOneConversation, setSocket, sortConversation } from '../../redux/actions';
import io from 'socket.io-client';
// import FlipMove from 'react-flip-move';
import { motion } from "framer-motion"

function Conversation() {
  let name = useSelector((state) => state.auth.name);
  let email = useSelector((state) => state.auth.email);
  let userId = useSelector((state) => state.auth.userId);
  let conversations = useSelector((state) => state.conversation.conversations)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const getConversation = async () => {
    if (!name || !email) {
      navigate('/')
    }
    const response = await fetch('http://localhost:3000/conversation/get-conversationlist', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      // body:JSON.stringify(data) ,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
    });
    let json = await response.json()
    dispatch(setOneConversation(json))
    dispatch(sortConversation())
  }
  useEffect(() => {
    // if(userId){

    getConversation();
    const socket = io('http://localhost:3000');
    socket.emit('join room', userId)
    dispatch(setSocket(socket))
    return () => {
      socket.off() // remove all event listeners from the socket
    }
    // }
  }, [userId])

  // useEffect(() => {
  //   // conversations.sort((a,b)=> new Date(b.latestMessage.date) - new Date(a.latestMessage.date))
  //   console.log('sorted conversations',conversations)
  //   dispatch(setOneConversation(conversations))
  // }, [conversations])


  useEffect(() => {
    const search = async () => {
      const response = await fetch(`http://localhost:3000/users/find?search=${searchTerm}`, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        // body:JSON.stringify(data) ,
        // body: JSON.stringify({
        //   conversationId
        // }),
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
      });
      let json = await response.json()
      // console.log('json', json)
      if (json) {
        setSearchResult(json)
      }
    }
    if (searchTerm !== "") {
      search()
    }
    else {
      setSearchResult([])
    }
  }, [searchTerm])

  const fetchMessages = async (conversationId, conversation) => {
    dispatch(setCurrentConversationId(conversationId))
    dispatch(setCurrentConversation(conversation))
    // console.log(conversationId)
    const response = await fetch('http://localhost:3000/message/getMessages', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      // body:JSON.stringify(data) ,
      body: JSON.stringify({
        conversationId
      }),
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
    });
    let json = await response.json();
    dispatch(setMessageFromDB(json.allMessages))
  }

  const getConversationId = async (id, e) => {
    const response = await fetch(`http://localhost:3000/conversation/create`, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      // body:JSON.stringify(data) ,
      body: JSON.stringify({
        userId: id
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
    });
    let json = await response.json()
    dispatch(setCurrentConversationId(json._id))
    // console.log('json', json)
    dispatch(setMessageFromDB([]))
    dispatch(setDynamicConversation({ ...json }))
    dispatch(setCurrentConversation(json))
  }

  return (
    <div>
      <div style={{ height: '100vh', overflowY: 'auto' }}>
        <div className='conversation-top'>
          Conversation {name} {email}
        </div>
        <div class="search-box">
          <div class="input-wrapper">
            {/* <i class="material-icons">search</i> */}
            <span class="material-symbols-outlined i">search</span>
            <input
              className="search-input"
              placeholder="Search here"
              type="text"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value) }}
            />
          </div>
        </div>
        {/* {console.log(conversations, 'yoo')} */}
        {/* <div>
          {conversations.map((e, i) => {
            return (
              <div key={i}>
                {e._id}
              </div>
            )
          })}
        </div> */}
        {/* {conversations.push({users:[{email:'s2m0i0t3@gmail.com',name:'swayam'}]})} */}
        {/* {console.log('searchResult', searchResult)} */}
        {searchResult && searchResult.length > 0 ?
          searchResult.map((e, i) => {
            return <div className='friend-drawer friend-drawer--onhover' onClick={() => getConversationId(e._id, e)}>
              {/* {e.users[0].email === email ? e.users[1].name : e.users[0].name}  */}
              {e.name}
              {i === searchResult.length - 1 ? "" : <hr className="fix-hr" />}
            </div>
          }) :
          // <FlipMove duration={1500} easing="ease-in-out">
          <motion.div layout>
          {conversations.map((e, i) => {
            return (
              // <div className='friend-drawer friend-drawer--onhover' onClick={() => fetchMessages(e._id, e)}>
              //   {e.users[0].email === email ? e.users[1].name : e.users[0].name}
              //   {i === conversations.length - 1 ? "" : <hr className="fix-hr" />}
              // </div>
              <motion.div
                // layout
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
                key={e._id} class="friend-drawer friend-drawer--onhover" onClick={() => fetchMessages(e._id, e)}>
                {/* <Avatar size="40" img={conversation.img} /> */}
                {/* <img
            class="profile-image"
            src="https://randomuser.me/api/portraits/men/20.jpg"
            alt=""
          /> */}
                <div class="text">
                  <h6> {e.users[0].email === email ? e.users[1].name : e.users[0].name}</h6>
                  <p class="text-muted">{(e.latestMessage && e.latestMessage.content) || "latestMsg"}</p>
                </div>
                <span class="d-flex flex-direction-column time text-muted small" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {e.latestMessage && e.latestMessage.date && new Date(e.latestMessage.date).toLocaleTimeString() || '3:3333'}
                  {/* <GreenCount style={{marginTop:'5px',color:'white'}} value={conversation.unseenMessageCount}/> */}
                </span>
              </motion.div>

            )
            // return e.users.map((ele)=>{
            // return (
            //   <div className='friend-drawer friend-drawer--onhover'>{ele.email !== email && ele.name }
            //   {i === conversations.length - 1 ? "" : <hr className="fix-hr" />}
            //   </div>
            // )
          })}
          </motion.div>
          }
        {/* // </FlipMove> */}

        {/* // })} */}

      </div>
    </div>
  )
}

export default Conversation