import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

export const openImagePickerAndGetUri = (): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar Imagem',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Tirar foto',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
        permissionDenied: {
          title: 'Permissão negada',
          text: 'Permissão necessária para poder atualizar a foto',
          reTryTitle: 'Tentar novamente',
          okTitle: 'Tenho certeza',
        },
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      response => {
        if (response.didCancel) {
          resolve(undefined);
          return;
        }
        if (response.error) {
          reject(new Error(`Erro ao carregar imagem ${response.error}`));
          return;
        }
        ImageCropPicker.openCropper({
          path: response.uri,
          width: 180,
          height: 180,
          cropping: true,
        })
          .then(croppedImage => {
            resolve(croppedImage.path);
          })
          .catch(() => {
            resolve(response.uri);
          });
      },
    );
  });
};
