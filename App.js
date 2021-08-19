import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import { Text, Card, ListItem, Button, Header, Overlay, Input, Icon, Badge } from 'react-native-elements';
import api from './api/api';
//File has CHANGED

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function App() {
  const [tabData,setTabData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleU, setVisibleU] = useState(false);
  const [visibleD, setVisibleD] = useState(false);
  const [reload, setReload] = useState(false);
  const [author, onCAuthor] = React.useState();
  const [title, onCTitle] = React.useState();
  const [iD,setID] = useState(0)
  const [refreshing, setRefreshing] = React.useState(false);

  // const Reload = () =>{
  //   setReload(true);
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }

  const toggleOverlay = () => {
      setVisible(!visible);
    };
  const toggleOverlayU = (data)=>{  
      setVisibleU(!visibleU);
      setID(data.id);
  }
  const toggleOverlayD = (data)=>{ 
    setVisibleD(!visibleD);
    setID(data.id);
} 
async function Reload() {
  setReload(true);
  setRefreshing(true);
  wait(2000).then(() => setRefreshing(false));
  try {
    const {data}= await api.get(
      ""
    )
    setTabData(data)       
  } catch (err) {
    console.log(err)
  }
}
  useEffect(() => {
    async function fetchPosts() {
      try {
        const {data}= await api.get(
          ""
        )
        setTabData(data)       
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [reload])
  const Update = async() =>{
    try {
       await api.put(`/${iD}`, {title,author});
       setReload(true);
       setVisibleU(false);
    } catch (err) {
       console.log(err);
     }
   }
   const Delete = async() =>{
    try {
       await api.delete(`/${iD}`);
       setReload(true);
       setVisibleD(false);
     } catch (err) {
       console.log(err);
     }
   }
  
 const Create = async() =>{
  try {
     await api.post('', {title,author});
     setReload(true);
     setVisible(false);
   } catch (err) {
     console.log(err);
   }
 }
  return (
    
    <View >
      <Header
centerComponent={{ text: 'CRUD DT', style: { color: '#fff' } }}
/>
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={Reload}
        />
        }>
<Button title="Add New" onPress={toggleOverlay} />
<Text h5 style={{textAlign:'center',fontWeight:'bold'}}>Swipe Left to Delete, Right to Update</Text>
<Overlay isVisible={visibleD} onBackdropPress={toggleOverlayD}>
  <Card>
    <Text h1>Are You Sure</Text>
    <Icon raised reverse name='clear' color='#f50' onPress={toggleOverlayD}/>
    <Icon raised reverse name='done' color='green' onPress={Delete}/>
  </Card>
</Overlay>

<Overlay isVisible={visibleU} onBackdropPress={toggleOverlayU}>
  <Card>
  <Text h1>Update Line #{iD}</Text>
<Input
  placeholder='Enter a Title' label='Title' onChangeText={onCTitle}
/>
<Input
  placeholder='Enter a Author' label='Author' onChangeText={onCAuthor}
/>
<Button title='Update' onPress={Update}></Button>
  </Card>
</Overlay>
<Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
  <Card>
  <Text h1>Add a New Line to Table</Text>
<Input
  placeholder='Enter a Title' label='Title' onChangeText={onCTitle}
/>
<Input
  placeholder='Enter a Author' label='Author' onChangeText={onCAuthor}
/>
<Button title='Enviar' onPress={Create}></Button>
  </Card>
</Overlay>
      
      {/* {tabData.map((dados,i)=>(
        <View>
          <Card>
         <Text h2>{dados.title}</Text>
         <Text h4>{dados.author}</Text>
         <Text h4>{dados.id}</Text>
          </Card>
        </View>
       ))} */}
      
  {
    tabData.map((u, i) => {
      return(

        <ListItem key={i} bottomDivider >
    <ListItem.Swipeable 
  leftContent={
    <Button
    title="Update"
    icon={{ name: 'create', color: 'white' }}
    buttonStyle={{ backgroundColor: 'green',height:'100%' }}
    onPress={()=>toggleOverlayU(u)}
    />
  }
  rightContent={
    <Button
    title="Delete"
    icon={{ name: 'delete', color: 'white' }}
    buttonStyle={{ backgroundColor: 'red', height:'100%' }}
    onPress={()=>toggleOverlayD(u)}
    />
  }>  
       <ListItem.Title style={{minWidth:'47%', maxWidth:'47%'}} h4 >{u.title}</ListItem.Title>
       <ListItem.Subtitle style={{minWidth:'47%', maxWidth:'47%'}} h6>{u.author}</ListItem.Subtitle>
      </ListItem.Swipeable>
      </ListItem>)
  }
  )
}
      
  </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
