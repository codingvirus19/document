import React from "react";
import Nav from 'react-bootstrap/Nav';

export default class Sidebar extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      showHashtagList: false,
      showGroupList: false,
      hashtagList: null,
      hash: null,
      g_name: null,
      g_no: null
    }
  }

  render() {

    // if (this.state.showGroupList) {
    //   this.state.hash = this.props.hashs.filter(hash => hash.g_no === this.state.g_no);
    //   this.state.hashtagList = (<div>
    //     {this.props.users.map(({ g_no, g_name }) => (
    //       <Nav.Link href="#"
    //         key={g_no}
    //         onClick={() => this.setState({
    //           showHashtagList: true,
    //           g_no: parseInt(`${g_no}`),
    //           g_name: `${g_name}`
    //         })}
    //         className="sidebar-nav-menu"> {g_name} </Nav.Link>
    //     ))}
    //   </div>
    //   )
    // }
    // if (this.state.showHashtagList) {
    //   this.state.hash = this.props.hashs.filter(hash => hash.g_no === this.state.g_no);
    //   this.state.hashtagList = (<div>
    //     {this.state.g_name}
    //     <br /><br />
    //     <h5>해시태그</h5>
    //     <Nav className="sidebar-nav">
    //       {this.state.hash.map(({ no, hash_name }) => (
    //         <Nav.Link href="#" key={no} className="sidebar-nav-menu">{hash_name}</Nav.Link>
    //       ))}
    //     </Nav>
    //   </div>
    //   )
    // }

    return (
      <div className="sidebar">
        <Nav className="sidebar-nav">
          <Nav.Link
            href="#"
            onClick={() => this.setState({
              showHashtagList: true,
              g_no: 0,
              g_name: "개인"
            })}
            className="sidebar-nav-menu"> 개인메모 </Nav.Link>
          <Nav.Link
            href="#"
            onClick={() => this.setState({
              showGroupList: true,
              showHashtagList: false
            })}
            className="sidebar-nav-menu">
            그룹메모
            </Nav.Link>
        </Nav>
        <div className="sidebar-nav-menu">
          {this.state.hashtagList}
        </div>
      </div>
    );
  }
}