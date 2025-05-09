import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';

export default function LoginComponent({setLoggedIn}) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Registered Successfully!',
      });
    setLoggedIn(true)
  };

  return (
    <View className="flex">
      {/* Email */}
      <View className="mb-8 relative">
        <Controller
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            )}
            name="email"
        />
        {errors.email && <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4">{errors.email.message}</Text>}
      </View>

      {/* Password */}
      <View className="relative mb-8">
        <Controller
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
            />
            )}
            name="password"
        />
        {errors.password && <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4">{errors.password.message}</Text>}
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-dark-800 py-3 rounded-lg mt-2"
      >
        <Text className="text-white text-center font-bold">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
