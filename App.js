import React, {useState, useRef,useEffect} from 'react';
import './i18n'
import {useTranslation} from 'react-i18next';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import styled from 'styled-components'
import MediaQuery from 'react-responsive';
import {Collapse} from 'antd';
import {Button, Input, message} from 'antd'
import './App.css';
import 'antd/dist/antd.css'
import Explorer from './pages/explorer'
import Network from './pages/network'
import Block from './pages/block'
import BlockDetail from './pages/blockDetail'
import TransactionDetail from './pages/txDetail'
import PlotterDetail from './pages/plotter'
import AddressDetail from './pages/address'
import Thanksgiving from './pages/thanksgiving'
import Thanksgivings from './pages/thanksgivings'
import home_bottom_bg from './assets/home_bottom_bg.png'
import Bind from './pages/bind'
import logo from './assets/logo.png'
import logo_small from './assets/logo_small.png'
import ScrollToTop from './components/scrollToTop'
import icon_home from './assets/icon-home.png'
import icon_change from './assets/icon-change.png'
import lan_change_icon from './assets/lan_change_icon.png'
import lan_change_icon_en from './assets/lan_change_icon_en.png'




const {Panel} = Collapse;


const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #1A202E;
  position: sticky;
`

Header.Container = styled.div`
  width: 1200px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
  @media(max-width: 750px) {
     width: 100%;
  }
`

Header.Logo = styled.img`
  height: 32px;
  cursor: pointer;
`

Header.Title = styled.div`
  font-family: PingFangSC-Regular;
font-size: 33.6px;
color: #E4E9EA;
letter-spacing: 0;
text-align: left;
margin-left: 12px;
  cursor: pointer;
`

Header.Router = styled(Link)`
  font-family: PingFangSC-Medium;
font-size: 11px;
color: #FFFFFF;
letter-spacing: 0;
text-align: left;
&:hover{
color: #00D3FF;
}
`

Header.SearchInput = styled(Input.Search)`
width: 400px;
height: 30px;
color: #fff;
margin-left: 31px;

@media(max-width: 750px) {
     width: 80%;
     margin: auto;
     font-size: 10px;
  }

svg{
  color: #fff;
}

.ant-input-suffix{
  color: #fff!important;
}


.ant-input{
  border-radius: 15px;
  background: #262E3F;
  color: #fff;
  border: none;
}
`

Header.SearchButton = styled(Button)`
width: 147px;
height: 47px;
background: #00D3FF;
border-radius: 8px;
font-family: PingFangSC-Medium;
font-size: 20px;
color: #E4E9EA;
letter-spacing: 0;
margin-left: 16px;
border: 0;

&:hover{
  background: #00D3FF;
  color: #E4E9EA;
}

&:focus{
  background: #00D3FF;
  color: #E4E9EA;
}
`

const MobileHeader = styled.div`
  width: 100vw;
  height: 60px;
  background: #1A202E;
  display: flex;
  align-items: center;
  padding: 0 16px;
`

MobileHeader.Logo = styled.img`
  height: 28px;
`

MobileHeader.Menu = styled.img`
  width: 28px;
  height: 28px;
`

MobileHeader.Title = styled.span`
font-family:PingFangSC;
font-weight:400;
color:rgba(228,233,234,1);
font-size: 21px;
margin-left: 8px;
`

MobileHeader.Search = styled(Input)`
  background: #FFFFFF;
  border-radius: 8px;
  width: 323px;
  height: 28px;
    font-size: 12px;
    text-align: center;
    margin-top: 20px;
`

MobileHeader.Button = styled(Button)`
border-radius: 8px;
  width: 323px;
  height: 28px;
  background: #00D3FF;
  color: #E4E9EA;;
  font-size: 12px;
  border: 0;
  margin-top: 14px;

&:hover{
  background: #00D3FF;
  color: #E4E9EA;
}

&:focus{
  background: #00D3FF;
  color: #E4E9EA;
}
`

const MenuLayout = styled.div`
    width: 100vw;
    background:rgba(34,46,65,1);
    padding-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 24px;
