import React, {useState, useEffect} from 'react';
import {Label} from '../components/label'
import {BlockItem} from '../components/block'
import {Container, TableContainer} from '../components/container'
import {Skeleton} from 'antd';
import {message} from "antd";
import {apiGET} from "../utils/api/apiFetch";


function PlotterDetail({match}) {

  const id = match.params.id;
  const [plotter, setPlotter] = useState(null);


  const fetchPlotter = async () => {
    const result = await apiGET(`https://ltchd.io/api/blockchain/plotter/${id}`, false, false);
    if (!result.error) {
      setPlotter(result);
    } else {
      message.error(result.error)
    }
  };

  useEffect(() => {
    setPlotter(null)
    fetchPlotter();
  }, []);


  return (
      <Container>
        <TableContainer style={{marginTop: 40}}>
          <Label title='Plotter'/>
          <BlockItem noMobile={true} content={id}/>
        </TableContainer>

        <TableContainer style={{marginTop: 70}}>
          <Label title='Summary'/>
          {plotter? (
              <div>
                <BlockItem title='Mining Block Count' content={plotter.miningblock}/>
                <BlockItem title='Mining Require Balance' content={`${plotter.miningrequire} LHD`}/>
                <BlockItem title='Capacity' content={plotter.capacity >1024?`${(plotter.capacity/1024).toFixed(2)}PB`:`${(plotter.capacity).toFixed(2)}TB`}/>
              </div>
          ) : (<Skeleton/>)}
        </TableContainer>

        <TableContainer style={{marginTop: 70, marginBottom: 70}}>
          <Label title='Active Bind'/>
          {plotter && plotter.bind ? (
              <div>
                <BlockItem title='Address' active to={`/address/${plotter.bind.address}`} content={plotter.bind.address}/>
                <BlockItem title='Height' content={plotter.bind.blockheight}/>
                <BlockItem title='Block Hash'  content={plotter.bind.blockhash}/>
                <BlockItem title='Bind Height Limit'  content={plotter.bind.bindheightlimit}/>
                <BlockItem title='Unbind Height Limit'  content={plotter.bind.unbindheightlimit}/>
                <BlockItem title='Transaction ID'  content={plotter.bind.txid}/>
              </div>
          ) : null}
        </TableContainer>
      </Container>
  )
}

export default PlotterDetail
