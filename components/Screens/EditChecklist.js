import { View, Text, Pressable, Modal, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDate } from '../../state/markedDatesSlice/markedDatesSlice';
import Moisturizer from '../../assets/Moisturizer_bottle.svg';
import Cleanser from '../../assets/Cleanser_bottle.svg';
import Exfoliate from '../../assets/Exfoliator_bottle.svg';
import Serum from '../../assets/Serum_bottle.svg';
import { fonts } from '../../utils/fonts';

export default function EditChecklist({
  setEditChecklist,
  isEditChecklistActive,
  selectedDate
}) {

const dispatchMarkedDates = useDispatch();
// Get the marked dates from the global state
const markedDate = useSelector((state) => state.markedDates[selectedDate]);
const skincareProducts = ["Cleanser", "Moisturizer", "Exfoliate", "Serum"];

const initialState = skincareProducts.reduce((acc, product) => {
  acc[product] = false;
  return acc;
}, {});

function reducer(state, action) {
  if (action.type === "RESET") {
    return action.payload;
  }

  if (!skincareProducts.includes(action.type)) {
    throw new Error("Unknown action.");
  }

  return {
    ...state,
    [action.type]: !state[action.type],
  };
}

// Initialize the reducer with the marked date routines or fallback to initialState
const [state, dispatch] = useReducer(reducer, markedDate?.routines || initialState);

  const handleConfirm = () => {
    dispatchMarkedDates(addDate({ date: selectedDate,
        routines: {
          "Cleanser": state["Cleanser"],
          "Moisturizer": state["Moisturizer"],
          "Exfoliate": state["Exfoliate"],
          "Serum": state["Serum"],
        }}))
    setEditChecklist(false);
  };

  useEffect(() => {
  if (markedDate?.routines) {
    dispatch({ type: "RESET", payload: markedDate.routines });
  } else {
    dispatch({ type: "RESET", payload: initialState });
  }
}, [markedDate, selectedDate]);

  const getSkincareSVG = (key) => {
    switch (key) {
      case "Moisturizer":
        return <Moisturizer width={70} height={80}></Moisturizer>
      case "Cleanser":
        return <Cleanser width={70} height={80}></Cleanser>
      case "Exfoliate":
        return <Exfoliate width={70} height={80}></Exfoliate>
      case "Serum":
        return <Serum width={70} height={80}></Serum>
    }
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isEditChecklistActive}
      onRequestClose={() => setEditChecklist(false)}
    >
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="w-[24rem] bg-white rounded-2xl py-6 px-[2rem] shadow-xl justify-between">
          <View>
            <Text className="text-2xl font-semibold mb-4 text-dark-800" style={[fonts.HeaderFont]}>
              Did you do your skincare today?
            </Text>
            <View className="my-9 gap-[1.5rem] flex flex-row flex-wrap items-center justify-center">
                {
                  skincareProducts.map((product, index) => {
                    return (
                      <Pressable onPress={() => {dispatch({ type: product })}}  key={index}>
                      <View className="flex items-center gap-2">
                        {/* <View className={`w-[2rem] h-[2rem] border-dark-800 border-[3px] ${state[product] && "bg-dark-800"} rounded-full`}></View> */}
  
                        <View className={`flex items-center bg-white w-[8rem] rounded-lg py-3 transition-all duration-150 ${state[product] && "!bg-gray-200"}`} style={{ elevation: state[product] ? 0 : 5 }}> 
                          {getSkincareSVG(product)}
                          <Text className="text-dark-800 text-base" style={[fonts.BodyFont]}>{product}</Text>
                        </View>
    
                      </View>
                      </Pressable>
                    )
                  })
                }
              </View>
          </View>
          <View className="flex flex-row gap-2 justify-end">
            <TouchableOpacity onPress={() => setEditChecklist(false)}>
              <Text className=" bg-white border border-dark-800 rounded-md px-4 py-[.49rem]" style={[fonts.BodyFont]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm}>
              <Text className="bg-dark-800 text-white text-base py-2 px-4 rounded-md" style={[fonts.BodyFont]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
