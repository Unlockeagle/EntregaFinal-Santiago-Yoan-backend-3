//* Genera objetos de tipo error personalizados
//* Creamos una clase para generar nuestros propios errores
class CustomError {
    static crearError(nombre = "Error", causa = "Desconocido", mensaje, codigo = 1) {
        //*Creamos el error
        const error = new Error(mensaje);
        //*Configuramos el error
        error.name = nombre;
        error.causa = causa;
        error.code = codigo;

        //*lanzamos el errror
        //! Esto detiene la app, por tal debe ser capturado por otro modulo
        throw error;
    }
}

export default CustomError;
