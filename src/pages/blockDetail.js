import React, {useState, useEffect} from 'react';
import moment from 'moment'
import {Container, TableContainer, TxList} from '../components/container'
import {Skeleton, Spin} from 'antd';
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
  padding-left: 32px;
  font-size: 11px;
  color: #8F9DB8;
  @media(max-width: 750px) {
      width: 100%!important;
      padding: 0 20px;
      justify-content: space-between;
    }
  p{
    @media(max-width: 750px) {
      margin-left: 0!important;
      overflow: hidden;
      max-width: 200px;
      text-overflow: ellipsis;
    }
  }
`


function BlockDetail({match}) {
  const {t} = useTranslation();

  const id = match.params.id;
  const blockHeight = match.params.id.length <= 8 ? match.params.id : null;
  const [blockID, setBlockID] = useState(id);
  const [block, setBlock] = useState({});
  const [height, setHeight] = useState(blockHeight);
  const [hash, setHash] = useState(id);
  const [loadingFetchBlockInfo, setLoadingFetchBlockInfo] = useState(false);



  const fetchBlock = async (id) => {
    setLoadingFetchBlockInfo(true)
    const result =match.params.id.length <= 8? await apiPost(`/block/getBlockByNumber`,'POST',{}, {
      blockNumber: id
    },false, false) :await apiPost(`/block/getBlockByHash`,'POST',{}, {
      blockHash: hash
    },false, false);
    setLoadingFetchBlockInfo(false)
    if (!result.code) {
      setBlock(result.data);
      setHeight(result.height)
    } else {
      message.error(result.error)
    }
  };

  useEffect(() => {
   fetchBlock(blockID);
  }, [blockID]);

  return (
      <Container>
        <ListLayout>
          <Spin spinning={loadingFetchBlockInfo}>
          <TxList
              style={{width: 1200}}
              header={<TxList.Header>
                <p style={{fontSize: 15, fontWeight: 'bold', color: '#00D3FF'}}>{t('BLOCK_DETAIL')}</p>
                <p style={{fontSize: 13}}></p>
              </TxList.Header>}>
            <ListItem>
              <Item>
                <p style={{width: 60}}>{t('BLOCK_HEIGHT')}</p>
                <p style={{marginLeft: 140,color: '#fff'}}>{block.blockNumber}</p>
              </Item>
            </ListItem>
            <ListItem>
              <Item>
                <p style={{width: 60}}>{t('PRODUCER')}</p>
                <BlockContent style={{marginLeft: 140}} active to={`/address/${block.generatedBy}`}>{block.generatedBy}</BlockContent>
              </Item>
            </ListItem>
            <ListItem>
              <Item>
                <p style={{width: 60}}>{t('TIME')}</p>
                <p style={{marginLeft: 140,color: '#fff'}}>{moment.utc(block.generatedDate).zone(-8).format("YYYY-MM-DD HH:mm:ss")}</p>
              </Item>
            </ListItem>
            <ListItem>
              <Item>
                <p style={{width: 60}}>{t('BLOCK_HASH')}</p>
                <BlockContent style={{marginLeft: 140}} active to={`/tx/${block.blockHash}`}>{block.blockHash}</BlockContent>
              </Item>
            </ListItem>
            <ListItem>
              <Item>
                <p style={{width: 60}}>{t('TX_COUNT')}</p>
                <p style={{marginLeft: 140,color: '#fff'}}>{block.transactionNumber}</p>
              </Item>
            </ListItem>
          </TxList>
          </Spin>
        </ListLayout>
      </Container>
  )
}

export default BlockDetail
