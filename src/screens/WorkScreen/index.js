import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native'
import styled from 'styled-components/native'
import Menu from 'src/components/Menu'
import LoggedComponent from './LoggedComponent'
import ConfirmView from 'src/components/ConfirmView'
import {navigate} from'src/utils/navigation'
import {connect} from 'react-redux'
import {GetWorkAction,SetClockInOutAction} from 'src/store/Work/action'
import Spinner from 'react-native-loading-spinner-overlay';

const WorkScreen = (props) => {

  const [isVisible, setIsVisible] = useState(false)
  
  function onOK () {
    setIsVisible (false)
    props.setClcokInOut(props.token)
    navigate ('WorkResult')
  }
  function onCancel () {
    setIsVisible (false)
  }
  function onNext () {    
    props.getWork(props.paginator + 1, props.token)
  }
  function onPrev () {    
    props.getWork(props.paginator - 1, props.token)
  }
  useEffect (()=> {    
    const paginator = 0
    props.getWork(paginator, props.token)
  }, [])

  useEffect (()=> {
    console.log ("work data...", props.pageCount)    
  }, [props.pageCount])
  return (
    <ScrollView>
      <Container>
        <Spinner 
          visible={props.isLoading}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />  
        <Menu title="Work Hours" back={true} />        
          { props.clockStatus == 0 ? 
            <ClockButton onPress={()=>setIsVisible(true)}>
              <ButtonTitle>Clock In</ButtonTitle>
            </ClockButton>: 
            <ClockButton onPress={()=>setIsVisible(true)}>
              <ButtonTitle>Clock Out</ButtonTitle>
            </ClockButton>
          }
        <ButtonTitle>Clock In</ButtonTitle>
        <Title>Logged Hours</Title>
        { props.data && props.data.length > 0 &&
          props.data.map (item =>  {
            return (              
              <LoggedComponent 
                start={item.created_at}
                end={item.end_date_time}
                total={item.total}
              />
            )
          })        
        }       
        <PageContainer>
          {
              props.paginator > 0 &&
              <TouchableOpacity 
                style={{marginLeft: 10}}
                onPress = {onPrev}
              >
                <PageTitle>{'<'} PREV  </PageTitle>
              </TouchableOpacity>
          }   
          <PageTitle>{props.paginator + 1} of {props.pageCount}</PageTitle>
          {
              props.paginator < props.pageCount - 1 &&
              <TouchableOpacity 
                style={{marginLeft: 10}}
                onPress = {onNext}
              >
                <PageTitle>NEXT {'>'}</PageTitle>
              </TouchableOpacity>
          }          
        </PageContainer>  
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}        
        >
          <ModalContainer
            activeOpacity={1}  
            onPressOut={()=>setIsVisible(false)}          
          >
            <ConfirmView 
              onOK = {onOK}
              onCancel = {onCancel}
            />
          </ModalContainer>            
        </Modal>  
      </Container>
    </ScrollView>
  )
}
const mapStateToProps = (state) => {
    return {
      token: state.auth.token,
      isLoading: state.work.isLoading,      
      data: state.work.data,
      clockStatus: state.work.clockStatus,
      pageCount: state.work.pageCount,
      paginator: state.work.paginator
    };
  }; 
  
  const mapDispatchToProps = (dispatch) => {
    return {      
      getWork: (paginator, token) => dispatch(GetWorkAction(paginator, token)),      
      setClcokInOut: (token) => dispatch(SetClockInOutAction(token)),      
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(WorkScreen);

const Container = styled (View)`
  flex: 1;
`
const ClockButton = styled (TouchableOpacity)`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: red;
  margin-top: 2px;
`
const ButtonTitle = styled (Text)`
  font-size: 20px;
  color: white;  
`
const Title = styled (Text)`
  font-size: 27px;
  color: #15892E;
  margin-top: 15px;
  text-align: center;
  margin-bottom: 20px;
`
const PageContainer = styled (View)`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`
const PageTitle = styled (Text)`
  font-size: 16px;
`
const ModalContainer = styled (TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`