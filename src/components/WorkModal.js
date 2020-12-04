import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import styled from 'styled-components/native'

const WorkModal = (props) => {
  return (
    <Container activeOpacity={1}>  
      <View style={{height: 200, justifyContent: 'center', paddingHorizontal: 25}}>
      {
        props.clockStatus == 0? 
        <Content>
          Ready to clock in and start your work day?
        </Content>:
        <Content>
          Ready to end your work shift?
        </Content>
      }     
      </View>         
      <ButtonContainer>
        <Button style={{marginLeft: 20}} onPress={props.onOK}>
          <ButtonTitle>Yes</ButtonTitle>
        </Button>
        <Button style={{marginRight: 20}} onPress={props.onCancel}>
          <ButtonTitle>Cancel</ButtonTitle>
        </Button>
      </ButtonContainer>
    </Container>
  )
}

export default WorkModal


const Container = styled (TouchableOpacity)`
  width: 90%;
  height: 300px;
  background-color: #15892E;    
  align-items: center;
`
const Content = styled (Text)`
  font-size: 25px;
  text-align: center;
  color: white;
  margin-top: 25px; 

`
const Button = styled (TouchableOpacity)`
  width: 100px;
  height: 40px;
  background-color: red;
  justify-content: center;
  align-items: center;
`
const ButtonTitle = styled (Text)`
  font-size: 20px;
  color: white;
  text-align: center;
`
const ButtonContainer = styled (View)`
  width: 100%;
  flex: 1;  
  flex-direction: row;
  justify-content: space-between;  
  align-items: center;
`


