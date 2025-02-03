import { StyleSheet,Image, Pressable } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { Product } from '../types';
import { Link, useSegments } from 'expo-router';

export const defaultImage ='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png';

type ProductListItemProps ={
    product:Product;
}
const ProductListItem = ({product}:ProductListItemProps) =>{
  const  segments = useSegments()
  console.log(segments);
  
  return(
    <Link href={`/menu/${product.id}`} asChild> 
    <Pressable style={styles.container}>
    <Image style={styles.image}
    resizeMode='contain'
    source={{uri:product.image ?? defaultImage }}/>

   <Text style={styles.title}>{product.name}</Text>
   <Text style={styles.price}>${product.price}</Text>


  </Pressable>
  </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  body:{
backgroundColor:'white',
  },
  container: {

    backgroundColor:'white',
    padding:10,
    borderRadius:20,
    flex:1,
    maxWidth:'50%',
  
  },
  image:{
    width:'100%',
    aspectRatio:1
  
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical:10,
    color: Colors.dark.background

  },
  price:{
    fontSize: 20,
    color: Colors.light.tint
  }
 
});
