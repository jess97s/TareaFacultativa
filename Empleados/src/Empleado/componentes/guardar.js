import React from 'react';

import {
    TextInput,
    View,
    Text,
    Button,
}from 'react-native';

const Guardar = (props) => {
    const {
        nombre,
        eventoNombre,
        eventoGuardar
}= props;

return (
<View>
    <Text>
        Añadir un empleado de la empresa
    </Text>
    <TextInput
        onChangeText={eventoNombre}
        value={nombre}
    />
    <Button title = 'Añadir empleado' onPress = {eventoGuardar}
    />
</View>
      );
}
export default Guardar;