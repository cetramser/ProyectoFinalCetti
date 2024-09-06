
// Mostrar productos en la página principal
function mostrarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    
    // Usamos fetch para obtener los productos desde un archivo JSON
    fetch('/productos.json') 
        .then(response => response.json())
        .then(productos => {
            productos.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.className = 'producto';
                productoDiv.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <p>€${producto.precio}</p>
                    <a href="producto.html?id=${producto.id}">Ver más</a>
                `;
                listaProductos.appendChild(productoDiv);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

// Mostrar detalles del producto
function mostrarDetalleProducto() {
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get('id');
    
    fetch('/productos.json')
        .then(response => response.json())
        .then(productos => {
            const producto = productos.find(p => p.id == idProducto);
            if (producto) {
                const detalleProducto = document.getElementById('detalle-producto');
                detalleProducto.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h2>${producto.nombre}</h2>
                    <p>${producto.descripcion}</p>
                    <p>€${producto.precio}</p>
                    <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                `;
            }
        })
        .catch(error => {
            console.error('Error al cargar los detalles del producto:', error);
        });
}

// Inicializar funciones
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('lista-productos')) {
        mostrarProductos();
    }
    if (document.getElementById('detalle-producto')) {
        mostrarDetalleProducto();
    }
});
