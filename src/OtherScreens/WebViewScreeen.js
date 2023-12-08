import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WebView } from "react-native-webview"
import { useNavigation, useRoute } from '@react-navigation/native'
import ActivityLoader from '../OtherScreens/ActivityLoader'

const WebViewScreen = () => {
  const route = useRoute()
  const token = route.params.token
console.log(token)

  return (
    <>
      <WebView source={{ uri: `https://posstaging.insurancedekho.com/ott-pos/login?one-time-token=${token}` }}
        style={{ flex: 1 }} />
    </>
  );
}

export default WebViewScreen;
