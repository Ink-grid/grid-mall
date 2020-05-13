import React, { Component } from 'react';
import { Container,Left,Title, Text,Button,Icon, Header, Content, Form, Item, Input, Label } from 'native-base';
export default class Perfil extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title style={{position}}>PERFIL</Title>
        </Header>
        
          <Button >
            <Icon name="arrow-back"></Icon>
          </Button>
          
         
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