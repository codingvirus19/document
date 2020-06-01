import React, { useState, Fragment } from 'react';
import ReactDom from'react-dom';
import Popup from './FilePopup';
import styles from './FileUpLoad.css'

const FileUpload = (props) => {
    const [className, setClassName] = useState(props.className);
    const [value, setValue] = useState(props.Value);
    const [popupChange, setPopupChange] = useState(false);
    if (className == null) setClassName("test");
    if (value == null) setValue("I");

    const FileUploadBtn = () => {
        document.getElementById('hiddenFileInput').click(); 
    }
    const FileUpload = e => {
        props.File(e);
    }
    const PopupChange = (e) => {
        setPopupChange(e);
    }
    

    

    return (
        <Fragment>
            <button className={className} onClick={()=>PopupChange(true)}>{value}</button>
            <Popup open = {popupChange} close = {e => PopupChange(e)} >
            <div className={styles.upload}>
             <button className={styles.upload_btn} onClick={FileUploadBtn}>이미지추가</button>   
             </div>
             <div className={styles.upload_img}>
            <input type="file" id="hiddenFileInput" onChange={e => FileUpload(e)} style={{display:'none'}} />
            {(props.image==null) ? null : <img className={styles.image} src={`.${props.image}`} />}
            </div>
            <button className={styles.save} onClick={()=>{props.save(true);PopupChange(false)}}>저장</button>
            <button className={styles.close} onClick={()=>PopupChange(false)}>닫기</button>
            </Popup>

        </Fragment>

    );
}
export default FileUpload;