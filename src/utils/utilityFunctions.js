export const validate = (type, value) => {
  switch (type) {
    case "name":
    case "firstName":
    case "lastName":
    case "nombre":
    case "surname":
    case "cognom":
      if (value.length < 2) {
        return "Name has to be at least 2 characters long";
      }

      return "";

    case "email":
    case "e-mail":
    case "correo":
    case "mail":
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!emailRegex.test(value)) {
        return "Email format must be correct!";
      }

      return "";

    case "password":
    case "contraseña":
      if (value < 6 || value > 10) {
        return "Password has to be between 6 and 10 characters long";
      }

      return "";
    default:
      console.log("whattttttttttt???");
  }
};