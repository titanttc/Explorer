import React from 'react';
import styled from 'styled-components'

const Input = styled.input`
  width: 500px;
  font-size: 22px;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  outline: none;
  border-bottom-color: ${props=> props.error? '#F2304A': '#07ABA5'};
  
  ::-webkit-input-placeholder { /* WebKit browsers */ 
    color: ${props=> props.error? '#F2304A': '##666666'}; 
    font-size: 22px;
  } 
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
    color: ${props=> props.error? '#F2304A': '##666666'};
    font-size: 22px; 
  } 
  ::-moz-placeholder { /* Mozilla Firefox 19+ */ 
    color: ${props=> props.error? '#F2304A': '##666666'};
    font-size: 22px; 
  } 
  :-ms-input-placeholder { /* Internet Explorer 10+ */ 
    color: ${props=> props.error? '#F2304A': '##666666'};
    font-size: 22px; 
  } 
`

const Label = styled.p`
width: 736px;
font-size:24px;
font-family:PingFang SC;
font-weight:bold;
color:rgba(51,51,51,1);
line-height:36px;
margin-top:40px;

 :after {
        content: '* ';
        color: red;
        font-size: 20px;
    }
`

function LabelInput({value, onChange, onKeyPress, label, onBlur, placeholder, error}) {
  return(
      <div>
        <Label xreuired>{label}</Label>
        <Input
            onKeyPress={(e)=>{
              onKeyPress && onKeyPress(e.which)
            }}
            onBlur={()=>{
              onBlur();
            }}
            error={error}
            value={value}
            onChange={(e)=>{
              onChange(e.target.value)
            }}
            placeholder={placeholder} />
      </div>
  )
}

export default LabelInput


