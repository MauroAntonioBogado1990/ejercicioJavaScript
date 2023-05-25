'use strict';
// Cada producto que vende el super es creado con esta clase
class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por default
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }

}
// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];

// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vació
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }
    
     /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
     async agregarProducto(sku, cantidad) {
        //agregado de funcion de try-catch para resolver que no se encuentre el producto
        try{
            console.log(`Agregando ${cantidad} ${sku}`);
            // Busco el producto en la "base de datos"
            const producto = await findProductBySku(sku);
            
        console.log("Producto encontrado",producto);
        // Creo un producto nuevo

        const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
        //verificacion de producto
        const duplicados = productosDelSuper => new Set (productosDelSuper).size < productosDelSuper.length;
        var indice = productosDelSuper.indexOf(producto);
        if(indice){
           this.cantidad =this.cantidad+producto.cantidad;
           
        }
        // if (duplicados(productosDelSuper)){
        //     this.cantidad =this.cantidad+producto.cantidad;
        // }; 
        this.productos.push(nuevoProducto);
        this.precioTotal = this.precioTotal + (producto.precio * cantidad);
        this.categorias.push(producto.categoria);
        }catch(err){
            console.log(err);
        }
       
        
    }
    //
    /**
     * función que elimina @{cantidad} de productos con @{sku} al carrito
     */
    async eliminarProducto(sku) {
        // Aquí va la lógica para eliminar el producto
        return new Promise((resolve, reject) => {
          // Si el producto se eliminó correctamente, resolvemos la promesa con un mensaje
          const productoEliminado = productosDelSuper.find(product => product.sku === sku);
          if (productoEliminado) {
           
            resolve("Producto eliminado con éxito");
          } else {
            // Si hubo algún error, rechazamos la promesa con un error
            reject(new Error("No se pudo eliminar el producto"));
          }
        });
      }
 
}
    // Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito

    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

}


// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                //agregado de respuesta a producto no encontrado
                reject(new Error(`Product ${sku} not found`));
            }
        }, 1500);
    });

}





const carrito = new Carrito();
carrito.agregarProducto('WE328NJ', 2);
//pureba de agregar producto con los mismos valores
carrito.agregarProducto('FN312PPE',5);
carrito.agregarProducto('FN312PPE',50);
//carrito.agregarProducto('AQ123TTR', 'Carne', 4, 'alimento', 3);
//prueba de elimar producto
carrito.eliminarProducto('FN312PPE');
setTimeout(() => {
    console.log('LOS PRODUCTOS DE CARRITOO',carrito.productos);
},2000);

