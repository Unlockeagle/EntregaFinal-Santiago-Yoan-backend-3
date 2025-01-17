//* 2) funcion que genera y da la informacion del mensaje del error

export const generateInfoError = ( {petsQuantity, usersQuantity}) => {
    return `Los datos esta incompletos o no son validos.
    Necesitamos recibir los siguientes datos:
    
    - QuantityPets: Number, pero recibimos ${petsQuantity}
    - UsersQuantity: Number, pero recibimos ${usersQuantity}`
}

// - Nombre: String, pero recibimos ${usuario.nombre}
//     - Apellido: String, pero recibimos ${usuario.apellido}
//     - Email: String, pero recibimos ${usuario.email} 