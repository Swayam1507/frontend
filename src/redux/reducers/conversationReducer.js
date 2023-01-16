let initialState={
    conversations:[],
  }
  export default (state=initialState, action) => {
    let newState=state
    switch (action.type) {
      case "setConversation":
        console.log(action.payload.userId,'action.payload.userId')
        newState={...newState,user:action.payload.user,userId:action.payload.userId,following:action.payload.following}
        console.log(newState,'newstatewithfollowing')
        return newState
      case "setFollowers":
        newState={...newState,following:action.payload}
        return newState
      case "setDynamicConversation":
        console.log('action.payload.data', action.payload.data)
        newState={...newState,conversations:[...newState.conversations,action.payload.data]}
        // newState={...newState,conversations:action.payload.data}
        console.log('newstate',newState)
        return newState;
      case "setOneConversation":
        // newState={...newState,conversations:[...newState.conversations,...action.payload.data]}
        newState={...newState,conversations:action.payload.data}
        console.log('newstatee',newState)
        return newState;
      case "sortConversation":
        // action.payload.data.conversations
        // newState.conversations=newState.conversations.sort((a,b)=>{
        //   return new Date(b.latestMessage.date) - new Date(a.latestMessage.date)
        // })
        // action.payload.data.conversations.sort((a,b)=> new Date(b.latestMessage.date) - new Date(a.latestMessage.date))
        newState= {...newState,conversations:newState.conversations.sort((a,b)=> new Date(b.latestMessage.date) - new Date(a.latestMessage.date))}
        return newState;
      case "setCurrentConversationId":
        newState={...newState,currentConversationId:action.payload.data}
        return newState;
      // case "updateLatestMessage":
      //   newState.conversations.map(e=>{
      //     if(e._id===action.payload.data.newMessage.conversation){
      //       e.latestMessage = action.payload.data.newMessage
      //     }
      //   })
      //   let myState = {};
      //   Object.assign(myState,newState)
      //   // newState={...newState} 
      //   console.log('newState',newState)
      //   return myState;

      case "updateLatestMessage":
        // action.payload.data.conversationId
        // action.payload.data.newMessage
        let updatedConversations = newState.conversations.map(e => {
          if (e._id === action.payload.data.newMessage.conversation) {
            return { ...e, latestMessage: action.payload.data.newMessage };
          }
          return e;
        });
        updatedConversations = updatedConversations.sort((a,b)=>new Date(b.latestMessage.date) - new Date(a.latestMessage.date))
        newState = { ...newState, conversations: updatedConversations };
        console.log('newState', newState);
        return newState;
        
      case "addConversation":
        console.log('this is our conversation',action.payload.data.newMessage)
        // newState={...newState,conversations:[...conversations,action.payload.data.newMessage]}
        let currentConversationWithLatestMessage=action.payload.data.currentConversation
        currentConversationWithLatestMessage['latestMessage']=action.payload.data.newMessage.newMessage
        let newConversations = [...newState.conversations,currentConversationWithLatestMessage]
        newConversations = newConversations.sort((a,b)=>new Date(b.latestMessage.date) - new Date(a.latestMessage.date))
        newState = { ...newState, conversations: newConversations };
        
      return newState;
        
      // case "updateLatestMessage":
      //   newState.conversations = newState.conversations.map((conversation) => {
      //     if (conversation._id === action.payload.data.newMessage.conversation) {
      //       return {
      //         ...conversation,
      //         latestMessage: action.payload.data.newMessage,
      //       };
      //     }
      //     return conversation;
      //   });
      //   return newState;      
      case "setCurrentConversation":
        newState={...newState,currentConversation:action.payload.data}
        return newState;
      case "rotate":
        return {
          rotating: action.payload
        };
      default:
        return state;
    }
  };