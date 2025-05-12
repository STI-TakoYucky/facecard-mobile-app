import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { signIn } from '../firebase/db';

export default function LoginComponent({setLoggedIn}) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const result = await signIn(email, password);
    let errorMessage = "Login failed";

    if (!result.success) {
      switch (result.code) {
        case "auth/invalid-email":
          errorMessage = "Email format is incorrect.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password.";
          break;
        default:
          errorMessage = result.message || "Something went wrong. Please try again.";
      }
      Toast.show({
        type: 'error',
        text1: 'Login failed.',
        text2: errorMessage,     
      });
      setLoggedIn(false);
      } 
      else {  
        console.log(data);
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Registered Successfully!',
          });
        setLoggedIn(true);
      }
    }

  return (
    <View className="flex">
      {/* Email */}
      <View className="relative mb-8">
        <Controller
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                className="px-3 py-4 text-base border rounded-lg border-dark-800 text-dark-800"
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
                className="px-3 py-4 text-base border rounded-lg border-dark-800 text-dark-800"
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
        className="py-3 mt-2 rounded-lg bg-dark-800"
      >
        <Text className="font-bold text-center text-white">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
