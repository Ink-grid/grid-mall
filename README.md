# grid-mall
centro comercial online para mayoristas


## Componentes

### Badge

`Este componente permite realizar un conteo en otro componente.`
  
   ####  props
   
   ###### count: `Este parametro permite establecer el numero de conteo en el componente`
   ###### children: `Es el componente hijo que va a embolver el badge`

##### ejemplo
```tsx
  import Badge from '../component/badge'
  const ComponentExample = () => {
    return (
        <View>
          <Badge count={12}>
          //children component
            <Cart/>
          </Badge>
        </View>
    )
  }
  ```  
### CustomList
 
 `Este componente permite realizar consultas hacia el backend verificando el error y la respuesta en el servidor.`
    
   #### props (props? = el parametro es opcional)
     
   ###### query: `es la consulta que se va a relizar`.
   ###### renderInten: `es una funcion donde va a rendreizar la data obtenidad de la consulta`
   ###### resolve: `es un parametro establecido de grapql que nos permite resolver la consulta`
   ###### isError?: `retorna un booleano si ocurrio un error en la consulta, por defecto es false`     
   ###### resolveDeleted?: `es un parametro establecido de grapql que nos permite resolver la consulta`
   ###### deletedAction?: `esta funcion nos permite eliminar un items de la conulta`
   ###### variables?: `este parametro nos permite configurar las variables necesarias para la consulta` 
     
    
   ##### ejemplo
   
   ```tsx
  import CustomList from '../component/CustomList'
  import { Text, View } from 'native-base';
  import gql from 'graphql-tag';
  
  // esto es una consulta gradql que requiere una variable
  const query = gql`
	query($type: String!) {
		getAccess(type: $type) {
			icon
			typeIcon
			name
			route
		}
	}
`;
  
  const ComponentExample = () => {
    return (
        <View>
          <CustomList 
          query: {query}
          resolve: 'getAccess' // tendra que resolver getAccess por que es el nombre de la consulta, esta opcion varia.
          variables: {type: 'proveedor'} // type es la variable que necesita la consulta @type: String! = {type: ""}
          isError: {(state) => console.log(state)}
          renderIten: {(data) => (
                // data.title, es dependiendo de la consulta que se realiza devolvera los datos, este ejemplo solo es refrencial
                // para debugear podrias hacer un console log a data eje. console.log(data)
                <Text>{data.title}</Text>
          )}
          />
        </View>
    )
  }
  ``` 
   
   
          
 
 


