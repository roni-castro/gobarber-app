import Snackbar, { SnackBarOptions } from 'react-native-snackbar';

export const showSnackBar = ({
  text,
  duration = Snackbar.LENGTH_LONG,
  ...data
}: SnackBarOptions) => {
  Snackbar.show({
    text,
    duration: duration,
    action: {
      text: 'X',
      textColor: '#FFF',
      onPress: () => {
        Snackbar.dismiss();
      },
    },
  });
};
