import React from 'react'
import {
  View, 
  Text, 
  Linking, 
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Menu from 'src/components/Menu'
import styled from 'styled-components/native'

const Resources = () => {
  return (
    <ScrollView>
      <Container>
        <Menu title="Resources" back={true} />
        <Title>Useful Links</Title>
        <Description>Tap on any link below to get started</Description>
        <LinkButton onPress={()=>Linking.openURL('https://app.gusto.com/login')}>
          <ButtonTitle>Payroll - Gusto</ButtonTitle>
        </LinkButton>
        <LinkButton onPress={()=>Linking.openURL('https://app.tinamaids.com/login')}>
          <ButtonTitle>Tina Maids SOP</ButtonTitle>
        </LinkButton>        
        <LinkButton onPress={()=>Linking.openURL('https://tinamaids.com/locations')}>
          <ButtonTitle>Contact Local Branch</ButtonTitle>
        </LinkButton>
        {/* <LinkButton onPress={()=>Linking.openURL('https://tinamaids.com/locations')}>
          <ButtonTitle>Contact Corporate</ButtonTitle>
        </LinkButton> */}
      </Container>
    </ScrollView>
  )
}

export default Resources

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
  padding-left: 40px;
`

