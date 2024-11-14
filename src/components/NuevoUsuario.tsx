import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface NuevoUsuarioProps {
    /* onUserCreated: () => void; */
}

const NuevoUsuario: React.FC<NuevoUsuarioProps> = (/* { onUserCreated } */) => {
    const [idEmpleado, setIdEmpleado] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [sexo, setSexo] = useState('H');
    const [fnacimiento, setFNacimiento] = useState('');
    const [idPuesto, setIdPuesto] = useState<number | null>(null);
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [activo, setActivo] = useState('S');
    const [puestos, setPuestos] = useState<any[]>([]);  // Array para los puestos en el dropbox
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPuestos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/salarios');
            setPuestos(response.data); 
            } catch (error) {
                console.error("Error al obtener puestos", error);
            }
        };
        fetchPuestos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nuevoUsuario = {
            idEmpleado,
            nombre,
            apellido1,
            apellido2,
            sexo,
            fnacimiento,
            idPuesto,
            usuario,
            password,
            activo,
        };

        try {
            // Enviar la solicitud POST para crear un nuevo usuario
            await axios.post('http://localhost:8080/empleados', nuevoUsuario);
            alert('Usuario creado exitosamente.');
            //onUserCreated();  
            /* setIdEmpleado('');
            setNombre('');
            setApellido1('');
            setApellido2('');
            setSexo('H');
            setFNacimiento('');
            setPuesto(null);
            setUsuario('');
            setPassword('');
            setActivo('S'); */
            navigate('/usuarios');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            alert('Hubo un error al crear el usuario.');
        }
    };

    return (
        <div className="container">
            <h3>Página Nuevo Usuario</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>IdEmpleado</label>
                    <input
                        type="text"
                        className="form-control"
                        value={idEmpleado}
                        onChange={(e) => setIdEmpleado(e.target.value)}
                        maxLength={7}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        maxLength={15}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Apellido 1</label>
                    <input
                        type="text"
                        className="form-control"
                        value={apellido1}
                        maxLength={15}
                        onChange={(e) => setApellido1(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Apellido 2</label>
                    <input
                        type="text"
                        className="form-control"
                        value={apellido2}
                        maxLength={15}
                        onChange={(e) => setApellido2(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Sexo</label>
                    <select
                        className="form-control"
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                        required
                    >
                        <option value="H">H</option>
                        <option value="M">M</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fnacimiento}
                        onChange={(e) => setFNacimiento(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Puesto</label>
                    <select
                        className="form-control"
                        value={idPuesto || ''}
                        onChange={(e) => setIdPuesto(Number(e.target.value))}
                        required
                    >
                        <option value="">Seleccione un puesto</option>
                        {puestos.map((puesto) => (
                            <option key={puesto.idPuesto} value={puesto.idPuesto}>
                                {puesto.descripcion} - ${puesto.salario}
                            </option>
                        ))}
                    </select>
                </div>
            
                <div className="form-group">
                    <label>Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        value={usuario}
                        maxLength={10}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        maxLength={12}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Activo</label>
                    <select
                        className="form-control"
                        value={activo}
                        onChange={(e) => setActivo(e.target.value)}
                        required
                    >
                        <option value="S">Activo</option>
                        <option value="N">Inactivo</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Guardar</button>
            </form>
        </div>
    );
};

export default NuevoUsuario;