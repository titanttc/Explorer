import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components'


const BlockTitle = styled.div`
  font-family: PingFangSC-Semibold;
  font-size: 11px;
  color: #323232;
  letter-spacing: 0;
  text-align: left;
  width: 350px;
  padding-left: 12px;
  @media(max-width: 750px) {
    font-size: 14px;
    width: 60%;
  }
  
`

const BlockContent = styled(Link)`
  display: block;
  font-size: 12px;
  color: ${props => props.active || props.bind? '#fff': '#fff'};
  letter-spacing: 0;
  text-align: left;
  overflow: hidden;
  text-overflow:ellipsis; 
  white-space:nowrap;
  max-width: 300px;
  @media(max-width: 750px) {
    font-size: 12px;
    overflow-wrap:${props=>props.noMobile? 'break-word': ''};
    max-width: ${props=>props.noMobile? '': '132px'};
    overflow:  ${props=>props.noMobile? '':'hidden'};
    text-overflow: ${props=>props.noMobile? '':'ellipsis'}; 
    white-space:  ${props=>props.noMobile? 'pre-wrap':'nowrap'};
  } 
  
  &:hover{
    color: ${props => props.active || props.bind? '#00D3FF': '#323232'};
    text-decoration: ${props => props.active || props.bind? 'underline': ''};
  }
`

const Item = styled.div`
  width: 1200px;
  height: 57px;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0,0,0,0.16);
  @media(max-width: 750px) {
    width: auto;
  } 
`

const GivingText = styled.span`
font-size:24px;
font-family:PingFangSC;
font-weight:600;
color: ${props=>props.active?'#1E93BA':'#333333'};
line-height:50px;
margin-left: 12px;
@media(max-width: 750px) {
    font-size: 12px;
  } 
`

function BlockItem({title, content, active, to, noMobile, bind}) {
  return(
    <Item>
      {title? <BlockTitle>{title}</BlockTitle>: null}
      <BlockContent bind={bind} noMobile={noMobile} to={to} active={active}>{content}</BlockContent>
    </Item>
  )
}

function GivingItem({donator, giving, height}) {
  return(
      <Item>
        <GivingText active>*</GivingText>
        <GivingText>Thanks</GivingText>
        <GivingText active>{donator}</GivingText>
        <GivingText>for donating</GivingText>
        <GivingText active>{giving}</GivingText>
        <GivingText>at the LHD BLOCK</GivingText>
        <GivingText active>{height}</GivingText>
      </Item>
  )
}


export {BlockTitle, BlockContent, BlockItem, GivingItem}
