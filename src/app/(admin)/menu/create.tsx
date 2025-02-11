import { View, Text, StyleSheet, Image, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { defaultImage } from "@/src/components/ProductListItem";
import Colors from "../../../constants/Colors";
import Button from "../../../components/Button";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

const CreateScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const router = useRouter();
  const resetField =()=>{
    setName("");
    setPrice("");
    setImage("");
    router.back();
  }

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price should be a number");
      return false;
    }
    return true;
  };
  const onsubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    console.warn("Creating dish: ", name);
    resetField();
   
  };

  const onUpdate= () => {
    if (!validateInput()) {
      return;
    }
    console.log('updating')

    resetField()
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onConfirm =() =>{
    Alert.alert('Delete','Are sure to delete product',[
     {
      text:'Cancel',
     },{
      text:'Delete',
      style:'destructive',
      onPress:onDelete,
     }
    ])
  }

  const onDelete =()=>{
    console.log('deleted');
    
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "update Product" : "Create Product" }}
      />
      <Image
        source={{ uri: image || defaultImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Margarita..."
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.error}>{errors}</Text>
      <Button onPress={onsubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Button onPress={onConfirm}
        style={{ backgroundColor: 'red' }}
         text="Delete" />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default CreateScreen;
