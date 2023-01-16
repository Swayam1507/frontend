import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Waypoint } from 'react-waypoint';
import { debounce } from 'lodash';

export default function Message({ message, appendMessage }) {
  // const messageRef = useRef(null);
  // console.log('rendered')
  const [seenMessageArray, setSeenMessageArray] = useState([])
  let userId = useSelector(state => state.auth.userId)
  const socket = useSelector(state => state.socket.socket)
  // let messages = useSelector(state => state.message.messageFromDB)
  // const observer = useMemo(() => {
  //   return new IntersectionObserver((entries) => {
  //     // ...
  //   });
  // }, [message]);
  // const observer = useMemo(() => new IntersectionObserver((entries) => {
  //   if (entries[0].isIntersecting) {
  //     console.log(`User ${userId} has seen message ${message._id}`);
  //     console.log(JSON.stringify(message, null, 2))
  //   }
  //   if (message && message.readBy && !message.readBy.includes(userId)) {
  //     console.log('make api call for seen message', message.conversation, message.content)
  //   }
  // }));
  // useEffect(() => {
  //   messageRef.current && observer.observe(messageRef.current);

  //   return () => {
  //     // unobserve the message element when the component unmounts
  //     messageRef.current && observer.unobserve(messageRef.current);
  //     observer.disconnect()
  //   };
  // }, [messages]);

  useEffect(() => {
    if(seenMessageArray.length!==0){
      let finalArray = debounce(()=>{
        console.log('finally',seenMessageArray)
      },3000)
      finalArray();
    }
  }, [seenMessageArray])
  

  if (message.sender === userId) {
    return (
      <div
        style={{
          marginLeft: "350px",
          display: "flex",
          alignSelf: 'flex-end'
        }}
      >
        <div
          class="chat-bubble chat-bubble--right"
          style={{ maxWidth: "100%", marginRight: "45px", background: '#74b9ff', display: 'flex', flexDirection: 'column', paddingBottom: '1px', color: 'white' }}
        >
          {message && message.content}
          <div style={{ alignSelf: 'flex-end', color: '#f3f3f3', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', fontWeight: '800', marginRight: '10px' }} class="material-symbols-outlined">
              {message.readBy.length===0? 'visibility_off':'visibility'}
            </span>
            {message && message.date && new Date(message.date).toLocaleTimeString()}</div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div
        // ref={messageRef}
        id={message._id}
        className="message"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Waypoint
          onEnter={() => {
            // do something useful!
            console.log('yo', message,message.readBy.map(e=>e._id),message.readBy.map(e=>e.user._id).includes(userId))
            if(!message.readBy.map(e=>e.user._id).includes(userId)){
              // make an api call to read message
              // setSeenMessageArray((prevState)=>[...prevState,message])
              appendMessage(message)
              // socket.emit('read message',{userId,message})
            }
          }}
        // onLeave={this._handleWaypointLeave}
        />
        <div
          class="chat-bubble chat-bubble--left"
          style={{ maxWidth: "45%", marginLeft: "45px", display: 'flex', flexDirection: 'column', paddingBottom: '1px' }}
        >
          {message && message.content}
          <div style={{ alignSelf: 'flex-end', color: 'gray', fontSize: '12px' }}>{message && message.date && new Date(message.date).toLocaleTimeString()}</div>
        </div>
      </div>
      // {/* </Waypoint> */}
    )
  }
}
