import React from "react";

import CreatableSelect from 'react-select/creatable';
export default class GroupAddOrInvite extends React.Component {

    render() {
        const groups = [
            { value: '그룹1', label: '그룹1' },
            { value: '그룹2', label: '그룹2' },
            { value: '그룹3', label: '그룹3' }
        ]
        const users = [
            { value: '사용자1', label: '사용자1' },
            { value: '사용자2', label: '사용자2' },
            { value: '사용자3', label: '사용자3' },
            { value: '사용자4', label: '사용자4' }
        ]

        return (
            <>
                <div className="inner_form-component">
                    <span className="inner_form-container-title">그룹이름</span>
                    <CreatableSelect
                        autoFocus={true}
                        className="popup2_inner_select"
                        defaultMenuIsOpen={true}
                        closeMenuOnSelect={false}
                        menuIsOpen={true}
                        onChange={this.handleChange}
                        maxMenuHeight={120}
                        options={groups}
                        placeholder="그룹선택"
                    />
                </div>
                <div className="inner_form-component">
                    <span className="inner_form-container-title">초대할 사용자</span>
                    <CreatableSelect
                        className="popup2_inner_select"
                        isMulti
                        defaultMenuIsOpen={true}
                        closeMenuOnSelect={false}
                        menuIsOpen={true}
                        onChange={this.handleChange}
                        maxMenuHeight={120}
                        options={users}
                        placeholder="사용자 선택"
                    />
                </div>
            </>
        );
    }
}
