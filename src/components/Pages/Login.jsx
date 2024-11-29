import React,{useState} from 'react'
import { FaUser, FaEyeSlash,FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
//import { Player } from '@lottiefiles/react-lottie-player';
//import bienvenida from '../../assets/animation/bienvenida.json' 
import login from '../../assets/img/login.png'
import './Login.css'
import 'animate.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ id: '', contrasena: '' });
    const [errors, setErrors] = useState({ id: '', contrasena: '' });
    const [showPassword, setShowPassword] = useState(false); // Estado para alternar contraseña visible/invisible
    const [authError, setAuthError] = useState(''); // Estado para manejar errores de autenticación
    const navigate = useNavigate(); // Hook para redirigir

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Validación en tiempo real para el campo "id"
        if (name === 'id' && (isNaN(value) || value.length > 8)) {
            return; // Ignorar si no es número o si supera los 6 caracteres
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {};

        // Validar ID
        if (!formData.id) {
            newErrors.id = 'El ID no puede estar vacío.';
        } else if (formData.id.length > 8) {
            newErrors.id = 'El ID no puede tener más de 8 números.';
        }

        // Validar contraseña
        if (!formData.contrasena) {
            newErrors.contrasena = 'La contraseña no puede estar vacía.';
        } else if (formData.contrasena.length < 8) {
            newErrors.contrasena = 'La contraseña debe tener al menos 8 caracteres.';
        }

        setErrors(newErrors);

        // Si no hay errores, manejar la autenticación
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:3000/personal/authenticatePersonal', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idIn: formData.id,
                        contraseña: formData.contrasena,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    //localStorage.setItem('token', data.token); // Almacenar el token en localStorage

                    // Almacenar el nombre del usuario en localStorage
                    localStorage.setItem('userName', data.nombre); // Usa el campo adecuado del response que contiene el nombre
                    localStorage.setItem('isLoggedIn', 'true'); // Marcar que el usuario está logueado
                    // Redirigir a /Home si la autenticación es exitosa
                    navigate('/Home');
                } else {
                    // Mostrar mensaje de error
                    setAuthError(data.mensaje || 'Error de autenticación');
                }
            } catch (error) {
                console.error('Error al autenticar:', error);
                setAuthError('Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <div className='form-container_login'>
        {/* Animación Lottie */}
        <div className="img-container">
            <img className='imagen animate__animated animate__fadeInLeft' src={login} alt="" />
            
        </div>
        {/* Formulario */}
        <div className="login-container animate__animated animate__fadeInRight">
            <h2 className='bienvenida'>Bienvenido</h2>
            <form onSubmit={handleSubmit}>
                {/* Campo de ID */}
                <div className="form-group">
                    <input
                        type="text"
                        id="id"
                        name="id"
                        placeholder="Ingrese su ID"
                        value={formData.id}
                        onChange={handleInputChange}
                        
                    />
                    <FaUser className='icon'/>
                    {errors.id && <p className="error-message">{errors.id}</p>}
                </div>

                {/* Campo de Contraseña */}
                <div className="form-group">
                    <input
                        type={showPassword ? 'text' : 'password'} // Alternar entre password y text
                        id="contrasena"
                        name="contrasena"
                        placeholder="Ingrese su contraseña"
                        value={formData.contrasena}
                        onChange={handleInputChange}
                        
                    />
                    {showPassword ? (
                            <FaEye className='icon toggle-icon' onClick={togglePasswordVisibility} />
                        ) : (
                            <FaEyeSlash className='icon toggle-icon' onClick={togglePasswordVisibility} />
                    )}
                    
                </div>

                {/* Enlace "Olvidaste tu contraseña" */}
                <div className="forgot-password">
                    <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
                </div>
                {errors.contrasena && <p className="error-message">{errors.contrasena}</p>}

                {/* Mensaje de error de autenticación */}
                {authError && <p className="error-message">{authError}</p>}
                
                {/* Botón de enviar */}
                <button type="submit" className="submit-button">
                Iniciar sesión
                </button>
            </form>
        </div>
    </div>
  );
}

export default Login
