import React from "react";

import Table from "react-bootstrap/Table"

export default class ShareSheet extends React.Component {

    onMouseChange(e){
        this.props['toggleShareSheetHandler'](e)
    }

    render() {
        return (
            <div className="shareSheet"
            onMouseEnter={this.onMouseChange.bind(this, true)}
            onMouseLeave={this.onMouseChange.bind(this, false)}>
                    <Table>
                        <tbody>
                            <tr>
                                <td><i className="fab fa-twitter" /></td>
                                <td><i className="fab fa-facebook-f" /></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
        );
    }
}
