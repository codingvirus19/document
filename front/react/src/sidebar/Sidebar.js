import React from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HashtagList from "./HashtagList"
import styles from "./Sidebar.css";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Sidebar extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      g_no: null,
      g_name: null,
      hash: [{ no: "", name: "" }]
    };
  }

  componentDidMount() {
    let g_no = { no: this.state.g_no };
    let hash = [{ no: "", name: "" }]
    fetch(`${API_URL}/api/getHashListByGroup`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(g_no)
    })
      .then((response) => response.json())
      .then((json) => {
        hash = json.data.map(element => {
          return {
            no: element.no,
            name: element.name
          }
        })
        this.UpdateHash(hash);
      })
      .catch((err) => console.error(err));
  }
  
  UpdateHash(hash) {
    this.setState({
      hash: hash
    })
  }

  update(g_no, g_name) {
    this.setState({
      g_no: g_no,
      g_name: g_name
    })
    this.props.group_update(g_no, g_name);
    this.hashGetList(g_no);
  }

  render() {
    return (
      <div className={styles.sidebar}>
        <Nav className={styles.nav}>
          <Nav.Link
            onClick={() => this.update(null, null)}
            className={styles.menu}> 개인메모 </Nav.Link>
          <NavDropdown title="그룹메모" className={styles.menu} drop="right">
            {this.props.group.gname.map((name, index) => (
              <NavDropdown.Item
                key={index}
                onClick={() => this.update(this.props.group.no[index], name)}
                className={styles.groupmenu}> {name} </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
        <div className={styles.hashtagList}>
          <HashtagList g_no={this.state.g_no} hash={this.state.hash} />
        </div>
      </div>
    );
  }
}
