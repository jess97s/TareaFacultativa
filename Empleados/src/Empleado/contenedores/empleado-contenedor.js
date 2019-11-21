import React, { Component } from 'react';
import {
    AsyncStorage,
} from 'react-native';
import Listado from './../componentes/listado';
import Guardar from './../componentes/guardar';
import Eliminar from '../componentes/eliminar';

 class EmpleadoContenedor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pantalla: 'listado',
            empleados: [],
            nombreEmpleado: '',
            empleadoSeleccionadoId: '',
        };

    }

    
    eventoPantallaGuardar = () => {
        this.setState({
            pantalla: 'guardar',
        });
    }

    eventoPantallaEliminar = (empleadoId) => {
        const { empleados } = this.state;
        const indiceEliminar = empleados.findIndex(item => item.key === empleadoId);
        this.setState({
            pantalla: 'eliminar',
            empleadoSeleccionadoId: empleadoId,
            nombreEmpleadoAEliminar: empleados[indiceEliminar].nombreEmpleado,
        });
    }

    
    eventoNombre = (textNombre) => {
        this.setState({
            nombreEmpleado: textNombre,
        })
    }

    eventoGuardar = async () => {
        const { nombreEmpleado, empleados } = this.state
        empleados.push({
            key: (empleados.length + 1).toString(),
            nombreEmpleado: nombreEmpleado,
        })
        await this.modificarEmpleadores(empleados);
        this.setState({
            nombreEmpleado: '',
            empleados: empleados,
            pantalla: 'listado',
        })
    }

    
    eventoBorrar = async () => {
        const { empleadoSeleccionadoId, empleados, } = this.state;
        const indiceEliminar = empleados.findIndex(item => item.key === empleadoSeleccionadoId);
        if(indiceEliminar > -1) {
            empleados.splice(indiceEliminar, 1);
        }
        await this.modificarEmpleadores(empleados);
        this.setState({
            empleados: empleados,
            pantalla: 'listado',
        });
    }

    obtenerEmpleados = async () => {
        const datos = await AsyncStorage.getItem('DATOS');
        return datos;
    }

    modificarEmpleadores = async (trabajadores) => {
        const datosConvertidos = JSON.stringify(trabajadores);
        await AsyncStorage.setItem('DATOS', datosConvertidos);
    }

    render() {

        const { pantalla, empleados, nombreEmpleado, } = this.state

        switch (pantalla) {

            case 'listado':
                return (
                    <Listado
                        data={empleados}
                        eventoVentanaGuardar={this.eventoVentanaGuardar}
                        eventoVentanaEliminar={this.eventoVentanaEliminar}
                    />
                )
            case 'guardar':
                return (
                    <Guardar
                        nombre={nombreEmpleado}
                        eventoNombre={this.eventoNombre}
                        eventoGuardar={this.eventoGuardar}
                    />
                )
            case 'eliminar':
                const { nombreEmpleadoAEliminar } = this.state
                return(
                    <Eliminar
                        nombre={nombreEmpleadoAEliminar}
                        eventoEliminar={this.eventoBorrar}
                    />
                )
        }

    }

    async componentDidMount() {
        const datos = await this.obtenerEmpleados();
        if(datos !== null) {
            const trabajadores = JSON.parse(datos);
            this.setState({
                empleados: trabajadores,
            });
        }
    }

 }

 export default EmpleadoContenedor;