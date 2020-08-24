import React, {useState, useEffect} from 'react';
import moment from 'moment'
import {Container, TableContainer} from '../components/container'
import {Label} from '../components/label'
import {apiGET} from '../utils/api/apiFetch'
import {message} from 'antd'
import {Table} from 'antd';
import {BlockContent} from "../components/block";

const {Column} = Table;


function Block() {

  const [blockList, setBlockList] = useState([]);
  const [bestBlockHeight, setBestBlockHeight] = useState(null);
  const [total, setTotal] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [loadingBlockList, setLoadingBlockList] = useState(false);



  const fetchLatestBlock = async (page, count) => {
    setLoadingBlockList(true);
    const result = await apiGET(`https://ltchd.io/api/blockchain/block?page=${page-1}&count=${count}`, false, false)
    setLoadingBlockList(false);
    if (!result.error) {
      setBlockList(result.data);
      setTotal(result.total)
    } else {
      message.error(result.message)
    }
  };

  const fetchBestBlock = async () => {
    const result = await apiGET(`https://ltchd.io/api/blockchain/bestblock`, false, false)
    if (!result.error) {
      setBestBlockHeight(result.height)
      console.log('setBestBlockHeight',result.height)
    } else {
      message.error(result.error)
    }
  };

  const fetchHashByHeight = async (height) => {
    const heightResult = await apiGET(`https://ltchd.io/api/blockchain/blockhash/${height}`, false, false);
    if (!heightResult.error) {

    } else {
      message.error(heightResult.error)
    }
  };



  useEffect(() => {
    fetchLatestBlock(curPage, 10)
  },[curPage]);


  useEffect(() => {
    setBlockList([]);
    setBestBlockHeight(null);
    fetchBestBlock()
  },[]);

  return (
      <Container>
        <TableContainer style={{marginTop: 24, marginBottom: 70}}>
          <Label title='Latest Block'/>
          <TableContainer.Table
              dataSource={blockList}
              loading={loadingBlockList}
              pagination={{
                total,
                onChange: (page)=>{
                  setCurPage(page)
                }
              }}
          >
            <Column title="Height" dataIndex="height" key="height" render={(text, record, index) => {
              return <BlockContent active to={`/block/${record.hash}`}>{text}</BlockContent>
            }}/>
            <Column title="Time" dataIndex="time" key="time" render={(value) => {
              return <BlockContent>{moment.utc(value*1000).zone(-8).format("YYYY-MM-DD HH:mm")}</BlockContent>
            }}/>
            <Column title="Confirmations" dataIndex="height" key="confirmations" render={(value) => {
              return <BlockContent>{bestBlockHeight-value+1}</BlockContent>
            }}/>
            {document.querySelector('body').clientWidth <750? null:(
                <Column title="Pool" dataIndex="capacity" key="capacity" render={(value) => {
                  return <BlockContent active>{''}</BlockContent>
                }}/>
            )}

          </TableContainer.Table>
        </TableContainer>
      </Container>
  )
}

export default Block
