          import { View, Text, KeyboardAvoidingView, StyleSheet,Image, 
            TextInput, TouchableOpacity, StatusBar, FlatList, Button, ScrollView} from 'react-native'
          import { useState, useEffect } from 'react'
          import {SelectList} from 'react-native-dropdown-select-list'
          import { MultiSelect } from 'react-native-element-dropdown';
          import AntDesign from 'react-native-vector-icons/AntDesign';
          import { useNavigation } from '@react-navigation/native';
          import {API,graphqlOperation, Auth} from "aws-amplify"
          import { createNotification, createPoll, createPollRequest, updateNotification } from '../graphql/mutations';
          import * as Device from 'expo-device';
          import * as Notifications from 'expo-notifications';
          import Constants from 'expo-constants';
          import { useUserContext } from '../../UserContext';
          import { getSquad, getUser, notificationsByUserID } from '../graphql/queries';
          import { updatePoll } from '../graphql/mutations';
          import { updateUser } from '../graphql/mutations';
          import { listSquadUsers } from '../graphql/queries';
          import { createSquadPoll } from '../graphql/mutations';
          import { registerForPushNotificationsAsync, sendPushNotifications } from '../../notificationUtils';
          import { graphql } from 'graphql';


          const WordPollCreationScreen = () => {
          const [selected, setSelected] = useState(null);
            const [caption, setCaption] = useState()
            const[pollOption, setPollOption] = useState('')
            const[pollOptionData, setPollOptionData] = useState([])
            const[selectedPollAudience, setSelectedPollAudience] = useState("")
            const[pollAudience, setPollAudience] = useState([])
            const[finalPollAudience, setfinalPollAudience] = useState([])
            const [idCounter, setIdCounter] = useState(1);
            const [squadsData, setSquadsData] = useState([]);
            const [userID, setUserID]= useState("")
            const{user} = useUserContext();
            const navigation = useNavigation()
            
                  const pollLabelData=[ 
                    {key:'1', value:"Fashion"},
                    {key:'2', value:"Decor"},
                    {key:'3', value:"Food"},
                    {key:'4', value:"Travel"},
                    {key:'5', value:"Social"},
                    {key:'6', value:"Health"},
                    {key:'7', value:"Other"},
                ]
                const handleTextInputChange = (text) => {
                    setPollOption(text);
                  };

                  const handleDeleteOption = (id) => {
                      // Filter out the option with the specified id
                      const updatedOptions = pollOptionData.filter(option => option.id !== id);
                      setPollOptionData(updatedOptions);
                    };

                    const renderPOllOptionDataItem = ({ item }) => {
                      return (
                        <TouchableOpacity
                          style={{ marginTop: 10, }}
                          onPress={() => handleDeleteOption(item.id)}
                        >
                          <View style={styles.item}>
                            <Text style={{ fontSize: 18, color: "black" }}>{item.title}</Text>
                            <AntDesign
                              style={styles.icon}
                              color="black"
                              name="delete"
                              size={20}
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    };

                    const handleAddButtonPress = () => {
                      const pollOptionObject = {
                        id: idCounter,
                        title: pollOption,
                        votes: 0,
                      };

                      // console.log("clean pollOptionObject", pollOptionObject);

                      // console.log("Before updating pollOptionData:", pollOptionData);

                      setPollOptionData([...pollOptionData, pollOptionObject]);

                      // console.log("After updating pollOptionData:", pollOptionData);

                      // console.log("here is the new poll option", pollOptionData);
                      setIdCounter(idCounter + 1);
                  
                      setPollOption("");
                    };
                    


                const handleSelect = (val) => {
                  console.log('Selected value:', val);
                  setSelected(val);
                };


                  const renderDataItem = (item) => {
                    return (
                        <View style={styles.item}>
                            <Text style={styles.selectedTextStyle}>{item.label}</Text>
                            <AntDesign style={styles.icon} color="black" name="delete" size={20} />
                        </View>
                    );
                  };

                    //get the pollAudience 
                    useEffect(() => {
                      // console.log("here is the user", user);
                      // console.log("poll audience, either updated or not updated for the first time", pollAudience)
                      const fetchSquadInfo = async () => {
                        const array = user.userSquadId;
                        //console.log("here is the array", array);

                        try {
                          const promises = array.map(async (squadId, index) => {
                            try {
                              const response = await API.graphql(graphqlOperation(getSquad, { id: squadId }));
                            //console.log("here is the raw response from the backend,", response.data?.getSquad.Users);
                            const usersConnection = response.data?.getSquad?.Users; // Access Users connection
                            //console.log("here is the user connections", usersConnection)
                            const users = usersConnection?.items; // Access items array from the connection
                            //console.log("here are the users from the squad", users);
      
                              const { squadName, Users } = response.data.getSquad;

                            
                              const dataItem = {
                                label: squadName,
                                value: squadId,
                                Users: Users, 
                              };

                              //console.log("this is the data item's users", dataItem.Users);

                              return dataItem; 
                            } catch (error) {
                              console.log('Error fetching squad:', error);
                              return null;
                            }
                          });

                          const dataItemArr = await Promise.all(promises);
                          //console.log("here is the dataItemArr", dataItemArr)
                          const filteredDataItemArr = dataItemArr.filter(item => item !== null);
                          //console.log("here is the filteredDataItemArr", filteredDataItemArr)
                          // Update SquadsData state with the fetched data
                          //setSquadsData(filteredDataItemArr);
                          // Update PollAudience state with squad names
                          const squadNames = filteredDataItemArr.map(item => item.label);
                          //console.log("here is the squadNames", squadNames)
                          const final_pollAudience = []
                          for(let i=0; i<squadNames.length; i++){
                            const dataItem = { key: i, value: squadNames[i]};
                            final_pollAudience.push(dataItem)
                          }
                          //console.log("here is the final_poll audience",final_pollAudience)
                          setPollAudience(final_pollAudience);
                        } catch (error) {
                          console.log('Error in fetchSquadInfo:', error);
                        }
                      };
                      fetchSquadInfo();
                    }, [user.userSquadId]);


                //gather SquadData
                useEffect(()=>{
                const fetchSquadData = async()=>{
                  //get the array of the squad --- find a way to track this
                  const user_id  = user.id
                  console.log("this is the user ID", user_id)
                  setUserID(user_id)
                  const array = user.userSquadId;
                  const squadID = array[0]
                  try {
                    const response = await API.graphql(graphqlOperation(listSquadUsers, { id: squadID }));
                    const data = JSON.stringify(response.data?.listSquadUsers.items);
                    const parsedData = JSON.parse(data)
                    //console.log(parsedData)
                    const userData = []
                    for (let i = 0; i < parsedData.length; i++) {
                    //console.log("here is the user id",userID )
                    if (parsedData[i].userId) {
                      //console.log(parsedData[i])
                      const userID =  parsedData[i].userId
                      userData.push(userID)
                        try {
                            const results = await API.graphql(graphqlOperation(getUser, { id: userID }))
                            //console.log("here are the results for getting users",results)
                        } catch (error) {
                            console.log("error extracting users", error);
                        }
                    }
                }
                //console.log("here is the userData array new",userData)
                setSquadsData(userData)

                  } catch (error) {
                    console.log("error getting squad data",error)
                  }
                }
                fetchSquadData()
                }, [])




                    
                    
                    const updatePollItems = async (pollId, items) => {
                        try {
                          const updateInput = {
                            id: pollId,
                            pollItems: items
                          };
                          const updateResponse = await API.graphql(graphqlOperation(updatePoll, { input: updateInput }));
                          console.log('Poll updated successfully:', updateResponse);
                          // Log the updated pollItems
                          const updatedPollItems = updateResponse.data.updatePoll.pollItems;
                          console.log('Updated Poll Items:', updatedPollItems);  
                        } catch (error) {
                          console.log('Error updating poll items:', error);
                        }
                      };
           const handleNotificationProduction = async (userID) =>{
             try {
             const result = await API.graphql(graphqlOperation(notificationsByUserID, { userID: userID }))
             console.log("here are the results from notification production, success",result)
             const notification = result.data?.notificationsByUserID.items
             //const notificationID = notification[0].id
             return notification
             } catch (error) {
              console.log("error producing the notification for this user", error)
             }
           }          
                    
          //Function to create poll requests for users in selected squads
          const handlePollRequestCreation = async (notificationID, userID, pollID) => {
              const pollRequestInput = {
                userID: userID,
                notificationID:notificationID, 
                ParentPollID:pollID
              };
              try {
                const response = await API.graphql(graphqlOperation(createPollRequest, { input: pollRequestInput }));
                console.log('Poll Request created successfully:✅✅✅✅✅', response.data?.createPollRequest.id);
                const pollRequestID = response.data?.createPollRequest.id;
                return pollRequestID;
              } catch (error) {
                console.log('Error creating user poll requests', error);
              }
            
            
          };



          //check if the user has notification
          const checkIfUserHasNotification=async(user_ID)=>{

            try {
              //const user_ID = user.id
              //console.log("here is the user id in try catch", user_ID)
              const notificationQueryResult = await API.graphql(
                graphqlOperation(notificationsByUserID, { userID: user_ID })
              );
                
              //console.log("result from notification query",notificationQueryResult)
              const notifications = notificationQueryResult.data?.notificationsByUserID.items;
              //console.log("here are the notificationsnotifications✅", notifications)
              if (notifications.length > 0) {
                console.log("User has notifications:", notifications);
                //const notificationID = notifications[0].id
                //s//etUserNotificationID(notificationID)
                //setExistingRequestsToBeAddedInASquadArr(notifications.squadAddRequestsArray)
                return true
              } else {
                    console.log("User has no notifications.");
                    return false
                    //setCurrentUserHasNotifications(false);
              }
            } catch (error) {
              console.log("error getting current user notification", error)
            }
              }
          

          const handleNotificationUpdate= async(pollRequestArray, notification_id)=>{
            console.log("here is the pollRequestArray", pollRequestArray)
            console.log("here is the notification id", notification_id)
            try {
              const resultUpdateNotification = await API.graphql(graphqlOperation(updateNotification, {input:{id: notification_id, pollRequestsArray:pollRequestArray}}))
              console.log("updating existing user notification successful✅", resultUpdateNotification)
              return resultUpdateNotification
             } catch (error) {
              console.log("error updating existing user notifications request to join❌", error)
             }
          }

          // // Function to create notifications for users in selected squads
          const handleNotificationCreationAndUpdate = async (userID, pollID) => {
            //console.log(squadsData)

              //get the notification ID of the user
              const notification= await handleNotificationProduction(userID)
              console.log("here is the results fron notification production", notification)
              //create the poll request for the user
              const notification_id = notification[0].id
              const pollRequestID = await handlePollRequestCreation(notification_id, userID,pollID)
              //retrieve notification poll request creation array
              const pollRequestArray = notification[0].pollRequestsArray
              console.log("here is the poll request array", pollRequestArray)
              if(pollRequestArray === null){
                console.log("poll request is null for now")
                const newPollRequestArray = []
                newPollRequestArray.push(pollRequestID)
                console.log("here is the newPollRequestArr", newPollRequestArray)
                //pollRequestArray, notification_id
                console.log("here is the notification", notification_id)
                const resultUpdate = handleNotificationUpdate(newPollRequestArray, notification_id);
                console.log("here are the results", resultUpdate)
                return resultUpdate
              }else{
                console.log("poll request array is not null, this is the value instead",pollRequestArray )
                pollRequestArray.push(pollRequestID)
                console.log("poll request array is not null, this is the value after update",pollRequestArray )
                const newArr = pollRequestArray;
                console.log("here is the new array", newArr)
                const notificationUpdate = await handleNotificationUpdate(newArr, notification_id)
                console.log("here is the new notification update", notificationUpdate)
                return notificationUpdate
              }
         
            }
          
          const handleSquadPollCreation = async(pollID, SquadID) =>{
          try {
            const SquadPollCreationResults = await API.graphql(graphqlOperation(createSquadPoll, {input:{
              pollId:pollID,
              squadId:SquadID
            }}))
            console.log("here are the squad poll creation results✅", SquadPollCreationResults)
          } catch (error) {
            console.log("error creating a squad poll❌", error)
          }
          }

          const incrementNumOfPollsForUser = async (userId, updatedNumOfPolls) => {
            try {
              // Update the user with the incremented numOfPolls
              await API.graphql(graphqlOperation(updateUser, {
                input: {
                  id: userId,
                  numOfPolls: updatedNumOfPolls,
                }
              }));
              console.log('User numOfPolls updated successfully:', updatedNumOfPolls);
            } catch (error) {
              console.log('Error updating numOfPolls for user:', error);
            }
          };

            const handlePollCreation = async () => {
                  console.log("Here is the selected value", selected);
                  console.log("here is the poll options", pollOptionData);
                  console.log("here is the pollAudience", pollAudience);
                  //console.log("and here is the final poll audience", finalPollAudience);
                  console.log("here is the caption", caption);
                  console.log("here is the user id", user.id);
                  try {
                    // Create the poll
                    const pollInput = {
                      totalNumOfVotes: 0,
                      pollMedia: [],
                      numOfLikes: 0,
                      closed: false,
                      open: true,
                      numOfLikes:0,
                      pollAudience: pollAudience,
                      pollCaption: caption,
                      pollItems: [], // Start with an empty array
                      pollLabel: selected,
                      pollScore: 0,
                      userID: user.id,
                      squadID:user.userSquadId
                    };
                    const squadId = user.userSquadId[0]
                    console.log("here is  the squad id", squadId)
                    const response = await API.graphql(graphqlOperation(createPoll, { input: pollInput }));
                    if (response.data && response.data.createPoll) {
                      const pollId = response.data.createPoll.id;

                      console.log('Poll created successfully:', response.data.createPoll);
                          
                    const userID = user.id
                    console.log("this is the user id",userID)
                    
                      



                      // Transform pollOptionData into the desired format
                      const updatedItems = JSON.stringify(
                        pollOptionData.map((item, index) => ({
                          id: index + 1, // You can use any logic to generate unique IDs
                          title: item.title,
                          votes: 0,
                        }))
                      );
                      //handle notification
                      const canProceed = await checkIfUserHasNotification(userID)
                      if(canProceed === true){
                       for (const squadMemberID of squadsData){

                        try {
                          const notificationUpdateResult = handleNotificationCreationAndUpdate(squadMemberID,pollId)
                          console.log("here are the results for updating notification", notificationUpdateResult)
                        } catch (error) {
                          console.log("error updation notification", error)
                        }
                        
                       }
                     
                      }
                      //create squad poll
                      handleSquadPollCreation(pollId, squadId)
                      //Update the poll with the correct pollItems
                      await updatePollItems(pollId, updatedItems);
                      const updatedNumOfPolls = (user.numOfPolls || 0) + 1;
                      
                      await incrementNumOfPollsForUser(user.id, updatedNumOfPolls);
                      //  // Clear the input
                      //  setPollOption("");
                      //  setQuestion("");
                      //  setSelected(""); // Clear selected poll label
 
                      navigation.navigate('RootNavigation', { screen: 'Profile' });

                          } else {
                            console.log('Error creating poll - Unexpected response:', response);
                          }
                        } catch (error) {
                          console.log('Error creating poll:', error);
                        }
                };

              
            return (
              <KeyboardAvoidingView
              style={styles.container}
              behavior="padding"
              > 
              <View style={styles.pollContentStyles}>
                <Text style={styles.pollContentCaption}>Poll Question</Text>
              </View>
              <TextInput
                placeholder ="Type your poll caption here..."
                value={caption}
                onChangeText={text =>setCaption(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
                style={styles.input}
                textAlignVertical={"top"}
              ></TextInput>

            <View style={styles.pollLabelContainer}>
                <Text style={styles.pollContentLabel}>Poll Label</Text>
              </View>

              <TouchableOpacity
              style={{paddingHorizontal:15,marginTop:15,width:350,marginRight:70,marginLeft:30}}>
                <SelectList 
                setSelected={handleSelect} 
                value={selected}
                data={pollLabelData} 
                save="value"
                search={true} 
                />
              </TouchableOpacity>

            {/* adding poll options */}
              <View style={styles.pollContentStyles}>
                <Text style={styles.pollContentCaption}>Poll Options</Text>
              </View>
              {/* poll option input  */}
              
                <TextInput
                  style={styles.pollOptionInput}
                  placeholder="Enter Poll Option"
                  value={pollOption}
                  onChangeText={handleTextInputChange}
                />
                <TouchableOpacity
                onPress={()=>handleAddButtonPress()}
                style={styles.button}
                >
                  <Text
                  style={{color:'#fff'}}
                  >Add Option</Text>
                </TouchableOpacity> 
                
                <FlatList
                data={pollOptionData} 
                horizontal={true}
                renderItem={renderPOllOptionDataItem} 
                keyExtractor={item=>item.id}
              />


              <View style={styles.pollAudience}>
                <Text style={styles.pollContentCaption}>Poll Audience</Text>
              </View>

              {/* <MultiSelect
                  style={styles.pollAudienceDropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={pollAudience}
                  labelField="label"
                  valueField="value"
                  placeholder="Choose Poll Audience"
                  value={selectedPollAudience}
                  search
                  searchPlaceholder="Search..."
                  onChange={item => {
                      setSelectedPollAudience(item);
                  }}
                  renderLeftIcon={() => (
                      <AntDesign
                          style={styles.icon}
                          color="black"
                          name="Safety"
                          size={20}
                      />
                  )}
                renderItem={renderDataItem}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={styles.selectedStyle}>
                            <Text style={styles.textSelectedStyle}>{item.label}</Text>
                            <AntDesign color="black" name="delete" size={17} />
                        </View>
                    </TouchableOpacity>
                          )}  
                      /> */}
              
              <TouchableOpacity
              style={{paddingHorizontal:15,marginTop:35,width:350}}>
                <SelectList 
                setSelected={handleSelect} 
                value={selected}
                data={pollAudience} 
                save="value"
                search={true} 
                placeholder="Select squad" 
                />
              </TouchableOpacity>

              <View style={styles.pollButtonContainer}>
                  <TouchableOpacity
                  onPress={handlePollCreation}
                  style = {styles.button}
                      >
                      <Text style={styles.buttonText}>
                          Poll
                      </Text>
                  </TouchableOpacity>
                  </View>
              </KeyboardAvoidingView>
            )
          }

          const styles = StyleSheet.create({
            container:{
            flex:1,
            justifyContent:"flex-start",
            alignItems:"center",
            backgroundColor: "#F4F8FB"
            },
            squadLogo:{
              width:100,
              height:35,
              marginRight:250,
              marginTop:70
            },
            pollContentStyles:{
              marginRight:250,
              marginTop:10,
              marginBottom:11.5,
              
            },
            pollOptionTextContainer:{

            },
            pollLabelContainer:{
              marginRight:270,
              marginTop:0

            },
            pollContentText:{
              fontWeight:'700',
              fontSize:18
            },
            pollImagesContainer:{
              marginBottom:10
            },
            pollContentLabel:{
              marginTop:20,
              fontWeight:'700',
              fontSize:18
            },
            input:{
              backgroundColor: '#fff',
              paddingHorizontal: 15,
              paddingVertical:10,
              borderRadius:12,
              width:350,
              height:80,
              marginTop:10,
              fontSize: 13,
              marginRight:15,
              marginLeft:5,
              color:'black',
              fontWeight:'400'    
          },
          ImageContainer: {
            marginHorizontal: 16,
            marginTop: 20,
            width: "90%",
          },
          pollContentCaption:{
            marginTop:20,
            fontWeight:'700',
            fontSize:18
          },
          pollAudience:{
            marginRight:230,
            marginTop:-29
            
          },
          button:{
            backgroundColor: '#1764EF',
            width: 350,
            height: 42,
            padding: 12,
            borderRadius: 5,
            marginTop: 10,
            alignItems: 'center',
            marginRight: 10,
            marginLeft:15,
          },
          pollButtonContainer:{
            width: 296,
            height:42,
            borderRadius:5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:30,
            marginBottom: 30
            },
            buttonText:{
              color: 'white',
              fontWeight: '600',
              fontSize: 14   
          },
          pollOptionDropdown: {
            height: 50,
            width:350,
            backgroundColor: '#1764EF',
            borderRadius: 12,
            padding: 12,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            marginLeft:-20
          },
          pollAudienceDropdown: {
            height: 50,
            width:350,
            backgroundColor: '#1764EF',
            borderRadius: 12,
            padding: 12,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            marginLeft:-10,
            marginBottom:20

          },

          placeholderStyle: {
            fontSize: 16,
            color:'white'
          },
          selectedTextStyle: {
            fontSize: 14,
            color:'black'
          },
          iconStyle: {
            width: 20,
            height: 30,
          },

          inputSearchStyle: {
            height: 40,
            fontSize: 16,
          },
          icon: {
            marginRight: 5,
            //color:'white'
          },
          item: {
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            

          },
          selectedStyle: {
            flexDirection: 'row',
            //justifyContent: 'center',
            //alignItems: 'center',
            //borderRadius: 14,
            backgroundColor: 'white',
          // shadowColor: 'red',
            marginBottom: 10,
            marginRight: 15,
            paddingHorizontal: 12,
            paddingVertical: 2,
            // shadowOffset: {
            //     width: 0,
            //     height: 1,
            // },
            // shadowOpacity: 0.2,
            // shadowRadius: 1.41,
            marginLeft:57,

            //elevation: 2,
          },
          textSelectedStyle: {
            marginRight: 10,
            fontSize: 16,
          },
          pollOptionInput:{
              backgroundColor: '#EAEAEA',
              paddingHorizontal: 15,
              paddingVertical:5,
              borderRadius:5,
              width:346,
              height:45,
              marginTop:10,
              fontSize: 13,
              marginRight:15,
              marginLeft:20,
          // fontStyle:"Montserrat-Regular",
              color:'#535353',
              fontWeight:'400'  ,
              backgroundColor: '#fff'
          }
          })

          export default WordPollCreationScreen

