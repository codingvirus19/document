import React from "react";

import Memo from "./Memo";
import HashList from "./HashList";
import Toolbar from "./toolbar/Toolbar";

export default class ContentsMemo extends React.Component {
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
