import React from "react";

import Memo from "./Memo";
import HashList from "./HashList";
import Toolbar from "./toolbar/Toolbar";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Contents extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      no: "",
      gNo: "",
      uNo: "",
      content: "",
      color: "",
      date: "",
      hash: ""
    };
  }
  noChange(e) {
    this.setState({
      no: e.target.value,
    });
  }
  onGetMemoData() {
    let input_date = {
      no: this.state.no,
      gNo: this.state.gNo,
      uNo: this.state.uNo,
      content: this.state.content,
      color: this.state.color,
      date: this.state.date,
    };
    console.log(input_date);
    // call api
    fetch(`${API_URL}/main/api/memo`, {
      method: "get",
      headers: API_HEADERS,
      body: JSON.parse(input_date),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          result: json.data,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="contents-memo">
        <div className="memo_container">
          <form className="container_memo-form">
            <Memo find={this.props.find} />
            <HashList />
            <Toolbar />
          </form>
        </div>
      </div>
    );
  }
}

// import React from "react";
// import Memo from "./Memo";
// import HashList from "./HashList";
// import Toolbar from "./toolbar/Toolbar";

// const API_URL = "http://localhost:8080/codingvirus19";
// const API_HEADERS = {
//   "Content-Type": "application/json",
// };

// export default class ContentsMemo extends React.Component {
//   render() {
//     console.log(2);
//     return (
//       <div className="contents-memo">
//         <div className="memo_container">
//           <div className="container_memo-form">
//             {/* {this.state.result.map((re) => {
//               <div className="container_memo-form memo">{re.id};</div>;
//             })} */}

//             {/* 0517 수정 */}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
