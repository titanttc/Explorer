import React from 'react';
import styled from 'styled-components'
import {List} from 'antd'

const CustomList = styled(List)`

  .ant-pagination{
    display: flex;
    justify-content: center;
  }

  .ant-pagination-item{
  background: #FFFFFF;
  border: 0 solid rgba(0,0,0,0.10);
  
  a:hover{
    color: #07ABA5;
  }
}

.ant-pagination-item-active{
  background: #07ABA5;
  border: 0 solid #07ABA5;
  
  a{
    color: #fff;
  }
  
  a:hover{
    color: #fff;
  }
}
`

export {CustomList}