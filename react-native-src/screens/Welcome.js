import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, LayoutElement, Text } from '@ui-kitten/components';

export default  Welcome = (props) => (
  <Layout style={styles.container}>
    <Text style={styles.text} category='h1'>
      Welcome to React Navigation 5 Guide
    </Text>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
