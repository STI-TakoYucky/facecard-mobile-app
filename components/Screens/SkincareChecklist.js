import { View, Text, Pressable, ScrollView, Modal, Alert } from 'react-native'
import React, {useReducer, useEffect} from 'react'

export default function SkincareChecklist({setChecklistActive, isChecklistActive, setMarkedDates, selectedDate, markedDates}) {

        //used for the map function
        const skincareProducts =[
          "Cleanser",
          "Moisturizer",
          "Exfoliate",
          "Serum"
        ]

      // Reset state when the modal opens
      useEffect(() => {
        if (isChecklistActive) {
          // Reset the state to all false (unchecked checkboxes)
          dispatch({ type: "RESET" });
        }
      }, [isChecklistActive]);
      
      function reducer(state, action) {

        if (action.type === "RESET") {
          // Reset all checkboxes to false
          return {
            "Cleanser": false,
            "Moisturizer": false,
            "Exfoliate": false,
            "Serum": false
          };
        }
    
        if (!skincareProducts.includes(action.type)) {
          throw new Error("Unknown action.");
        }
      
        return {
          ...state,
          [action.type]: !state[action.type], // toggles the value
        };
      }

  const [state, dispatch] = useReducer(reducer, 
    {
      "Cleanser": false,
      "Moisturizer": false,
      "Exfoliate": false,
      "Serum": false
    }
  );
  

  const skincareProductCheckboxHandler = (product) => {
    dispatch({ type: product })
  }

  const handleConfirm = () => {
    
    // Update the marked dates outside of the reducer
    setMarkedDates((prev) => ({
      ...prev,
      [selectedDate]: { 
        routines: {
          "Cleanser": state["Cleanser"],
          "Moisturizer": state["Moisturizer"],
          "Exfoliate": state["Exfoliate"],
          "Serum": state["Serum"],
        },
      },
    }));
    // Close the checklist modal after confirming
    setChecklistActive(false);
  }
    
  return (
    <Modal
        transparent
        animationType="fade"
        visible={isChecklistActive}
        onRequestClose={() => setChecklistActive(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="w-[24rem] bg-white rounded-2xl py-6 px-[2rem] shadow-xl justify-between">
            <View>
              <Text className="text-2xl font-semibold mb-4 text-dark-800">
                Have you done your skincare today?
              </Text>
              <View className="my-2 gap-[1.5rem]">
                {
                  skincareProducts.map((product, index) => {
                    return (
                      <Pressable onPress={() => {skincareProductCheckboxHandler(product)}}  index={index}>
                      <View className="flex flex-row items-center gap-2">
                        <View className={`w-[2rem] h-[2rem] border-dark-800 ${state[product] ? "bg-dark-800": 'bg-white'} border-[3px] rounded-full`}></View>
                        <Text className="text-dark-800 text-base">{product}</Text>
                      </View>
                      </Pressable>
                    )
                  })
                }
              </View>
            </View>
            <View className="flex flex-row gap-2 justify-end">
              <Pressable  onPress={() => setChecklistActive(false)}>
                <Text className=" bg-white border border-dark-800 rounded-md px-4 py-[.49rem] shadow-sm">
                  Cancel
                </Text>
              </Pressable>
              <Pressable  onPress={handleConfirm}>
                <Text className="bg-dark-800 text-white text-base py-2 px-4 rounded-md">
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  )
}