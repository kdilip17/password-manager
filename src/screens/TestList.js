import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ListView,
  SectionList,
  FlatList,
} from "react-native";
import { List, ListItem } from "react-native-elements";

const list = [
  { key: "Devin" },
  { key: "Dan" },
  { key: "Dominic" },
  { key: "Jackson" },
  { key: "James" },
  { key: "Joel" },
  { key: "John" },
  { key: "Jillian" },
  { key: "Jimmy" },
  { key: "Julie" },
];

const listitm = [
  {
    id: 231,
    name: "test",
    password: "test",
    show: false,
  },
  {
    id: 232,
    name: "test",
    password: "test1",
    show: true,
  },
  {
    id: 233,
    name: "test",
    password: "test",
    show: false,
  },
];

function TestList({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={listitm}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <Text style={styles.rowViewContainer}>{item.name}</Text>
            {item.show ? (
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.password}
              </Text>
            ) : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#000",
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 0.5,
    borderColor: "#c9c9c9",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    marginLeft: 10,
  },
});

export default TestList;
