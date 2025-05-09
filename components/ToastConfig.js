import { BaseToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#28a745', // green
        paddingVertical: 15,
        minHeight:80
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D3B75',
      }}
      text2Style={{
        fontSize: 16,
        color: '#2D3B75',
        flexWrap: 'wrap',
        flexShrink: 1,
      }}
      text2NumberOfLines={0} // allow unlimited lines
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#e86470', // red
        paddingVertical: 15,
        minHeight:80
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D3B75',
      }}
      text2Style={{
        fontSize: 16,
        color: '#2D3B75',
        flexWrap: 'wrap',
        flexShrink: 1,
      }}
      text2NumberOfLines={0}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#17a2b8', // blue
        paddingVertical: 15,
        minHeight:80
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D3B75',
      }}
      text2Style={{
        fontSize: 16,
        color: '#2D3B75',
        flexWrap: 'wrap',
        flexShrink: 1,
      }}
      text2NumberOfLines={0}
    />
  ),
};
