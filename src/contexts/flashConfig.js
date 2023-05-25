import { showMessage, hideMessage } from "react-native-flash-message";

export const showFlashMessage = (message) => {
  showMessage({
    message: message,
    type: "default",
    backgroundColor: "#000000", // Personaliza el color de fondo según tus preferencias
    color: "#ffffff", // Personaliza el color del texto según tus preferencias
  });
};

export const hideFlashMessage = () => {
  hideMessage();
};
