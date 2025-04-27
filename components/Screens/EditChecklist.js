import { View, Text, Pressable, Modal, Alert } from 'react-native';
import React, { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDate } from '../../state/markedDatesSlice/markedDatesSlice';

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
            <Text className="text-2xl font-semibold mb-4 text-dark-800">
              Have you done your skincare today?
            </Text>
            <View className="my-2 gap-[1.5rem]">
              {skincareProducts.map((product, index) => (
                <Pressable key={index} onPress={() => dispatch({ type: product })}>
                  <View className="flex flex-row items-center gap-2">
                    <View
                      className={`w-[2rem] h-[2rem] border-dark-800 ${
                        state[product] ? "bg-dark-800" : "bg-white"
                      } border-[3px] rounded-full`}
                    ></View>
                    <Text className="text-dark-800 text-base">{product}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
          <View className="flex flex-row gap-2 justify-end">
            <Pressable onPress={() => setEditChecklist(false)}>
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
  );
}
