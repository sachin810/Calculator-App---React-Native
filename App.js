/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,Button, TouchableOpacity} from 'react-native';



export default class App extends Component {
  constructor(){
    super();
      this._onPressButton=this._onPressButton.bind(this);
    this.state = {
        title : '',
        result : ''
    };
  }
    CalculateResult(){
      let _r = this.state.title.split('');
      let last = _r.slice(-1);
      if((last == '/' ) || (last == '*')||(last == '-') || (last == '+')){
          this.setState({
              title: this.state.title
          })
      }else {
          this.setState({
              result: eval(this.state.title)
          })
      }




    }
    _onPressButton(text){
      // console.log(text)
        if (text == '='){
            return this.CalculateResult()
        }
        this.setState({
            title: this.state.title+text
        })
    }
    _operationClick(sybms){
      // console.log(sybms);
        switch (sybms) {
            case 'Del':
                let title = this.state.title.split('');
                title.pop();
                this.setState({
                    title: title.join('')
                });
                break;
            case '/':
            case '+':
            case '-':
            case '*':
                if(this.state.title.length==0){
                    this.setState({
                        title: this.state.title
                    })
                }else {
                    let elems = this.state.title.split('');
                    let lastIndex = elems.slice(-1);
                    // console.log(elems);
                    // console.log(lastIndex);
                    if ((lastIndex == '/')||(lastIndex == '*')||(lastIndex == '-')||(lastIndex == '+')){
                        elems.pop();
                        elems.push(sybms);
                        this.setState({
                            title: elems.join('')
                        })
                    }else {
                        this.setState({
                            title: this.state.title+sybms
                        });
                    };
                }
        }
    }
  render() {

      let elemns = []
      let nums = [[1,2,3],[4,5,6],[7,8,9],['.',0,'=']];
      for (let i=0;i<4;i++){
          let row= []
        for (let j=0;j<3;j++){
            row.push(<TouchableOpacity key={nums[i][j]} onPress={()=>this._onPressButton(nums[i][j])}>
                <View style={{backgroundColor: 'grey',flex: 1,}}>
                    <Text style={styles.buttonText}>{nums[i][j]}</Text>
                </View>
            </TouchableOpacity>)
        }
          elemns.push(<View key={i} style={styles.num1}>{row}</View>)
      };
      let sybms =['Del','/','*','-','+'];
      let _new = [];
      for (let i=0;i<sybms.length;i++){
          _new.push(<TouchableOpacity key={sybms[i]} onPress={()=>this._operationClick(sybms[i])}>
              <View style={styles.button}>
                  <Text style={styles.buttonText}>{sybms[i]}</Text>
              </View>
          </TouchableOpacity>)
      }
    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <Text style={styles.inputText}>{this.state.title}</Text>
            </View>
            <View style={styles.results}>
                <Text style={styles.inputText}>{this.state.result}</Text>
            </View>
            <View style={styles.buttons}>
                <View style={styles.numbers}>
                    {elemns}

                    {/* for demonstration */}
                        {/*<View style={styles.num1}>*/}
                            {/*<TouchableOpacity onPress={()=>this._onPressButton(nums[i][j])}>*/}
                                {/*<View style={{backgroundColor: 'grey'}}>*/}
                                    {/*<Text style={styles.buttonText}>.</Text>*/}
                                {/*</View>*/}
                            {/*</TouchableOpacity>*/}
                            {/*<TouchableOpacity onPress={()=>this._onPressButton(nums[i][j])}>*/}
                                {/*<View style={{backgroundColor: 'grey'}}>*/}
                                    {/*<Text style={styles.buttonText}>0</Text>*/}
                                {/*</View>*/}
                            {/*</TouchableOpacity>*/}
                            {/*<TouchableOpacity onPress={()=>this._onPressButton(nums[i][j])}>*/}
                                {/*<View style={{backgroundColor: 'grey'}}>*/}
                                    {/*<Text style={styles.buttonText}>=</Text>*/}
                                {/*</View>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                    {/*end demonstration*/}
                </View>
                <View style={styles.symbols}>
                    {_new}
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
container:{
  flex:1,
},
inputs:{
  flex:2,
  backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'


},
results:{
  flex:1,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'flex-end'

},
buttons:{
    flex: 3,
    flexDirection: 'row'
},
numbers: {
    flex:4,
    backgroundColor: 'grey',

},
symbols:{flex:1, backgroundColor: 'skyblue'},
num1:{flex:1,backgroundColor: 'grey',flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'},
    button: {
        // marginBottom: 30,
        // width: 260,
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    buttonText: {
        padding: 20,
        color: 'white',
        fontSize: 20
    },
    inputText: {
    fontSize: 50,
    color: 'black',
    }
});