`

const HeaderCollapse = styled(Collapse)`
  width: 100vw;
  .ant-collapse-header{
    padding: 0!important;
  }
  .ant-collapse-content{
    border-top: none!important;
  }
  .ant-collapse-content-box{
    padding: 0!important;
  }
`

const Router = styled.div`
  font-size: ${props => props.active ? '16px' : '14px'};
  color: ${props => props.active ? '#00D3FF' : '#E4E9EA'};
  text-decoration: underline;
  text-align: center;
`

const Language = styled.div`
  width: 80px;
  height: 30px;
  border-radius: 30px;
  background-color: #262E3F;
  align-items: center;
  display: inline-flex;
  margin-left: 30px;
  background-image: url(${lan_change_icon});
  color: #fff;
  font-size: 12px;
  padding-left: 16px;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position-x: 48px;
  background-position-y: center;
  cursor: pointer;
`

const Bottom = styled.img`
  width: 1200px;
  margin-top: 38px;

  @media(max-width: 750px) {
    width: 90%;
    margin-top: 20px;
  }
`


function App() {
  const {t,i18n} = useTranslation();
  const [hasBack, setHasBack] = useState(false);
  const router = useRef(null);

  const onSearch = (value) => {
    const r = /^\+?[1-9][0-9]*$/;　　//正整数
    console.log(value.length)
    if (!value) {
      message.error('not found!')
    } else if (r.test(value)) {
      router.current.history.replace(`/block/${value}`)
    } else if (value.startsWith('0x')) {
      router.current.history.replace(`/tx/${value}`)
    } else if (value.startsWith('TTC')) {
      router.current.history.replace(`/address/${value}`)
    }else {
      message.warning('not found!')
    }
  };


  return (
      <BrowserRouter ref={router}>
        <ScrollToTop>
          <MediaQuery query='(min-device-width:750px)'>
            <Header>
              <Header.Container>
                <Link to='/' style={{display: 'flex'}}>
                  <Header.Logo src={logo}/>
                </Link>
                {/*<Header.Router style={{marginLeft: 302}} to='/network'>Network</Header.Router>*/}
                <div>
                  <img style={{width: 12}} src={hasBack?icon_home: ''}/>
                  <Header.Router style={{marginLeft: 12}} to='/'>{t('HOME')}</Header.Router>
                  <Header.SearchInput
                      onSearch={(value) => {
                        //setSearchText(value)
                        onSearch(value)
                      }} placeholder={t('SEARCH_TEXT')}/>
                  <Language onClick={()=>{
                    console.log('Language')
                    i18n.changeLanguage(i18n.language==='en'?'zh':'en')
                  }}>{t('LANGUAGE')}</Language>
                </div>
              </Header.Container>
            </Header>
          </MediaQuery>

          <MediaQuery query='(max-device-width:750px)'>
            <MobileHeader>
              <Link to='/'>
                <MobileHeader.Logo src={logo_small}/>
              </Link>
              <Header.SearchInput
                  maxlength={100}
                  onSearch={(value) => {
                    //setSearchText(value)
                    onSearch(value)
                  }} placeholder={t('SEARCH_TEXT')}/>
              <MobileHeader.Menu src={i18n.language==='en'?lan_change_icon_en:icon_change} onClick={() => {
                i18n.changeLanguage(i18n.language==='en'?'zh':'en')
              }}/>
            </MobileHeader>
          </MediaQuery>
          <Switch>
            <Route exact path="/network" component={Network}/>
            <Route exact path="/block/:id" component={BlockDetail}/>
            <Route exact path="/block" component={Block}/>
            <Route exact path="/plotter/:id" component={PlotterDetail}/>
            <Route exact path="/tx/:id" component={TransactionDetail}/>
            <Route exact path="/address/:id" component={AddressDetail}/>
            <Route exact path="/bind/:address" component={Bind}/>
            <Route exact path="/thanksgivings" component={Thanksgivings}/>
            <Route exact path="/thanksgiving" component={Thanksgiving}/>
            <Route path="/" component={Explorer}/>
          </Switch>
          <div style={{
            width: '100%',
            backgroundColor: '#111622',
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 50
          }}>
            <Bottom src={home_bottom_bg}/>
          </div>
        </ScrollToTop>
      </BrowserRouter>
  );
}

export default App;
