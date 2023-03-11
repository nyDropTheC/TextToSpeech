import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import * as Speech from 'expo-speech';

export default function App() {
	const [ stringToSpeak, setString ] = React.useState ( '' );

	return (
		<View style={styles.container}>
			<TextInput style={
				{ 
					fontSize: 18,
					width: '50%',
					borderColor: 'black', 
					borderWidth: 2,
					margin: 2
				}
				}
				placeholder='Text'
				value={ stringToSpeak }
				onChangeText={ text => setString ( text ) }	
			/>
			<Button title='Speak' onPress={
				async ( ) => {
					let voiceEnglish = '';

					for ( let voice of await Speech.getAvailableVoicesAsync ( ) ) {
						if ( voice.language === 'en-GB' && voice.quality === 'Enhanced' ) {
							voiceEnglish = voice.identifier;
						}
					}

					Speech.speak ( stringToSpeak, { voice: voiceEnglish } );
				}
			}/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
