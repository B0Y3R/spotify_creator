import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { refreshTokens } from '../helpers/refreshTokens';
import getValidSPObj from '../helpers/getValidSPObj';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { color } from 'react-native-reanimated';
;

export default function TabOneScreen({ navigation  }) {

  const [accessTokenAvailable, setAccessTokenAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState(null);

  const { colors } = useTheme();

  const filtersArray = ['Playlists', 'Artists', 'Albums', 'Podcasts & Shows', 'Downloaded']





  useEffect(() => {

    async function getExpiration() {
      return AsyncStorage.getItem('expirationTime');
    }

    async function refresh() {
      await refreshTokens();
    }

    const tokenExpirationTime = getExpiration();

    if (!tokenExpirationTime || new Date().getTime() > Number(tokenExpirationTime)) {
      refresh()
    } else {
      setAccessTokenAvailable(true);
    }

  }, []);


  const getUserPlaylists = async () => {
    const sp = await getValidSPObj();

    setLoading(true);
    const { id: userId } = await sp.getMe();
    const { items: playlists } = await sp.getUserPlaylists(userId, { limit: 50 });
    setPlaylists(playlists);
    setLoading(false);
    return playlists;
  }


  if (loading) {
    return <ActivityIndicator />
  }

  if (playlists) {
    return (
      <ScrollView style={{ width: '100%' }}>
        <ScrollView horizontal={true} style={{width: '100%',  padding: 8, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          {
            filtersArray.map(f => (
              <View style={{borderWidth: 1, borderRadius: 30 , backgroundColor: colors.background, borderColor: colors.border, padding: 10, marginRight: 10, }}>
            <Text style={{ color: colors.text, fontWeight: 'bold' }}>{f}</Text>
          </View>
            ))
          }
        </ScrollView>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.background, padding: 5 }}>
          <View style={{width: '40%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.background}}>
            <Ionicons name="filter" size={24} color="white" />
            <Text style={{ color: colors.text, fontWeight: 'bold', paddingTop: 4,  }}>Recently Played</Text>
          </View>
          <Ionicons name="ios-grid-outline" size={24} color="white" />
        </View>
      {
        playlists.map(p => (
          <TouchableOpacity key={p.id} onPress={() => navigation.navigate('Tracks Screen', { playlistId: p.id })} style={{ backgroundColor: colors.background, paddingBottom: 10,  borderBottomWidth: 1, borderBottomColor: colors.border , display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <Image source={{uri: p?.images[0]?.url}} style={{height: 70, width: 70 }} />
            <View style={{backgroundColor: colors.background, flex: 1, padding: 15, }}>
              <Text style={{ color: colors.text, fontWeight: 'bold', }}>{p.name}</Text>
              <Text style={{ color: colors.text, opacity: 0.7 }}>{p.tracks.total} songs</Text>
            </View>
          </TouchableOpacity>
        ))
      }
    </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Button onPress={getUserPlaylists} title="fudge" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
