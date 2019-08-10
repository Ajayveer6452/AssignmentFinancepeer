import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
} from 'react-native';

//import firebase database 
import { db } from './src/config';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            female: 0,
            male: 0
        }
        this.listenFirebaseDB = this.listenFirebaseDB.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        var email = "test_test.com";
        var fname = "Test";
        var lname = "Test";
        var gender = "Male";

        this.listenFirebaseDB();
    }

    //fetch the data from firebase database
    listenFirebaseDB() {
        var usersRef = db.ref('Users/')
        usersRef.once('value', this.updateState);
    }

    //update state for male and female user count
    updateState(snapshot) {
        snapshot.forEach((childObject) => {
            var stringify = JSON.stringify(childObject);
            var user = JSON.parse(stringify);
            console.log("snapshot: " + JSON.stringify(user));
            switch (user.gender) {
                case "Male":
                    this.setState({
                        male: this.state.male + 1
                    })
                    break;
                case "Female":
                    this.setState({
                        female: this.state.female + 1
                    })
                    break;
            }
        })

    }
    //render view
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>MALE: <Text style={styles.maleValue}>{this.state.male}</Text></Text>
                <Text style={styles.header}>FEMALE: <Text style={styles.femaleValue}>{this.state.female}</Text></Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        margin: 16
    },
    maleValue: {
        color: 'green',
        fontWeight: '900',
    },
    femaleValue: {
        color: 'orange',
        fontWeight: '900',
    }
})