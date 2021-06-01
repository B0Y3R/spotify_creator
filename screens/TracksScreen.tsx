import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { refreshTokens } from '../helpers/refreshTokens';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useTheme } from '@react-navigation/native';

import getValidSPObj from '../helpers/getValidSPObj';

export default function TracksScreen(props) {
    const { route: { params: { playlistId } } } = props;

    const { colors } = useTheme(); 
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        async function getPlaylistById(playlistId: String) {
     
            try {
                const sp = await getValidSPObj();

                await sp.getPlaylist(playlistId)
                    .then((data) => {
                        return data.tracks.items.map(i => i.track.id))
                    })
                    .then((data) => {
                        console.log(data);
                    })

        
  
            
            } catch (error) {
                console.error(error)
            }
        }


        getPlaylistById(playlistId);

    },[playlistId]);


    console.log(tracks.length);


    if (!tracks.length) {
        return <ActivityIndicator />
    }

    return (
        <ScrollView style={{ backgroundColor: colors.background, width: '100%' }}>
            {
                tracks.map(t => (
                    <View style={{width: '100%', backgroundColor: colors.background, padding: 15,}}>
                        <Text>{t.name}</Text>
                    </View>
                ))
            }
        </ScrollView>
    );
}