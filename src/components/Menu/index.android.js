import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { navigate } from 'src/utils/navigation';
import Icon from 'react-native-vector-icons/AntDesign'

const Header = (props) => {  

  const onPressNotification = () => {
    navigate('MyNotificationScreen');
  }
  return (
    <Container>       
      {
        props.back? 
        <BackButton onPress={()=>navigate('Dashboard')}>
          <Icon name="doubleleft" size={25} color="white" />
        </BackButton>: <View />
      }  
      { props.title && <Title>{props.title}</Title> }
      { props.message ? 
        <TouchableOpacity onPress={()=>onPressNotification()}>
          <Image 
            source={require('src/assets/img/dashboard/bell-alert.png')} 
            style={{width: 30, height: 30}} />
          </TouchableOpacity>:
        <View />       
      }
    </Container>
  );
};

export default Header;

const Container = styled(View)`
  width: 100%;
  height: 50px;
  background-color: #15892E;
  justify-content: space-between;
  flex-direction: row;
  padding-horizontal: 20px;
  align-items: center;
`;
const Title = styled(Text)`
  color: black;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;
const BackButton = styled (TouchableOpacity)`
  margin-bottom: 5px;
`