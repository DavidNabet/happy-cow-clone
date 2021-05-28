import React from "react";
import { StyleSheet, View, Text } from "react-native";

const OpenClosed = ({ time }) => {
  const filterText = (description) => {
    let tabDay = [
      "Mon-Tue",
      "Mon-Wed",
      "Mon-Thu",
      "Mon-Fri",
      "Mon-Sat",
      "Mon-Sun",
      "Tue-Wed",
      "Tue-Thu",
      "Tue-Fri",
      "Tue-Sat",
      "Tue-Sun",
      "Wed-Thu",
      "Wed-Fri",
      "Wed-Sat",
      "Wed-Sun",
      "Thu-Fri",
      "Thu-Sat",
      "Thu-Sun",
      "Fri-Sat",
      "Fri-Sun",
      "Sat-Sun",
    ];
    let days = [
      "Mon ",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let word = " Open ";
    let d = description.split(word);
    if (description.indexOf(word) === -1) {
      d.pop();
    }
    console.log("********");
    console.log(d[1]);
  };
  return <>{filterText(time)}</>;
};

export default OpenClosed;

const styles = StyleSheet.create({});
