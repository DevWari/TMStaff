import React, {useState, useEffect, useCallback} from 'react'
import {
  View, 
  Text,   
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native'
import Menu from 'src/components/Menu'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import {GetCourseAction} from 'src/store/Courses/action'
import Spinner from 'react-native-loading-spinner-overlay'
import MarkModal from 'src/components/MarkModal'
import { useFocusEffect} from 'react-navigation-hooks'

const CoursesDetail = (props) => {

  const [isVisible, setIsVisible] = useState (false)  
  
  useFocusEffect(useCallback(() => {    
    console.log ("cccc....", props.navigation.state?.params?.item)
    let hashedId = props.navigation.state?.params?.item.hashed_id
    props.getCourse (hashedId, props.token)

  }, []));

  useEffect (()=> {
    console.log ("course detail....", props.courseData)
  }, [props.courseData])

  const onOK = () => {

  }

  const onCancel = () => {

  }

  return (
    <ScrollView>
      <Container>
        <Spinner 
          visible={props.isLoading}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />  
        <Menu title="Courses" back={true} />
        <Text>Hello Detail</Text>
        <MarkButton onPress={()=>setIsVisible(true)}>
          <MarkTitle>Mark as completed</MarkTitle>
        </MarkButton>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}        
        >
          <ModalContainer
            activeOpacity={1}  
            onPressOut={()=>setIsVisible(false)}          
          >
            <MarkModal 
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
    isLoading: state.courses.isLoading,
    courseData: state.courses.courseData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCourse: (hashedId, token) => dispatch(GetCourseAction(hashedId, token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CoursesDetail);


const Container = styled (View)`
  flex: 1;
  align-items: center;
`

const MarkButton = styled(TouchableOpacity)`
  width: 50%;
  height: 40px;
  background-color: #15892E;
  justify-content: center;
  align-items: center;
  margin-top: 10px;  
`
const MarkTitle = styled(Text)`
  font-size: 20px;  
  text-align: center;
  color: white;
`
const ModalContainer = styled (TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`
