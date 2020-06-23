import React, { Fragment } from "react";
import "./Sidebar.scss";

export default class ColorSearch extends React.Component {

    render() {
        return (
            <Fragment>
            {(this.props.searchColor == this.props.color) ?
                 <li
                    className="menu-item-click"
                    onClick={()=>this.props.UpdateSearchColor(this.props.color, this.props.g_no)} >
                    <div
                        className="color_btn"
                        style={{ backgroundColor: this.props.color }}
                    />
                </li>
                
            :
                <li
                    className="menu-item"
                    onClick={()=>this.props.UpdateSearchColor(this.props.color, this.props.g_no)} >
                    <div
                        className="color_btn"
                        style={{ backgroundColor: this.props.color }}
                    />
                </li>
            }
            </Fragment>
           
        )
}
}