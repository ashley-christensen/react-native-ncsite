import { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button, Modal } from 'react-native';
import { Rating, Input } from 'react-native-elements';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { postComment } from '../features/comments/commentsSlice';
import * as Animatable from 'react-native-animatable';


const CampsiteInfoScreen = ({ route }) => {
 const { campsite } = route.params;
 const comments = useSelector((state) => state.comments);
 const favorites = useSelector((state) => state.favorites);
 const dispatch = useDispatch();

 const [showModal, setShowModal] = useState(false);
 const [rating, setRating] = useState(5);
 const [author, setAuthor] = useState('');
 const [text, setText] = useState('');

 const handleSubmit = () => {
  const newComment = {
   author,
   rating,
   text,
   campsiteId: campsite.id
  };
  dispatch(postComment(newComment));
  setShowModal(!showModal);
 };

 const resetForm = () => {
  setRating(5);
  setAuthor('');
  setText('');
 };

 const renderCommentItem = ({ item }) => {
  return (
   <View style={styles.commentItem}>
    <Text style={{ fontSize: 14 }}>{item.text}</Text>
    <Rating
     readonly
     style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
     startingValue={item.rating}
     imageSize={10}
    >{item.rating}</Rating>
    <Text style={{ fontSize: 12 }}>{` -- ${item.author}, ${item.date}`}</Text>
   </View>
  );
 };

 return (
  <Animatable.View
   animation='fadeInUp'
   duration={2000}
   delay={1000}
  >
   <FlatList
    data={comments.commentsArray.filter((comment) => comment.campsiteId === campsite.id)}
    renderItem={renderCommentItem}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={{
     marginHorizontal: 20,
     padingVertical: 20
    }}
    ListHeaderComponent={
     <>
      <RenderCampsite
       campsite={campsite}
       isFavorite={favorites.includes(campsite.id)}
       markFavorite={() => dispatch(toggleFavorite(campsite.id))}
       onShowModal={() => setShowModal(!showModal)}
      />
      <Text style={styles.commentsTitle}>Comments</Text>
     </>
    }
   />

   {/* Modal start */}
   <Modal
    animationType='slide'
    transparent={false}
    visible={showModal}
    onRequestClose={() => setShowModal(!showModal)}
   >
    <View style={styles.modal}>
     <Rating
      showRating
      startingValue={rating}
      imageSize={40}
      onFinishRating={(rating) => setRating(rating)}
      style={{ paddingVertical: 10 }}
     />
     <Input
      placeholder='Author'
      leftIcon={{ type: 'font-awesome', name: 'user-o' }}
      leftIconContainerStyle={{ paddingRight: 10 }}
      onChangeText={(author) => setAuthor(author)}//unsure
      value={author}//unsure
     />
     <Input
      placeholder='Comment'
      leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
      leftIconContainerStyle={{ paddingRight: 10 }}
      onChangeText={(comment) => setText(comment)}//unsure 
      value={text}//unsure 
     />
     <View style={{ margin: 10 }}>
      <Button
       onPress={() => {
        handleSubmit();//unsure
        resetForm();
       }}
       color='#5637DD'
       title='Submit'
      />
     </View>
     <View style={{ margin: 10 }}>
      <Button
       onPress={() => {
        setShowModal(!showModal);
        resetForm();
       }}
       color='#808080'
       title='Cancel'
      />
     </View>
    </View>
   </Modal>
   {/* Modal End */}
  </Animatable.View>
 );
};

const styles = StyleSheet.create({
 commentsTitle: {
  textAlign: 'center',
  backgroundColor: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  color: '#43484D',
  padding: 10,
  paddingTop: 30
 },
 commentItem: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: '#fff'
 },
 modal: {
  justifyContent: 'center',
  margin: 20,
  paddingTop: 20
 }
});

export default CampsiteInfoScreen;