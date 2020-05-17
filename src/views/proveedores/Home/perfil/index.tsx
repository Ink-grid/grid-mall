import React, { Component } from 'react';
import { Container,Left,Right,Title, Text,Button,Icon, Header, Content, Form, Item, Input, Label } from 'native-base';
export default class Perfil extends Component {
  render() {
    return (
      <Container>      
        <Header span>
        <Left>
          <Button >
            <Icon name="arrow-back"></Icon>
          </Button>
        </Left> 
        <Content>
          <Right>
          <Title>PERFIL</Title>
          </Right>
          </Content>
        </Header> 
                   
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item fixedLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}