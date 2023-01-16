import React, { Component } from "react";
// import { chatAppSelector } from "../../../../store/selector";
// import { connect } from "react-redux";
// import ChatScreenWrapper from 'modules/layout/component'
// import { ChatScreenWrapper } from "../../../layout/components";
import ChatScreenWrapper from "../wrapper/ChatScreenWrapper";
// import Profile from './Profile'
// import Profile from './left sidebar/Profile'
// import { Conversation, Profile, Settings } from "./left sidebar";
import Conversation from "./left sidebar/Conversation";
// import { GroupInfo } from "./right sidebar";
// import { chatAppAction } from "../../../../store/action";
// import '../components/style.css'
import MessageScreen from "./MessageScreen";

export class MainChat extends Component {
  constructor() {
    super();
    this.state = {
      // leftSidebar: <Conversation changeLeftSidebar={this.changeLeftSidebar} />,
      leftSidebar: <Conversation />,
    };
  }
  // changeLeftSidebar(Component) {
  //   this.setState({ leftSidebar: Component });
  // }
  render() {
    // let { leftSidebar } = this.props;
    // let leftSidebarComponent = null;
    // console.log("lets see", leftSidebar);
    // if (leftSidebar[leftSidebar.length - 1] === "Profile") {
    //   // this.setState({leftSidebar:<Profile/>})
    //   leftSidebarComponent = <Profile />;
    // } else if (leftSidebar[leftSidebar.length - 1] === "Conversation") {
    //   leftSidebarComponent = <Conversation />;
    // } else if (leftSidebar[leftSidebar.length - 1] === "Settings") {
    //   leftSidebarComponent = <Settings />;
    // } else {
    //   leftSidebarComponent = <Conversation />;
    // }
    // let groupMembers = [
    //   {
    //     id: 1,
    //     name: "swayam",
    //     avatar:
    //       "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png",
    //   },
    //   {
    //     id: 2,
    //     name: "parthik",
    //     avatar:
    //       "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png",
    //   },
    //   {
    //     id: 3,
    //     name: "rohit sir",
    //     avatar:
    //       "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png",
    //   },
    // ];
    // console.log(this.props.leftSidebar, "leftsidebar");
    return (
      <ChatScreenWrapper
        leftSidebar={<Conversation/>}
        content={<MessageScreen/>}
        showRightSideBar={false}
        // rightSidebar={
        //   <GroupInfo
        //     groupMembers={groupMembers}
        //     groupName="REACT"
        //     onLeaveGroup={() => {
        //       console.log("leave group");
        //     }}
        //     groupImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png"
        //     totalMembers={3}
        //   />
        // }
      />
    );
  }
}

export default MainChat
