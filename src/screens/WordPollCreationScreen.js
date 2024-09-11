          import { View, Text, KeyboardAvoidingView, StyleSheet,Image, 
            TextInput, TouchableOpacity, StatusBar, FlatList, Button, ScrollView, Alert} from 'react-native'
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
          import { updatePollRequest } from '../graphql/mutations';
          import { registerForPushNotificationsAsync, sendPushNotifications } from '../../notificationUtils';



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
                      if (pollOption.trim() !== '') {
                        const pollOptionObject = {
                          id: idCounter,
                          title: pollOption,
                          votes: 0,
                        };
                    
                        setPollOptionData([...pollOptionData, pollOptionObject]);
                        setIdCounter(idCounter + 1);
                        setPollOption('');
                      }
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
                  }
                  //get the pollAudience 
                  useEffect(() => {
                    const fetchSquadInfo = async () => {
                      try {
                        // Fetch primary and non-primary squads created by the user
                        const primarySquadArray = user.userPrimarySquad || [];
                        const nonPrimarySquadArray = user.nonPrimarySquadsCreated || [];
                        const squadArray = [...primarySquadArray, ...nonPrimarySquadArray]; // Combine both arrays
                  
                        // Ensure there are squads to process
                        if (squadArray.length > 0) {
                          const promises = squadArray.map(async (squadId) => {
                            try {
                              const response = await API.graphql(graphqlOperation(getSquad, { id: squadId }));
                              const { squadName } = response.data.getSquad;
                  
                              return { key: squadId, label: squadName }; // Use `label` for MultiSelect
                            } catch (error) {
                              console.log('Error fetching squad:', error);
                              return null;
                            }
                          });
                  
                          // Wait for all squads to be fetched and filtered
                          const squadsData = await Promise.all(promises);
                          const filteredSquads = squadsData.filter(squad => squad !== null);
                  
                          // Add the "Public" option
                          const pollAudienceWithPublic = [
                            { key: 'public', label: 'Public' }, // MultiSelect uses `label` for display
                            ...filteredSquads,
                          ];
                  
                          // Set the poll audience state for the MultiSelect
                          setPollAudience(pollAudienceWithPublic);
                        } else {
                          // If no squads are found, still provide the "Public" option
                          setPollAudience([{ key: 'public', label: 'Public' }]);
                        }
                      } catch (error) {
                        console.log('Error fetching squads for poll audience:', error);
                        // In case of error, fallback to the "Public" option only
                        setPollAudience([{ key: 'public', label: 'Public' }]);
                      }
                    };      
                    // Fetch squad info on component mount or when user info changes
                    fetchSquadInfo();
                  }, [user.userPrimarySquad, user.nonPrimarySquadsCreated]);
                  
              // Function to gather squad data for all selected squads
              useEffect(() => {
                const fetchSquadData = async () => {
                  try {
                    const user_id = user.id;
                    setUserID(user_id);
                    const selectedSquads = selectedPollAudience.filter(audience => audience.key !== 'public'); // Exclude 'public' audience
                    if (selectedSquads.length === 0) {
                      console.log('No squads selected for poll audience.');
                      return;
                    }
                    const squadMembersPromises = selectedSquads.map(async (squad) => {
                    const squadID = squad.key; // Extract squad ID from selectedPollAudience
                      try {
                        // Fetch squad users for each selected squad
                        const response = await API.graphql(graphqlOperation(listSquadUsers, { id: squadID }));
                        const squadUsersData = response.data?.listSquadUsers?.items;
                        if (squadUsersData) {
                          // Extract user IDs from squad users data
                          return squadUsersData.map(user => user.userId);
                        } else {
                          console.log(`No users found for squad ID: ${squadID}`);
                          return [];
                        }
                      } catch (error) {
                        console.log(`Error fetching users for squad ID: ${squadID}`, error);
                        return [];
                      }
                    });
                    // Wait for all squad user data to be fetched
                    const allSquadUsers = await Promise.all(squadMembersPromises);
                    // Merge all squad user arrays into a single array
                    const mergedSquadUsers = allSquadUsers.flat();
                    // Update the squad data with the merged user IDs
                    setSquadsData(mergedSquadUsers);
                    // console.log('Squad Users Data:', mergedSquadUsers);
                  } catch (error) {
                    console.log('Error fetching squad data:', error);
                  }
                };
               fetchSquadData();
              }, [selectedPollAudience]);

             const updatePollItems = async (pollId, items) => {
                  try {
                    const updateInput = {
                      id: pollId,
                      pollItems: items
                    };
                    const updateResponse = await API.graphql(graphqlOperation(updatePoll, { input: updateInput }));
                    console.log('Poll updated successfully✅:', updateResponse);
                    // Log the updated pollItems
                    const updatedPollItems = updateResponse.data.updatePoll.pollItems;
                    console.log('Updated Poll Items:', updatedPollItems);  
                    return true
                  } catch (error) {
                    console.log('Error updating poll items:', error);
                    return false;
                  }
                };
           const handleNotificationProduction = async (userID) =>{
             try {
              const notificationResponse = await API.graphql(
                graphqlOperation(createNotification, {
                  input: {
                    pollRequestsArray: [],
                    pollResponsesArray: [],
                    pollCommentsArray: [],
                    pollLikeResponseArray: [],
                    squadAddRequestsArray: [],
                    SquadJoinRequestArray: [],
                    userID: userID,  // Make sure this is not null
                    new: true,
                  },
                })
              );
      
             const newNotification = notificationResponse.data.createNotification;
             return newNotification
             } catch (error) {
              console.log("error producing the notification for this user", error)
             }
           }          
                    
          //Function to create poll requests for users in selected squads
          const handlePollRequestCreation = async (notificationID, userID, pollID) => {
            console.log("here is the parent poll ID",pollID )
              const pollRequestInput = {
                userID: userID,
                notificationID:notificationID, 
                ParentPollID:pollID
              };
              try {
                const response = await API.graphql(graphqlOperation(createPollRequest, { input: pollRequestInput }));
                //console.log('Poll Request created successfully:✅✅✅✅✅', response.data?.createPollRequest.id);
                const pollRequestID = response.data?.createPollRequest.id;
                return pollRequestID;
              } catch (error) {
                console.log('Error creating user poll requests', error);
                return false
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
              console.log("here are the notificationsnotifications✅", notifications)
              if (notifications.length > 0) {
                return notifications
              } else {
                    console.log("User has no notifications.");
                    return false
                    //setCurrentUserHasNotifications(false);
              }
            } catch (error) {
              console.log("error getting current user notification", error)
              return false
            }
              }
          
