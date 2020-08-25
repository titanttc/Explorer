import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import right from '../assets/right.png'

const TransactionView = styled.div`
  width: 1200px;
  @media(max-width: 750px) {
    width: 100%;
  }
`

const TransactionItem = styled.div`
  background: #f8f8f8;
  border-radius: 12px;
  padding: 16px 18px 26px 18px;
  display: flex;
  flex-direction: row;
  @media(max-width: 750px) {
    flex-wrap: wrap;
    display: block;
  } 
`

const TransactionHash = styled(Link)`
  font-family: PingFangSC-Regular;
  font-size: 20px;
  margin: 14px;
  color: ${props => props.active ? '#07ABA5' : '#323232'};
  letter-spacing: 0;
  text-align: left;
  cursor: pointer;
&:hover{
  color: #07ABA5;
  text-decoration: underline;
}
@media(max-width: 750px) {
    font-size: 12px;
    width: 320px;
    word-break: break-all;
    display: block;
  } 
`

TransactionItem.ShortText = styled.div`
  width: 412px;
  background: #FFFFFF;
  border-radius: 12px;
  display: block;
  align-items: center;
  padding: 13px 18px;
    font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace,PingFangSC-Regular;

  @media(max-width: 750px) {
    width: 242px;
    display: inline-block;
      margin-bottom: 14px;
      padding: 8px;
  } 
`

TransactionItem.Vout = styled.div`
  display: flex;
  flex-direction: column;
  @media(max-width: 750px) {
  
  }
  
`

TransactionItem.LongText = styled.div`
  width: 672px;
  height: 50px;
  background: #FFFFFF;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  margin-bottom: 16px;
      font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace,PingFangSC-Regular;

  @media(max-width: 750px) {
    width: auto;
    flex-direction: column;
    align-items: left;
    display: block;
    
  } 
`

TransactionItem.RightView = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  @media(max-width: 750px) {
    width: 18px;
    display: inline-flex;
  } 
`

TransactionItem.Right = styled.img`
  width: 16px;
  height: 12px;
  @media(max-width: 750px) {
    width: 10px;
    height: 7px;
    margin: auto;
  } 
`

const Out = styled(Link)`
  display: block;
  overflow: hidden;
    text-overflow:ellipsis; 
    white-space:nowrap;
    color: #07ABA5;
    
    &:hover{
      color: #07ABA5;
      text-decoration: underline;
  }
    
`

function Transaction({transaction}) {
  return (
      <TransactionView>
        <TransactionHash active to={`/tx/${transaction.txid}`}>{transaction.txid}</TransactionHash>
        <TransactionItem>
          <TransactionItem.ShortText>
            {transaction.from.length === 0 ? 'No Inputs' : transaction.from.map(item => {
              return <Out to={`/address/${item}`}>{item}</Out>
            })}
          </TransactionItem.ShortText>
          <TransactionItem.RightView>
            <TransactionItem.Right src={right}/>
          </TransactionItem.RightView>
          <TransactionItem.Vout>
            {transaction.vout.map(item => {
              return (
                  <TransactionItem.LongText>
                    <Out to={`/address/${item.address}`}>{item.address}</Out>
                    <div>{`${item.amount} LHD`}</div>
                  </TransactionItem.LongText>
              )
            })}
          </TransactionItem.Vout>
        </TransactionItem>
      </TransactionView>
  )
}

export default Transaction
