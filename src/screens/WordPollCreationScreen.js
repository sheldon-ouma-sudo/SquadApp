          import { ActivityIndicator, View, Text, KeyboardAvoidingView, StyleSheet,Image, 
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
          import { getNotification, getSquad, getUser, notificationsByUserID, squadUsersBySquadId } from '../graphql/queries';
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
          const [selectedPollAudience, setSelectedPollAudience] = useState([])
          const[pollAudience, setPollAudience] = useState([])
          const [idCounter, setIdCounter] = useState(1);
          const [squadsData, setSquadsData] = useState([]);
          const [userID, setUserID]= useState("")
          const [loading, setLoading] = useState(null)
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
                  // console.log('Selected value:', val);
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
     
                        const userID = user.id
                        const backendUserQuery = await API.graphql(graphqlOperation(getUser, {id: userID}))
                        const backendUser = backendUserQuery.data?.getUser
                        // console.log("here is the backend user", backendUser)
                        const primarySquadArray = backendUser.userPrimarySquad || [];
                        const nonPrimarySquadArray = backendUser.nonPrimarySquadsCreated || [];
                        const squadArray = [...primarySquadArray, ...nonPrimarySquadArray]; 
                        // console.log("here is the squad array", squadArray)
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
                          // console.log("here is the squad data", squadsData)
                          const filteredSquads = squadsData.filter(squad => squad !== null);
                        // console.log("here is the filtered squads", filteredSquads)
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
                      // console.log("here is the selectedPollAudience", selectedPollAudience)
                      try {
                        const user_id = user.id;
                        setUserID(user_id);
                  
                        // Ensure selectedPollAudience is an array
                        if (!Array.isArray(selectedPollAudience)) {
                          console.log('Selected poll audience is not an array.');
                          return;
                        }
                  
                        // Filter out "Public" from the selected poll audience
                        const selectedSquads = selectedPollAudience.filter(audience => audience.key !== 'public'); // Exclude 'public' audience
                  
                        if (selectedSquads.length === 0) {
                          console.log('No squads selected for poll audience.');
                          return;
                        }
                  
                        let allSquadUsers = [];
                        
                        for (const squadID of selectedSquads) {
                          // console.log('Processing squad with ID:', squadID);
                          try {
                            // Fetch squad users for each selected squad
                            const response = await API.graphql(graphqlOperation(squadUsersBySquadId, { squadId: squadID }));
                            // console.log("here is the response", response);
                  
                            const squadUsersData = response.data?.squadUsersBySquadId?.items;
                  
                            if (squadUsersData) {
                              // Extract user IDs from the squad users data
                              const userIDs = squadUsersData.map(user => user.userId);
                              allSquadUsers = [...allSquadUsers, ...userIDs]; // Combine user IDs
                            }
                          } catch (error) {
                            console.log(`Error fetching users for squad ID: ${squadID}`, error);
                          }
                        }
                        // console.log("here is all the squad users before setting up squadData", allSquadUsers)
                        setSquadsData(allSquadUsers); // Set the user IDs of squad members
                        console.log("All squad users: ", allSquadUsers); // Log to check the final array of squad users
                      } catch (error) {
                        console.log('Error fetching squad data:', error);
                      }
                        }
                  
                    if (selectedPollAudience.length > 0) {
                      fetchSquadData();
                    }
                  }, [selectedPollAudience]);
              
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
            const localUser = user.userName
            const message = `${localUser} has sent you a poll request`
              const pollRequestInput = {
                ParentPollID:pollID,
                userID: userID,
                notificationID:notificationID, 
                message: message
                
              };
              try {
                const response = await API.graphql(graphqlOperation(createPollRequest, { input: pollRequestInput }));
                // console.log('Poll Request created successfully:✅✅✅✅✅', response.data?.createPollRequest.id);
                const pollRequestID = response.data?.createPollRequest.id;
                return pollRequestID;
              } catch (error) {
                console.log('Error creating user poll requests', error);
                return false
              }  
          };
       
          const checkIfUserHasNotification = async (user_ID) => {
            try {
              const notificationQueryResult = await API.graphql(
                graphqlOperation(notificationsByUserID, { userID: user_ID })
              ); 
          
              const notifications = notificationQueryResult.data?.notificationsByUserID.items;
              
              // console.log("The user has notifications✅", notifications);
              
              if (notifications && notifications.length > 0) {
                // If there are any notifications, return the entire array
                return notifications;
              } else {
                console.log("User has no notifications.");
                return false;
              }
            } catch (error) {
              console.log("Error getting current user notification", error);
              return false;
            }
          };
          
          
