import React from 'react';
import styled from 'styled-components'
import {Table, Button, List} from 'antd'
import {BlockContent} from "./block";

const ContainerView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111622;
`

const TableContainer = styled.div`
  width: 1304px;
  box-shadow: 0 0 10px 3px rgba(7,171,165,0.10);
  border-radius: 12px;
  padding: 30px 64px;
  background-color: #111622;
  @media(max-width: 750px) {
     width: 90vw;
     overflow: hidden;
     padding: 18px 14px;
  }
`

const TxList = styled(List)`
  background-color: #1A202E;
  width: 580px;
  color: #fff;
  border-radius: 6px;
  font-size:10px;
  .ant-list-item{
    border-bottom: 1px solid #8F9DB8;
  }
  .ant-list-header{
     border-bottom: 1px solid #8F9DB8;
  }
  
  @media(max-width: 750px) {
    width: 100%!important;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    margin-left: 0!important;
  }
`

TxList.Header = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   padding: 0 30px;
   justify-content: space-between;
   align-items: center;
`

TxList.Item = styled(List.Item)`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 25px 24px;
  
  @media(max-width: 750px) {
      padding: 0 0;
      padding-left: 30px;
    }
`

TxList.Text = styled.p`
   color: #fff;
   font-size: 10px;
   display: flex;
   overflow: hidden;
   @media(max-width: 750px) {
      width: 100%;
      display: flex;
      justify-content: space-between;
  }
  
  p{
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    @media(max-width: 750px) {
      max-width: 200px;
    }
  }
`

TxList.Time = styled.p`
  color: #6D778B;
  font-size: 10px;
`

TxList.LineLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media(max-width: 750px) {
    flex-direction: column;
    align-items: start;
  }
`

TxList.Content = (time, hash, amount, sender, receiver)=>{
    return(
        <TxList.Item>
            <TxList.Time>{time}</TxList.Time>
            <TxList.LineLayout>
                <TxList.Text><p>交易哈希：</p><BlockContent  active to={`/tx/${hash}`}>{hash}</BlockContent></TxList.Text>
                <TxList.Text><p>数额：</p>{amount}</TxList.Text>
            </TxList.LineLayout>
            <TxList.LineLayout>
                <TxList.Text><p style={{color: '#FE0000'}}>发送方：</p>{sender}</TxList.Text>
                <TxList.Text><p style={{color: '#00FF0C'}}>接收方：</p>{receiver}</TxList.Text>
            </TxList.LineLayout>
        </TxList.Item>
    )
}



TableContainer.Table = styled(Table)`
  background-color: #1A202E;
  padding: 0 28px;
  border-radius: 6px;

  .ant-table table{
    border-collapse: collapse;
  }

  @media(max-width: 750px) {
      width: 100%;
      overflow: hidden;
  }

  .ant-table-column-title{
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #8F9DB8;
    letter-spacing: 0;
    text-align: left;
    
    @media(max-width: 750px) {
         font-size: 16px;
    }
  }
  
  .ant-table-row {
    border-bottom: 1px solid #8F9DB8!important;
  }
  
  
  .ant-table-thead {
    border-bottom: none;
  }

 .ant-table-thead > tr > th{
    background-color: #1A202E;
    border-bottom: 1px #8F9DB8 solid;
 }
 

 .ant-table-tbody > tr:hover > td{
    background:transparent ! important;
    border-bottom: 1px #8F9DB8 solid!important;
  }
  
  .ant-table-tbody > tr > td{
    background:transparent ! important;
    border-bottom: 1px #8F9DB8 solid!important;
  }
  

  .ant-pagination{
    width: 100%;
    display: flex;
    justify-content: center;
  }

.ant-pagination-item{
  background: #FFFFFF;
  border: 0 solid rgba(0,0,0,0.10);
  
  a:hover{
    color: #00D3FF;
  }
}

.ant-pagination-item-active{
  background: #00D3FF;
  border: 0 solid #00D3FF;
  
  a{
    color: #fff;
  }
  
  a:hover{
    color: #fff;
  }
}
 
`

TableContainer.More = styled(Button)`
  background: #00D3FF;
  border-radius: 8px;
  color: #fff;
  width: 300px;
  height: 60px;
  margin-top: 40px;
  font-family: PingFangSC-Semibold;
font-size: 24px;
letter-spacing: 0;
margin-left: auto;
margin-right: auto;
display: block;
@media(max-width: 750px) {
     width: 183px;
     height: 34px;
     font-size: 14px;
  }


&:hover{
background: #00D3FF;
color: #fff;
}
`

function Container({children}) {
  return(
      <ContainerView>
        {children}
      </ContainerView>
  )
}



export {Container, TableContainer, TxList}
