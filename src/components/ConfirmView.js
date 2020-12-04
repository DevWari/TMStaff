import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import styled from 'styled-components/native'

const ConfirmView = (props) => {
  return (
     <Container activeOpacity={1}>
        <Title>ARE YOU SURE?</Title>
        {
          props.clockStatus == 0? 
          <Content>
            Make sure you are at the {'\n'}job site and ready to {'\n'}start the work
          </Content>:
          <Content>
            Make sure your work {'\n'}is completed up to {'\n'}SOP standards? {'\n'}Did you do a "Workthrough" {'\n'} with the client?
          </Content>
        }        
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

export default ConfirmView


const Container = styled (TouchableOpacity)`
  width: 90%;
  
  background-color: #15892E;  
  justify-content: space-between;
  align-items: center;
`
const Title = styled (Text)`
  font-size: 30px;
  color: white;
  margin-top: 50px;
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
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 30px;
`