//handles updation the notification update to the receipients 
          const handleNotificationUpdate= async(pollRequestArray, notification_id)=>{
            try {
              const resultUpdateNotification = await API.graphql(graphqlOperation(updateNotification, {input:{id: notification_id, pollRequestsArray:pollRequestArray}}))
              //console.log("updating existing user notification successful✅", resultUpdateNotification)
              return resultUpdateNotification
             } catch (error) {
              console.log("error updating existing user notifications request to join❌", error)
             }
          }

      //   const handlePollRequestUpdate = async(pollRequestID, pollID)=>{
      //     if (pollRequestID) {
      //       // Update the Poll field in the PollRequest with the pollId
      //       const updatePollRequestInput = {id: pollRequestID,Poll: {id: pollID}};
      //       try {
      //        const results =  await API.graphql(graphqlOperation(updatePollRequest,{ input: updatePollRequestInput}));
      //        console.log("here is the results of updating the pollRequest", results)
      //        return results
      //       } catch (error) {
      //         console.log("there has been an error updating the poll request", error)
      //         return false;
      //       }
      //   }else{
      //     console.log("Poll request ID faulty")
      //     return false;
      //   }
       

      // }
          // // Function to create notifications for users in selected squads
         
          //create a connection between the user's squad and the poll 
          const handleSquadPollCreation = async (pollID, selectedPollAudience) => {
            try {
              // Step 1: Filter out "Public" from the selected poll audience
              const squadsOnly = selectedPollAudience.filter(audience => audience.key !== 'public');
          
              // Step 2: Iterate over the squads and create squad poll for each selected squad
              for (const squad of squadsOnly) {
                const squadId = squad.key; // Assuming the squad ID is stored in the 'value' field
          
                const squadPollCreationResults = await API.graphql(graphqlOperation(createSquadPoll, { input: {
                  pollId: pollID,
                  squadId: squadId
                }}));
          
                console.log(`Squad poll created for squad ID ${squadId}:`, squadPollCreationResults);
              }
          
              return true; // Successfully created squad polls for all selected squads
            } catch (error) {
              console.log('Error creating squad poll:', error);
              return false;
            }
          };
          
