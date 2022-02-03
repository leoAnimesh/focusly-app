import { useTheme } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  useColorScheme,
  Button,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import { SIZES } from "../../Styles/Constants";
import { FocusContext } from "../../context/Focus/FocusState";

const mintuesToMilisec = (min) => min * 1000 * 60;
const formatTime = (time) => (time <= 9 ? `0${time}` : time);
const FocusPage = ({ route, navigation }) => {
  const { updateFocusTask } = useContext(FocusContext);
  const { id, focus, time, sets } = route.params;
  const [millis, setMillis] = useState(mintuesToMilisec(1));
  const [paused, setPaused] = useState(true);
  const [showAnime, setShowAnime] = useState(true);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;
  const interval = React.useRef("null");
  const remainingSets = sets - 1;
  const Countdown = () => {
    setMillis((time) => {
      if (time === 0) {
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    if (paused) {
      return;
    }
    interval.current = setInterval(Countdown, 1000);
    return () => clearInterval(interval.current);
  }, [paused]);

  const { colors } = useTheme();
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      {millis !== 0 ? (
        <View style={styles.header}>
          <Text style={[styles.headerTxt, { color: colors.text }]}>
            Focusing on :
          </Text>
          <Text
            style={{ color: colors.text, fontSize: 20, marginVertical: 10 }}
          >
            {focus}
          </Text>
        </View>
      ) : (
        <View style={styles.header}>
          <Text
            style={{
              fontSize: SIZES.md,
              textAlign: "center",
              lineHeight: 30,
              color: colors.text,
            }}
          >
            Sucessfully focused for {time} mins {"\n"}
            Keep Going
          </Text>
          <Text
            style={{
              fontSize: SIZES.sm + 5,
              textAlign: "center",
              opacity: 0.5,
              color: colors.text,
              marginTop: SIZES.sm,
            }}
          >
            Remaining sets : {remainingSets}
          </Text>
        </View>
      )}

      {millis !== 0 ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1.5 }}
        >
          <View
            style={[styles.Timercontainer, { backgroundColor: colors.card }]}
          >
            <Text
              style={{
                color: colors.text,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginTop: 10,
              }}
            >
              Let's focus
            </Text>
            <Text style={[styles.time, { color: colors.text }]}>{`${formatTime(
              minute
            )} : ${formatTime(second)}`}</Text>
          </View>
        </View>
      ) : null}

      {millis !== 0 ? (
        <View
          style={{
            alignItems: "center",
            marginVertical: 10,
            flex: 3,
          }}
        >
          {showAnime ? (
            <View
              style={{
                flex: 1,
                width: "100%",
                marginVertical: 30,
              }}
            >
              <LottieView
                source={require("../../assets/lottie/start.json")}
                autoPlay
                loop
              />
            </View>
          ) : paused ? (
            <LottieView
              source={require("../../assets/lottie/Sad.json")}
              autoPlay
              loop
            />
          ) : (
            <LottieView
              source={
                isDark
                  ? require("../../assets/lottie/focus_dark.json")
                  : require("../../assets/lottie/focus_light.json")
              }
              autoPlay
              loop
            />
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 2,
            width: "100%",
            marginVertical: 20,
          }}
        >
          <LottieView
            style={{ width: "100%" }}
            source={require("../../assets/lottie/completed.json")}
            onAnimationFinish={() =>
              setTimeout(() => {
                updateFocusTask({ id, remainingSets });
                navigation.navigate("Home");
              }, 3000)
            }
            autoPlay
            loop={false}
          />
        </View>
      )}

      <View style={{ alignItems: "center", flexDirection: "column", flex: 1 }}>
        {millis !== 0 ? (
          <Button
            mode="contained"
            onPress={() => {
              setPaused(!paused);
              setShowAnime(false);
            }}
            style={styles.btn}
            title={paused ? "start" : "stop"}
          />
        ) : null}
        {paused && millis !== 0 ? (
          <TouchableOpacity
            style={{
              width: 100,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={{ color: colors.text }}>Exit</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Timercontainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "100%",
    borderRadius: 10,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerTxt: {
    fontSize: 20,
  },
  time: {
    marginVertical: 10,
    fontSize: 60,
  },
  btn: {
    marginTop: 5,
    justifyContent: "center",
  },
});
export default FocusPage;
