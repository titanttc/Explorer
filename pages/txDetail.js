import React, {useState, useEffect} from 'react';
import moment from 'moment'
import {Container, TableContainer, TxList} from '../components/container'
import {Spin} from 'antd';
import {message, List} from "antd";
import apiPost from "../utils/api/apiFetch";
import styled from "styled-components";
import {useTranslation} from 'react-i18next';
import {BlockContent} from "../components/block";


const ListLayout = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
  margin-top: 37px;
  @media(max-width: 750px) {
    width: 90%;
  }
  
  .ant-spin-nested-loading{
    @media(max-width: 750px) {
      width: 100%!important;
    }
  }
`

const ListItem = List.Item;

const Item = styled.div`
  display: flex;
  padding: 0 20px;
  font-size: 11px;
  color: #8F9DB8;
  
  @media(max-width: 750px) {
      width: 100%!important;
      justify-content: space-between;
    }
  p{
    @media(max-width: 750px) {
      margin-left: 0!important;
    }
  }
`


function BlockDetail({match}) {
  const {t} = useTranslation();

  const id = match.params.id;
  const [txData, setTxData] = useState({});
  const [loadingFetchTxData, setLoadingFetchTxData] = useState(false);


  const fetchTxData = async (id) => {
    setLoadingFetchTxData(true)
    const result = await apiPost(`/transaction/getTransactionByHash`, 'POST', {}, {
      transactionId: id
    }, false, false);
    setLoadingFetchTxData(false)
    if (!result.code) {
      setTxData(result.data);
    } else {
      message.error(result.error)
    }
  };

  useEffect(() => {
    fetchTxData(id);
  }, []);

  return (
      <Container>
        <ListLayout>
          <Spin spinning={loadingFetchTxData}>
            <TxList
                style={{width: 1200}}
                header={<TxList.Header>
                  <p style={{fontSize: 15, fontWeight: 'bold', color: '#00D3FF'}}>{t('')}</p>
                  <p style={{fontSize: 13}}></p>
                </TxList.Header>}>
              <ListItem>
                <Item>
                  <p style={{width: 60}}>{t('AMOUNT_TX')}</p>
                  <p style={{marginLeft: 140, color: '#fff'}}>{txData.amountDisplay}</p>
                </Item>
              </ListItem>
              <ListItem>
                <Item>
                  <p style={{width: 60}}>{t('TIME')}</p>
                  <p style={{
                    marginLeft: 140,
                    color: '#fff'
                  }}>{moment.utc(txData.blockTime).zone(-8).format("YYYY-MM-DD HH:mm:ss")}</p>
                </Item>
              </ListItem>
              <ListItem>
                <Item>
                  <p style={{width: 60}}>{t('AMOUNT_TX')}</p>
                  <p style={{marginLeft: 140, color: '#fff'}}>{txData.blockNumber}</p>
                </Item>
              </ListItem>
              <ListItem>
                <Item>
                  <p style={{width: 60}}>{t('SENDER')}</p>
                  <BlockContent style={{marginLeft: 140}} active to={`/address/${txData.sender}`}>{txData.sender}</BlockContent>
                </Item>
              </ListItem>
              <ListItem>
                <Item>
                  <p style={{width: 60}}>{t('RECEIVER')}</p>
                  <BlockContent style={{marginLeft: 140}} active to={`/address/${txData.recipient}`}>{txData.recipient}</BlockContent>
                </Item>
              </ListItem>
              <ListItem>
                <Item>
                  <p style={{width: 60}}>{t('TX_HEIGHT')}</p>
                  <p style={{marginLeft: 140, color: '#fff'}}>{`${txData.gasDisplay}TTC`}</p>
                </Item>
              </ListItem>
            </TxList>
          </Spin>
        </ListLayout>
      </Container>
  )
}

export default BlockDetail
