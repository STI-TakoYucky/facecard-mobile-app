import { View, Text, Pressable, Modal, Alert } from 'react-native';
import React, { useEffect, useReducer } from 'react';

export default function EditChecklist({
  setEditChecklist,
  isEditChecklistActive,
  setMarkedDates,
  selectedDate,
  markedDates
}) {
  const skincareProducts = ["Cleanser", "Moisturizer", "Exfoliate", "Serum"];

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

  // Initialize reducer with empty values (will be replaced on mount)
  const [state, dispatch] = useReducer(reducer, {
    Cleanser: false,
    Moisturizer: false,
    Exfoliate: false,
    Serum: false
  });

  // When selectedDate or markedDates change, reset reducer state
  useEffect(() => {
    const routines = markedDates?.[selectedDate]?.routines || {};
    const initial = skincareProducts.reduce((acc, item) => {
      acc[item] = routines[item] || false;
      return acc;
    }, {});
    dispatch({ type: "RESET", payload: initial });
  }, [selectedDate, markedDates]);

  const skincareProductCheckboxHandler = (product) => {
    dispatch({ type: product });
  };

  const handleConfirm = () => {
    
    setMarkedDates((prev) => ({
      ...prev,
      [selectedDate]: {
        routines: { ...state },
      },
    }));
    setEditChecklist(false);
  };

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
                <Pressable key={index} onPress={() => skincareProductCheckboxHandler(product)}>
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
