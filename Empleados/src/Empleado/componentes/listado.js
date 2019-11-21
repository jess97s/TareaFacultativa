import React from 'react';
import{
SafeAreaView,
Text,
FlatList,
Button,
StyleSheet,
TouchableOpacity,
Platform,
}from 'react-native';

const Listado = (props) => {

const{
    data,
    eventoVentanaGuardar,
    eventoVentanaEliminar
} = props

return (
    <SafeAreaView>
        <Text>
            Listado de empleados de la empresa
        </Text>
        <Button title = 'Agregar'
        onPress={eventoVentanaGuardar}
        />
        <FlatList data={data}
        renderItem ={
            ({item}) => <Elemento item={item}
            eventoVentanaEliminar={eventoVentanaEliminar}
            />
        }
        />
        </SafeAreaView>
        )
    }
    const Elemento = (props) => {
        const {
            item,
            eventoVentanaEliminar,
    }= props

    return (
        <TouchableOpacity onLongPress= {() => eventoVentanaEliminar(item.key) }
        >
            <Text style={styles.elemento}>
                [item.nombreEmpleado]
            </Text>
        </TouchableOpacity>
           )
    }

    const styles = StyleSheet.create({
        titulo: {
            color: 'green',
            fontSize: 18,
        },
        elemento:{
            flex: 1,
            padding:8,
            fontWeight: 'bold',
            color: 'white',
            height: 50,
            ...Platform.select({
                ios: {
                    backgroundColor: 'blue'
                },
                android: {
                    backgroundColor: 'red'
                },
            }),
            margin: 8,
        },
    })
export default Listado;