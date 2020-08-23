import React, {useState, useEffect} from 'react';
import {Container, TableContainer} from '../components/container'
import styled from 'styled-components'
import moment from 'moment'
import {BlockItem} from '../components/block'
import ReactEcharts from 'echarts-for-react';
import {Label} from '../components/label'
import {apiGET} from '../utils/api/apiFetch'
import {message, Skeleton} from 'antd'


function Explorer() {


  const getOption = (xData, yData) =>{
    return {
      title: {
        text: '',
        subtext: '-TB'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:['PB']
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: xData,
        axisLabel: {
          formatter: function (params) {
            return moment(params).format("YYYY-MM-DD")
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name:'Network Capacity',
          type:'line',
          smooth: false,
          itemStyle: {
            color: '#07ABA5'
          },
          data:yData,
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          }
        },
      ]
    }
  }

  const [bestBlock, setBestBlock] = useState(null);
  const [capacityData, setCapacityData] = useState(null);
  const [loadingBestBlock, setLoadingBestBlock] = useState(false);


  const fetchBestBlock = async () => {
    setLoadingBestBlock(true);
    const result = await apiGET(`https://ltchd.io/api/blockchain/bestblock`, false, false)
    setLoadingBestBlock(false);
    if (!result.error) {
      setBestBlock(result);
    } else {
      message.error(result.error)
    }
  };

  const fetchCapacityData = async () => {
    setLoadingBestBlock(true);
    const result = await apiGET(`https://ltchd.io/api/blockchain/capacity?begin=-2016&end=0&average=2016`, false, false)
    setLoadingBestBlock(false);
    if (!result.error) {
      const xData = result.data.map(item =>{return moment.utc(item.time*1000).zone(-8).format("YYYY-MM-DD HH:mm:ss")});
      const yData = result.data.map(item =>{return item.capacity});
      setCapacityData(getOption(xData, yData));
    } else {
      message.error(result.error)
    }
  };




  useEffect(() => {
    fetchBestBlock();
    fetchCapacityData()
  }, []);

  return (
      <Container>
        {/*<TableContainer style={{marginTop: 70}}>*/}
        {/*  <Label title='Best Block' height={bestBlock && bestBlock.height}/>*/}
        {/*  {bestBlock ? (*/}
        {/*      <div>*/}
        {/*        <BlockItem title='Height'  content={bestBlock.height}/>*/}
        {/*        <BlockItem title='Block Hash' to={`/block/${bestBlock.hash}`} content={bestBlock.hash} active={true}/>*/}
        {/*        <BlockItem title='Time' content={moment.utc(bestBlock.time*1000).zone(-8).format("YYYY-MM-DD HH:mm")}/>*/}
        {/*        <BlockItem title='Transactions' content={bestBlock.tx}/>*/}
        {/*        <BlockItem title='Previous Block Hash' to={`/block/${bestBlock.previous}`} content={bestBlock.previous} active={true}/>*/}
        {/*        <BlockItem title='Hash' content={bestBlock.basetarget}/>*/}
        {/*        <BlockItem title='Nonce' to={`/plotter/${bestBlock.nonce}`} active={true}  content={bestBlock.nonce}/>*/}
        {/*        <BlockItem title='Difficulty' content={bestBlock.difficulty}/>*/}
        {/*        <BlockItem title='PlotterID' to={`/plotter/${bestBlock.plotter}`} content={bestBlock.plotter} active={true}/>*/}
        {/*        <BlockItem title='Deadline' content={bestBlock.deadline}/>*/}
        {/*      </div>*/}
        {/*  ) : (<Skeleton/>)}*/}
        {/*</TableContainer>*/}

        <TableContainer style={{marginTop: 40}}>
          <Label title='Mining'/>
          {bestBlock ? (
              <div>
                <BlockItem title='Average Capacity'  content={''}/>
                <BlockItem title='Step Balance' content={''}/>
                <BlockItem title='Ratio' content={''}/>
              </div>
          ) : (<Skeleton/>)}
        </TableContainer>

        <TableContainer style={{marginTop: 70, marginBottom: 70}}>
          <Label title='Network Capacity'/>
          {capacityData ? (
              <ReactEcharts
                  option={capacityData}
                  style={{height: '500px', width: '1200px'}}/>
          ) : (<Skeleton/>)}
        </TableContainer>
      </Container>
  )
}

export default Explorer
