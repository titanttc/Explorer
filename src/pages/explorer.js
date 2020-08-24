import React, {useState, useEffect} from 'react';
import moment from 'moment'
import {useTranslation} from 'react-i18next';
import {Container, TxList} from '../components/container'
import apiPost from '../utils/api/apiFetch'
import {message, Spin} from 'antd'
import styled from 'styled-components'
import home_block_1 from '../assets/home_block_1.png'
import home_block_2 from '../assets/home_block_2.png'
import home_block_3 from '../assets/home_block_3.png'
import home_block_4 from '../assets/home_block_4.png'
import home_block_5 from '../assets/home_block_5.png'
import home_block_icon_1 from '../assets/home_block_icon_1.png'
import home_block_icon_2 from '../assets/home_block_icon_2.png'
import home_block_icon_3 from '../assets/home_block_icon_3.png'
import home_block_icon_4 from '../assets/home_block_icon_4.png'
import home_block_icon_5 from '../assets/home_block_icon_5.png'
import {BlockContent} from "../components/block";
import {MediaQuery} from "react-responsive";


const BlockView = styled.div`
  width: 1200px;
  margin-top: 38px;
  display: flex;
  justify-content: space-between;
  @media(max-width: 750px) {
    width: 100%;
      margin-top: 0;
    flex-direction: column;
    align-items: center;
  }
`

const Block = styled.div`
  height: 150px;
  width: ${props => props.large ? '581px' : '375px'};
  background-image: url(${props => props.url});
  background-size: auto 100%;
  background-position: right;
  background-repeat: no-repeat;
  background-color: #1A202E;
  color: #fff;
  @media(max-width: 750px) {
    height: ${props => props.large ? '200px' : '80px'};
    width: ${props => props.large ? '100%' : '90%'};
    background-image: url(${props => props.surl});
    margin-top: 20px;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px 0;
  }
`
Block.Title = styled.p`
  margin-top: 40px;
  margin-left: 31px;
  font-size: 13px;
  font-family:Microsoft YaHei;
  
  @media(max-width: 750px) {
    margin: 0 20px;
  }
`

