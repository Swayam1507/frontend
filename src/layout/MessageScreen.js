import React, { createRef, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConversation, appendMessageFromDB, setMessageFromDB, updateLatestMessage, updateReadMessage } from '../redux/actions'
// import { scroll  } from 'react-scroll'
import * as Scroll from 'react-scroll';
import { scroller } from 'react-scroll';
import { Waypoint } from 'react-waypoint';
import Message from '../components/Message';
import { debounce } from 'lodash'


function MessageScreen() {
  // let messageRefs = null
  // let myRefs = useRef([])
  // messageRefs = messages && messages.map(() => useRef(null))
  let currentConversation = useSelector(state => state.conversation.currentConversation)
  let messages = useSelector(state => state.message.messageFromDB)
  let name = useSelector(state => state.auth.name)
  // myRefs.current = messages.map(((element, i) => myRefs.current[i] ?? createRef()))
  const dispatch = useDispatch()
  let userId = useSelector(state => state.auth.userId)
  let conversationId = useSelector(state => state.conversation.currentConversationId)
  const socket = useSelector(state => state.socket.socket)
  const [messageText, setMessageText] = useState('')
  const [seenMessageArray, setSeenMessageArray] = useState([])
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log('currrrrrconv',currentConversation)
  }, [currentConversation])
  

  const emitReadMsg = (val) => {
    console.log(currentConversation,'mycurrconv')
      currentConversation.users.map(e=>{
        if(e._id!==userId){
          socket.emit('read message',{user:userId,sender:e._id,msgArr:val,userName:name})
        }
      })
  }

  // const debounceTest = useCallback(debounce(async (val) => {
  //   let allMessageIds=[]
  //   console.log('checking',val)
  //   val.map(e=>allMessageIds.push(e._id))
  //   // make api call
  //   // ....
  //   const response = await fetch('http://localhost:3000/message/read-message', {
  //     method: 'POST',
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     // body:JSON.stringify(data) ,
  //     body: JSON.stringify({
  //       msgIds:allMessageIds
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  //     },
  //   });
  //   let json = await response.json();
  //   console.log('after api call json',json)
  //   // empty the array seenMessageArray
  //   if(json.messages.modifiedCount>0){
  //     emitReadMsg(val);
  //     // console.log(currentConversation,'mycurrconv')
  //     // currentConversation.users.map(e=>{
  //     //   if(e._id!==userId){
  //     //     socket.emit('read message',{user:userId,sender:e._id,msgArr:val,userName:e.name})
  //     //   }
  //     // })


  //     // socket.emit('read message',{userId,val,conversationId})
  //   }
  //   val=[]
  //   allMessageIds=[]
  //   // setSeenMessageArray([])
  // }, 5000),[]);
  
  let arr = []
  const appendMessage = (message) => {
    const debounceTest = debounce(async (val) => {
      let allMessageIds=[]
      console.log('checking',val)
      val.map(e=>allMessageIds.push(e._id))
      // make api call
      // ....
      const response = await fetch('http://localhost:3000/message/read-message', {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        // body:JSON.stringify(data) ,
        body: JSON.stringify({
          msgIds:allMessageIds
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
      });
      let json = await response.json();
      console.log('after api call json',json)
      // empty the array seenMessageArray
      if(json.messages.modifiedCount>0){
        emitReadMsg(val);
        // console.log(currentConversation,'mycurrconv')
        // currentConversation.users.map(e=>{
        //   if(e._id!==userId){
        //     socket.emit('read message',{user:userId,sender:e._id,msgArr:val,userName:e.name})
        //   }
        // })
  
  
        // socket.emit('read message',{userId,val,conversationId})
      }
      val=[]
      allMessageIds=[]
      // setSeenMessageArray([])
    }, 5000);
    console.log('coming message',message)
    // setSeenMessageArray([...seenMessageArray, message])
    arr.push(message)
    console.log('after final message',seenMessageArray,arr)
    debounceTest(arr)
    // let debounceFun = debounce(()=>console.log('appended messages',seenMessageArray),2000)
    // debounceFun()
    // console.log('appended messages', seenMessageArray)
  }

  // useEffect(() => {
  //   console.log('debounceTest called')
  //   if(seenMessageArray.length>0){
  //     debounceTest(seenMessageArray)
  //   }
  // }, [seenMessageArray])

  // useEffect(() => {
  //   if(seenMessageArray.length!==0){
  //     const debFun = debounce((ele)=>console.log('final call',ele),9000)
  //     debFun(seenMessageArray)
  //   }

  //   return () => {
  //     debFun.cancel();
  //   }
  // }, [seenMessageArray])

  useEffect(() => {
    console.log('our conversation id is ', conversationId)
  }, [conversationId])

  // let scroll    = Scroll.animateScroll;

  //   const scrollToBottom = () => {
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth',
  //     block: 'end',
  //     inline: 'nearest',
  //     offset: 80,
  //  });
  // messagesContainerRef.current.scrollTop = messagesContainerRef.current.offsetHeight;
  // console.log(messagesContainerRef.current.scrollTop,messagesContainerRef.current.scrollHeight)
  // messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  // messagesContainerRef.current.scrollTo(messagesContainerRef.current.offsetHeight)

  // }

  const scrollToBottom = () => {
    scroller.scrollTo('messages-end', {
      duration: 500,
      delay: 0,
      smooth: true,
      containerId: 'chat-list',
      offset: -80, // Adjust for fixed input form at bottom
    });

  }

  // useEffect(() => {
  //   // console.log('useeffect called')
  //   scrollToBottom()
  // }, [messages])

  // const scrollIntoViewWithOffset = (selector, offset) => {
  //   console.log(document.querySelector(selector),selector)
  //   window.scrollTo({
  //     behavior: 'smooth',
  //     top:
  //       document.querySelector(selector) && document.querySelector(selector).getBoundingClientRect().top -
  //       document.body.getBoundingClientRect().top -
  //       offset,
  //   })
  // }

  // useEffect(() => {
  //   scrollIntoViewWithOffset('.scroll-class',85);
  // }, [messages])

  const listenToSocket = () => {
    socket && socket.on('receive msg', (msg) => {
      console.log('msg', msg, conversationId, conversationId, currentConversation)
      if (conversationId) {
        if (msg.newMessage.conversation === conversationId) {
          console.log('gone in if')
          dispatch(appendMessageFromDB(msg))
          updateLatestMessage(msg)
        }
        else {
          console.log('gone in else')
          updateLatestMessage(msg)
        }
      }
    })

  }

  useEffect(() => {
    // listenToSocket()
    socket && socket.on('receive msg', (obj) => {
      console.log('obj.message', obj.message, conversationId, conversationId, currentConversation)
      if (conversationId) {
        if (obj.message.newMessage.conversation === conversationId) {
          console.log('gone in if')
          dispatch(appendMessageFromDB(obj.message))
          dispatch(updateLatestMessage(obj.message))
        }
        else {
          console.log('gone in else')
          dispatch(updateLatestMessage(obj.message))
        }
      }
      else {
        dispatch(addConversation(obj.message, obj.currentConversation))
      }
    })
    socket && socket.on('ack read message',(obj)=>{
      console.log('ack read',obj.userName,obj.msgArr)
      dispatch(updateReadMessage({userName:obj.userName,msgArr:obj.msgArr}))
    })
    return () => {
      socket && socket.off('receive msg')
      socket && socket.off('ack read message')
    }
  }, [socket, conversationId])

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         console.log(`Element ${entry.target.id} is intersecting!`);
  //       }
  //     });
  //   });
  //   console.log('myrefs',myRefs)
  //   myRefs.current.forEach((ref) => {
  //     if (ref.current) {
  //       observer.observe(ref.current);
  //     }
  //   });

  //   return () => {
  //     myRefs.current.forEach((ref) => {
  //       if (ref.current) {
  //         observer.unobserve(ref.current);
  //       }
  //     });
  //   };

  // }, [messages])




  const sendMessage = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/message/create', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      // body:JSON.stringify(data) ,
      body: JSON.stringify({
        conversation: conversationId,
        content: messageText
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
    });
    let json = await response.json();
    socket.emit('send msg', ({ msg: json, currentConversation, userId }))
    dispatch(appendMessageFromDB(json))
    dispatch(updateLatestMessage(json))
    scrollToBottom();
  }
  return (
    <form onSubmit={(e) => { sendMessage(e) }} style={{}}>
      {!conversationId && <div>No chat selected!</div>}
      <div ref={messagesContainerRef} id="chat-list" style={{ display: 'flex', flexDirection: 'column', height: 'calc( 100vh - 71px )', overflowY: 'auto', width: '100%', }}>

        {messages.length === 0 && conversationId ? <div>Start Conversation bro!</div> : messages.map((message, i) => {
          return (
            // <Waypoint
            //   onEnter={({ previousPosition, currentPosition, event }) => {
            //     // do something useful!
            //     console.log('yo',previousPosition,event.target.value)
            //   }}
            //   // onLeave={this._handleWaypointLeave}
            // >
            // <div style={{background:'green',height:'10px'}}></div>
            <Message appendMessage={appendMessage} message={message}
            // ref={messageRefs[i]} 
            // ref={myRefs.current[i]} 
            />
            // </Waypoint>
          )
        })}
        <div style={{ height: '80px' }} ref={messagesEndRef} id="messages-end" className='scroll-class' ></div>
        {/* {messagesContainerRef && messagesContainerRef.current && messagesContainerRef.current.scrollHeight <= 650 ? ( */}
        {conversationId &&
          <div class="search-box" style={{ position: 'fixed', bottom: '0px', width: '75%', border: '4px solid black', height: '71px' }}>
            <div class="input-wrapper">
              {/* <i class="material-icons">search</i> */}
              {/* <span class="material-symbols-outlined i">search</span> */}
              <input
                className="search-input"
                placeholder="Enter message here..."
                type="text"
                value={messageText}
                onChange={(e) => { setMessageText(e.target.value) }}
              />
              <button type="submit" style={{ background: 'none', padding: '0', border: '0' }}>
                <span class="material-symbols-outlined" >
                  send
                </span>
              </button>
            </div>
          </div>
        }
        {/* ) : (
        <div class="search-box" style={{ justifySelf: 'flex-end' }}>
          <div class="input-wrapper">
            <input
              className="search-input"
              placeholder="Enter message here..."
              type="text"
              value={messageText}
              onChange={(e) => { setMessageText(e.target.value) }}
              />
            <button type="submit" style={{ background: 'none', padding: '0', border: '0' }}>
              <span class="material-symbols-outlined" >
                send
              </span>
            </button>
          </div>
        </div>
      )} */}
      </div>

    </form >
    // <div style={{height:'100vh',overflowY:'auto'}}>MessageScreen</div>
  )
}

export default MessageScreen