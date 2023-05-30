import React from "react";
import { useState } from "react";

import { StyleSheet, View, Text, Pressable } from "react-native";
import * as MailComposer from 'expo-mail-composer';

import { TextInput } from "@react-native-material/core"
import { MaterialIcons } from "@expo/vector-icons";


const Form = () => {
  //fields are: Name, Mobile Number, Email, and message
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [toShowResult, setToShowResult] = useState('Send a Mail!');

  //using device app for sending email
  const handleSubmitUsingDeviceApp = () => {
    const body = `
          Name: ${name}
          Email: ${email}
          Phone: ${phoneNumber}
          Message: ${message}
        `;
    // to: "info@redpositive.in",
    MailComposer.composeAsync({
      subject: 'Internship Assignment: Sending E-mail using device app, library:{expo-mail-composer}',
      body,
      recipients: ['info@redpositive.in'], // Specify the recipient email address here
    });
  }

  //using sendGrid Api
  //message while logging on to sendgrid: You are not authorized to access SendGrid, please contact Support.

  //using nodeMailer
  const handleSubmissionWithNodeMailer = async () => {
    try {
      //url is using ip address for android {not on same device, so have to use ip address instead of localhost}
      const response = await fetch('http://192.168.235.41:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phoneNumber, message }),
      });

      if (response.ok) {
        // Handle successful submission
        console.log('Message sent successfully!');
        setToShowResult('Message sent successfully!');
      } else {
        // Handle error
        console.log('Message sending failed.');
        setToShowResult('Message sending failed.');
      }
    } catch (error) {
      console.log('Error:', error);
      setToShowResult(`error in sending mail + ${error}`)
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>{toShowResult}</Text>
      <TextInput
        style={styles.textinput}
        label="Full Name"
        value={name}
        leading={props => <MaterialIcons name="account-circle" {...props} />}
        onChangeText={setName} />
      <TextInput
        style={styles.textinput}
        label="Phone Number"
        value={phoneNumber}
        leading={props => <MaterialIcons name="call" {...props} />}
        onChangeText={setPhoneNumber} />
      <TextInput
        style={styles.textinput}
        label="Email Address"
        value={email}
        leading={props => <MaterialIcons name="email" {...props} />}
        onChangeText={setEmail} />
      <TextInput
        multiline
        style={styles.textinput}
        label="Message"
        leading={props => <MaterialIcons name="message" {...props} />}
        value={message}
        onChangeText={setMessage} />
      {/* use this function handleSubmitUsingDeviceApp for sending mail through app */}
      <Pressable
        style={styles.submitBtn}
        onPress={handleSubmitUsingDeviceApp}>
        <Text style={styles.textstyle}>Submit</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83829A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    backgroundColor: '#fff',
    width: "80%",
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    fontSize: 24,
    padding: 5,
    margin: 10,
  },
  submitBtn: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: "50%",
    borderWidth: 2,
    padding: 5,
    margin: 20,
    borderColor: 'blue',
    borderRadius: 10,
  },
  textstyle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 5,
    color: '#312651',
  }

});

export default Form;
