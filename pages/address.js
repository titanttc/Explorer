import React, {useState, useEffect} from 'react';
import {BlockContent} from '../components/block'
import {Container, TableContainer} from '../components/container'
import {message, Spin, Table} from "antd";
import apiPost from "../utils/api/apiFetch";
import moment from "moment";
import styled from 'styled-components'
import address_bg from '../assets/address_bg.png'
import {useTranslation} from 'react-i18next';
import {MediaQuery} from "react-responsive";


const {Column} = Table.Column

const Block = styled.div`
  width: 100%;
  background-size: auto 100%;
  background-position: right;
  background-repeat: no-repeat;
  background-color: #1A202E;
  color: #fff;
  display: flex;
  position: relative;
`

Block.Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
`

Block.Background = styled.img`
  width: 1200px;
  @media(max-width: 750px) {
    width: 90%;
  }
`

Block.Item = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 52px;
  padding-left: 80px;
`

Block.Text = styled.p`
  font-size: ${props => props.bold ? '23px' : '13px'};
  font-weight: ${props => props.bold ? 500 : 300};
  margin-bottom: 30px;
`

const MobileView = styled.div`
  width: 90vw;
  margin: auto;
  background-color: #1A202E;
  border-radius: 6px;
  margin-top: 20px;
`

const MobileBlock = styled.div`
  width: 100%;
  color: #8F9DB8;
  font-size: 10px 20px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #8F9DB8;
`



