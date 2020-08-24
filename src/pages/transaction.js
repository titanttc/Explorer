import React, {useState, useEffect} from 'react';
import moment from 'moment'
import {Label} from '../components/label'
import {BlockItem} from '../components/block'
import {Container, TableContainer} from '../components/container'
import Transaction from '../components/transaction'
import {Skeleton,message} from 'antd';
import {apiGET} from "../utils/api/apiFetch";


function TransactionDetail({match}) {

  const id = match.params.id;
  const [transaction, setTransaction] = useState(null);


  const fetchTransaction = async () => {
    const result = await apiGET(` https://ltchd.io/api/blockchain/transaction/${id}`, false, false);
    if (!result.error) {
      setTransaction(result);
    } else {
      message.error(result.error)
    }
  };

  useEffect(() => {
    setTransaction(null)
    fetchTransaction();
  }, []);

  function loadAmount(vList) {
    const list = vList.map(item => {return item.amount})
    return eval(list.join("+"));
  }


  return (
      <Container>
        <TableContainer style={{marginTop: 40}}>
          <Label title='Transaction'/>
          <BlockItem noMobile={true} content={id}/>
        </TableContainer>

        <TableContainer style={{marginTop: 70}}>
          <Label title='Summary'/>
          {transaction ? (
              <div>
                <BlockItem title='Total In' content={`${loadAmount(transaction.vin)? loadAmount(transaction.vin).toFixed(8): 0.00000000} LHD`}/>
                <BlockItem title='Total Out' content={`${loadAmount(transaction.vout)} LHD`}/>
                <BlockItem title='Fee'  content={`${transaction.fee} LHD`}/>
                <BlockItem title='Block Hash' active={true} content={transaction.blockhash}/>
                <BlockItem title='Time' content={moment.utc(transaction.blockTime).zone(-8).format("YYYY-MM-DD HH:mm:ss")}/>
                <BlockItem title='Bind With' active to={`/tx/${transaction.txid}`} content={transaction.txid}/>
              </div>
          ) : (<Skeleton/>)}
        </TableContainer>

        <TableContainer style={{marginTop: 70, marginBottom: 70}}>
          <Label title='Details'/>
          {transaction ? (
              <Transaction transaction={transaction}/>
          ) : (<Skeleton/>)}
        </TableContainer>
      </Container>
  )
}

export default TransactionDetail
