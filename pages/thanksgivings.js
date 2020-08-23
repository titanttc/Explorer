import React, {useState, useEffect} from 'react';
import {List} from 'antd'
import {Label} from '../components/label'
import {GivingItem} from '../components/block'
import {Container, TableContainer} from '../components/container'
import {message} from "antd";
import {apiGET} from "../utils/api/apiFetch";
import {baseurl} from '../utils/domains'



function Thanksgivings({match}) {

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [curPage, setCurPage] = useState(1);


  const fetchGivings = async () => {
    const result = await apiGET(`${baseurl}/thanksgiving/ensuredList?size=10&page=${curPage}`);
    if (result.code ===0) {
      setData(result.data)
      setTotal(result.total)
    } else {
      message.error(result.error)
    }
  };


  useEffect(() => {
    fetchGivings();
  }, [curPage]);


  return (
      <Container>
        <TableContainer style={{marginTop: 40}}>
          <Label title='Thanksgiving'/>
          <List
              pagination={{
                onChange: page => {
                  setCurPage(page)
                },
                pageSize: 10,
                total: total
              }}
              dataSource={data}
              renderItem={item =>(
                  <List.Item>
                    <GivingItem donator={item.donator} giving={item.desc} height={item.remark}/>
                  </List.Item>
              )}
          >
          </List>
        </TableContainer>

      </Container>
  )
}

export default Thanksgivings
