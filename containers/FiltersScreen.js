import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { colors, border } from "../assets/js/utils";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import types from "../seed/types.json";
import CheckboxComp from "../components/CheckboxComp";

export default function FiltersScreen({
  rayon,
  setRayon,
  setTypeEl,
  typeTab,
  setTypeTab,
  limit,
  setLimit,
  navigation,
}) {
  // Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "50 résultats", value: 50 },
    { label: "100 résultats", value: 100 },
    { label: "200 résultats", value: 200 },
    { label: "300 résultats", value: 300 },
    { label: "500 résultats", value: 500 },
    { label: "1000 résultats", value: 1000 },
  ]);

  const addTypeTab = (type) => {
    const checkType = [...typeTab];
    const exist = checkType.find((elem) => elem === type);
    if (!exist) {
      checkType.push(type);
      setTypeTab(checkType);
      console.log("checkAdded ", checkType);
    } else {
      const index = checkType.indexOf(exist);
      checkType.splice(index, 1);
      setTypeTab(checkType);
      console.log("checkRemoved ", checkType);
    }
  };
  // console.log(typeTab);
  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <View style={styles.wrapper}>
        <View style={styles.sections}>
          <Text style={styles.title}>Rayon</Text>
          <View style={styles.slider}>
            <Slider
              minimumValue={1}
              maximumValue={80}
              step={1}
              value={rayon}
              onValueChange={(rayon) => setRayon(rayon)}
            />
            <Text style={{ textAlign: "center" }}> {Math.floor(rayon)} km</Text>
          </View>
        </View>
        <View style={styles.sections}>
          <Text style={styles.title}>Nombre maximale de résultats</Text>
          <DropDownPicker
            placeholder="Afficher plus de 50 résultats"
            open={open}
            value={value}
            items={items}
            itemKey="label"
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={() => setLimit(value)}
            listMode="SCROLLVIEW"
            maxHeight={300}
            selectedItemLabelStyle={{ color: colors.vegetarien }}
          />
        </View>
        <View style={styles.sections}>
          <Text style={styles.title}>Filtrer par type</Text>
          <>
            {types.map((type, i) => {
              return (
                <CheckboxComp key={i} id={i} type={type} onCheck={addTypeTab} />
              );
            })}
          </>
        </View>
      </View>
      <Button
        title="Voir les résultats des restaurants"
        onPress={() => {
          navigation.goBack("Restaurants", {
            typeTab,
          });
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    marginHorizontal: 5,
  },
  sections: {
    marginVertical: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    textAlign: "left",
    marginBottom: 10,
  },
  slider: {},
});
