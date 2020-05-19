import React from "react";

export default class Memo extends React.Component {
  render() {
    return (
      <input
        className="container_memo-form memo"
        type="textarea"
        value={this.props.내용}
      />
    );
  }
}
// import React, { Fragment } from "react";

// export default class Memo extends React.Component {
//   render() {
//     return (
//         <Fragment>
//             <div className="container_memo-form memo"/>
//         </Fragment>
//         <input
//         className="container_memo-form memo"
//         type="textarea"
//         value={this.props.content} />
//     );
//   }
// }
