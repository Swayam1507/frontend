let initialState={
  selectedChatUser:"",
  messages:[],
  messageFromDB:[]
}
export default (state=initialState, action) => {
  let newState=state
  switch (action.type) {
    case "setSelectedChatUser":
      console.log('selectedChatUser', action.payload)
      newState={...newState,selectedChatUser:action.payload}
      return newState
    case "setMessages":
      // console.log('selectedChatUser', action.payload)
      newState={...newState,messages:[...newState.messages,action.payload]}
      // console.log(newState,'newSTate')
      return newState
    case "setMessageFromDB":
      // console.log('selectedChatUser', action.payload)
      newState={...newState,messageFromDB:[...action.payload]}
      console.log(newState,'newSTate',action.payload)
      return newState
    case "appendMessageFromDB":
      console.log('appendMessageFromDB called')
      // console.log('selectedChatUser', action.payload)
      newState={...newState,messageFromDB:[...newState.messageFromDB,action.payload.data.newMessage]}
      // console.log(newState,'newSTate',action.payload)
      return newState
    case "updateReadMessage":
      console.log('updateReadMessage called',newState.messageFromDB,action.payload.data.msgArr,action.payload.data.userName)
      let newMessages={}
      // action.payload.data.msgArr.map(e=>newMessages.push(e._id))
      action.payload.data.msgArr.map(e=>newMessages[e._id]=e)
      let newMessageFromDB= newState.messageFromDB.map(e=>{
        // if(newMessages.includes(e._id))
        if(newMessages[e._id]){
          console.log('ackkkk',newMessages[e._id])
          // return newMessages[e._id].readBy.push({user:{name:action.payload.data.userName}})
          return {...e,readBy:[{user:{name:action.payload.data.userName}}]}
          // return temp
        }
        return e
      })
      newState={...newState,messageFromDB:newMessageFromDB}
      console.log('after new message read',newState.messageFromDB)
      return newState
    case "setOneMessageFromDB":
      // console.log('selectedChatUser', action.payload)
      // newState={...newState,messageFromDB:[...action.payload]}
      // newState.messageFromDB.push(action.payload)
      let messageFromDB=newState.messageFromDB
      messageFromDB.push(action.payload)
      newState={...newState,messageFromDB:[...messageFromDB]}
      console.log(newState,'newSTate',action.payload)
      return newState
    default:
      return state;
  }
};