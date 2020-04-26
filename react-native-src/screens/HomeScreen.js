import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { HOST_URL } from '../utils/AppConst';
import RtspVideoPlayer from "../components/RtspVideoPlayer";
const WIDTH_SCREEN = Dimensions.get('window').width;
// const SAMPLE_DATA = {[]};
const THUMBNAILS = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAw1BMVEUG1aCD7NDqM1YA1J116csG2aIg2KiI7dMGvZUGmIW1q6X///9/8NN989XsKlLuI0/vHEzOfoKY077jZnsFM2KW18HxDEe+nZrFkJIGw5gFEFvNgYUFioAGtZIGyJoFW24FdHcFLGEGq40FF1wFN2MFMmIGo4oFkIKxsagGqIwFPGUFfHoFIl4Fl4UFbXWY6tBP3rTh+vK98uHx/Phc37ep7NbQ9urJiIvnOVr48fHpV3DzxMrneIn119ruq7TyzNHutr0DCiEMAAAC2ElEQVR4nO3d61LaQBiA4ciyAZoasIIK9oQFiiJKjFJoPfT+r6ogaFuySNgPgpH3+eOMOAbf2SxJFoPjAAAAAAAAAAAAAAAAANvO3fQTSDN16alNP4c0c3vkk6AeAGAFFK8nAqrH0YxA4HnBpp9Daqkrb+SK8WdHheN8IfnsqP44X0A+O6o3zndNPkvKvblxqWeP4z7gtVLMbQIq+OfAROvJ9xK0sT98NdzRkcnTEpH++Gncz80mKO3LU4HXnw4B/bn85TFfbicxubTnU8+XVPTXRv1Ek8+Ozn9rlJsO+ezok1bne6tKPktaF/LMffbIJ0I+EfKJkE+EfCLkEyGfCPlEyCdCPpFl8r2ffjH670fIZ4j34VGl/c6gXZk8GiPgVubbbWdKE0Wj6YOZ9i75DGOvcpCJ5aCyaPxtZb7DYrx8xUPyRe0exc13tGjvJR/5pmLnO/bj5fN/kM+Qb28m36Bo7unvkW9xPn9/+LNEPvt8nverZBiA5Iubz/NuowHJFz+fdxfZg8m3RD7Pu8/45LPPN9qDffLZ53sYMPqs8w33ZyY/8i2R7z5y8Ey+2PnuBtETYfLFzDe8NZ12kC9evt++8aSXfMZ8s1dc/DkXsPxj8hnycb3PhHwirHWIsNImssQ6r//SMu/TQq/POu+c8Zd74U0Gz28zyPEugwUZ54j9C7Y7nxj5yDdFPhHyiZBPhHwi5BMhnwj5RMgnwX+TS3AvAxHupCHDfVxEuIuQDPewkuEOangFdDWJrVR1EltJnHYKtdGOvG5OreC8wYD69KxZzyeg3jw7jfRL/3TYOW+Uu93CmnW75cZ5J7Lxfuo/YkBXL2rr33e1rl1EZz/3771AU0vrVhKbaeno1Key2dTvvU4yU7pxI+mf+4A3jfM1CZUNQz4GxF7IZ/hIkE9CXYcBn9Rgj5eO1SKmhNpJ/ZnuJqnwkvEnwFQIAAAAAAAAAAAAAACArfcHI9BmNv0JG/IAAAAASUVORK5CYII=';
const items = [
    { name: 'TURQUOISE', code: '#1abc9c', source: THUMBNAILS },
    { name: 'EMERALD', code: '#2ecc71', source: THUMBNAILS },
    { name: 'PETER RIVER', code: '#3498db', source: THUMBNAILS },
    { name: 'AMETHYST', code: '#9b59b6', source: THUMBNAILS },

];
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cameras: []
        }
    }

    async componentDidMount() {
        //call api get all data of this user
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1ZTk0NzFkNmNiZWI2MjUwNGYwM2JjMGIiLCJpYXQiOjE1ODc5MDA4MzEsImV4cCI6MTU4NzkwNDQzMX0.68HPgwjWacpAitI0zB6nrvxmLjJ0j_fFemnW_UFeJr4";
        const result = await fetch("http://206.189.34.187/camera/listcam", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())


            .catch(error => console.log('error', error));

        this.setState({
            cameras: result
        })
    }

    onPress = (camera) => () => {
        const { navigation } = this.props || {};
        navigation.navigate(
            'CameraDetails',
            { camera: camera }
        )
    }

    renderEmpty(){
        return (
            <View><Text>no camera</Text></View>
        )
    }

    render() {
        const { cameras } = this.state
        if(!Array.isArray(cameras) || cameras.length == 0 ) return this.renderEmpty();
        let numColumns = 2;
        return (
            <View style={styles.container}>
                <FlatList
                    style={{ flex: 1, width: WIDTH_SCREEN }}
                    data={cameras}
                    numColumns={numColumns}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity
                            style={{ flex: 1, paddingHorizontal: 6 }}
                            onPress={this.onPress(item)}
                        >
                            <Text>{item.rtspUrl}</Text>
                            <Image style={{ height: (WIDTH_SCREEN / 2 - 24) / 251 * 130, width: '100%', resizeMode: 'contain' }} source={{ uri: THUMBNAILS }} />
                        </TouchableOpacity>


                    )}
                />

            </View>
        );
    }
};

const styles = StyleSheet.create({
    gridView: {
        flex: 1,
    },
    container: {
        flex: 1,
        // alignItems:'center',
        backgroundColor: Colors.lighter,
        // padding:12,
        width: '100%'
    },
    body: {
        backgroundColor: Colors.white,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    }
});
