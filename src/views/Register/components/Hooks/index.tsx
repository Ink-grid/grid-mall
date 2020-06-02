import { useState } from "react";
import useDidUpdate from "../../../../components/useDidUpdate";

// const UseDidUpdate = (callback: () => void, dependencie: any[]) => {
//   useDidUpdate(() => {
//     callback();
//   }, dependencie);
// };

// export default class Hooks {
//     constructor(){}

//     useError = (data: {data: string, status: boolean}) => {

//     }
// }

type status = {
  status: null | boolean;
  show: boolean;
};

const phoneValid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
const emailValid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

const useDidError = (data: any) => {
  const [isError, setError] = useState<status>({ status: null, show: false });
  const validatedString = (data: any) => {
    if (typeof data === "string") {
      if (data.length < 3) {
        setError({ status: false, show: true });
      } else {
        setError({ status: true, show: false });
      }
    }
    if (typeof data === "object") {
      if (data.length === 0) {
        setError({ status: false, show: true });
      } else {
        setError({ status: true, show: false });
      }
    }
  };
  useDidUpdate(() => {
    validatedString(data);
  }, [data]);

  return isError;
};

const useDidPasswordLogin = (passsword: string) => {
  const [isError, setError] = useState<status>({ status: null, show: false });
  const validatedLogin = (pass: string) => {
    if (pass.length < 6) {
      setError({ status: false, show: true });
    } else {
      setError({ status: true, show: false });
    }
  };
  useDidUpdate(() => {
    validatedLogin(passsword);
  }, [passsword]);

  return isError;
};

const useDidPassword = (password: any) => {
  const [isError, setError] = useState<status>({ status: null, show: false });

  function FormatPassword(contrasenna: string) {
    if (contrasenna.length >= 6) {
      var mayuscula = false;
      var minuscula = false;
      var numero = false;
      var caracter_raro = false;

      for (var i = 0; i < contrasenna.length; i++) {
        if (
          contrasenna.charCodeAt(i) >= 65 &&
          contrasenna.charCodeAt(i) <= 90
        ) {
          mayuscula = true;
        } else if (
          contrasenna.charCodeAt(i) >= 97 &&
          contrasenna.charCodeAt(i) <= 122
        ) {
          minuscula = true;
        } else if (
          contrasenna.charCodeAt(i) >= 48 &&
          contrasenna.charCodeAt(i) <= 57
        ) {
          numero = true;
        } else {
          caracter_raro = true;
        }
      }
      if (
        mayuscula == true &&
        minuscula == true &&
        caracter_raro == true &&
        numero == true
      ) {
        return true;
      }
    }
    return false;
  }

  const validatedPassword = (password: any) => {
    if (!FormatPassword(password)) {
      setError({ status: false, show: true });
    } else {
      setError({ status: true, show: false });
    }
  };

  useDidUpdate(() => {
    validatedPassword(password);
  }, [password]);

  return isError;
};

const useDidErrorRuc = (ruc: any) => {
  const [isError, setError] = useState<status>({ status: null, show: false });
  const rucValido = (rucinput: any): boolean => {
    const rucValido = (ruc: number): boolean => {
      if (
        !(
          (ruc >= 1e10 && ruc < 11e9) ||
          (ruc >= 15e9 && ruc < 18e9) ||
          (ruc >= 2e10 && ruc < 21e9)
        )
      )
        return false;
      for (var suma = -(ruc % 10 < 2), i = 0; i < 11; i++, ruc = (ruc / 10) | 0)
        suma += (ruc % 10) * ((i % 7) + ((i / 7) | 0) + 1);
      return suma % 11 === 0;
    };
    //eliminanos los caracteres que no sean validos
    let ruc = rucinput.replace(/[-.,[\]()\s]+/g, "");
    if ((ruc = Number(ruc)) && ruc % 1 === 0 && rucValido(Number(ruc))) {
      return true;
    } else {
      return false;
    }
  };

  const validatedRuc = (ruc: any) => {
    if (ruc === "" || ruc.length < 5 || !rucValido(ruc)) {
      setError({ status: false, show: true });
    } else {
      setError({ status: true, show: false });
    }
  };

  useDidUpdate(() => {
    validatedRuc(ruc);
  }, [ruc]);

  return isError;
};

const useDidErrorPhone = (phone: string) => {
  const [isError, setError] = useState<status>({ status: null, show: false });
  const validatedPhone = (phone: string) => {
    if (!phone) return;
    if (phone === "" || phone.length < 3 || !phone.match(phoneValid)) {
      setError({ status: false, show: true });
    } else {
      setError({ status: true, show: false });
    }
  };

  useDidUpdate(() => {
    validatedPhone(phone);
  }, [phone]);

  return isError;
};

const useDidErrorEmail = (email: string) => {
  const [isError, setError] = useState<status>({ status: null, show: false });

  const validatedEmail = (email: string) => {
    if (!email) return;
    if (email === "" || email.length < 3 || !email.match(emailValid)) {
      setError({ status: false, show: true });
    } else {
      setError({ status: true, show: false });
    }
  };

  useDidUpdate(() => {
    validatedEmail(email);
  }, [email]);

  return isError;
};

export {
  useDidErrorEmail,
  useDidErrorPhone,
  useDidErrorRuc,
  useDidPassword,
  useDidError,
  useDidPasswordLogin,
};