//incrementing the number of polls for the user
          const incrementNumOfPollsForUser = async (userId, updatedNumOfPolls) => {
            try {
              // Update the user with the incremented numOfPolls
              await API.graphql(graphqlOperation(updateUser, {
                input: {
                  id: userId,
                  numOfPolls: updatedNumOfPolls,
                }
              }));
              //console.log('User numOfPolls updated successfully:✅✅', updatedNumOfPolls);
              return true;
            } catch (error) {
              console.log('Error updating numOfPolls for user:', error);
            return false;
            }
          };
    //handle clearing the input after poll creation
          const handleInputClear = async()=>{
            try {
              setCaption("");
              setPollOptionData([])
              setSelected("")
              return true
            } catch (error) {
              console.log("error clearing the input after polling", error)
              return false
            }
          }
  // NotificationBussinessLogic calls the notification creation and update once for all users
const NotificationBussinessLogic = async (pollId) => {
  try {
    // Pass the `squadsData` (the list of squad members) to the notification handling function
    const notificationUpdateResult = await handleNotificationCreationAndUpdate(pollId);
    if (notificationUpdateResult === true) {
      console.log("All notifications and poll requests were handled successfully.");
    } else {
      console.log("There was an error handling the notifications.");
    }

    return notificationUpdateResult;
  } catch (error) {
    console.log("Error in NotificationBussinessLogic:", error);
    return false;
  }
};

