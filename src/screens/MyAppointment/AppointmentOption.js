import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Modal,
  Linking,
  Platform
} from "react-native";

import { navigate } from 'src/utils/navigation';
import Menu from '../../components/Menu';
import Theme from '../../theme/Theme';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ConfirmView from 'src/components/ConfirmView'
import {connect} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';
import moment from "moment"
import styled from 'styled-components/native'
import {getAppointmentDetailAction, SetJobBeginAction} from 'src/store/Appointment/action'
import Icon from 'react-native-vector-icons/Foundation'
import { TextInput } from "react-native-paper";

const serviceSize = [
  '',
  '600-900 SQ',
  '900-1200 SQ',
  '1200-1600 SQ',
  '1600-2000 SQ',
  '2000-2500 SQ',
  '2500-2900 SQ',
  '2900-3200 SQ',
  '3200-3500 SQ',
  '3500 SQ or more'
]
class AppointmentOption extends React.Component {
  state = {
    hashed_id: this.props.navigation.state?.params?.hashed_id,
    description: "",
    datetime: new Date(),
    date: new Date(),
    time: new Date(),
    show: false,
    showdate: false,
    showtime: false,
    isVisible: false,
    markers: [],
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    initialRegion: "",
    data: null,
  };

  watchID = null;

  componentDidMount () {
    if (!this.props.token) {
      navigate('LoginScreen')
      return
    }
    else {
      // this._getCurrentLocation();
      this.getAppointmentDetail();
    }
  }
  
  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  componentDidUpdate(prevProps, prevState) {    
    if (prevProps.navigation.state?.params?.hashed_id != this.props.navigation.state?.params?.hashed_id)      
      this.setState({ hashed_id: this.props.navigation.state?.params?.hashed_id })

    if (this.props.data?.data == undefined)
      return;

    if (prevProps.data?.data != this.props.data.data) {
      
      let item = this.props.data?.data;
      let datetime = item.service_date + " " + item.service_time;

      this.setState({
        data: item,
        datetime: new Date(datetime),
        date: new Date(item.service_date),
        time: new Date(item.service_time),
        show: false,
        showdate: false,
        showtime: false,        
      })
    }

    if (prevProps.jobStatusData != this.props.jobStatusData) {
      this.getAppointmentDetail();
    }
    
    if (prevProps.token != this.props.token && !this.props.token) navigate ("Auth")
  }

  getAppointmentDetail() {
    const { hashed_id } = this.state;
    if ( hashed_id == undefined)
      return;

    let data = {
      hashed_id, // "f7e0b956540676a129760a3eae309294" // appointment's hashed_id
    }
    this.props.getAppointmentDetail(data, this.props.token)
  }

