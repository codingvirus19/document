import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Contents from "./contents/Contents";

const API_URL = "http://localhost:8080/codingvirus19";
const API_HEADERS = {
  "Content-Type": "application/json",
};

export default class Container extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      groups: null,
      g_no: { no: [] },
      g_name: [],
      g_noUpdate: "",
      memoArr: null,
      memo_bigArr: [
        {
          memo_no: "",
          memo_gNo: "",
          memo_uNo: "",
          memo_content: "",
          memo_color: "",
          memo_date: "",
        },
      ],
    };
  }
  componentDidMount() {
    // 그룹의 db를 가져오는 코드
    let _g_no = [];
    let _g_name = [];
    let groupDatas = null;

    // call api
    fetch(`${API_URL}/api/container`, {
      method: "post",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((json) => {
        // 배열
        groupDatas = json.data;
        this.bringMemoByGroup(groupDatas);

        json.data.map((temp) => {
          _g_no.push(temp.no);
          _g_name.push(temp.name);
        });
        this.Update(_g_no);
        this.Update(_g_name);
      })
      .catch((err) => console.error(err));
    // 그룹의 db를 가져오는 코드
  }

  bringMemoByGroup(_groupDatas) {
    // 그룹의 data로 memo의 db를 가져오는 코드
    let memo_bigArr = [];

    let input_groupNo = {
      no: 1,
    };

    let _memoArr = null;
    // call api
    fetch(`${API_URL}/api/contents`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(input_groupNo),
    })
      .then((response) => response.json())
      .then((json) => {
        _memoArr = json.data;
        _memoArr.map((json) => {
          memo_bigArr.push(json);
          console.log(memo_bigArr);
        });
        this.UpdateMemo(memo_bigArr);
      })
      .catch((err) => console.error(err));
    // // 그룹의 data로 memo의 db를 가져오는 코드
  }

  UpdateMemo(_memo_bigArr) {
    this.setState({
      memo_bigArr: _memo_bigArr,
    });
  }

  UpdateGroup(_group) {
    this.setState({
      groups: _group,
    });
  }

  Update(_g_no, _g_name) {
    this.setState({
      g_no: _g_no,
      g_name: _g_name,
    });
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Sidebar group_no={this.state.g_no} group_name={this.state.g_name} />
        <Contents memo_bigArr={this.state.memo_bigArr} />
      </div>
    );
  }
}
