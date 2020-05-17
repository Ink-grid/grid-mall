
import React, { Component } from "react";
import { Container,H1,Content,H3,Text, Header, Title,
 View,Button, Icon, Left, Right, Body,ListItem,Switch } from "native-base";
export default class AyudaSoporte extends Component {
  render() {
    return (
      <Container>
        <Header span>
          <Left>
            <Button  >
              <Icon name="arrow-back"  />
            </Button>
          </Left>
          <Content>
          <Right>
          <Body>
            <H3>Ajustes</H3>
            <H1>Ayuda y soporte</H1>
            <Text>¿Tienes alguna duda? Usa cualquiera 
            de nuestros canales para resolverlo.</Text>
          </Body>
          </Right>
          </Content>          
        </Header>
        <Content>
            <ListItem icon>
             <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Wi-Fi</Text>
            </Body>
            <Right>
              <Text>GeekyAnts</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
             <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Wi-Fi</Text>
            </Body>
            <Right>
              <Text>GeekyAnts</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
             <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Wi-Fi</Text>
            </Body>
            <Right>
              <Text>GeekyAnts</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}