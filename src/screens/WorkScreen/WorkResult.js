import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView  
} from 'react-native'
import styled from 'styled-components/native'
import Menu from 'src/components/Menu'
import {navigate} from 'src/utils/navigation'
import {connect} from 'react-redux'

const WorkResult = (props) => {
  return (
    <ScrollView>
      <Container>                 
        <Menu title="Work Hours" back={true} />        
        {props.clockStatus == 1 ? 
           <Title>Sucessfully Clocked In</Title> : 
           <Title>Sucessfully Clocked Out</Title> 
        }        
        {props.clockStatus == 1 ?
          <Content>You have sucessfully clocked in. {'\n'}Have a great day at work!</Content>:
          <View>
            <Content>You have sucessfully clocked out. {'\n'}We appreciate your commitment. {'\n'}{'\n'}Enjoy the rest of your day!</Content>            
          </View>            
        }
        {props.clockStatus == 1?
          <Button onPress={()=>navigate ('WorkScreen')}>
            <ButtonTitle>View Working Hours</ButtonTitle>
          </Button>:
          <Button onPress={()=>navigate ('Dashboard')}>
            <ButtonTitle>Back To Dashboard</ButtonTitle>
          </Button>
        }       
      </Container>
    </ScrollView>
  )
}
const mapStateToProps = (state) => {
    return {
      token: state.auth.token,
      isLoading: state.work.isLoading,      
      data: state.work.data,
      clockStatus: state.work.clockStatus
    };
};  

export default connect(mapStateToProps, null)(WorkResult);

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
