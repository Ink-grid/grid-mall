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

### Carousel (Carousel)

`EL siguiente componente nos permite generar un carousel personalizado.`

#### prosp (props? = el parametro es opcional)

##### items([]) `es un array de objetos donde mostrara los itens en el carrousel`

##### style(string) `Este parametro nos permite designar el tipo de stylo a utilizar para el corousel`

##### transparent?(booleam) `Este parametro nos permite detirmar si el carousel es transparente`

##### bulletTheme?(string) `puedes seleccionar entre drak o white`

##### auto?(boolean) `determina si el carousel se ejecuta automaticamente`

##### delay?(number) `determina la velocidad de movimiento del carousel por defecto 30000 mil miliseungos (3 segundos)`

##### bulledPosition?({}) `determina la posicion del bulled ejemplo {bottom: 0 | top: 0 | left: 0}`

### ejemplo

```tsx
import * as React from 'react';
import { Container, Text, View, Button, Icon } from 'native-base';
import HeaderComponent from '../../../components/Header';
import Stepper, { ProgressStep } from '../../../components/Stepper';
export interface ExampleProps {
	navigation: any;
}

const Example: React.SFC<ExampleProps> = props => {
	return (
		<Container>
			<HeaderComponent title='prueba' background='green'></HeaderComponent>
			<View style={{ flex: 1 }}>
				<Stepper>
					<ProgressStep
						nextBtnTextStyle={buttonTextStyle}
						previousBtnTextStyle={buttonTextStyle}>
						<View style={{ alignItems: 'center' }}>
							<Text>This is the content within step 1!</Text>
						</View>
					</ProgressStep>
					<ProgressStep
						nextBtnTextStyle={buttonTextStyle}
						previousBtnTextStyle={buttonTextStyle}>
						<View style={{ alignItems: 'center' }}>
							<Text>This is the content within step 2!</Text>
						</View>
					</ProgressStep>
					<ProgressStep
						nextBtnTextStyle={buttonTextStyle}
						previousBtnTextStyle={buttonTextStyle}>
						<View style={{ alignItems: 'center' }}>
							<Text>This is the content within step 3!</Text>
						</View>
					</ProgressStep>
				</Stepper>
			</View>
		</Container>
	);
};

export default Example;
```

### Stepper (Stepper)

`Es el padre que engobal a progressStep`

### ProgressStep (ProgressStep)

`EL siguiente componente nos permite generar un steeps para el registro de usuario personalizado.`

#### prosp (props? = el parametro es opcional)

##### nextBtnTextStyle?({}) `Darle un stylo personalizado al buttom`

##### previousBtnTextStyle?(string) `Darle un stylo personalizado al buttom`

##### onSubmit?(() => <Promesa>) `Es una funcion que retorna un promesa se puede usar cuando queremos realizar un accion cuando termine el flujo del steeps`

##### finishBtnText?(string) `determina el nombre del bottom cuando este llegue al final de acción`

```tsx
import * as React from 'react';
import { Container, Text, View, Button, Icon } from 'native-base';
import Carousel from '../../../components/Carousel';
export interface ExampleProps {
	navigation: any;
}

const Example: React.SFC<ExampleProps> = props => {
	return (
		<View>
			<Carousel
				style='Slide'
				auto
				bulletTheme='white'
				transparent
				bulledPosition={{ bottom: 0 }}
				items={[
					{
						component: (
							<View
								style={{
									width: '100%',
									height: '100%',
									borderRadius: 8,
									padding: 10,
									backgroundColor: '#142215'
								}}>
								<Text style={{ color: '#1A751B', fontWeight: 'bold' }}>
									Aviso importante
								</Text>
								<Text style={{ color: '#fff', fontSize: 10, width: '60%' }}>
									Para grid mall la seguridad es una prioridad. Desde este 16/03
									y hasta nuevo aviso, las compras diarias no estan perimitidas
								</Text>
								<Button
									transparent
									style={{ marginTop: '5%' }}
									onPress={() => alert('hola')}>
									<Text
										style={{
											color: '#fff'
										}}>
										Sigue los consejos de salud emitido por el gobierno
									</Text>
								</Button>
							</View>
						)
					},
					{
						component: (
							<View
								style={{
									width: '100%',
									height: '100%',
									borderRadius: 8,
									padding: 10,
									backgroundColor: '#362849'
								}}>
								<Text
									style={{
										paddingLeft: 10,
										color: '#fff',
										fontWeight: 'bold',
										fontSize: 20
									}}>
									!Hola!
								</Text>
								<Text
									style={{
										color: '#fff',
										fontSize: 13,
										paddingLeft: 10,
										width: '60%'
									}}>
									Ingresa aquí para ver consejos útiles de como usar la app
								</Text>
								<View style={{ paddingLeft: 10 }}>
									<Button
										iconRight
										style={{
											width: '50%',
											height: 30,
											marginTop: 10,
											backgroundColor: '#1A751B'
										}}
										onPress={() => alert('hola')}>
										<Text
											style={{
												textTransform: 'lowercase',
												color: '#fff'
											}}>
											Dale click aqui
										</Text>
										<Icon
											name='arrowright'
											style={{ color: '#fff' }}
											type='AntDesign'
										/>
									</Button>
									<View style={{ marginTop: 10 }}>
										<Text
											style={{
												color: '#fff',
												fontSize: 21,
												fontWeight: 'bold'
											}}>
											Grid
										</Text>
										<Text
											style={{
												fontWeight: 'bold',
												color: '#1A751B',
												fontSize: 30,
												marginTop: -20
											}}>
											mall
										</Text>
									</View>
								</View>
							</View>
						)
					}
				]}
			/>
		</View>
	);
};

export default Example;
```

### EJecutar

##### npm install

##### npm start

#### eh modificado este archivo
