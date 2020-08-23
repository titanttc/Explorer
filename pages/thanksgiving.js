import React, {useState} from 'react';
import styled from 'styled-components'
import {Button, message} from 'antd'
import {Container} from '../components/container'
import Input from '../components/input'
import fetch from "../utils/api/apiFetch";
import {baseurl} from '../utils/domains'

const Giving = styled.div`
  width:960px;
  height:1186px;
  background:rgba(255,255,255,1);
  display: flex;
  flex-direction: column;
  margin-top: 84px;
  border-top: 4px rgba(7,171,165,1) solid;
`

Giving.Title = styled.p`
  width:497px;
height:28px;
font-size:36px;
font-family:PingFang SC;
font-weight:800;
color:rgba(51,51,51,1);
line-height:72px;
margin-top: 44px;
align-self: center;
`

Giving.Desc = styled.p`
  width:871px;
height:84px;
font-size:18px;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
line-height:36px;
margin-top: 44px;
`

const CommitButton = styled(Button)`
  width:142px;
  height:54px;
font-size:24px;
font-family:PingFang SC;
font-weight:bold;
color:rgba(255,255,255,1);
line-height:36px;
  background:rgba(7,171,165,1);
  border-radius:4px;
  margin-top: 90px;
  
  &:hover{
    color:rgba(255,255,255,1);
    background:rgba(7,171,165,1);
  }
  
  &:focus{
    color:rgba(255,255,255,1);
    background:rgba(7,171,165,1);
  }
`


function Thanksgiving() {

  const [donator, setDonator] = useState('');
  const [donatorError, setDonatorError] = useState(false);

  const [contact, setContact] = useState('');
  const [contactError, setContactError] = useState(false);

  const [desc, setDesc] = useState('');
  const [descError, setDescError] = useState(false);

  const [remark, setRemark] = useState('');
  const [remarkError, setRemarkError] = useState(false);

  const [loading, setLoading] = useState(false);


  const checkDonator = () => {
    if (donator === '') setDonatorError(true)
    else setDonatorError(false)
  };

  const checkContact = () => {
    if (donator === '') setContactError(true)
    else setContactError(false)
  };

  const checkDesc = () => {
    if (donator === '') setDescError(true)
    else setDescError(false)
  };

  const checkRemark = () => {
    if (donator === '') setRemarkError(true)
    else setRemarkError(false)
  };


  return (
      <Container>
        <Giving>
          <Giving.Title>LitecoinHD Thanksgiving</Giving.Title>
          <Giving.Desc>
            Thank you for arriving at the donation form, please fill in detailed donation info as below. Your
            donation will be published on our website for public review. (You can also choose to be anonymous when
            filling
            out the form)
          </Giving.Desc>
          <Input
              error={donatorError}
              value={donator}
              onBlur={() => {
                checkDonator();
              }}
              onChange={(value) => {
                checkDonator();
                setDonator(value)
              }}
              label='Name or title of the donator/Remain anonymous'
              placeholder='please kindly reply here'/>
          <Input
              error={contactError}
              value={contact}
              onBlur={() => {
                checkContact();
              }}
              onKeyPress={(key) => {
                if (key !== 13) return;
                setContact(contact.concat('; '))
              }}
              onChange={(value) => {
                checkContact();
                setContact(value)
              }}
              label='How we should contact you (you can fill in multiple contacts, eg.Twitter, Email, Telegram, etc.)'
              placeholder='please kindly reply here'/>
          <Input
              error={descError}
              value={desc}
              onBlur={() => {
                checkDesc();
              }}
              onChange={(value) => {
                checkDesc();
                setDesc(value)
              }}
              label='Donation Purpose&Description'
              placeholder='please kindly reply here'/>
          <Input
              error={remarkError}
              value={remark}
              onBlur={() => {
                checkRemark();
              }}
              onChange={(value) => {
                checkRemark();
                setRemark(value)
              }}
              label='Remark'
              placeholder='please kindly reply here'/>

          <CommitButton
              loading={loading}
              onClick={async () => {
                checkDonator();
                checkRemark();
                checkContact();
                checkDesc();
                if (donator !== '' && contact !== '' && desc !== '' && remark !== '') {
                  setLoading(true);
                  const result = await fetch(`${baseurl}/thanksgiving/create`, 'POST', {},
                      {
                        donator,
                        contact: JSON.stringify(contact.split('; ')),
                        desc,
                        remark
                      });
                  setLoading(false);
                  if(result.code === 0){
                    message.success('success')
                  }else {
                    message.error(result.message)
                  }
                }
              }}>提交</CommitButton>

        </Giving>
      </Container>
  )
}

export default Thanksgiving