// handleNotificationCreationAndUpdate will handle all notifications for the entire `squadsData`
const handleNotificationCreationAndUpdate = async (pollID) => {
  try {
    // Iterate through all the users of the selected squads (stored in squadsData)
    for (const squadMemberID of squadsData) {
      // Step 1: Check if the user already has a notification
      const existingNotifications = await checkIfUserHasNotification(squadMemberID);

      if (existingNotifications === false || existingNotifications.length === 0) {
        console.log(`User ${squadMemberID} has no existing notification. Creating a new notification.`);

        // Step 2: If no notification exists, create a new notification
        const notification = await handleNotificationProduction(squadMemberID);

        // Step 3: Create poll request associated with this new notification
        if (notification && notification.length > 0) {
          const notification_id = notification[0].id;
          const pollRequestID = await handlePollRequestCreation(notification_id, squadMemberID, pollID);

          // Step 4: Initialize a new pollRequestsArray if it's the first request
          const pollRequestArray = notification[0].pollRequestsArray || [];
          pollRequestArray.push(pollRequestID);

          // Step 5: Update the notification with the new poll request
          const updateNotificationResult = await handleNotificationUpdate(pollRequestArray, notification_id);
          console.log(`Notification created and updated for user ${squadMemberID}`, updateNotificationResult);
        }
      } else {
        // Step 6: If the user already has a notification, update the existing notification
        const notification = existingNotifications[0];
        const notification_id = notification.id;

        // Step 7: Create a new poll request
        const pollRequestID = await handlePollRequestCreation(notification_id, squadMemberID, pollID);

        // Step 8: Update the pollRequestsArray in the existing notification
        const pollRequestArray = notification.pollRequestsArray || [];
        pollRequestArray.push(pollRequestID);

        // Step 9: Update the existing notification with the new poll request
        const updateNotificationResult = await handleNotificationUpdate(pollRequestArray, notification_id);
        console.log(`Notification updated for user ${squadMemberID}`, updateNotificationResult);
      }
    }

    console.log('All poll requests and notifications handled successfully.');
    return true;

  } catch (error) {
    console.log('Error handling notifications and poll requests:', error);
    return false;
  }
};

  const handlePublicPollVotes = (pollOptions, pollAudience) => {
    // Step 1: Check if "Public" is among the pollAudience
    const isPublicSelected = pollAudience.some(audience => audience.key === 'public');
  
    // Step 2: Transform pollOptions to include unique IDs and initialize votes
    const updatedOptions = pollOptions.map((item, index) => ({
      id: index + 1, // Assign unique IDs starting from 1
      title: item.title, // Keep the title as is
      votes: 0, // Initialize votes with 0
    }));
  
    // Step 3: If Public is selected, generate a total number of votes greater than 10,000
    if (isPublicSelected) {
      const totalVotes = Math.floor(Math.random() * 9001) + 1000000; // Generate a random number between 10,000 and 19,000
      console.log('Total Votes (Public Poll):', totalVotes);
  
      // Step 4: Calculate random votes for each poll option
      let remainingVotes = totalVotes;
      const updatedVotesOptions = updatedOptions.map((option, index) => {
        if (index === updatedOptions.length - 1) {
          // Assign the remaining votes to the last option
          return { ...option, votes: remainingVotes };
        } else {
          const randomVotes = Math.floor(Math.random() * (remainingVotes / 2)); // Assign a random number to the option (not more than half the remaining votes)
          remainingVotes -= randomVotes; // Decrease the remaining votes
          return { ...option, votes: randomVotes };
        }
      });
  
      // Return the poll options with assigned votes
      return updatedVotesOptions;
    }
  
    // If Public is not selected, return the updated poll options with votes initialized to 0
    return updatedOptions;
  };
  
      //handle poll creation
      const handlePollCreation = async () => {
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
                    };
                    const squadId = user.userPrimarySquad[0]
                    //console.log("here is  the squad id", squadId)
                    const response = await API.graphql(graphqlOperation(createPoll, { input: pollInput }));
                   if (response.data && response.data.createPoll) {
                     const pollId = response.data.createPoll.id;
                    //   console.log('Poll created successfully:', response.data.createPoll);   
                     const userID = user.id
                    const updatedOptions = handlePublicPollVotes(pollOptionData, selectedPollAudience);
                    const updatePollItemResults = await updatePollItems(pollId, updatedOptions);
                    if(updatePollItemResults !==false){
                      console.log("here is the updated poll results", updatePollItemResults)
                      const squadPollCreationResults = await handleSquadPollCreation(pollId, selectedPollAudience)
                      if(squadPollCreationResults !== false){
                        const updatedNumOfPolls = (user.numOfPolls || 0) + 1;
                        const incrementNumOfPollForUserResults =  await incrementNumOfPollsForUser(user.id, updatedNumOfPolls);
                        if(incrementNumOfPollForUserResults !==false){
                          const clearPOllInputSuccessfull = await handleInputClear()
                          if(clearPOllInputSuccessfull === true){
                            console.log("successful poll creation")
                          }else{
                            console.log("unsuccessful clearance of the poll input")
                          }
                        }else{
                          console.log("error incrementing the number of the poll for the user")
                        }

                      }else{
                        console.log("error creation squad poll creaton ")
                      }

                    }else{
                      console.log("error updating the poll items")
                    }
                    
                    const notificationUpdate = await NotificationBussinessLogic(pollId)
                    if(notificationUpdate === true){
                      //Alert.alert("hey yah!")
                      navigation.navigate('RootNavigation', { screen: 'Profile' });
                    }else{
                      console.log("there was an error with notification update")
                    }

                    
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
                //horizontal = {true}
                renderItem={renderPOllOptionDataItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.optionList}
                  />
                <View style={styles.pollAudienceContainer}>
                  <MultiSelect
                    style={styles.pollAudienceDropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={pollAudience} // Use the updated poll audience data
                    labelField="label"
                    valueField="key"
                    placeholder="Select poll audience"
                    value={selectedPollAudience} // Array of selected options
                    search
                    searchPlaceholder="Search squads..."
                    onChange={(item) => {
                      setSelectedPollAudience(item); // Update selected items
                    }}
                    renderLeftIcon={() => (
                      <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                      />
                    )}
                    renderItem={renderDataItem} // Function to render each squad/item
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={styles.selectedStyle}>
                          <Text style={styles.textSelectedStyle}>{item.label}</Text>
                          <AntDesign color="black" name="delete" size={17} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
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
              marginTop:-10,
              marginBottom:11.5,
              
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
            marginTop: 1,
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
            backgroundColor: 'white',
            marginBottom: 10,
            marginRight: 15,
            paddingHorizontal: 12,
            paddingVertical: 2,
            marginLeft:57,
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
          },
          optionList: {
            maxHeight: 200, // Adjust this height as needed
            width: '60%',
            marginTop: -10,
            marginBottom: 10, 
            marginLeft: -10
          },
          pollAudienceContainer: {
            zIndex: 1099,  // Ensure the dropdown is above other components
            marginTop: -20
          },
          pollAudienceDropdown: {
            zIndex: 100,  // Same here to avoid conflicts
            height: 50,
            width: 350,
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
            marginBottom: 20,
            marginLeft: 40
          },
         
          })

          export default WordPollCreationScreen

