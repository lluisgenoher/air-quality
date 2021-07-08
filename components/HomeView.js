import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
  Easing,
  ImageBackground,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { AppLoading } from "expo";
import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_900Black,
} from "@expo-google-fonts/inter";

var { width, height } = Dimensions.get("window");

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fontsLoaded: false,
      stateAQI: "NO INFO",
      pollutant: "N/A",
      iaqiCO: "N/A",
      iaqiNO2: "N/A",
      iaqiO3: "N/A",
      iaqiPM10: "N/A",
      iaqiSO2: "N/A",
      pressure: "N/A",
      colorForBackground: "#87D994",
      error: null,
    };
  }

  componentDidMount() {
    return fetch(
      "https://api.waqi.info/feed/here/?token=58bdbc807081e1678e52719c359fa6a06cf7a530"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          aqi: responseJson.data.aqi,
          nameCity: responseJson.data.city.name
            .split(/[,]/)[0]
            .trim()
            .toUpperCase(),
          pollutant: responseJson.data.dominentpol.toUpperCase(),
          iaqiCO: responseJson.data.iaqi.co.v,
          iaqiNO2: responseJson.data.iaqi.no2.v,
          iaqiO3: responseJson.data.iaqi.o3.v,
          iaqiPM10: responseJson.data.iaqi.pm10.v,
          pressure: responseJson.data.iaqi.p.v,
          iaqiSO2: responseJson.data.iaqi.so2.v,
        });
        this.valuesAQI();
      })
      .catch((error) => {
        console.error({ error, isLoading: true });
      });

    let [fontsLoaded] = useFonts({
      Inter_200ExtraLight,
      Inter_300Light,
      Inter_900Black,
    });

    if (!fontsLoaded) {
      return <AppLoading />;
    }
  }

  valuesAQI() {
    if (this.state.aqi <= 50) {
      this.setState({
        stateAQI: "GOOD",
        colorForBackground: "#87D994",
      });
    } else if (this.state.aqi > 50 && this.state.aqi <= 100) {
      this.setState({
        stateAQI: "MODERATE",
        colorForBackground: "#F2994A",
      });
    } else if (this.state.aqi > 100 && this.state.aqi <= 150) {
      this.setState({
        stateAQI: "UNHEALTHY FOR \n SENSITIVE GROUPS",
        colorForBackground: "#FF7B40",
      });
    } else if (this.state.aqi > 150 && this.state.aqi <= 200) {
      this.setState({
        stateAQI: "UNHEALTHY",
        colorForBackground: "#B50518",
      });
    } else if (this.state.aqi > 200 && this.state.aqi <= 300) {
      this.setState({
        stateAQI: "VERY UNHEALTHY",
        colorForBackground: "#610661",
      });
    } else if (this.state.aqi > 300) {
      this.setState({
        stateAQI: "HAZARDOUS",
        colorForBackground: "#7E0023",
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/clouds.png")}
          style={[
            styles.top,
            { backgroundColor: this.state.colorForBackground },
          ]}
        >
          <Text style={styles.nameCity}>{this.state.nameCity}</Text>

          <View style={styles.contentTop}>
            <AnimatedCircularProgress
              size={210}
              width={8}
              fill={0}
              rotation={180}
              arcSweepAngle={
                this.state.aqi >= 300
                  ? 360
                  : this.state.aqi + (this.state.aqi * 20) / 100
              }
              tintColor="#fff"
              backgroundColor="#fff"
            ></AnimatedCircularProgress>

            <View style={styles.contentCircle}>
              <Text style={styles.aqi}>{this.state.aqi}</Text>
              <Text style={styles.lvlAQI}>{this.state.stateAQI}</Text>
            </View>
          </View>

          <View style={styles.footerTop}>
            <Text style={styles.pollutant}>
              Primary pollutant {this.state.pollutant}
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.bottom}>
          <View style={styles.bottomItem}>
            <View style={styles.bottomItemIner}>
              <Text style={styles.bottomItemName}>Pressure</Text>
              <Text style={styles.bottomItemInfo}>{this.state.pressure}</Text>
            </View>
          </View>

          <View style={styles.bottomItem}>
            <View style={styles.bottomItemIner}>
              <Text style={styles.bottomItemName}>PM10</Text>
              <Text style={styles.bottomItemName}>Particulate Matter</Text>
              <Text style={styles.bottomItemInfo}>{this.state.iaqiPM10}</Text>
            </View>
          </View>

          <View style={styles.bottomItem}>
            <View style={styles.bottomItemIner}>
              <Text style={styles.bottomItemName}>O3</Text>
              <Text style={styles.bottomItemName}>Ozone</Text>
              <Text style={styles.bottomItemInfo}>{this.state.iaqiO3}</Text>
            </View>
          </View>

          <View style={styles.bottomItem}>
            <View style={styles.bottomItemIner}>
              <Text style={styles.bottomItemName}>CO</Text>
              <Text style={styles.bottomItemName}>Carbon Monoxide</Text>
              <Text style={styles.bottomItemInfo}>{this.state.iaqiCO}</Text>
            </View>
          </View>

          <View style={styles.bottomItem}>
            <View style={styles.bottomItemIner}>
              <Text style={styles.bottomItemName}>NO2</Text>
              <Text style={styles.bottomItemName}>Nitrogen dioxideni</Text>
              <Text style={styles.bottomItemInfo}>{this.state.iaqiNO2}</Text>
            </View>
          </View>

          <View style={styles.bottomItem}>
            <View style={styles.bottomItemIner}>
              <Text style={styles.bottomItemName}>SO2</Text>
              <Text style={styles.bottomItemName}>Sulfur Dioxide</Text>
              <Text style={styles.bottomItemInfo}>{this.state.iaqiSO2}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  top: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  nameApp: {
    fontSize: 16,
    color: "white",
  },
  headerTop: {
    alignItems: "center",
    width: "100%",
    height: 20,
    position: "absolute",
    top: 5,
  },
  contentTop: {
    marginTop: 10,
    alignItems: "center",
    color: "white",
  },
  footerTop: {
    width: "100%",
    height: 20,
    position: "absolute",
    bottom: 0,
  },
  nameCity: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
  contentCircle: {
    position: "absolute",
    alignItems: "center",
    top: 30,
  },
  pollutant: {
    position: "absolute",
    right: 4,
    color: "white",
    fontSize: 12,
  },
  aqi: {
    color: "white",
    fontSize: 80,
  },
  lvlAQI: {
    color: "white",
    fontSize: 18,
    marginTop: -0,
    marginLeft: -5,
    textAlign: "center",
  },
  bottom: {
    marginTop: 40,
    height: "50%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bottomItem: {
    width: "40%",
    height: "30%",
    padding: 5,
    flexGrow: 1,
  },
  bottomItemIner: {
    justifyContent: "center",
    backgroundColor: "white",
  },
  bottomItemInfo: {
    alignSelf: "center",
    fontSize: 20,
  },
  bottomItemName: {
    textAlign: "center",
    fontSize: 15,
  },
});