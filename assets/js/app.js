var app = angular.module('shopUDBApp',[]);

app.controller('myCtrl', function ($scope, $http) {
    
    // obtener todos los productos
    $http.get("https://fakestoreapi.com/products")
        .then(function (response) {
            $scope.products = response.data;
        });

    // detalles del producto
    $scope.modalDetails = function(array) {
        
        document.getElementById('mimagen').src = array.image;
        document.getElementById('mprecio').innerHTML = '$' + array.price;
        document.getElementById('mtitulo').innerHTML = array.title;
        document.getElementById('mdescripcion').innerHTML = array.description;
        
        $('#modalDetalles').modal('show');
        
    };

    // cerrar modal
    $scope.closeModal = function(){
        $('#modalDetalles').modal('hide');
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
        console.log('agregado');
    }
});