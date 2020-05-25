import React from "react";
import { ToastContainer, toast } from 'react-toastify';

// import './ReactToastify.css';
import "./ReactToastify.scss";

export default class test extends React.Component {
    hash() {
      toast('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  render() {
    return (
        <div>
            aaaaaaaaaaaa
            <button onClick={this.hash.bind(this)}>aa</button>
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
            </div>
    );
  }
}
