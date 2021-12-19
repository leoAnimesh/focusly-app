import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import Tasks from "./Tasks";

const CompletedTask = ({ Data, navigation }) => {
  const { colors } = useTheme();
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      {Data.length !== 0 ? (
        Data.map((item, idx) => (
          <Tasks navigation={navigation} key={idx} index={idx} item={item} />
        ))
      ) : (
        <Text style={{ color: colors.text, opacity: 0.8 }}>
          Nothing to focus on 😒
        </Text>
      )}
    </ScrollView>
  );
};

export default CompletedTask;
