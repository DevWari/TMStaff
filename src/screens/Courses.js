import React, {useState, useEffect} from 'react'
import {
  View, 
  Text, 
  Linking, 
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Menu from 'src/components/Menu'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import {GetAllCoursesAction} from 'src/store/Courses/action'
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation, useNavigationParam, useFocusEffect } from 'react-navigation-hooks'
import {navigate} from 'src/utils/navigation'

const Courses = (props) => {

  const { navigate } = useNavigation()

  useEffect (()=> {
    props.getAllCourses (props.token)
  }, [])

  useEffect (()=> {
    console.log ("courses...", props.data)
  }, [props.data])
  
  return (    
    <ScrollView>
      <Container>
        <Spinner 
          visible={props.isLoading}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />  
        <Menu title="Courses" back={true} />
        <Title>Learning Center</Title>
        <Description>Choose a course below to get started</Description>        
        {
          props.data && props.data.map (item => 
            <LinkButton 
              key={item.id}
              onPress={()=>navigate('CourseDetail', {item: item})}
            >
              <ButtonTitle>({item.id})  {item.name}</ButtonTitle>
            </LinkButton> )          
        }
      </Container>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isLoading: state.courses.isLoading,
    data: state.courses.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCourses: (token) => dispatch(GetAllCoursesAction(token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Courses);


const Container = styled (View)`
  flex: 1;
  align-items: center;
`
const Title = styled (Text)`
  color: #15892E;
  font-size: 30px;
  margin-top: 15px;
  text-align: center;
  font-weight: 400;
`
const Description = styled (Text)`
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 50px;
  font-weight: 500;
`
const LinkButton = styled(TouchableOpacity)`
  width: 90%;
  height: 40px;
  border-bottom-width: 1px;
  border-color: gray;
  margin-top: 30px;  
`
const ButtonTitle = styled(Text)`
  font-size: 20px;
  font-weight: 500;
  padding-bottom: 10px;
  padding-left: 10px;
`

