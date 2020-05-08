# grid-mall
centro comercial online para mayoristas


## Componentes

### Badge

`Este componente permite realizar un conteo en otro componente.`
  
   ####  props
   
   ###### count: `Este parametro permite establecer el numero de conteo en el componente`
   ###### children: `Es el componente hijo que va a embolver el badge`

##### ejemplo
```
  import Badge from '../component/badge'
  const ComponentExample = () => {
    return (
        <View>
          <Badge count={12}>
          <Cart/>
        </Badge>
        </View>
    )
  }
  ```


