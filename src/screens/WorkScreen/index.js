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
import {GetWorkAction} from 'src/store/Work/action'

const WorkScreen = (props) => {

  const [isVisible, setIsVisible] = useState(false)
  
  function onOK () {
    setIsVisible (false)
    navigate ('WorkResult')
  }
  function onCancel () {
    setIsVisible (false)
  }

  useEffect (()=> {
    props.getWork(props.token)
  }, [])
  return (
    <ScrollView>
      <Container>
        <Menu title="Work Hours" back={true} />
        <ClockButton onPress={()=>setIsVisible(true)}>
          <ButtonTitle>Clock In</ButtonTitle>
        </ClockButton>
        <Title>Logged Hours</Title>
        <LoggedComponent 
          start="November 13 2020 @ 08:03"
          end="November 13 2020 @ 16:33"
          total="08:30 hours"
        />
        <LoggedComponent 
          start="November 13 2020 @ 08:03"
          end="November 13 2020 @ 16:33"
          total="08:30 hours"
        />
        <LoggedComponent 
          start="November 13 2020 @ 08:03"
          end="November 13 2020 @ 16:33"
          total="08:30 hours"
        />    
        <PageContainer>
            <PageTitle>1 of 3</PageTitle>
            <TouchableOpacity style={{marginLeft: 10}}>
                <PageTitle>NEXT {'>'}</PageTitle>
            </TouchableOpacity>
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
      data: state.work.data
    };
  };
  
  
  const mapDispatchToProps = (dispatch) => {
    return {      
      getWork: (token) => dispatch(GetWorkAction(token)),      
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
  font-size: 20px;
`
const ModalContainer = styled (TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`