import React from "react";

import Table from "react-bootstrap/Table"

export default class ColorSheet extends React.Component {

    onMouseChange(e){
        this.props['toggleColorSheetHandler'](e)
    }

    render() {
        return (
            <div className="colorSheet"
                onMouseEnter={this.onMouseChange.bind(this, true)}
                onMouseLeave={this.onMouseChange.bind(this, false)}>
                <Table>
                    <tbody>
                        <tr>
                            <td style={{ background: '#f6e58d' }}></td>
                            <td style={{ background: '#ffbe76' }}></td>
                            <td style={{ background: '#ff7979' }}></td>
                            <td style={{ background: '#badc58' }}></td>
                            <td style={{ background: '#dff9fb' }}></td>
                        </tr>
                        <tr>
                            <td style={{ background: '#f9ca24' }}></td>
                            <td style={{ background: '#f0932b' }}></td>
                            <td style={{ background: '#eb4d4b' }}></td>
                            <td style={{ background: '#6ab04c' }}></td>
                            <td style={{ background: '#c7ecee' }}></td>
                        </tr>
                        <tr>
                            <td style={{ background: '#7ed6df' }}></td>
                            <td style={{ background: '#e056fd' }}></td>
                            <td style={{ background: '#686de0' }}></td>
                            <td style={{ background: '#30336b' }}></td>
                            <td style={{ background: '#95afc0' }}></td>
                        </tr>
                        <tr>
                            <td style={{ background: '#22a6b3' }}></td>
                            <td style={{ background: '#be2edd' }}></td>
                            <td style={{ background: '#4834d4' }}></td>
                            <td style={{ background: '#130f40' }}></td>
                            <td style={{ background: '#535c68' }}></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}
