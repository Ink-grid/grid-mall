import React, { Component } from "react";
import { Container, View,H3,H1,Header, Title, Button, Icon, Left, Right, Body, Text,Content } from "native-base";
export default class TerminosCondiciones extends Component {
  render() {
    return (
      <Container>
       <Header span>

          <Left>
            <Button  >
              <Icon name="arrow-back"  />
            </Button>
          </Left>
          <Right>
          <View>
          <Body>

            <H3>Ajustes</H3>
            <H1>Ayuda y soporte</H1>
            <Text>¿Tienes alguna duda? Usa cualquiera 
            de nuestros canales para resolverlo.</Text>
          </Body>
          </View>
          </Right>          
        </Header>

        <Content >
          <Title>
            Normas de uso
          </Title>
          <Text>
            consideraciones generales del uso del software
          </Text>
        </Content>
      </Container>
    );
  }
}