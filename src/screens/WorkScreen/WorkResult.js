import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView  
} from 'react-native'
import styled from 'styled-components/native'
import Menu from 'src/components/Menu'
import {navigate} from 'src/utils/navigation'

const WorkResult = () => {
  return (
    <ScrollView>
      <Container>
        <Menu title="Work Hours" back={true} />        
        <Title>Sucessfully Clocked In</Title>                
        <Content>You have sucessfully clocked in. {'\n'}Have a great day at work!</Content>
        <Button onPress={()=>navigate ('WorkScreen')}>
          <ButtonTitle>View Working Hours</ButtonTitle>
        </Button>
      </Container>
    </ScrollView>
  )
}

export default WorkResult

const Container = styled (View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Content = styled (Text)`
  font-size: 20px;
  text-align: center;
  margin-top: 30px;
`
const Title = styled (Text)`
  font-size: 27px;
  color: #15892E;
  margin-top: 15px;
  text-align: center;  
  margin-top: 30px;
`
const ButtonTitle = styled (Text)`
  font-size: 20px;
  color: white;  
`
const Button = styled (TouchableOpacity)`
  width: 250px;
  height: 50px;
  background-color: red;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`