Block.Content = styled.p`
  margin: 31px;
  font-size: 23px;
  line-height: 24px;
  font-family:DIN;
  font-weight: bold;
  @media(max-width: 750px) {
    margin: 0 20px;
      font-size: 20px;
  }
`
const ListLayout = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
  margin-top: 37px;
  
  .ant-spin-nested-loading{
    @media(max-width: 750px) {
      width: 90%!important;
    }
  }
  
  @media(max-width: 750px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
`


function Explorer({history}) {
  const {t} = useTranslation();
  const [info, setInfo] = useState({});
  const [blockList, setBlockList] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loadingBlockList, setLoadingBlockList] = useState(false);
  const [loadingTXList, setLoadingTxList] = useState(false);


  const fetchInfo = async () => {
    setLoadingBlockList(true);
    const result = await apiPost(`/info/getInfo`, 'POST', {}, false, false)
    setLoadingBlockList(false);
    if (!result.code) {
      setInfo(result.data);
    } else {
      message.error(result.error)
    }
  };

  const fetchBlockList = async () => {
    setLoadingBlockList(true)
    const result = await apiPost(`/block/findBlocks`,
        'POST',
        {},
        {
          page: "1",
          pageSize: "5"
        })
    setLoadingBlockList(false)
    if (!result.code) {
      setBlockList(result.data)
    } else {
      message.error(result.error)
    }
  };


  const fetchTransactionList = async () => {
    setLoadingTxList(true)
    const result = await apiPost(`/transaction/findTransactions`,
        'POST',
        {},
        {
          address: "",
          page: "1",
          pageSize: "5"
        },
        false);
    setLoadingTxList(false)
    if (!result.error) {
      setTransactions(result.data);
    } else {
      message.error(result.error)
    }
  };


  useEffect(() => {
    fetchTransactionList()
    fetchBlockList()
    fetchInfo()
  }, []);

  return (
      <Container>
        <BlockView>
          <Block url={home_block_1} surl={home_block_icon_1}>
            <Block.Title>{t('CURRENT_COUNT')}</Block.Title>
            <Block.Content>{info.totalQty}</Block.Content>
          </Block>
          <Block url={home_block_2} surl={home_block_icon_2}>
            <Block.Title>{t('CURRENT_HEIGHT')}</Block.Title>
            <Block.Content>{info.head_block_num}</Block.Content>
          </Block>
          <Block url={home_block_3} surl={home_block_icon_3}>
            <Block.Title>{t('CURRENT_DESTRUCTION_COUNT')}</Block.Title>
            <Block.Content>{info.destructionValue}</Block.Content>
          </Block>
        </BlockView>


        <MediaQuery query='(min-device-width:750px)'>
          <BlockView>
            <Block url={home_block_4} surl={home_block_icon_4} large>
              <Block.Title>{t('HASHRATE_COUNT')}</Block.Title>
              <Block.Content>{info.hashrateQty}</Block.Content>
            </Block>
            <Block url={home_block_5} large surl={home_block_icon_5}>
              <Block.Title>{t('PRICE')}</Block.Title>
              <Block.Content>{info.price}</Block.Content>
            </Block>
          </BlockView>
        </MediaQuery>
        <MediaQuery query='(max-device-width:750px)'>
          <BlockView style={{display: 'flex', flexDirection: 'row', padding: '0 20px'}}>
            <Block url={home_block_4} surl={home_block_icon_4} large style={{marginRight: 20}}>
              <Block.Title>{t('HASHRATE_COUNT')}</Block.Title>
              <Block.Content>{info.hashrateQty}</Block.Content>
            </Block>
            <Block url={home_block_5} large surl={home_block_icon_5}>
              <Block.Title>{t('PRICE')}</Block.Title>
              <Block.Content>{info.price}</Block.Content>
            </Block>
          </BlockView>
        </MediaQuery>
        <ListLayout>
          <Spin spinning={loadingTXList}>
            <TxList
                header={<TxList.Header>
                  <p style={{fontSize: 15, fontWeight: 'bold', color: '#00D3FF'}}>{t('LATEST_TX')}</p>
                  <p style={{fontSize: 13}}>{t('')}</p>
                </TxList.Header>}
                dataSource={transactions}
                renderItem={item => (
                    <TxList.Item>
                      <TxList.Time>{moment.utc(item.blockTime).zone(-8).format("YYYY-MM-DD HH:mm:ss")}</TxList.Time>
                      <TxList.LineLayout>
                        <TxList.Text>
                          <p>{t('TX_HASH')}：</p>
                          <BlockContent active to={`/tx/${item.transactionId}`}>{item.transactionId}</BlockContent></TxList.Text>
                        <TxList.Text><p>{t('AMOUNT')}：</p>{item.amountDisplay}</TxList.Text>
                      </TxList.LineLayout>
                      <TxList.LineLayout>
                        <TxList.Text><p style={{color: '#FE0000'}}>{t('SENDER')}：</p>
                          <BlockContent active to={`/address/${item.sender}`}>{item.sender}</BlockContent>
                          </TxList.Text>
                        <TxList.Text><p style={{color: '#00FF0C'}}>{t('RECEIVER')}：</p>
                          <BlockContent active to={`/address/${item.recipient}`}>{item.recipient}</BlockContent>
                        </TxList.Text>
                      </TxList.LineLayout>
                    </TxList.Item>
                )}/>
          </Spin>
          <Spin spinning={loadingBlockList}>
            <TxList
                style={{marginLeft: 38}}
                header={<TxList.Header>
                  <p style={{fontSize: 15, fontWeight: 'bold', color: '#00D3FF'}}>{t('LATEST_BLOCK')}</p>
                  <p style={{fontSize: 13}}>{t('')}</p>
                </TxList.Header>}
                dataSource={blockList}
                renderItem={item => (
                    <TxList.Item>
                      <TxList.Time>{moment.utc(item.generatedDate).zone(-8).format("YYYY-MM-DD HH:mm:ss")}</TxList.Time>
                      <TxList.LineLayout>
                        <TxList.Text><p>{t('TX_HASH')}：</p>
                          <BlockContent active to={`/tx/${item.blockHash}`}>{item.blockHash}</BlockContent></TxList.Text>
                        <TxList.Text><p>{t('BLOCK_NUM')}：</p>{item.blockNumber}</TxList.Text>
                      </TxList.LineLayout>
                      <TxList.LineLayout>
                        {/*<TxList.Text><p style={{color: '#00FF0C'}}>{t('PRODUCER')}：</p>*/}
                          {/*<BlockContent active to={`/address/${item.generatedBy}`}>{item.generatedBy}</BlockContent>*/}
                          {/*</TxList.Text>*/}
                        <TxList.Text><p>{t('TX_COUNT')}：</p>{item.transactionNumber}</TxList.Text>
                      </TxList.LineLayout>
                    </TxList.Item>
                )}/>
          </Spin>
        </ListLayout>
      </Container>
  )
}

export default Explorer
