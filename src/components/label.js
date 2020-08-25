import React from 'react';
import styled from 'styled-components'

const LabelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -22px;
  
  @media(max-width: 750px) {
     margin-left: 8px;
  }
`

const Dot = styled.div`
  width: 9px;
  height: 23px;
  background-color: #07ABA5;
  border-radius: 12px;
  
   @media(max-width: 750px) {
      width: 5px;
      height: 14px;
      border-radius: 7px;
  }
`

const Title = styled.div`
font-family: PingFangSC-Semibold;
font-size: ${props=>props.small? '24px':'36px'}
color: #303030;
letter-spacing: 0;
text-align: left;
margin-left: 22px;

  @media(max-width: 750px) {
    font-size: 21px;
    margin-left: 13px;
  }
`

const Address = styled.div`
  font-family: PingFangSC-Semibold;
font-size: 24px;
color: #07ABA5;
letter-spacing: 0;
text-align: left;
margin-left: 32px;

  @media(max-width: 750px) {
    font-size: 16px;
    margin-left: 19px;
  }
`

const Height = styled.div`
  font-family: PingFangSC-Semibold;
font-size: 28px;
color: #07ABA5;
letter-spacing: 0;
text-align: left;
margin-left: 32px;

  @media(max-width: 750px) {
    font-size: 16px;
    margin-left: 19px;
  }
`

const Extra = styled.div`
  flex: 1;
  text-align: right;
`

function Label({title, height, extra, small, address}) {
  return (
      <LabelContainer>
        <Dot/>
        <Title small={small}>{title}</Title>
        {height ? <Height>{`#${height}`}</Height> : null}
        {address? <Address>{address}</Address>: null}
        {extra ? <Extra>{extra}</Extra> : null}
      </LabelContainer>
  )
}

export {Label}
