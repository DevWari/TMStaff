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
import {GetCourseAction, SendMarkCourseAction} from 'src/store/Courses/action'
import Spinner from 'react-native-loading-spinner-overlay'
import MarkModal from 'src/components/MarkModal'
import { useFocusEffect} from 'react-navigation-hooks'
import {WebView} from 'react-native-webview'
import { navigate } from 'src/utils/navigation'

const CoursesDetail = (props) => {

  const [isVisible, setIsVisible] = useState (false)  
  const [videoLoading, setVideoLoading] = useState (false)
  const [videoList, setVideoList] = useState ([])
  
  useFocusEffect(useCallback(() => {    
    console.log ("cccc....", props.navigation.state?.params?.item)
    let hashedId = props.navigation.state?.params?.item.hashed_id
    props.getCourse (hashedId, props.token)

  }, []));

  useEffect (()=> {    
    let videoTempArray = props.courseData?.videos.split("https://www.youtube.com/")
    let tempVideoList = []
    if (videoTempArray) {
      videoTempArray.map ((item, index)=> {      
        if (item.indexOf("embed/") > -1) {
            let video = item.split(" ")[0].slice(0, -1)          
            tempVideoList.push ("https://www.youtube.com/" + video)
        }
      })
      console.log ("videoList...", tempVideoList)
      setVideoList (tempVideoList)
    }    
  }, [props.courseData])
  
  useEffect (()=> {
    if (!props.token) navigate ("Auth")
  }, [props.token])
  const onOK = () => {
    let hashedId = props.navigation.state?.params?.item.hashed_id
    props.sendMarkCourse(hashedId, props.token)
    setIsVisible (false)
  }

  const onCancel = () => {
    setIsVisible (false)
  }

  return (
    <ScrollView>
      <Container>
        <Spinner 
          visible={props.isLoading}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />  
        <Spinner 
          visible={videoLoading}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />  
        <Menu title="Courses" back={true} />
        <CourseTitle>Learning Center</CourseTitle>
        <TitleContainer>
          <Title>({props.courseData?.id}) {props.courseData?.subject}</Title>
        </TitleContainer> 
        {   videoList && 
            videoList.map ((item, index)=>
              <VideoContainer key={index}>
                <WebView
                    style={{flex: 1}}
                    javaScriptEnabled={true}
                    source={{uri: item }}
                    onLoadStart = {e=>setVideoLoading(true)}
                    onLoadEnd={e=>setVideoLoading(false)}
                />   
              </VideoContainer>    
            )
        }      
        <DetailContainer>
          <Detail>{props.courseData?.description}</Detail>
        </DetailContainer>          
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
        <View style = {{height: 20}} />
      </Container>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isLoading: state.courses.isLoading,
    courseData: state.courses.courseData,
    markData: state.courses.markData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCourse: (hashedId, token) => dispatch(GetCourseAction(hashedId, token)),
    sendMarkCourse: (hashedId, token) => dispatch(SendMarkCourseAction(hashedId, token))
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
  margin-top: 50px;  
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
const Title = styled (Text)`
  font-size: 20px;    
  font-weight: 500;
  padding-left: 15px;
`
const TitleContainer = styled (View)`
  width: 90%;
  height: 40px;
  margin-top: 30px;  
  border-bottom-width: 1px;
  border-color: gray;
`
const VideoContainer = styled (View)`
  width: 90%;
  height: 300px;
  border-width: 1px;
  margin-top: 25px;
`
const CourseTitle = styled (Text)`
  color: #15892E;
  font-size: 30px;
  margin-top: 15px;
  text-align: center;
  font-weight: 400;
`
const DetailContainer = styled (View)`
  width: 90%;
  margin-top: 25px;
`
const Detail = styled (Text)`
  font-size: 20px;
  padding-left: 10px;
`