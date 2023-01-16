export const incNum = () => {
  return { type: "INCREMENT" }
}

export const decNum = () => {
  return { type: "DECREMENT" }
}

export const setUser = (obj) => {
  console.log('obj', obj)
  return { type: "setUser" , payload:{user:obj.user.email,userId:obj.user._id,following:obj.user.following} }
}

export const setDynamicUser=(key,value)=>{
  return {type:"setDynamicUser",payload:{key,value}}
}

export const setFollowers = (followers)=>{
  return { type: "setFollowers",payload:followers}
}

export const setSelectedChatUser=(user)=>{
  return { type:"setSelectedChatUser",payload:user}
}

export const setMessages=(message)=>{
  return { type:"setMessages",payload:message}
}

export const setMessageFromDB=(message)=>{
  return { type:"setMessageFromDB",payload:message}
}

export const setOneMessageFromDB=(message)=>{
  return { type:"setOneMessageFromDB",payload:message}
}
export const setDynamicConversation=(conversations)=>{
  return { type:"setDynamicConversation",payload:{data:conversations}}
}
export const setOneConversation=(conversations)=>{
  return { type:"setOneConversation",payload:{data:conversations}}
}
export const setCurrentConversationId=(conversationId)=>{
  return { type:"setCurrentConversationId",payload:{data:conversationId}}
}
export const updateLatestMessage=(newMessage)=>{
  return { type:"updateLatestMessage",payload:{data:newMessage}}
}
export const updateReadMessage=(obj)=>{
  return { type:"updateReadMessage",payload:{data:obj}}
}
export const addConversation=(newMessage,currentConversation)=>{
  console.log('this is ourr',newMessage,currentConversation)
  return { type:"addConversation",payload:{data:{newMessage,currentConversation}}}
}
export const setCurrentConversation=(conversation)=>{
  return { type:"setCurrentConversation",payload:{data:conversation}}
}
export const appendMessageFromDB=(message)=>{
  return { type:"appendMessageFromDB",payload:{data:message}}
}
export const setSocket=(socket)=>{
  return { type:"setSocket",payload:{data:socket}}
}
export const sortConversation=()=>{
  return { type:"sortConversation"}
}