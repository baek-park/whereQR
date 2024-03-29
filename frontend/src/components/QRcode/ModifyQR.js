import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {QDiv, Label , Div2, Input, Button,P,QLink} from "./QRcodeElements";

const BaseURL = 'http://127.0.0.1:8080/qrcode/';

const axiosInstance= axios.create({
	baseURL: BaseURL,
	timeout: 5000,
	headers: {
		'Authorization': "Token",
        'Content-Type': 'application/json',
        'accept': 'application/json'
	}, 
});

const ModifyQR = () => {

    let navigate = useNavigate();
    let key = useParams().ID;
    console.log(key);

    const [title, setTitle] = useState('No Title');
    const [memo, setMemo] = useState('No result');
    const [address, setAdd] = useState('No address');
    const [phonenum, setPhonenum] = useState('No result');

    const onChangeMemo = (e) => {
        setMemo(e.target.value);
    };
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const onChangeAdd= (e) => {
        setAdd(e.target.value);
    };
    const onChangePhone = (e) => {
        setPhonenum(e.target.value);
    };

    useEffect(()=>{ 
        axios.get('http://127.0.0.1:8080/qrcode/data/',{params: {"key" : key}})
        .then((response) => {

            console.log(response);
            
            if(Number(response.data['is_null'])===0){
                setTitle(response.data['title']);
                setAdd(response.data['address']);
                setMemo(response.data['memo']);
                setPhonenum(response.data['phonenumber']);
            }
            else{
                console.log("등록된 정보가 없습니다.");
            }
            
        })
      },[]); 

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            key: key,
            title: title,
            text: memo,
            address: address,
            phonenum: phonenum,
        };

        if(localStorage.getItem('token')){//로그인을 안 했다면, 로그인이 필요한 페이지라고 경고.
            let token = localStorage.getItem('token');
            axiosInstance.defaults.headers['Authorization'] = "Token " + token;
            axiosInstance.post('modifyQR/',data).then(()=>{
                navigate(`/UserQr`);
            })
        }
        else{
            alert('login필요');
        }
    }
    
    return(
        <QDiv className='modifyQR'>
            <Div2>
            <Label className="title">제목</Label>
            <Input className="title" name="qr-title" value={title} required onChange={onChangeTitle} /><br/>
            <Label className="memo">메모</Label>
            <Input className="memo" name="qr-memo" value={memo} required onChange={onChangeMemo} /><br/>  
            <Label className="address">주소</Label>
            <Input className="address" name="qr-address" value={address} required onChange={onChangeAdd} /><br/>
            <Label className="phonenum">연락처</Label>
            <Input className="phonenum" name="qr-phonenum" value={phonenum} required onChange={onChangePhone} /><br/>
            <Button className = "button" type="primary" onClick={onSubmit}>변경하기</Button>
            
            </Div2>
        </QDiv>
        
        
    )
}

export default ModifyQR;