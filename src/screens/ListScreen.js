import React from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, showItem } from "../redux/reducer";
import { showToast } from "../utils/utils";
import { useRoute } from "@react-navigation/native";

import Header from "../components/Header";

function ListView() {
  const route = useRoute();
  const listItems = useSelector((state) => state.itemList);

  const dispatch = useDispatch();

  BackHandler.addEventListener("hardwareBackPress", function () {
    /**
     * this.onMainScreen and this.goBack are just examples,
     * you need to use your own implementation here.
     *
     * Typically you would use the navigator here to go to the last state.
     */
    if (route.name === "List") {
      /**
       * When true is returned the event will not be bubbled up
       * & no other back action will execute
       */
      return true;
    } else {
      /**
       * Returning false will let the event to bubble up & let other event listeners
       * or the system's default back action to be executed.
       */
      return false;
    }
  });

  return (
    <View
      style={{
        backgroundColor: "#ECEFF1",
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      {listItems && listItems.length !== 0 ? (
        <FlatList
          data={listItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <View style={styles.listItemContainer}>
                <View style={styles.listItem}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
                <View style={{ marginRight: 5 }}>
                  <TouchableOpacity
                    onPress={() => dispatch(showItem(item))}
                    style={styles.button}
                  >
                    <Ionicons name="ios-eye" color="#fff" size={20} />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => dispatch(removeItem(item.id))}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="ios-remove-circle" color="#fff" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.passwordContainer}>
                {item.show ? (
                  <Text style={styles.password} numberOfLines={1}>
                    {item.password}{" "}
                  </Text>
                ) : null}
              </View>
              <View
                style={{
                  borderBottomColor: "#263238",
                  borderBottomWidth: 1,
                  marginBottom: 10,
                }}
              />
            </>
          )}
        />
      ) : (
        <Text style={{ fontSize: 30 }}>You list is empty :'(</Text>
      )}
    </View>
  );
}

function ListScreen({ navigation }) {
  // const dispatch = useDispatch();

  const logOut = () => {
    // dispatch(logout());
    navigation.navigate("Login");
    showToast("Logout successful");
  };

  return (
    <>
      <StatusBar backgroundColor="red" barStyle="light-content" />
      <View style={styles.container}>
        <Header title={"Saved Passwords"} />
        <View style={styles.fabContainer}>
          <TouchableOpacity onPress={logOut} style={styles.fabButton}>
            <Ionicons name="ios-exit" color="#455A64" size={40} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Modal")}
            style={styles.fabButton}
          >
            <Ionicons name="ios-add" color="#455A64" size={40} />
          </TouchableOpacity>
        </View>
        <ListView />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#455A64",
  },
  fabContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 20,
  },
  fabButton: {
    backgroundColor: "#FFF",
    borderRadius: 35,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  listItemContainer: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    marginBottom: 5,
  },
  passwordContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
    alignSelf: "stretch",
  },
  password: {
    borderLeftColor: "#00897B",
    borderLeftWidth: 3,
    paddingLeft: 5,
    color: "#37474F",
    fontSize: 22,
    fontWeight: "500",
  },
  listItem: {
    flex: 1,
    alignSelf: "stretch",
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "400",
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#455A64",
    padding: 5,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    borderRadius: 8,
    backgroundColor: "#ff4b5b",
    padding: 5,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ListScreen;
