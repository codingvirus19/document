import React from "react";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default class test extends React.Component {
    hash() {
        toast("a")
    }
  render() {
    return (
        <div>
            aaaaaaaaaaaa
            <button onClick={this.hash.bind(this)}>aa</button>
            <ToastContainer/>
            </div>
    );
  }
}
