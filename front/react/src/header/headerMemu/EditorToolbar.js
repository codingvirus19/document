import React, { Fragment } from "react";
import GroupShare from "../../contents/toolbar/toolbar_style/GroupShare"
import ColorChange from "../../contents/toolbar/toolbar_style/ColorChange"
import AddHash from "../../contents/toolbar/toolbar_style/AddHash"
import SaveLocal from "../../contents/toolbar/toolbar_style/SaveLocal"
import MemoDelete from "../../contents/toolbar/toolbar_style/MemoDelete"
import MemoSave from "../../contents/toolbar/toolbar_style/MemoSave"
import MemoClose from "../../contents/toolbar/toolbar_style/MemoClose"
import styles from "./EditorToolbar.css"

export default class EditorToolbar extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            color: "white",
            memo_gNo: this.props.memo_gNo,
        }
    }

    render() {
        console.log(this.props.no)
        return (
            <Fragment>
                <div className={styles.position}>
                    <GroupShare
                        className={styles.button}
                        buttonName={styles.group}
                        // gName,gNo : 임의의 작동을 한 그룹의 no와 name으로 콜백이동하기위한 props
                        gName={this.props.groupBySidebar.name}
                        gNo={this.props.groupBySidebar.no}
                        // SidebarGroupUpdate: shareMemo 전송 후 수정된 메모list를 다시뿌려주기 위한 callback함수
                        SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                        // memo_gNo: 선택한 메모의 g_no이다. callback함수에 input되며,
                        //  메모리스트를 새로 불러올 때 해당 gNo페이지를 불러옴
                        memo_gNo={this.props.memo_gNo}
                        // no: 선택한 메모의 no
                        no={this.props.no}
                        // 해당 세션no에 포함되어있는 모든 group이다.
                        group={this.props.group}
                        clientRef={this.props.clientRef}
                        users={this.props.users}
                        // memo 색변경 시 toolbar의 버튼도 색변경을 도와주는 props
                        setStyle={this.props.setStyle}
                    /></div>

                <div className={styles.position}>
                    <ColorChange
                        // SidebarGroupUpdate: colorChange db에 전송 후 수정된 메모list를 다시뿌려주기 위한 callback함수
                        SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                        className={styles.button}
                        buttonName={styles.group}
                        colorName={styles.color}
                        // 내가 클릭한 메모의 color를 가져온다.
                        no={this.props.memo_no}
                        // 내가 클릭한 메모의 color를 가져온다.
                        color={this.state.color}
                        // gName,gNo : 임의의 작동을 한 그룹의 no와 name으로 콜백이동하기위한 props
                        gName={this.props.groupBySidebar.name}
                        gNo={this.props.groupBySidebar.no}
                        // memo 색변경 시 toolbar의 버튼도 색변경을 도와주는 props
                        setStyle={this.props.setStyle}
                    /></div>

                {/* 해시추가 */}
                <div className={styles.position}>
                    <AddHash
                        // memo 색변경 시 toolbar의 버튼도 색변경을 도와주는 props
                        // setStyle={this.props.setStyle}
                        distinctGroup_hash={this.props.distinctGroup_hash}
                        className={styles.button}
                        buttonName={styles.group}
                        memo_no={this.props.memo_no}
                        memo_gNo={this.state.memo_gNo}
                        memo_hash={this.props.memo_hash}
                        group_hash={this.props.group_hash}
                        groupBySidebar={this.props.groupBySidebar}
                        SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                    /></div>

                <div className={styles.position}>
                    <SaveLocal
                        className={styles.button}
                        buttonName={styles.group}
                        gName={this.props.groupBySidebar.name}
                        // SaveLocal에서 저장시킬 contents값
                        content={this.props.content}
                        // memo 색변경 시 toolbar의 버튼도 색변경을 도와주는 props
                        setStyle={this.props.setStyle}
                    />
                </div>
                <div className={styles.position}>
                    <MemoDelete
                        className={styles.button}
                        buttonName={styles.group}
                        // SidebarGroupUpdate: delete클릭 후 수정된 메모list를 다시뿌려주기 위한 callback함수
                        SidebarGroupUpdate={this.props.SidebarGroupUpdate}
                        // 내가 클릭한 메모의 color를 가져온다.
                        no={this.props.no}
                        // gName,gNo : 임의의 작동을 한 그룹의 no와 name으로 콜백이동하기위한 props
                        gName={this.props.groupBySidebar.name}
                        gNo={this.props.groupBySidebar.no}
                        // memo 색변경 시 toolbar의 버튼도 색변경을 도와주는 props
                        setStyle={this.props.setStyle}
                    />
                </div>
                <div className={styles.position}>
                    <MemoSave
                        className={styles.button}
                        buttonName={styles.group}
                        memoSave={this.props.memoSave}
                    />
                </div>
                <div className={styles.position}>
                    <MemoClose
                        className={styles.button}
                        buttonName={styles.group}
                        memoClose={this.props.memoClose}
                        memoSave={this.props.memoSave}
                    />
                </div>
            </Fragment>

        );
    }


}