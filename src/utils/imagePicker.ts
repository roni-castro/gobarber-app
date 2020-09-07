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
        .catch(error => {
          reject(new Error(`Erro ao carregar image: ${error}`));
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
    // ImagePicker.showImagePicker(
    //   {
    //     title: 'Selecionar Imagem',
    //     cancelButtonTitle: 'Cancelar',
    //     takePhotoButtonTitle: 'Tirar foto',
    //     chooseFromLibraryButtonTitle: 'Escolher da galeria',
    //     permissionDenied: {
    //       title: 'Permissão negada',
    //       text: 'Permissão necessária para poder atualizar a foto',
    //       reTryTitle: 'Tentar novamente',
    //       okTitle: 'Tenho certeza',
    //     },
    //     // storageOptions: {
    //     //   skipBackup: true,
    //     //   path: 'images',
    //     // },
    //   },
    //   response => {
    //     if (response.didCancel) {
    //       resolve(undefined);
    //       return;
    //     }
    //     if (response.error) {
    //       reject(new Error(`Erro ao carregar imagem ${response.error}`));
    //       return;
    //     }
    //     console.warn('response.uri', response.uri);
    //     ImageCropPicker.openCropper({
    //       path: response.uri,
    //       width: 180,
    //       height: 180,
    //       cropping: true,
    //       mediaType: 'photo',
    //     })
    //       .then(croppedImage => {
    //         resolve(croppedImage.path);
    //       })
    //       .catch(() => {
    //         resolve(response.uri);
    //       });
    //   },
    // );
  });
};
