<!-- @format -->

# grid-mall

centro comercial online para mayoristas

## Componentes

### Header (HeaderComponent)

`Este componente nos permite realizar un header personalisado en las vistas`

### props (props? = opcional)

###### title(string): `Este parametro nos permite determinar el titulo del header`

###### leftActions?(RightType): `Este parametro nos permite determinar las acciones left del header @RightType = { iconName: string, iconType: any, actions: () => void }`

###### rightItems?(Array<RightType>): `Este parametro nos permite determinar las acciones right del header @Array<RightType> = [{ iconName: string, iconType: any, actions: () => void }]`

###### androidStatusBarColor(string): `Este parametro nos permite especificar el color del bar del dispositivo android ejem: "#fff" = white en valor exádecimal`

###### background(backgroundType): `Este parametro nos permite determinar el background del header @backgroundType = 'white' | 'black' | 'green' | 'rose' | 'default';`

#### Ejemplo

```tsx
import * as React from 'react';
import { Container, Text } from 'native-base';
import HeaderComponent from '../../../components/Header';

export interface ExampleProps {
	navigation: any;
}

const Example: React.SFC<ExampleProps> = props => {
	const { navigation } = props;
	return (
		<Container>
			{/* Header basico */}
			<HeaderComponent title='GridMall' background='purple' />

			{/*Header Left item*/}
			<HeaderComponent
				leftActions={{
					iconName: 'menu',
					iconType: 'Entypo',
					actions: () => navigation.openDrawer()
				}}
				title='GridMall'
			/>

			{/*Header Right y Left item*/}
			<HeaderComponent
				leftActions={{
					iconName: 'menu',
					iconType: 'Entypo',
					actions: () => navigation.openDrawer()
				}}
				title='GridMall'
				rightItems={[
					{
						iconName: 'home',
						iconType: 'Entypo',
						actions: () => alert('hola mundo')
					},
					{
						iconName: 'menu',
						iconType: 'Entypo',
						actions: () => alert('hola mundo')
					}
				]}
			/>
			<Text style={{ color: 'black' }}>Example componente</Text>
		</Container>
	);
};

export default Example;
```

### Badge

`Este componente permite realizar un conteo en otro componente.`

#### props

###### count(number): `Este parametro permite establecer el numero de conteo en el componente`

###### children(ReactChild): `Es el componente hijo que va a embolver el badge`

##### ejemplo

```tsx
import Badge from '../component/badge';
const ComponentExample = () => {
	return (
		<View>
			<Badge count={12}>
				//children component
				<Cart />
			</Badge>
		</View>
	);

	export default Badge;
};
```

### CustomList

`Este componente permite realizar consultas hacia el backend verificando el error y la respuesta en el servidor.`

#### props (props? = el parametro es opcional)

###### query(promesa): `es la consulta que se va a relizar`.

###### renderInten((item, deleteAction?) => ReactChild): `es una funcion donde va a rendreizar la data obtenidad de la consulta`

###### resolve(string): `es un parametro establecido de grapql que nos permite resolver la consulta`

###### isError?(boolean): `retorna un booleano si ocurrio un error en la consulta, por defecto es false`

###### resolveDeleted?(string): `es un parametro establecido de grapql que nos permite resolver la consulta`

###### deletedAction?((value) => promise): `esta funcion nos permite eliminar un items de la conulta`

###### variables?(any{}): `este parametro nos permite configurar las variables necesarias para la consulta`

##### ejemplo

```tsx
import CustomList from '../component/CustomList'
import { Text, View,Card, Button  } from 'native-base';
import gql from 'graphql-tag';
import { Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

// esto es una consulta gradql.
const query = gql`
	{
		categories {
			_uid
			title
			description
		}
	}
`;

// query para eliminar

const DELETED_Cateory = gql`
	mutation DeletedCategory($uid: String!) {
		deletedCategory(uid: $uid)
	}
`;

const ComponentExample = () => {

	// instacion el hook de apollo client
	const [deletedCategory] = useMutation(DELETED_Cateory);

 return (
     <View>
	   <CustomList
				query={query}
				resolve='categories'
				renderIten={(data: [Category]) => (
					<View>
						{data.map((categorie, index) => (
							<Card key={index}>
								<Text>{categorie.title}</Text>
							</Card>
						))}
					</View>
				)}
			/>

		{/*Eliminar un elemento en especifico*/}
		<CustomList
				query={query}
				resolve='categories'
				resolveDeleted="deletedCategory"
				isError={(state, reload) => {
					state ? reload && reload() : alert('ocurrio un erro');
				}}
				deletedAction={(value: any) =>
					deletedCategory({ variables: { ...value } })
				}
				renderIten={(data: [Category], deletedItems) => (
					<View>
						{data.map((categorie, index) => (
							<Card key={index}>
								<Text>{categorie.title}</Text>
								<Button onPress={() => {
										if (deletedItems) {
											Alert.alert(
												'Confirmat',
												'Estas seguro de realizar esta acción',
												[
													{
														text: 'Cancel',
														onPress: () => console.log('Cancel Pressed'),
														style: 'cancel'
													},
													{
														text: 'OK',
														onPress: () => deletedItems({ uid: categorie._uid })
													}
												],
												{ cancelable: false }
											);
										}
									}}
								>
									<Text>Eliminar</Text>
								</Button>
							</Card>
						))}
					</View>
				)}
			/>

     </View>
 )
}

export default
```

### Modal (ModalComponent)

`EL siguiente componente nos permite generar un modal personalizado.`

#### prosp (props? = el parametro es opcional)

##### isVisible(boolean) `Este parametro recive un boleaano. true es para activarlo y false para ocultarlo`

##### children(ReactChild) `Este parametro recive un React child, componentes hijos que va a mostrar el modal`

##### title?(string) `Este parametro determina el titulo del modal`

##### header?(boolean) `oculta el header por defecto del modal`

##### position?(position) `determina la posicion del modal @postion = 'flex-start' | 'flex-end' | 'center'`

##### transparent?(boolean) `determina el background del modal por defecto es false`

##### style?({}) `determina estilos personalisados al root del modal`

##### styleConten?({}) `determina stilos personalisados al componente`

##### styleTitle?({}) `determina el estilo del titulo del modal`

##### close?(() => void) `recive una funcion para cerrar el modal`

##### contendwidth?(string) `determina el tamaño del modal en porcentaje solo en anchura ejem: (90%)`

##### animated?(animated) `determina la animacion del modal @animated = 'slide' | 'fade' | 'none';`

##### loading?(boolean) `efectivo si tienes un formularion en el modal, por defecto es false`

### ejemplo

```tsx
import ModalComponent from '../component/ModalComponent';
import { Text, View } from 'native-base';

const ComponentExample = () => {
	// hooks para establecer estados en los componentes
	const [visible, setVisible] = useState(false);

	return (
		<View>
			<ModalComponent
				isVisible={Visible}
				title='hola mundo'
				close={() => setVisible(false)}>
				//children component
				<ChildrenComponent />
			</ModalComponent>
		</View>
	);
};
export default ModalComponent;
```

### EJecutar

##### npm install

##### npm start