//handles updation the notification update to the receipients 
          const handleNotificationUpdate= async(pollRequestArray, notification_id)=>{
            try {
              // console.log("here is the updated poll request array", pollRequestArray)
              const resultUpdateNotification = await API.graphql(graphqlOperation(updateNotification, {input:{id: notification_id, pollRequestsArray:pollRequestArray}}))
              const newNotificationQuery = await API.graphql(graphqlOperation(getNotification, {id: notification_id}))
              const newNotification = newNotificationQuery.data?.getNotification
              // console.log("here is the updated notification",newNotification)
              return resultUpdateNotification
             } catch (error) {
              console.log("error updating existing user notifications request to join❌", error)
             }
          }

     
          //create a connection between the user's squad and the poll 
          const handleSquadPollCreation = async (pollID, selectedPollAudience) => {
            // console.log("here is the selectedPollAudience in handle squad poll creation", selectedPollAudience)
            try {
              // Step 1: Filter out "Public" from the selected poll audience
              const squadsOnly = selectedPollAudience.filter(audience => audience&& audience !== 'public');
              // console.log("Filtered squads:", squadsOnly);
          
              if (squadsOnly.length === 0) {
                // console.log("No squads selected, skipping squad poll creation.");
                return false;  // Nothing to create, but not an error
              }else{
          
              // Step 2: Iterate over the squads and create squad poll for each selected squad
              for (const squadID of squadsOnly) {
                if (!squadID) {
                  console.log("Missing squadId for squad:", squadID);
                  continue; // Skip if squadId is undefined
                }

                


          
                const squadPollCreationResults = await API.graphql(graphqlOperation(createSquadPoll, {
                  input: {
                    pollId: pollID,
                    squadId: squadID,
                  },
                }));
          
                console.log(`Squad poll created for squad ID ${squadID}: ✅✅✅`, squadPollCreationResults.data?.createSquadPoll);
              }
          
              return true; // Successfully created squad polls for all selected squads
            }
            } catch (error) {
              console.log('Error creating squad poll:', error.message || error);
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
    // console.log("before iteration here is the squadDAta", squadsData)
    for (const squadMemberID of squadsData) {
      // console.log("here is the squadMember ID", squadMemberID)
       // Fetch and print details of the user
       const userResponse = await API.graphql(graphqlOperation(getUser, { id: squadMemberID }));
       const squadUser = userResponse.data?.getUser;
       const squadUserName = squadUser.userName
      //  console.log("here is the squad user✅✅",squadUserName )
      // Step 1: Check if the user already has a notification
      const existingNotifications = await checkIfUserHasNotification(squadMemberID);

      
      if (!existingNotifications || existingNotifications.length === 0){
        console.log(`User ${squadUserName} has no existing notification. Creating a new notification.`);
        // Step 2: If no notification exists, create a new notification
        const notification = await handleNotificationProduction(squadMemberID);

        // Step 3: Create poll request associated with this new notification
        if (notification && notification.length > 0) {
          const notification_id = notification[0].id;
          const pollRequestID = await handlePollRequestCreation(notification_id, squadMemberID, pollID);

          // Step 4: Initialize a new pollRequestsArray if it's the first request
          const pollRequestArray = notification[0].pollRequestsArray || [];
          pollRequestArray.push(pollRequestID);
          console.log("here is the poll request array", pollRequestArray)
          // Step 5: Update the notification with the new poll request
          const updateNotificationResult = await handleNotificationUpdate(pollRequestArray, notification_id);
          console.log(`Notification created and updated for user ${squadMemberID}`, updateNotificationResult);
        }
      } else {
        // Step 6: If the user already has a notification, update the existing notification
        const notification = existingNotifications[0];
        const notification_id = notification.id;
        console.log(`User ${squadUserName} and here it is: ${notification}`);
        // Step 7: Create a new poll request
        const pollRequestID = await handlePollRequestCreation(notification_id, squadMemberID, pollID);
        console.log(`User ${squadUserName} has successfully been created a new poll request and here it is: ${pollRequestID}`)
        // Step 8: Update the pollRequestsArray in the existing notification
        const pollRequestArray = notification.pollRequestsArray || [];
        console.log(`User ${squadUserName}'s pollRequests array before update ${pollRequestArray}`)
        pollRequestArray.push(pollRequestID);
        console.log(`User ${squadUserName}'s pollRequests array after locall update before backend update ${pollRequestArray}`)
        // Step 9: Update the existing notification with the new poll request
        const updateNotificationResult = await handleNotificationUpdate(pollRequestArray, notification_id);
       console.log(`Notification updated for user ${squadUserName}`, updateNotificationResult);
      }
    }

    console.log('All poll requests and notifications handled successfully.');
    return true;

  } catch (error) {
    console.log('Error handling notifications and poll requests:', error);
    return false;
  }
};

      const handlePollItemsUpdate = async (pollId, pollOptions, pollAudience) => {
        try {
          // Step 1: Check if "Public" is selected in the poll audience
          const isPublicSelected = selectedPollAudience.includes('public');
          console.log("Is 'Public' Selected:", isPublicSelected);
      
          // Step 2: Initialize total votes (above 100,000)
          let totalVotes = 0;
          let remainingVotes = 0;
          let updatedOptions = [];
          let isPublic = false
          let totalNumOfLikes = 0
      
          if (isPublicSelected) {
            // Step 3: If public is selected, generate a random number of total votes
            totalVotes = Math.floor(Math.random() * 900001) + 100000; // Random total votes between 100,000 and 1,000,000
            remainingVotes = totalVotes;
            isPublic = true
            // Step 4: Assign a random but fair portion of the remaining votes to each option
            updatedOptions = pollOptions.map((option, index) => {
            let votesForOption = 0;
      
              // If it's the last option, assign all remaining votes to balance the total
              if (index === pollOptions.length - 1) {
                votesForOption = remainingVotes;
              } else {
                // Assign a random portion of the remaining votes (e.g., between 10% and 50%)
                const maxPortion = Math.floor(remainingVotes * 0.5); // Cap at 50% of remaining votes
                votesForOption = Math.floor(Math.random() * maxPortion) + Math.floor(remainingVotes * 0.1); // At least 10%
                remainingVotes -= votesForOption; // Subtract the assigned votes from remaining votes
              }
      
              // Log out each poll option and the assigned votes
              console.log(`Option ${option.title}: Assigned Votes = ${votesForOption}`);
      
              return {
                ...option,
                votes: votesForOption,
              };
            });
               // Step 5: Calculate random likes between 20% and 60% of total votes
          const randomPercentage = Math.random() * (0.6 - 0.2) + 0.2; // Generate a random percentage between 20% and 60%
          const numOfLikes = Math.floor(totalVotes * randomPercentage); // Calculate likes based on the total votes
          // Log the updated options, total votes, and number of likes before formatting
          console.log('Updated Options:', updatedOptions);
          console.log('Total Votes (before formatting):', totalVotes);
          console.log('Number of Likes:', numOfLikes);
          totalNumOfLikes = numOfLikes
          } else {
            // If it's not public, just return the poll options with 0 votes for each
            updatedOptions = pollOptions.map(option => ({
              ...option,
              votes: 0,
            }));
      
            // Log out each poll option with 0 votes
            updatedOptions.forEach(option => {
              console.log(`Option ${option.title}: Assigned Votes = 0`);
            });
          }
          // Step 6: Format the options into JSON before updating the backend
          const formattedItems = updatedOptions.map(item => JSON.stringify(item)); // Ensure JSON format
      
          // Log formatted items
          console.log('Formatted Items:', formattedItems);
      
          // Step 7: Update the poll in the backend with the distributed votes, total votes, and likes
          const updateInput = {
            id: pollId,
            pollItems: formattedItems,
            totalNumOfVotes: totalVotes, // Set total votes for public poll
            numOfLikes: totalNumOfLikes, // Set number of likes based on the percentage of total votes
            public: isPublic
          };
          const updateResponse = await API.graphql(graphqlOperation(updatePoll, { input: updateInput }));
          console.log('Poll updated successfully:', updateResponse);
      
          return true;
        } catch (error) {
          console.error('Error updating poll items:', error);
          return false;
        }
      };
      
      
      
      
      const handlePollCreation = async () => {
        setLoading(true);
        try {
          // Create the poll without poll items for now
          const pollInput = {
            totalNumOfVotes: 0,
            pollMedia: [],
            numOfLikes: 0,
            closed: false,
            open: true,
            pollAudience: pollAudience,
            pollCaption: caption,
            pollItems: [], // Start with an empty array and update later
            pollLabel: selected,
            superPoll: false, 
            pollScore: 0,
            userID: user.id,
          };
      
          const response = await API.graphql(graphqlOperation(createPoll, { input: pollInput }));
          if (response.data && response.data.createPoll) {
            const pollId = response.data.createPoll.id;
            console.log("Poll created successfully", pollId);
    
            // Step 2: Update poll items with votes
            const pollItemsUpdated = await handlePollItemsUpdate(pollId, pollOptionData, selectedPollAudience);
            if (pollItemsUpdated) {
              console.log("Poll items updated successfully");
    
              // Step 3: Create squad polls
              const squadPollCreated = await handleSquadPollCreation(pollId, selectedPollAudience);

              if (squadPollCreated) {
                console.log("Squad poll created successfully", squadPollCreated);
    
                // Step 4: Handle notification creation and updates
                const notificationsHandled = await NotificationBussinessLogic(pollId);
                if (notificationsHandled) {
                  console.log("Notifications handled successfully");
    
                  // Step 5: Update the user’s poll count
                  const userUpdated = await incrementNumOfPollsForUser(user.id, user.numOfPolls + 1);
                  if (userUpdated) {
                    console.log("User poll count updated successfully");
    
                    // Step 6: Clear input fields after successful poll creation
                    const inputCleared = await handleInputClear();
                    if (inputCleared) {
                      console.log("Inputs cleared successfully");
    
                      // Step 7: Show success (checkmark animation could be added here)
                      Alert.alert('Success', 'Poll created successfully!');
    
                      // Step 8: Navigate to the Profile screen to show the new poll
                      navigation.navigate('RootNavigation', { screen: 'Profile' });
                    } else {
                      console.log("Failed to clear poll inputs.");
                    }
                  } else {
                    console.log("Failed to update user poll count.");
                  }
                } else {
                  console.log("Failed to handle notifications.");
                }
              } else {
                console.log("Failed to create squad poll.");
              }
            } else {
              console.log("Failed to update poll items.");
            }
          } else {
            console.log("Poll creation failed.");
          }
        } catch (error) {
          console.log('Error during poll creation:', error);
          Alert.alert('Error', 'Something went wrong while creating the poll.');
        } finally {
          setLoading(false); // End loading
        }
      };
            
            return (
              <KeyboardAvoidingView
              style={styles.container}
              behavior="padding"
              > 
               {loading && ( // Show full-screen activity indicator when loading
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#1764EF" />
                </View>
                )}
              <View style={styles.pollContentStyles}>
                <Text style={styles.pollContentCaption}>Poll Question</Text>
              </View>
              <TextInput
                placeholder ="Type your poll caption here..."
                value={caption}
                onChangeText={text =>setCaption(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
                style={styles.input}
                textAlignVertical={"top"}
                multiline
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
                onChange={(items) => {
                  // Log the selected items to confirm their structure
                console.log("Selected Poll Audience:", items);
                setSelectedPollAudience(items); // Update selected items
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
         
              <TouchableOpacity onPress={handlePollCreation} style={styles.button}>
                <Text style={styles.buttonText}> Create Poll</Text>
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
            loadingOverlay: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              zIndex: 1000,
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
            marginLeft:-20,
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
            marginLeft: 10
          },
         
          })

          export default WordPollCreationScreen

