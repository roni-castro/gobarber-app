import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export const openImagePickerAndGetUri = (): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const handleTakePicture = (): void => {
      ImagePicker.openCamera({
        width: 180,
        height: 180,
        cropping: true,
      })
        .then(image => {
          resolve(image.path);
        })
        .catch(error => {
          reject(new Error(`Erro ao tirar foto: ${error}`));
        });
    };

    const handleChoosePicture = (): void => {
      ImagePicker.openPicker({
        width: 180,
        height: 180,
        cropping: true,
      })
        .then(image => {
          resolve(image.path);
        })
        .catch(() => {
          resolve('');
        });
    };

    Alert.alert(
      'Selecionar Imagem',
      'Escolha uma das opções',
      [
        {
          text: 'Tirar foto',
          onPress: handleTakePicture,
        },
        {
          text: 'Escolher da galeria',
          onPress: handleChoosePicture,
        },
      ],
      { cancelable: true },
    );
  });
};
