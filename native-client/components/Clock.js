import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native'

const Clock = props => {
    const [date, setDate] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [start, setStart] = useState(new Date())

    useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };

    });
    function tick() {
        const time = (new Date() - start);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        setDate({ hours, minutes, seconds });
    }

    return (
        <View>
            <Text style={styles.container}>
                <Text style={styles.title}>{date.hours}</Text> <Text style={styles.small}>h{' '}</Text>
                <Text style={styles.title}>{date.minutes}</Text> <Text style={styles.small}>m {' '}</Text>
                <Text style={styles.title}>{date.seconds}</Text> <Text style={styles.small}>s {' '}</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        color: "white",
        marginTop: "5%",
        marginBottom: "3%"
    },
    title: {
        fontSize: 60,
    },
    small: {
        fontSize: 20,
    }
})


export default Clock