import React from "react";
import Nav from 'react-bootstrap/Nav';
import styles from "./Sidebar.css";


const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class HashtagList extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      g_no: this.props.g_no,
      name: null
    }
  }

  componentDidMount() {
    let g_no = {no: this.state.g_no};
    console.log(g_no);
    fetch(`${API_URL}/api/getHashListByGroup`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(g_no)
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
      })
      .catch((err) => console.error(err));
  }

  render() {
    console.log(this.state.g_no);
    return (
      <div>
        <h5>해시태그</h5>
        <Nav className={styles.nav}>
          {this.state.hash && this.state.hash
            .filter(element => element.hash_name.indexOf(this.state.keyword) != -1)
            .map(({ no, hash_name }) => (
              <Nav.Link href="#" key={no} className={styles.dropdown_menu}>{hash_name}</Nav.Link>
            ))}
        </Nav>
      </div>
    );
  }
}