  _getCurrentLocation = () => {
    var that = this;
      this.setState({loading: true})
      if(Platform.OS === 'ios'){
        this.callLocation(that);
      }else{
        async function requestLocationPermission() {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                'title': 'Location Access Required',
                'message': 'This App needs to Access your location'
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              that.callLocation(that);
            } else {
              console.log("Permission Denied");
            }
          } catch (err) {
            console.warn(err)
            that.setState({loading: false})
          }
        }
        requestLocationPermission();
      }   
  }

  callLocation(that) {
    let markers = [];
     Geolocation.getCurrentPosition(
        (position) => {
           const currentLongitude = Number(JSON.stringify(position.coords.longitude)).toFixed(10);
           const currentLatitude = Number(JSON.stringify(position.coords.latitude)).toFixed(10);
           
          let location = {
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
          }
          
          let newMarker = {
            latlng: location,
            title: "my location",
            description: "current position",
          }
          markers.push(newMarker);

          let initialRegion={
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }

          that.setState({ initialRegion, markers });
        },

        (error) => {
          that.setState({loading: false})
        },
        { enableHighAccuracy: false}
     );
  }  

  onOK = () => {
    this.setState ({isVisible: false})   
    let data = {
      id: this.state.hashed_id,
      job_status_id: Number(this.state.data.service_status_id) + 1,
      worker_comment: ''
    } 
    this.props.setJobBeginAction(data, this.props.token)
    navigate ('JobResult')
  }  

  onCancel = () => {
    this.setState ({isVisible: false})
  }

  openGoogleMap = () => {    
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${this.state.initialRegion?.longitude},${this.state.initialRegion?.latitude}`;
    Linking.openURL(url);   
  }

  renderJobStatus = () => {

    if (this.state.data?.service_status_id == 2) 
      return (
        <ClockButton onPress={()=>this.setState ({isVisible: true})}>
            <ButtonTitle>Begin Job</ButtonTitle>
        </ClockButton>
      )
    else if (this.state.data?.service_status_id == 3) 
      return (
        <ClockButton onPress={()=>this.setState ({isVisible: true})}>
          <ButtonTitle>Complete Job</ButtonTitle>
        </ClockButton>
      )     
    else
      return (
        <ClockView onPress={()=>this.setState ({isVisible: true})}>
          <ButtonTitle>This job is completed</ButtonTitle>
        </ClockView>
      ) 
  }

  render() {
    const { markers, data } = this.state;
    const estimate = data?.estimate;
    return (
      <View style={styles.container}>
        <ScrollView>
        <Spinner
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />        
        <Menu title="Job" message={false} back={true}/>        
        {this.state.data && this.renderJobStatus()}
        <View style={{marginTop: 30, alignItems: "center"}}>
          <Text style={styles.texttitle}>
            Job #{data?.id}
          </Text>
          <Text style={styles.text2}>
            Job Details
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.itemGroup}>
            <Text style={styles.title}>{estimate?.customer_name}</Text>
          </View>          
          <View style={styles.itemGroup}>
            <Text style={styles.title}>{estimate?.address}</Text>
          </View>
          <View style={styles.itemGroup}>
            <Text style={styles.title}>{moment(data?.service_date ).format('MMM Do YYYY')} at {data?.service_time}</Text>
          </View>
        </View>

        <JobContainer>
          <JobTitleContainer>            
            <Text style={{fontSize: 28}}>Job Details</Text>
          </JobTitleContainer>
          <JobItemContainer>            
            <JobItemTitle>{this.state.data?.st.service_type.name}</JobItemTitle>
          </JobItemContainer>
          <JobItemContainer>            
            <JobItemTitle>{this.state.data?.estimate.bedrooms} bedrooms</JobItemTitle>
          </JobItemContainer>
          <JobItemContainer>            
            <JobItemTitle>{this.state.data?.estimate.bathrooms} bathrooms</JobItemTitle>
          </JobItemContainer>
          <JobItemContainer>            
            <JobItemTitle>{serviceSize[this.state.data?.estimate.service_size_id]} home</JobItemTitle>
          </JobItemContainer>
          <RequestContainer>
            <JobItemTitle>Special Requests</JobItemTitle>
            <Input
              // placeholder = "Read only"
              value={this.state.data?.special_request}
              multiline={true}
              editable = {false}
              textAlignVertical = "top"              
            />
          </RequestContainer>
          <RequestContainer>
            <JobItemTitle>Internal Notes</JobItemTitle>
            <Input
              // placeholder = "Read only"
              multiline={true}
              editable = {false}
              textAlignVertical = "top"
              value={this.state.data?.internal_notes}            
            />
          </RequestContainer>
        </JobContainer>        
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isVisible}        
        >
          <ModalContainer
            activeOpacity={1}  
            onPressOut={()=>this.setState({isVisible: false})}          
          >
            <ConfirmView 
              onOK = {this.onOK}
              onCancel = {this.onCancel}
              clockStatus={this.state.data?.service_status_id}
            />
          </ModalContainer>   
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isLoading: state.appointment.isLoading,
    status: state.appointment.status,
    data: state.appointment.appointment,
    jobStatusData: state.appointment.jobStatusData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAppointmentDetail: (data, token) => dispatch(getAppointmentDetailAction(data,token)),   
    setJobBeginAction: (data, token) => dispatch(SetJobBeginAction(data,token)),      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentOption);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  body: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  itemGroup: {
    borderBottomColor: Theme.black,
    opacity: 1.0,
    borderBottomWidth: 0.6,
  },
  title: {
    paddingLeft: 40,
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 10,
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
  },
  btnWrapper: {
    position: "relative",
    marginBottom: 30,
    marginTop: -10,
    alignSelf: "center",
    width: "100%",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Theme.black,
    backgroundColor: Theme.primaryDark,
  },  
  btn: {
    color: Theme.white,
    fontSize: Theme.fontSubTitle,
    paddingHorizontal: 12,
    paddingVertical: 12,
    textAlign: "center"
  },
  toptitleGroup: {
    height: 50,
    flexDirection: "row",
    backgroundColor: 'lightgrey',
  },
  toptitle: {
    flex: 1,
    height: 50,
    backgroundColor: 'lightgrey',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.6,
  },
  texttitle: {
    marginLeft: 20,
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
  },
  text2: {
    marginLeft: 20,
    color: Theme.primary,
    fontSize: 28,
    textAlign: "center",
  },
  mapGroup: {
    marginTop: 20,
    height: 300,
    backgroundColor: 'lightgrey',
    justifyContent: "center",
    alignItems: "center",
  },  
  map: {
    width: "100%",
    height: "100%"
  },
});


const ClockButton = styled (TouchableOpacity)`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: red;
  margin-top: 2px;
`
const ClockView = styled (View)`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: red;
  margin-top: 2px;
`
const ButtonTitle = styled (Text)`
  font-size: 20px;
  color: white;  
`

const ModalContainer = styled (TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`
const JobContainer = styled (View)`
  padding-horizontal: 20px;
  align-items: center;
  margin-top: 30px;
`
const JobTitleContainer = styled (View)`
  width: 100%;
  padding-vertical: 10px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
  align-items: center;
`
const JobItemContainer = styled (View)`
  width: 100%;
  padding-vertical: 10px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`
const JobItemTitle = styled(Text)`
  font-size: 20px;
  padding-left: 40px;
`
const RequestContainer = styled (View)`
  width: 100%;
  padding-vertical: 10px;  
`
const Input = styled (TextInput)`
  width: 80%;
  height: 90px;
  border-width: 1px;
  border-radius: 5px;
  border-color: gray;
  background-color: white;
  margin-left: 20px;
  margin-top: 10px;
  text-align-vertical: top;  
`
const GoogleMapButton = styled (TouchableOpacity)`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;  
  z-index: 1;
`