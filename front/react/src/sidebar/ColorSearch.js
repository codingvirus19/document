import React from "react";
import "./Sidebar.scss";

export default class ColorSearch extends React.Component {

    render() {
        return (
                <li
                    className={(this.props.searchColor == this.props.color) ?
                        "menu-item-click"
                        :this.props.classMenuColorSelect}
                    onClick={() => this.props.UpdateSearchColor(this.props.color, this.props.g_no)} >
                    <div
                        className="color_btn"
                        style={{ backgroundColor: this.props.color }}
                    />
                </li>
        )
    }
}