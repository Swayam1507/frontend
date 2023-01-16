let initialState={
  user:"",
  userId:"",
  following:[]
}
export default (state=initialState, action) => {
  let newState=state
  switch (action.type) {
    case "setUser":
      console.log(action.payload.userId,'action.payload.userId')
      newState={...newState,user:action.payload.user,userId:action.payload.userId,following:action.payload.following}
      console.log(newState,'newstatewithfollowing')
      return newState
    case "setDynamicUser":
      newState[action.payload.key]=action.payload.value
      console.log('userinfo',newState)
      return newState;
    case "setFollowers":
      newState={...newState,following:action.payload}
      return newState
    case "rotate":
      return {
        rotating: action.payload
      };
    default:
      return state;
  }
};