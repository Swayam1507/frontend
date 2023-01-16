let initialState={
    socket:null
  }
  export default (state=initialState, action) => {
    let newState=state
    switch (action.type) {
      case "setFollowers":
        newState={...newState,following:action.payload}
        return newState
      case "setSocket":
        newState={...newState,socket:action.payload.data}
        return newState
      default:
        return state;
    }
  };