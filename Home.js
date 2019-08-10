import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ActivityIndicator
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
        this.displayValue = this.displayValue.bind(this);
    }

    componentDidMount() {
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


    //show loader till the values are getting fetched from firebase
    displayValue(type) {
        console.log("eval: "+eval("this.state."+type))
        if (eval("this.state." + type) != 0) {
            return <Text style={styles.maleValue}>{eval("this.state."+type)}</Text>
        } else {
            return <ActivityIndicator size="small" color="green" />
        }
    }
    //render view
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.maleHeader}>MALE:</Text>
                   {this.displayValue("male")}
                </View>
                <View style={styles.header}>
                    <Text style={styles.femaleHeader}>FEMALE:</Text>
                    {this.displayValue("female")}
                </View>

            </SafeAreaView>
        )
    }
}

//common style sheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    maleHeader: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'black',
        margin: 16
    },
    femaleHeader: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'red',
        margin: 16
    },
    maleValue: {
        color: 'green',
        fontWeight: '900',
        fontSize: 18,
        margin: 16
    },
    femaleValue: {
        color: 'green',
        fontWeight: '900',
        fontSize: 18,
        margin: 16
    }
})