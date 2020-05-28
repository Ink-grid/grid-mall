import * as React from "react";
import { View, Container, Icon } from "native-base";
import CardView from "./components/CardView";
import { Input } from "@ui-kitten/components";
import { useValidationCard } from "../../Hooks";
import { StyleSheet, Image, Keyboard } from "react-native";
import CardIcons from "./components/Icons";
import { useFocusEffect } from "@react-navigation/native";

type cardData = {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
  name: string;
  // email: string;
};

export interface CreditCarProps {
  onSubmit?: (
    data: cardData,
    email: string,
    isCompleted: boolean
  ) => React.ReactChild;
}

const useInputState = (initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const CreditCar: React.SFC<CreditCarProps> = (props) => {
  const { onSubmit } = props;

  const [inputExpiry, setInputExpiry] = React.useState("");
  const [inputNumberCard, setInputNumber] = React.useState("");
  const [isHideCard, setHideCard] = React.useState(true);

  const removeNonNumber = (string = "") => string.replace(/[^\d]/g, "");
  const limitLength = (string = "", maxLength: number) =>
    string.substr(0, maxLength);

  const addGaps = (string = "", gaps: any) => {
    const offsets = [0].concat(gaps).concat([string.length]);

    return offsets
      .map((end, index) => {
        if (index === 0) return "";
        const start = offsets[index - 1];
        return string.substr(start, end - start);
      })
      .filter((part) => part !== "")
      .join(" ");
  };

  const _formatExpiry = (expiry: string) => {
    const sanitized = limitLength(removeNonNumber(expiry), 4);
    if (sanitized.match(/^[2-9]$/)) {
      return `0${sanitized}`;
    }
    if (sanitized.length > 2) {
      return `${sanitized.substr(0, 2)}/${sanitized.substr(
        2,
        sanitized.length
      )}`;
    }
    return sanitized;
  };

  const _formatNumber = (number: string, card: any) => {
    if (!card) return number;
    const numberSanitized = removeNonNumber(number);
    //const maxLength = card?.card.lengths[card.card.lengths.length - 1];
    const lengthSanitized = limitLength(numberSanitized, 18);
    const formatted = addGaps(lengthSanitized, card.gaps);
    return formatted;
  };

  const inputCvc = useInputState();
  const inputName = useInputState();
  const inputApellido = useInputState();
  const inputEmail = useInputState();

  const renderIcon = (props: any) => (
    <Icon style={{ color: "#8F9BB3" }} name="creditcard" type="AntDesign" />
  );

  const [focuses, setFocuses] = React.useState("");

  const validatedCompleted = (
    card: any,
    expiry: any,
    cvc: any,
    email: any,
    name: string,
    apellido: string
  ): boolean => {
    if (
      !card ||
      !expiry ||
      !cvc ||
      !email ||
      name.length <= 2 ||
      apellido.length <= 2
    )
      return false;
    if (
      card.isValid &&
      expiry &&
      cvc &&
      email &&
      name.length > 2 &&
      apellido.length > 2
    )
      return true;
    return false;
  };

  const _showCard = () => {
    setHideCard(false);
  };

  const _hideCards = () => {
    setHideCard(true);
  };

  const { card, expiry, cvc, email } = useValidationCard(
    inputNumberCard,
    inputExpiry,
    inputCvc.value,
    inputEmail.value
  );

  useFocusEffect(
    React.useCallback(() => {
      // console.log("focus singIng");
      Keyboard.addListener("keyboardDidShow", _showCard);
      Keyboard.addListener("keyboardDidHide", _hideCards);
      return () => {
        // console.log("no focus singIng");
        Keyboard.removeListener("keyboardDidShow", _showCard);
        Keyboard.addListener("keyboardDidHide", _hideCards);
      };
    }, [])
  );

  return (
    <Container style={{ padding: 10 }}>
      {isHideCard && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          {Object.values(CardIcons)
            .filter((_, index) => index > 1 && index !== 7)
            .map((ele, index) => (
              <Image key={index} style={[s.icon]} source={ele} />
            ))
            .reverse()}
        </View>
      )}
      <View style={{ height: 230 }}>
        <CardView
          focused={focuses}
          brand={card ? card.type : "placeholder"}
          scale={100}
          //customIcons={cardBrandIcons}
          name={
            inputName.value.length !== 0 || inputApellido.value.length !== 0
              ? inputName.value + " " + inputApellido.value
              : ""
          }
          number={inputNumberCard}
          expiry={inputExpiry}
          cvc={inputCvc.value}
        />
      </View>

      <View style={{ marginTop: 15, flex: 1 }}>
        <View style={{ height: 50 }}>
          <Input
            autoFocus
            onFocus={() => setFocuses("number")}
            status={
              card !== null ? (card.isValid ? "basic" : "danger") : "basic"
            }
            maxLength={card && card.maxcard ? card.maxcard : 5}
            style={s.input}
            value={inputNumberCard}
            //{...inputCardNumber}
            onChangeText={(text) =>
              setInputNumber(_formatNumber(text, card?.card))
            }
            accessoryLeft={renderIcon}
            keyboardType="numeric"
            placeholder="Número de Tarjeta"
          />
        </View>
        <View style={s.rowContainer}>
          <Input
            //{...inputCardDate}
            value={inputExpiry}
            onChangeText={(text) => setInputExpiry(_formatExpiry(text))}
            accessoryLeft={() => (
              <Icon
                style={{ color: "#8F9BB3" }}
                name="calendar"
                type="AntDesign"
              />
            )}
            onFocus={() => setFocuses("expiry")}
            maxLength={5}
            status={expiry !== null ? (expiry ? "basic" : "danger") : "basic"}
            keyboardType="numeric"
            style={s.input}
            placeholder="MM/AA"
          />
          <Input
            onFocus={() => setFocuses("cvc")}
            {...inputCvc}
            status={cvc !== null ? (cvc ? "basic" : "danger") : "basic"}
            accessoryLeft={() => (
              <Icon
                name="md-card"
                type="Ionicons"
                style={{ color: "#8F9BB3" }}
              />
            )}
            maxLength={3}
            keyboardType="numeric"
            style={s.input}
            placeholder="CVV"
          />
        </View>

        <View style={s.rowContainer}>
          <Input
            onFocus={() => setFocuses("name")}
            {...inputName}
            status={
              inputName.value.length > 0
                ? inputName.value.length <= 2
                  ? "danger"
                  : "basic"
                : "basic"
            }
            accessoryLeft={() => (
              <Icon style={{ color: "#8F9BB3" }} name="user" type="AntDesign" />
            )}
            style={s.input}
            placeholder="Nombre"
          />

          <Input
            onFocus={() => setFocuses("name")}
            {...inputApellido}
            status={
              inputApellido.value.length > 0
                ? inputApellido.value.length <= 2
                  ? "danger"
                  : "basic"
                : "basic"
            }
            accessoryLeft={() => (
              <Icon style={{ color: "#8F9BB3" }} name="user" type="AntDesign" />
            )}
            style={s.input}
            placeholder="Apellido"
          />
        </View>
        <View>
          <Input
            onFocus={() => setFocuses("")}
            {...inputEmail}
            status={email !== null ? (email ? "basic" : "danger") : "basic"}
            accessoryLeft={() => (
              <Icon
                style={{ color: "#8F9BB3" }}
                name="email"
                type="MaterialIcons"
              />
            )}
            keyboardType="email-address"
            style={s.input}
            placeholder="Email"
          />
        </View>
        <View style={{ marginTop: 50 }}>
          {onSubmit &&
            onSubmit(
              {
                number: inputNumberCard.replace(/ /g, ""),
                exp_month: inputExpiry.split("/")[0],
                exp_year: inputExpiry.split("/")[1],
                cvc: inputCvc.value,
                name: inputName.value + " " + inputApellido.value,
                //email: inputEmail.value.toLocaleLowerCase(),
              },
              inputEmail.value.toLocaleLowerCase(),
              validatedCompleted(
                card,
                expiry,
                cvc,
                email,
                inputName.value,
                inputApellido.value
              )
            )}
        </View>
      </View>
    </Container>
  );
};

const s = StyleSheet.create({
  icon: {
    width: 40,
    height: 30,
    resizeMode: "contain",
  },
  input: {
    flex: 1,
    margin: 2,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CreditCar;
