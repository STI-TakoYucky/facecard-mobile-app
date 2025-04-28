import { View, Text, Pressable, Modal } from 'react-native'
import React, {useReducer, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addDate } from '../../state/markedDatesSlice/markedDatesSlice';


export default function SkincareChecklist({setChecklistActive, isChecklistActive, selectedDate}) {

  const dispatchMarkedDates = useDispatch();
    
  //used for the map function
  const skincareProducts =[
    "Cleanser",
    "Moisturizer",
    "Exfoliate",
    "Serum"
  ]

  //everytime the modal opens reset the useReducer
  useEffect(() => {
    if(isChecklistActive) {
      dispatch({type: "RESET"})
    }
  },[isChecklistActive])
      
  function reducer(state, action) {
    if (action.type === "RESET") {
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
      [action.type]: !state[action.type],
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

  const handleConfirm = () => {
    
    //used to change the datas on the global state  
    dispatchMarkedDates(addDate({ date: selectedDate,
        routines: {
          "Cleanser": state["Cleanser"],
          "Moisturizer": state["Moisturizer"],
          "Exfoliate": state["Exfoliate"],
          "Serum": state["Serum"],
        }}))

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
                    <Pressable onPress={() => {dispatch({ type: product })}}  key={index}>
                    <View className="flex flex-row items-center gap-2">
                      <View className={`w-[2rem] h-[2rem] border-dark-800 border-[3px] ${state[product] && "bg-dark-800"} rounded-full`}></View>
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
            <Pressable onPress={handleConfirm}>
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