let carrito = [];

// Cargar carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Guardar carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualizar carrito: guarda y muestra los cambios
function actualizarCarrito() {
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
}

// Agregar producto al carrito o incrementar su cantidad si ya está en el carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id == idProducto);
    if (!producto) {
        console.error("Producto no encontrado");
        return;
    }
    
    const productoEnCarrito = carrito.find(item => item.id == idProducto);

    if (productoEnCarrito) {
        // Si el producto ya está en el carrito, incrementar su cantidad
        productoEnCarrito.cantidad += 1;
    } else {
        // Si no está en el carrito, añadirlo con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    
    Toastify({
        text: `${producto.nombre} ha sido añadido al carrito.`,
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "#6c6450",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

// Calcular el total del carrito
function calcularTotalCarrito() {
    return carrito.reduce((total, item) => {
        const precio = item.precio || 0;
        const cantidad = item.cantidad || 0;
        return total + precio * cantidad;
    }, 0);
}

// Mostrar productos en el carrito
function mostrarCarrito() {
    const itemsCarrito = document.getElementById('items-carrito');
    if (!itemsCarrito) return; // Evita errores si no se encuentra el elemento

    itemsCarrito.innerHTML = '';

    carrito.forEach(item => {
        const itemCarrito = document.createElement('div');
        itemCarrito.className = 'item-carrito';
        itemCarrito.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <h3>${item.nombre}</h3>
            <p>$${item.precio} x ${item.cantidad} = $${item.precio * item.cantidad}</p>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        itemsCarrito.appendChild(itemCarrito);
    });

    // Calcular y mostrar el total del carrito
    const totalCarrito = calcularTotalCarrito();
    const totalDiv = document.createElement('div');
    totalDiv.className = 'total-carrito';
    totalDiv.innerHTML = `<h3>Total: $${totalCarrito}</h3>`;
    itemsCarrito.appendChild(totalDiv);
}

// Eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id != idProducto);
    actualizarCarrito();
}

// Proceder al pago
function procederAlPago() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No disponible!",
    });
}

// Inicializar funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeLocalStorage(); // Cargar el carrito desde el localStorage

    if (document.getElementById('items-carrito')) {
        mostrarCarrito(); // Mostrar carrito si estamos en la página del carrito
    }
});
