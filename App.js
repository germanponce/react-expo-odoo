import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';


const Odoo = require('react-native-odoo');

const odoo = new Odoo({
  host: '192.168.1.74',
  port: 11569,
  database: 'SEKURA_V15',
  username: 'admin',
  password: 'admin'
});

// Connect to Odoo 
odoo.connect(function (err) {
  if (err) { return console.log(err); }
})


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [{name:'xxx'}]
    }
  }
  componentDidMount() {
    odoo.get('res.partner',{
      ids: [1,2,3,4,5,10],
      fields: [ 'name' ],
    },function(err,partners){
      console.log(partners);
      this.setState({
        partners: partners
      })
    }.bind(this))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
          Mi primer App de Odoo
        </Text>
        <FlatList
          data={this.state.partners}
          renderItem={({item}) => <Text>{item.id} {item.name}</Text>}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
