import React, {useState, useEffect} from 'react';
import {Label} from '../components/label'
import {Container, TableContainer} from '../components/container'
import {BlockContent} from "../components/block";
import {apiGET} from "../utils/api/apiFetch";
import {message,Table} from 'antd'


function Bind({match}) {

  const address = match.params.address;
  const [plotter, setPlotter] = useState(null);
  const [total, setTotal] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const fetchPlotter = async () => {
    setLoading(true)
    const result = await apiGET(`https://ltchd.io/api/blockchain/address/${address}/plotter?page=${curPage-1}&count=10`, false, false);
    setLoading(false)
    if (!result.error) {
      setPlotter(result.data);
      setTotal(result.total)
    } else {
      message.error(result.error)
    }
  };

  useEffect(() => {
    setPlotter(null)
    fetchPlotter();
  }, [curPage]);

  const {Column} = Table;

  return (
      <Container>
        <TableContainer style={{marginTop: 24, marginBottom: 70}}>
          <Label small title={`Bind To`} address={address}/>
          <TableContainer.Table
              dataSource={plotter}
              loading={loading}
              pagination={{
                total,
                onChange: (page)=>{
                  setCurPage(page)
                }
              }}
          >
            <Column title="Plotter ID" dataIndex="plotter" key="plotter" render={(value) => {
              return <BlockContent active to={`/Plotter/${value}`}>{value}</BlockContent>
            }}/>
            <Column title="Bind Height" dataIndex="bind.blockheight" key="height" render={(value) => {
              return <BlockContent style={{width: 200}} active to={`/blockDetail/${value}`}>{value}</BlockContent>
            }}/>
            <Column title="Bind Transaction ID" dataIndex="bind.txid" key="confirmations" render={(value) => {
              return <BlockContent style={{width: 580}} active to={`/transaction/${value}`}>{value}</BlockContent>
            }}/>

          </TableContainer.Table>
        </TableContainer>
      </Container>
  )
}

export default Bind
