import React from "react";

export default class GroupAddOrInvite extends React.Component {
    render() {
        return (
            <div
                className="popup-groupAddOrInvite"
                onClick={this.props.closePopup}>
                <div
                    className="popup-groupAddOrInvite_inner"
                    onClick={(e) => e.stopPropagation()}>
                    <div className="inner_profile-header">
                        <h1 className="profile_h1">프로필 정보</h1>
                        <div >
                            그룹생성 / 그룹초대
                            그룹이름
                        <select
                                multiple>
                                <option value="그룹1">그룹1</option>
                                <option value="그룹2">그룹2</option>
                                <option value="그룹3">그룹3</option>
                                <option value="그룹4">그룹4</option>
                                <option value="그룹5">그룹5</option>
                            </select>
                                <input
                                    type="text"
                                    placeholder="새로운 그룹 생성"
                                ></input>
                                <button>+</button>
                                <input
                                    type="text"
                                    placeholder="초대할 사용자"
                                ></input>
                                <button>+</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