function Address({match}) {
  const {t} = useTranslation();
    const id = match.params.id;
    const [address, setAddress] = useState(id);
    if (address !== id) {
        setAddress(id)
    }
    const [addressData, setAddressData] = useState({});
    const [transactions, setTransactions] = useState(null)
    const [total, setTotal] = useState(0);
    const [curTxPage, setCurTxPage] = useState(1);
    const [loadingFetchTransactions, setLoadingFetchTransactions] = useState(false);
    const [loadingFetchAddressData, setLoadingFetchAddressData] = useState(false);

    const fetchAddressData = async () => {
        setLoadingFetchAddressData(true)
        const result = await apiPost(`/account/getAcountInfoByAddress`,
            'POST',
            {},
            {
                address: address
            },
            false, false);
        setLoadingFetchAddressData(false)
        if (!result.code) {
            setAddressData(result.data);
        } else {
            message.error(result.error)
        }
    };

    const fetchTransactions = async (page) => {
        setLoadingFetchTransactions(true);
        const result = await apiPost(`/transaction/findTransactions`,
            'POST',
            {},
            {
                address: address,
                page: "1",
                pageSize: "20"
            },
            false, false)
        setLoadingFetchTransactions(false);
        if (!result.error) {
            setTransactions(result.data);
            setTotal(result.total)
        } else {
            message.error(result.error)
        }
    };

    useEffect(() => {
        //setAddressData(null)
        //setTransactions(null)
        fetchAddressData();
    }, [address]);

    useEffect(() => {
        fetchTransactions(curTxPage)
    }, [curTxPage, address]);

    return (
        <Container>
            <div>
              <MediaQuery query='(min-device-width:750px)'>
                <p style={{color: '#fff', marginTop: 37,marginBottom: 38 ,marginLeft: 37, fontSize: 11}}>
                    <span style={{fontSize: 15, fontWeight: 500}}>{t('ADDRESS')} : </span>
                    {address}</p>
                <Spin spinning={loadingFetchAddressData} >
                    <Block>
                        <Block.Background src={address_bg}/>
                        <Block.Content>
                            <Block.Item>
                                <Block.Text>{t('BALANCE')}</Block.Text>
                                <Block.Text bold>{addressData.balance}</Block.Text>
                            </Block.Item>
                            <Block.Item>
                                <Block.Text>{t('MARKET_VALUE')}</Block.Text>
                                <Block.Text bold>{addressData.marketValue}</Block.Text>
                            </Block.Item>
                            <Block.Item>
                                <Block.Text>{t('TOKEN_TYPE')}</Block.Text>
                                <Block.Text bold>{1}</Block.Text>
                            </Block.Item>
                        </Block.Content>
                    </Block>
                </Spin>
              </MediaQuery>
              <MediaQuery query='(max-device-width:750px)'>
                  <Spin spinning={loadingFetchAddressData}>
                <MobileView>
                  <MobileBlock>
                      <span>{t('ADDRESS')}：</span>
                        <span style={{width:200,overflow:'hidden',textOverflow:'ellipsis'}}>{address}</span>
                  </MobileBlock>
                  <MobileBlock>
                    <span>{t('BALANCE')}：</span>
                    <span>{addressData.balance}</span>
                  </MobileBlock>
                  <MobileBlock>
                    <span>{t('MARKET_VALUE')}：</span>
                    <span>{addressData.marketValue}</span>
                  </MobileBlock>
                  <MobileBlock style={{borderBottom: 0}}>
                    <span>{t('TOKEN_TYPE')}：</span>
                    <span>{1}</span>
                  </MobileBlock>
                </MobileView>
                  </Spin>
              </MediaQuery>
              <MediaQuery query='(min-device-width:750px)'>
                <TableContainer.Table
                    style={{marginTop: 38}}
                    loading={loadingFetchTransactions}
                    dataSource={transactions}
                    pagination={{
                        total,
                        onChange: (page) => {
                            setCurTxPage(page)
                        }
                    }}
                >
                    <Column title={t('TX_HASH')} dataIndex="transactionId" key="transactionId"
                            render={(text, record, index) => {
                                return <BlockContent active to={`/tx/${text}`}>{text}</BlockContent>
                            }}/>
                    <Column title={t('IN_BLOCK')} dataIndex="blockNumber" key="blockNumber" render={(value) => {
                        return <BlockContent active to={`/block/${value}`}>{value}</BlockContent>
                    }}/>
                    <Column title={t('TIME')} dataIndex="blockTime" key="blockTime" render={(value) => {
                        return <BlockContent>{moment.utc(value).zone(-8).format("YYYY-MM-DD HH:mm")}</BlockContent>
                    }}/>
                    <Column title={t('SENDER')} dataIndex="sender" key="sender" render={(value) => {
                        return <BlockContent active to={`/address/${value}`} style={{color: '#FE0000'}}>{value}</BlockContent>
                    }}/>
                    <Column title={t('RECEIVER')} dataIndex="recipient" key="recipient" render={(value) => {
                        return <BlockContent active to={`/address/${value}`} style={{color: '#00FF0C'}}>{value}</BlockContent>
                    }}/>
                    <Column title={t('AMOUNT')} dataIndex="amountDisplay" key="amountDisplay" render={(value) => {
                        return <BlockContent style={{color: '#00D3FF'}}>{value}</BlockContent>
                    }}/>
                    <Column title={t('TX_FEE')} dataIndex="gasDisplay" key="gasDisplay" render={(value) => {
                        return <BlockContent>{value}</BlockContent>
                    }}/>
                    <Column title={t('TOKEN_TYPE')} dataIndex="tokenName" key="tokenName" render={(value) => {
                        return <BlockContent>{value}</BlockContent>
                    }}/>

                    {/*{document.querySelector('body').clientWidth <750? null:(*/}
                    {/*    <Column title="Pool" dataIndex="capacity" key="capacity" render={(value) => {*/}
                    {/*        return <BlockContent active>{''}</BlockContent>*/}
                    {/*    }}/>*/}
                    {/*)}*/}

                </TableContainer.Table>
              </MediaQuery>
              <MediaQuery query='(max-device-width:750px)'>
                <TableContainer.Table
                    style={{marginTop: 38}}
                    loading={loadingFetchTransactions}
                    dataSource={transactions}
                    pagination={{
                      total,
                      onChange: (page) => {
                        setCurTxPage(page)
                      }
                    }}
                >
                  <Column title={t('TX_HASH')} dataIndex="transactionId" key="transactionId"
                          render={(text, record, index) => {
                            return <BlockContent active to={`/tx/${text}`}>{text}</BlockContent>
                          }}/>
                  <Column title={t('IN_BLOCK')} dataIndex="blockNumber" key="blockNumber" render={(value) => {
                    return <BlockContent active to={`/block/${value}`}>{value}</BlockContent>
                  }}/>
                  <Column title={t('TIME')} dataIndex="time" key="time" render={(value) => {
                    return <BlockContent>{moment.utc(value).zone(-8).format("YYYY-MM-DD HH:mm")}</BlockContent>
                  }}/>
                  <Column title={t('SENDER')} dataIndex="sender" key="sender" render={(value) => {
                    return <BlockContent style={{color: '#FE0000'}}>{value}</BlockContent>
                  }}/>
                  <Column title={t('RECEIVER')} dataIndex="recipient" key="recipient" render={(value) => {
                    return <BlockContent style={{color: '#00FF0C'}}>{value}</BlockContent>
                  }}/>
                  <Column title={t('AMOUNT')} dataIndex="amountDisplay" key="amountDisplay" render={(value) => {
                    return <BlockContent style={{color: '#00D3FF'}}>{value}</BlockContent>
                  }}/>
                  <Column title={t('TX_FEE')} dataIndex="gasDisplay" key="gasDisplay" render={(value) => {
                    return <BlockContent>{value}</BlockContent>
                  }}/>
                  <Column title={t('TOKEN_TYPE')} dataIndex="tokenName" key="tokenName" render={(value) => {
                    return <BlockContent>{value}</BlockContent>
                  }}/>

                  {/*{document.querySelector('body').clientWidth <750? null:(*/}
                  {/*    <Column title="Pool" dataIndex="capacity" key="capacity" render={(value) => {*/}
                  {/*        return <BlockContent active>{''}</BlockContent>*/}
                  {/*    }}/>*/}
                  {/*)}*/}

                </TableContainer.Table>
              </MediaQuery>
            </div>
        </Container>
    )
}

export default Address
