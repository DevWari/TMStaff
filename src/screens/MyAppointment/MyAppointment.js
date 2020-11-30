import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { navigate } from 'src/utils/navigation';
import Menu from '../../components/Menu';
import Theme from '../../theme/Theme';
import { getAllAppointmentsAction, getAllAppointmentsDateAction } from "src/store/Appointment/action";
import {connect} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';

class MyAppointment extends React.Component {
  state = {    
    description: "",
    datetime: new Date(),
    data: [],
  };

  componentDidMount () {       
    const { navigation } = this.props    
      if (!this.props.token) {
        navigate('LoginScreen')
        return
      }
      else {
        if (this.props.navigation.state?.params?.todayStatus == 0) this.props.getAllAppointments (this.props.token);
        else this.props.getAllAppointmentsDate({start_date: '2020-10-11'}, this.props.token)
      }
  }  

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data != this.props.data) {
      let newData = [];
      this.props.data?.forEach(item => {
        let temp = {
          id: item.id,
          hashed_id: item.hashed_id,
          view_no: item.id,
          service_status_id: item.service_status_id,
          date: item.service_date,
          time: item.service_time,
          desc: item.service_status?.name_customer ? item.service_status?.name_customer: item.st_name,
          service_status: item.service_status
        }
        newData.push(temp);
      });
      this.setState({ data: newData });
    }

    if ( prevProps.navigation.state?.params?.todayStatus != this.props.navigation.state?.params?.todayStatus ) {       
       if (this.props.navigation.state?.params?.todayStatus == 1) this.props.getAllAppointmentsDate({start_date: '2020-10-11'}, this.props.token)
       else this.props.getAllAppointments (this.props.token)
      // console.log ('status...', this.props.navigation.state?.params?.todayStatus)
    }
  } 

  onChangeDescription = (text) => {
    this.setState({description: text});
  }

  onChangeDateTime = (event, selectedDate) => {
      
    this.setState ( {
      datetime: event
    })
  }

  onPressedItem (item) {
    navigate("AppointmentOption", {hashed_id: item.hashed_id});
  }

  renerItem = (item, index) => {
    return (
      <View style={[styles.itemGroup, index % 2 != 0 ? { backgroundColor: 'white' } : {backgroundColor: '#f9f9f9'} ]}>
        <TouchableOpacity style={styles.itemOne} onPress={()=>this.onPressedItem(item)}>
          <Text style={[styles.textOne, {color: '#15892E'}]}>
            View Details({item.view_no})
          </Text>
        </TouchableOpacity>
        <View style={styles.itemOne}>
          <Text style={styles.textOne}>
            {item.date}
          </Text>
        </View>
        <View style={styles.itemOne}>
          <Text style={styles.textOne}>
            {item.time}
          </Text>
        </View>
        <View style={styles.itemOne}>
          <Text style={styles.textOne}>
            {item.desc}
          </Text>
        </View>
      </View>
    )
  }

  render() {

    const { data } = this.state;
    return (
      <View style={styles.container}>
        <Spinner 
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={{color:'#FFF'}}
        />
        <Menu title="My Schedule" message={false} back={true}/>
        <FlatList
          data={data}
          ListHeaderComponent={<View style={{height: 20}}></View>}
          renderItem={({item, index}) => this.renerItem(item, index)}
          keyExtractor={item => item.id}
          ListFooterComponent={<View style={{height: 20}}></View>}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isLoading: state.appointment.isLoading,
    status: state.appointment.status,
    data: state.appointment.appointments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {    
    getAllAppointments: (token) => dispatch(getAllAppointmentsAction(token)),
    getAllAppointmentsDate: (data,token) => dispatch(getAllAppointmentsDateAction(data,token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAppointment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  body: {
    paddingHorizontal: 20,
  },
  itemGroup: {
    flexDirection: "row",
    height: 120,
    justifyContent: "space-between",
  },
  itemOne: {
    flex: 1,
    borderLeftWidth: 0.3,
    borderBottomWidth: 0.3,
  },
  textOne: {
    padding: 5,
    color: Theme.black,
    fontSize: Theme.fontText,
  },
  title: {
    paddingLeft: 20,
    marginTop: 15,
    marginBottom: 10,
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
  },
  areatext: {
    paddingLeft: 20,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: Theme.fontText
  },
  btnWrapper: {
    marginTop: 50,
    alignSelf: "center",
    width: "70%",
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
  toptitle: {
    flex: 1,
    height: 50,
    backgroundColor: 'lightgrey',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.6,
  },
  toptitleGroup: {
    height: 50,
    flexDirection: "row",
    backgroundColor: 'lightgrey',
  },
  texttitle: {
    marginLeft: 20,
    color: Theme.black,
    fontSize: Theme.fontSubTitle,
  },
  text2: {
    marginLeft: 20,
    color: Theme.primary,
    fontSize: 24,
  }
});
