var app = angular.module('shopUDBApp',[]);

app.controller('myCtrl', function ($scope, $http) {

    // actualizo el calor de la cantidad de items del carrito
    actualizarCantidadEnCarrito();
    
    // obtener todos los productos
    $http.get("https://fakestoreapi.com/products")
        .then(function (response) {
            $scope.products = response.data;
        });

    // detalles del producto
    $scope.modalDetails = function(array) {
        
        document.getElementById('mimagen').src = array.image;
        document.getElementById('mprecio').innerHTML = array.price;
        document.getElementById('mtitulo').innerHTML = array.title;
        document.getElementById('mdescripcion').innerHTML = array.description;
        
        $('#modalDetalles').modal('show');
        
    };

    // cerrar modal
    $scope.closeModal = function(){
        $('#modalDetalles').modal('hide');
        $("#modalCarrito").modal('hide');
    };

    // obtener categorias de la api
    $http.get("https://fakestoreapi.com/products/categories")
        .then(function (response) {
            $scope.categorias = response.data;
        });

    // funcion que detecta el onchange del select de categorias
    $scope.productosPorCategoria = function () {
        let urlApi = ""; 
        if($scope.selectCategoria == ""){
            // pasamos el valor del select como nombre del span que muestra que categoria se esta imprimiendo
            document.getElementById('categoriaTexto').innerHTML = "Todos";
            // url para todos los productos cuando no exista una categoria seleccionada
            urlApi = "https://fakestoreapi.com/products/";
        }else{
            // pasamos el valor del select como nombre del span que muestra que categoria se esta imprimiendo
            document.getElementById('categoriaTexto').innerHTML = $scope.selectCategoria;
            // url con filtro de categoria 
            urlApi = 'https://fakestoreapi.com/products/category/' + $scope.selectCategoria;
        }
        
        
        // obtener productos por categoría
        $http.get(urlApi)
            .then(function (response) {
                // actualizamos el DOM con los nuevos productos
                $scope.products = response.data;
            })
            .catch(function (error) {
                console.error('Error al cargar productos:', error);
            });
    };

    $scope.AgregarCarrito = function () {
        var mprecioElemento = document.getElementById('mprecio');
        var mtituloElemento = document.getElementById('mtitulo');
        // Obtener el texto 
        var mprecioTexto = mprecioElemento.innerText;
        var mtituloTexto = mtituloElemento.innerText;

        // objeto para el carrito
        var datosCarrito = {
            precio: mprecioTexto,
            titulo: mtituloTexto,
            cantidad: 1
        };

        // Obtener el array existente de localStorage o crear uno vacío si no existe
        var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Agregar el item
        carrito.push(datosCarrito);

        // Guardar el obj actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // actualizo el calor de la cantidad de items del carrito
        actualizarCantidadEnCarrito();

        // cierro modal luego de agregar al carrito
        $("#modalDetalles").modal('hide');

        // notifico al usuario que se agregar el item
        alert('Producto Agregado al carrito');
    }

    // funcion del carrito
    $scope.carrito = function () {
        // cerrar modal detalle si esta abierto
        $("#modalDetalles").modal('hide');

        // abrir modal de carrito
        $("#modalCarrito").modal('show');

        // get al carrito del localStorage
        var carrito = JSON.parse(localStorage.getItem('carrito'));

        // llamo tabla del carrito
        var tabla = $("#modalCarrito").find('.table tbody');
        // limpio tabla si tiene contenido
        tabla.empty();
        // limpio el span del total 
        document.getElementById('TotalCarrito').innerHTML = 0;
        // defino el valor del span
        var total = 0;

        // itero los item localstorage y agrega las filas a la tabla
        carrito.forEach(function (producto) {
            // sumamos el total de la tabla 
            var subtotal = parseFloat(producto.precio) * producto.cantidad;
            total += subtotal;

            var fila = '<tr>' +
                '<td>' + producto.titulo + '</td>' +
                '<td>' + producto.precio + '</td>' +
                '<td>' + producto.cantidad + '</td>' +
                '<td>' + (parseFloat(producto.precio) * producto.cantidad).toFixed(2) + '</td>' +
                '</tr>';

            tabla.append(fila);
        });

        document.getElementById('TotalCarrito').innerHTML = total.toFixed(2);
    }

    // proceso de pago

    $scope.procesoDePago = function () {
        alert("proceso de pago proximamente...");
        localStorage.clear();
    }

    // validar cantidad de item en el localstoragen para el carrito
    function actualizarCantidadEnCarrito() {
        
        // obtenemos los items del carrito
        var carrito = JSON.parse(localStorage.getItem('carrito'));

        // cantidad de items incial del carrito 
        var cantidadTotal = 0;

        // Suma la cantidad de cada producto en el carrito
        if (carrito) {
            carrito.forEach(function (producto) {
                cantidadTotal += producto.cantidad;
            });
        }

        document.getElementById('CountCarritoItems').innerHTML = cantidadTotal;
    }
});