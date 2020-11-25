import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native'
import styled from 'styled-components/native'
import { Colors } from 'src/theme';
import { navigate } from 'src/utils/navigation';

const Content = (props) => {
  return (
    <Container>
      <TabBarContainer>
        <TabButton style={{backgroundColor: 'red'}} onPress={()=>navigate('WorkScreen')}>
          <TabBarTitle>Clock in/out</TabBarTitle>
        </TabButton>
        <TabButton style={{backgroundColor: '#15892E'}} onPress={()=>navigate('MyAppointment', {todayStatus: 1})}>
          <TabBarTitle>Today's Jobs</TabBarTitle>
        </TabButton>
      </TabBarContainer>
      <Row>
        <StyleButton onPress={()=>navigate('MyAppointment')}>
            <Image source={require('src/assets/img/dashboard/dash2.png')} />
            <Title>My Schedule</Title>
        </StyleButton>
        <StyleButton onPress = {()=>Linking.openURL('https://app.tinamaids.com/courses-list')}>
            <Image source={require('src/assets/img/dashboard/dash4.png')} />
            <Title>Courses</Title>
        </StyleButton>
      </Row>
      <Row>
        <StyleButton onPress={() => navigate('MyMessageScreen')} bgColor={Colors.textColor}>
            <Image source={require('src/assets/img/dashboard/dash3.png')} />
            <Title>Messages</Title>
        </StyleButton>
        <StyleButton onPress={() => navigate('Forums')}>
            <Image source={require('src/assets/img/dashboard/dash5.png')} />
             <Title>Resources</Title>
        </StyleButton>
      </Row>
      

    </Container>
  )
}

export default Content

const Container = styled(View)`
  width: 100%;
  height: 480px;
  align-items: center;  
`
const StyleButton = styled(TouchableOpacity)`
  shadow-color: #000;
  shadow-opacity: 0.8;
  shadow-radius: 3.87px;
  shadow-offset: 0 2px;
  elevation: 5;
  width: 47%;
  height: 170px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 10px;
  align-items: center;
  margin-bottom: 30px;
  background-color : #fff 
`
//background color must be set
const Row = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 20px; 
  margin-top: 10px;
`
const Title = styled(Text)`
  font-size: 15px;
  margin-top: 15px;
`
const TabBarContainer = styled (View)`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
`
const TabButton = styled(TouchableOpacity)`
  width: 48.5%;  
  justify-content: center;
  align-items: center;
`
const TabBarTitle = styled(Text)`
  color:  white;
  font-size: 18px;
`