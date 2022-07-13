# React Native

[React Native 中文网](https://www.react-native.cn/)

## RN 解决的问题
特点是一次学习，随处编写。支持WEB、 Android 和 iOS 的原生应用。

## RN 开发需要注意的地方

### 常用的原生组件
**View**.    
和 div 大致是一样的，展示页面的主要组件，支持嵌套。但是不支持点击，可以使用 TouchableOpacity 组件包一下。

**TouchableOpacity**
可以触发点击事件的组件：
``` js
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  onPress = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  render() {
    const { count } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.countContainer}>
          <Text>Count: {count}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text>Press Here</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});

export default App;
```

**Text**
可以包含文本的组件

**Image**
可以展示图片的元素


## 布局
最好使用flex+百分比布局。
