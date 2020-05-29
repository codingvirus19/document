import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import ColorSheet from "./ColorSheet";
import styles from "../Toolbar.css";

export default class ColorChange extends React.Component {

    constructor(){
        super(...arguments)
        this.state={
            showColorSheet: false
        }
    }

    toggleColorSheet(showColorSheet) {
        this.setState({
          showColorSheet,
        });
      }

    // 색상변경
    render() {
        return (
            <Fragment>
                {/* 색상변경 */}
                <button
                    className={styles.tool}
                    aria-label="색상 변경"
                    onMouseEnter={() => this.setState({ showColorSheet: true })}
                    onMouseLeave={() => this.setState({ showColorSheet: false })}
                >
                    <FontAwesomeIcon className={styles.faPalette} icon={faPalette} />
                </button>
                {this.state.showColorSheet ? (
                    <ColorSheet
                        toggleColorSheetHandler={this.toggleColorSheet.bind(this)}
                    />
                ) : null}
            </Fragment >
        )
    }
}