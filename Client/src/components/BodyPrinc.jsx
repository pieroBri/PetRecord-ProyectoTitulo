import React from 'react'
import { Link } from 'react-router-dom'

export function BodyPrinc() {
  return (
    <div className='lg:flex lg:justify-between lg:min-h-screen md:min-h-screen w-full h-full pb-10' style={{background:"#D8F3DC"}}>
        <div className='lg:px-20 text-black pb-10 pt-40' style={{background:"#D8F3DC"}}>
            <p className='font-bold text-7xl'>Tus mascotas en nuestas manos</p>
            <p className='mt-10 mb-10'>
                Lorem ipsum dolor sit amet, 
                consectetur adipisicing elit. 
                Asperiores laboriosam dolorem cupiditate aut. 
                Neque nam possimus voluptates, 
                corrupti saepe odit ex ratione enim maxime, unde sit repellendus, ullam qui veniam!
            </p>
            <button>
                <Link className="px-5 py-3 bg-green-700 text-white text-center hover:bg-green-500 rounded-xl font-semibold" to="/registroUsuario">Registrate como usuario</Link>
            </button>
            
        </div>
        <div className='text-black pt-40'>
            <p className='font-bold text-7xl'>Tu camino para comenzar con una nueva veterinaria comienza aqui</p>
            <p className='mt-10 mb-10'>
                Lorem ipsum dolor sit amet, 
                consectetur adipisicing elit. 
                Asperiores laboriosam dolorem cupiditate aut. 
                Neque nam possimus voluptates, 
                corrupti saepe odit ex ratione enim maxime, unde sit repellendus, ullam qui veniam!
            </p>
            <button>
                <Link className="px-5 py-3 bg-green-700 text-white text-center hover:bg-green-500 rounded-xl font-semibold" to="/registroVeterinario">Registrate como veterinaria/o</Link>
            </button>
        </div>
    </div>
  )
}

