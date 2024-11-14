import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Empleado = {
    idEmpleado: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    sexo: string;
    fnacimiento: string;
    telCelular: string;
    idPuesto: number;
    activo: string; // Valor de 'S' o 'N' desde la tabla Seguridad
    puesto: string;
    salario: number;
    usuario: string;

  };

const Usuarios: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [empleadosModificados, setEmpleadosModificados] = useState<Set<string>>(new Set());
  const [sexo, setSexo] = useState<string>('');
  const [regresar, setRegresar] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleadosSexo = async (sexoFilter: string = '') => {
    try {
        const response = await axios.get(`http://localhost:8080/empleados/buscar?sexo=${sexoFilter}`);
        setEmpleados(response.data);
        setRegresar(true)
    } catch (error) {
        console.error("Error al cargar empleados:", error);
    }
};

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:8080/empleados');
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al cargar empleados:', error);
    }
  };

  const handleEstatusChange = (idEmpleado: string) => {
    setEmpleados((prevEmpleados) =>
      prevEmpleados.map((empleado) =>
        empleado.idEmpleado === idEmpleado
          ? { ...empleado, activo: empleado.activo === 'S' ? 'N' : 'S' }
          : empleado
      )
    );
    setEmpleadosModificados((prevModificados) => {
      const nuevosModificados = new Set(prevModificados);
      nuevosModificados.add(idEmpleado);
      return nuevosModificados;
    });
  };

  const handleGuardar = async () => {
    try {
      const empleadosParaActualizar = empleados.filter((empleado) =>
        empleadosModificados.has(empleado.idEmpleado)
      );

      await axios.put('http://localhost:8080/empleados/actualizar', empleadosParaActualizar);

      alert('Cambios guardados exitosamente');
      setEmpleadosModificados(new Set());
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('Hubo un problema al guardar los cambios');
    }
  };

  const handleRegresar = () =>{
    fetchEmpleados()
    setRegresar(false)
  }

  const handleBorrar = async (idEmpleado: string) => {
    try {
        await axios.delete(`http://localhost:8080/empleados/eliminar/${idEmpleado}`);
        setEmpleados(empleados.filter(empleado => empleado.idEmpleado !== idEmpleado));
        alert("Empleado eliminado exitosamente.");
    } catch (error) {
        console.error("Error al eliminar el empleado:", error);
        alert("Hubo un error al eliminar el empleado.");
    }
    };

  const handleBuscar = () => {
    fetchEmpleadosSexo(sexo);
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString()
  }

  return (
    <div className="container mt-5">
      <h3>Gestión de Usuarios</h3>
      <div className="d-flex mb-3">
        <Button variant="primary" className="me-2" onClick={handleGuardar}>
          Guardar
        </Button>
        <Button variant="success" className="me-2" onClick={() => navigate('/nuevo-usuario')}>
          Nuevo Usuario
        </Button>

            <div className="row border-right">
                <div className='me-2 bg-light'>
                    <div className="form-group">
                            <label>Búsqueda por Sexo</label>
                            <select
                                className="form-control"
                                value={sexo}
                                onChange={(e) => setSexo(e.target.value)}
                            >
                                <option value="">Seleccionar Sexo</option>
                                <option value="H">H</option>
                                <option value="M">M</option>
                            </select>
                    </div>
                    
            </div>
            
            </div>

        <Button className='me-2' variant="secondary" onClick={handleBuscar}>
                    Buscar
                    </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Estatus</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Fecha de Nacimiento</th>
            <th>Sexo</th>
            <th>Puesto</th>
            <th>Sueldo</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.idEmpleado}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={empleado.activo === 'S'}
                  onChange={() => handleEstatusChange(empleado.idEmpleado)}
                  label={empleado.activo === 'S' ? 'Activo' : 'Inactivo'}
                />
              </td>
              <td>{empleado.nombre}</td>
              <td>{empleado.apellido1}</td>
              <td>{empleado.apellido2}</td>
              <td>{formatearFecha(empleado.fnacimiento)}</td>
              <td>{empleado.sexo}</td>
              <td>{empleado.puesto}</td>
              <td>{empleado.salario}</td>
              <td>{empleado.usuario}</td>
              
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleBorrar(empleado.idEmpleado)}
                >
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        { regresar 
                    ? <Button variant="secondary" onClick={handleRegresar}>
                    Regresar
                  </Button>
                    : null
                }
    
      </div>
    </div>
  );
};

export default Usuarios;