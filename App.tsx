import React from 'react';
// Native components
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
// Context
import {ThemeProvider} from './src/contexts';
//Navigation
import {Navigation} from './src/navigations/Navigation';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <ThemeProvider>
        <StatusBar
          barStyle={'dark-content'}
          translucent
          backgroundColor="transparent"
        />
        <Navigation />
      </ThemeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;