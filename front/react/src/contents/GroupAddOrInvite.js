import React from "react";

import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'

export default class GroupAddOrInvite extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            g_noUpdate: '',
            currentG_no: null
        }
    }

    handleChange(event) {
        console.log(event);
    }
    render() {
        let groups = [];
        groups= this.props.g_name.map(element=> {
            return {   
                value: element,
                label : element
            }
        });
   
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
                        onChange={this.handleChange.bind(this)}
                        maxMenuHeight={120}
                        options={groups}
                        // onCreateOption 그룹 만들면 option에 추가
                        placeholder="그룹선택"
                    />
                </div>
                <div className="inner_form-component">
                    <span className="inner_form-container-title">초대할 사용자</span>
                    <Select
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
