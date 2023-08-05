import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import * as AddCalenderEvent from 'react-native-add-calendar-event';
import moment from 'moment';

const EVENT_TITLE = 'Lunch';
const TIME_NOW_IN_UTC = moment.utc();

const utcDateToString = momentInUTC => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  return s;
};

const addToCalendar = (title, startDateUTC) => {
  const eventConfig = {
    title,
    startDate: utcDateToString(startDateUTC),
    endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),
  };

  AddCalenderEvent.presentEventCreatingDialog(eventConfig)
    .then(eventInfo => {
      alert('eventInfo' + JSON.stringify(eventInfo));
    })
    .catch(error => {
      alert('Error' + error);
    });
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Add Event in Google Calendar From React native App
      </Text>
      <Text style={styles.heading}>
        Event Title : {EVENT_TITLE}
        {'\n'}
        event Date Time : {moment.utc(TIME_NOW_IN_UTC).local().format('lll')}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addToCalendar(EVENT_TITLE, TIME_NOW_IN_UTC);
        }}>
        <Text style={styles.buttonText}>Add event to calendar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 23,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    margin: 20,
  },
  button: {
    backgroundColor: '#f5821f',
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default App;
