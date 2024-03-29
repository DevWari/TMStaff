import React, {useState, useEffect, useCallback} from 'react'
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
import WorkModal from 'src/components/WorkModal'
import {navigate} from'src/utils/navigation'
import {connect} from 'react-redux'
import {GetWorkAction,SetClockInOutAction, GetClockStatusAction} from 'src/store/Work/action'
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect} from 'react-navigation-hooks'

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

  useFocusEffect(useCallback(() => {        
    const paginator = 0    
    props.getWork(paginator, props.token)   
    // props.getClockStatus(props.token)
  }, [props.token])); 

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
        { props.pageCount > 0 && <Title>Logged Hours</Title> }     
        { props.data && props.data.length > 0 &&
          props.data.map (item =>  {
            return (              
              <LoggedComponent 
                start={item.created_at}
                end={item.end_date_time}
                total={item.total}
                key={item.created_at}
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
          { props.pageCount > 0 && <PageTitle>{props.paginator + 1} of {props.pageCount}</PageTitle> }          
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
        <View style={{height: 20}} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}        
        >
          <ModalContainer
            activeOpacity={1}  
            onPressOut={()=>setIsVisible(false)}          
          >
            <WorkModal 
              onOK = {onOK}
              onCancel = {onCancel}
              clockStatus = {props.clockStatus}
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
      getClockStatus: (token) => dispatch(GetClockStatusAction(token)),  
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