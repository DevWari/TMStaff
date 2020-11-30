import React from 'react'
import {
  View,
  Text,  
} from 'react-native'
import styled from 'styled-components/native'

const LoggedComponent = (props) => {
  return (
    <Container>
      <Content>Start: {props.start}</Content>
      <Content>End: {props.end}</Content>
      <Content>Total: {props.total}</Content>
    </Container>
  )
}

export default LoggedComponent

const Container = styled (View)`
  flex: 1;
  border-bottom-width: 1px;
  border-color: gray;  
  padding-bottom: 20px;
`
const Content = styled (Text)`
  font-size: 18px;
  padding-left: 20px;  
  margin-top: 15px;
`
