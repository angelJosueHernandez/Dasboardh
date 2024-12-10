import React, {useState, useEffect} from 'react'
import { Select, Option, } from "@material-tailwind/react";
import './NuevaContratacion.css'
//import './ModalEmergencias.css'

const NuevaContratacion = () => {
  return (
    <div>
      <form className='form_nueva_contratacion' method="post" >
        <div className='titulo_contratacion'><h1>Registrar Nueva Contratación</h1></div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Nombre:</label></div>
          <div>
            <input className='text_input' type="text" name="" id="" />         
          </div>
          <div className='msg_error'>
                        
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Apellido Paterno:</label></div>
          <div>
            <input className='text_input' type="text" name="" id="" />
          </div>
          <div className='msg_error'>
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Apellido Materno:</label></div>
          <div><input className='text_input' type="text" name="" id="" />
          </div>
          <div className='msg_error'>
                      
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Inicio del Traslado:</label></div>
          <div><input className='text_input' type="text" name="" id="" />
          </div>
          <div className='msg_error'>
                        
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Escala:</label></div>
          <div><input className='text_input' type="text" name="" id="" />
          </div>
          <div className='msg_error'>
                      
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Destino del Traslado:</label></div>
          <div><input className='text_input' type="text" name="" id="" />
          </div>
          <div className='msg_error'>
                        
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Motivo:</label></div>
          <div><input className='text_input' type="text" name="" id="" />
          </div>
          <div className='msg_error'>
                        
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Material Especifico:</label></div>
          <div><input className='text_input' type="text" name="" id="" />
          </div>
          <div className='msg_error'>
                        
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Fecha:</label></div>
          <div><input className='text_input' type="date" name="" id="" /></div>
          <div className='msg_error'>
                          
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Horario:</label></div>
          <div><input className='text_input' type="time" name="" id="" />
          </div>
          <div className='msg_error'>
                          
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Nombre del Asociado:</label></div>
          <div><select className='text_input' name="" id=""></select>
          </div>
          <div className='msg_error'>
                          
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Tipo de contratación:</label></div>
          <div><select className='text_input' name="" id=""></select>
          </div>
          <div className='msg_error'>
                          
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Ambulancia:</label></div>
          <div><select className='text_input' name="" id=""></select>
          </div>
          <div className='msg_error'>
                          
          </div>
        </div>
        <div className='btns_contratacion'>
          
          <input className='btn_nueva' type="submit" value="Registrar" />
          <button className='btn_cancelar' type="button" >Cancelar</button>        
        </div> 
      </form>
    </div>
  )
}

export default NuevaContratacion
