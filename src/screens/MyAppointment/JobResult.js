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

const JobResult = (props) => {
  return (
    <ScrollView>
      <Container>                 
        <Menu title="Job" back={true} />        
        {props.clockStatus == 2 ? 
           <Title>Job Sucessfully Started</Title> : 
           <CompletedContainer>
             <CompletedTitle>Job Completed!</CompletedTitle > 
           </CompletedContainer>
           
        }        
        {props.clockStatus == 2 ?
          <Content>You have sucessfully started this job.</Content>:
          <View>
            <Content>This job is now completed. Make sure your client is happy and the final workthrough is approved.</Content>            
          </View>            
        }
        {props.clockStatus == 1?
          <Button onPress={()=>navigate ('AppointmentOption')}>
            <ButtonTitle>Back To Job Detail</ButtonTitle>
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
      clockStatus: state.appointment.clockStatus
    };
};  

export default connect(mapStateToProps, null)(JobResult);

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
const CompletedContainer = styled (View)`
  width: 100%;
  height: 50px;
  background-color: red;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
`
const CompletedTitle = styled (Text)`
  color: white;
  font-size: 20px;
`