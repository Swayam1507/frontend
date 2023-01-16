import React from 'react';
// import PropTypes from 'prop-types';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import PageContent from './PageContent';
// import ActionBar from './ActionBar';
// import { Contents } from '../styles';

// const propTypes = {
//   header: PropTypes.element.isRequired,
//   leftSidebar: PropTypes.element,
//   rightSidebar: PropTypes.element,
//   actionBar: PropTypes.node,
//   content: PropTypes.element.isRequired,
//   footer: PropTypes.node,
//   transparent: PropTypes.bool,
//   showLeftSideBar: PropTypes.bool
// };

function ChatScreenWrapper({
  leftSidebar,
  rightSidebar,
  showRightSideBar,
  content
}) {
  return (
    <div className='row' style={{margin:'0'}}>
      <div className='col-md-3' style={{padding:'0px'}}>{leftSidebar}</div>
      <div className={`${showRightSideBar?'col-md-6':'col-md-9'}`} style={{padding:'0px'}}>{content}</div>
      {showRightSideBar && (<div className='col-md-3' style={{padding:'0px'}}>{rightSidebar}</div>)}
    </div>
  );
}

// Wrapper.propTypes = propTypes;
// Wrapper.Header = Header;
// Wrapper.Sidebar = Sidebar;
// Wrapper.ActionBar = ActionBar;

export default ChatScreenWrapper;
