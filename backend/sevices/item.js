const db = require('./db')
const helper = require('../helper')
const config = require('../config')
const e = require('express')

// Función con consulta para insertar datos en la base de datos: INSERT
async function insertData(req, res) {
    // data tiene los datos que vamos a insertar en la base de datos. Los soge de req.query
    // Para acceder a cada uno de los datos: data.nombre, data.precio, ...
    const data = req.query
    const result = await db.query(`INSERT INTO coleccion ( nombre, marca, tipo, precio) VALUES ('${data.nombre}', '${data.marca}', '${data.tipo}', '${data.precio}')`)

    /* En la variable result se almacena lo que devuelve la consulta. Si accedemos a effectedRow nos da el número de filas de la base de 
    datos que ha sido modificado o añadido. Si ese número es mayor que 0 es que ha habido insercción en la base de datos */
    return result.affectedRows
}

// Función con la consulta de obtener datos de la vase de datos: SELECT * FRON COLECCION
async function getData(req,res) {
    // La variable rows almacena los datos obtenidos de la consulta select
    const rows = await db.query(`SELECT * FROM COLECCION`)

    /* Los datos obtenidos de la consulta del select los paso por la función helper para que en el caso de que no
    haya datos devueltos, me devuelva un array vacío */
    const data = helper.emptyOrRows(rows)
    return {
        // Devolvemos el resutlado del Select, que está almacenado en la variable data
        data
    }
}

// Función con la consulta para borrar datos de la base de datos: DELETE
async function deleteData(req,res) {
    // En data almaceno los datos que me pasan para poder realizar el delete, me pasarán el id
    const data = req.query
    const result = await db.query(`DELETE FROM COLECCION WHERE id =`+ data.id)
    
    /* En la variable result se almacena lo que devuele la consulta. Si accedemos a effectedRow nos da el número de filas de la
    base de datos que ha sido borrado. Si ese número es mayor que 0 es que ha sido borrado en la base de datos */
    return result.affectedRows
}

// Al final del fichero exporto las funciones getData, insertData y deleteData
module.exports = {
    getData,
    insertData,
    deleteData
}