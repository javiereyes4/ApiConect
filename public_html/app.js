/* global fetch */

(function(angular) {
  'use strict';
var App = angular.module('App', ["ngRoute"])
.directive('onlynumbers', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    });

App.config(function($routeProvider) {
    $routeProvider
    .when("/Home", {
        templateUrl : "Home.html"
    })
    .when("/CreateUser", {
        templateUrl : "CreateUser.html",
        controller: "UserCtrl"
    })    
    .when("/ToDo", {
        templateUrl : "ToDo.html",
        controller: "ToDoCtrl"
    })
    .otherwise({
        redirectTo: '/Home'
    });
});

App.controller('UserCtrl', ['$scope',function($scope) {

    GetUser();
    $scope.Title = "Usuarios";

    function GetUser() {
        $scope.valuser=[];

        fetch('http://jsonplaceholder.typicode.com/users/', {
        method: 'get'
        }).then(function(respuesta) {
            return respuesta.json();
        }).then(function(myJson) {
            Getvalues(myJson);
        }).catch(function(err) {
        });            
    };
        
    function Getvalues(val){            
        $scope.ListUser = val;
        $("#tblbody tr").remove();
        
      $scope.ListUser.forEach(function(element) {
          
          
          $("#tblbody").append('<tr><td>'+element.id+'</td><td>'+element.username+'</td><td>'+element.name+'</td><td>'+element.email+'</td><td>'+element.phone+'</td></tr>');
          
          
          $("#FilterInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#tblbody tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
          });
      });
    }
    
    $scope.AddUser= function(){
        
                if ($scope.Name === undefined) {
                    $("#MessageError").toggle();
                    $("#txtlblerror")[0].innerText = "Debe digitar un usuario para poder guardar.";
                    
                    setTimeout(function() {
                    $("#MessageError").toggle();    
                    },1500);
                    return ;
                }
                
                if ($scope.UserName === undefined) {
                    $("#MessageError").toggle();
                    $("#txtlblerror")[0].innerText = "Debe digitar un user name para poder guardar.";
                    
                    setTimeout(function() {
                    $("#MessageError").toggle();    
                    },1500);
                    return ;
                }
                                
                if ($scope.Email === undefined) {
                    $("#MessageError").toggle();
                    $("#txtlblerror")[0].innerText = "Debe digitar un email para poder guardar.";
                    
                    setTimeout(function() {
                    $("#MessageError").toggle();    
                    },1500);
                    return ;
                }
                
                if ($scope.Direccion === undefined) {
                    $("#MessageError").toggle();
                    $("#txtlblerror")[0].innerText = "Debe digitar una dirección para poder guardar.";
                    
                    setTimeout(function() {
                    $("#MessageError").toggle();    
                    },1500);
                    return ;
                }
                
                if ($scope.Suite === undefined) {
                    $("#MessageError").toggle();
                    $("#txtlblerror")[0].innerText = "Debe digitar un suite para poder guardar.";
                    
                    setTimeout(function() {
                    $("#MessageError").toggle();    
                    },1500);
                    return ;
                }
                
                if ($scope.Ciudad === undefined) {
                    $("#MessageError").toggle();
                    $("#txtlblerror")[0].innerText = "Debe digitar una ciudad para poder guardar.";
                    
                    setTimeout(function() {
                    $("#MessageError").toggle();    
                    },1500);
                    return ;
                }
                
                if ($scope.PostalCode === undefined) {
                    $("#MessageError").toggle();
                    $("#txtlblerror")[0].innerText = "Debe digitar un código postal para poder guardar.";
                    
                    setTimeout(function() {
                    $("#MessageError").toggle();    
                    },1500);
                    return ;
                }
                
                if ($scope.Latitud === undefined) {
                    $("#MessageError").toggle();
                    $("#txtlblerror")[0].innerText = "Debe digitar una latitud para poder guardar.";
                    
                    setTimeout(function() {
                    $("#MessageError").toggle();    
                    },1500);
                    return ;
                }
                
                if ($scope.Longitud === undefined) {
                    $("#MessageError").toggle();
                    $("#txtlblerror")[0].innerText = "Debe digitar una longitud para poder guardar.";
                    
                    setTimeout(function() {
                    $("#MessageError").toggle();    
                    },1500);
                    return ;
                }
                
                if ($scope.Telefono === undefined) {
                    $("#MessageError").toggle();
                    $("#txtlblerror")[0].innerText = "Debe digitar un télefono para poder guardar.";
                    
                    setTimeout(function() {
                    $("#MessageError").toggle();    
                    },1500);
                    return ;
                }
                
                if ($scope.WebPage === undefined) {
                    $("#MessageError").toggle();
                    $("#txtlblerror")[0].innerText = "Debe digitar una web page para poder guardar.";
                    
                    setTimeout(function() {
                    $("#MessageError").toggle();    
                    },1500);
                    return ;
                }
                
                if ($scope.Empresa === undefined) {
                    $("#MessageError").toggle();
                    $("#txtlblerror")[0].innerText = "Debe digitar una empresa para poder guardar.";
                    
                    setTimeout(function() {
                    $("#MessageError").toggle();    
                    },1500);
                    return ;
                }
        
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({
              name: $scope.Name,
              username: $scope.UserName,
              email: $scope.Email,
              address: {
                  street: $scope.Direccion,
                  suite: $scope.Suite,
                  city: $scope.Ciudad,
                  zipcode: $scope.PostalCode,
                  geo: {
                    lat: $scope.Latitud,
                    lng: $scope.Longitud
                  }
                },
                phone: $scope.Telefono,
                website: $scope.WebPage,
                company: {
                  name: $scope.Empresa
                }
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(function(respuesta) {
            return respuesta.json();
          }).then(function(Response) {
              $("#tblbody").append('<tr><td>'+Response.id+'</td><td>'+Response.username+'</td><td>'+Response.name+'</td><td>'+Response.email+'</td><td>'+Response.phone+'</td></tr>');
              console.log(Response);
              $scope.SuccessLoad();
          }).catch(function(err) {
          });
    };
    
    $scope.SuccessLoad=function(){
        
        $("#Name").val("");
        $("#UserName").val("");
        $("#Email").val("");
        $("#Direccion").val("");
        $("#Suite").val("");
        $("#Ciudad").val("");
        $("#PostalCode").val("");
        $("#Latitud").val("");
        $("#Longitud").val("");
        $("#Telefono").val("");
        $("#WebPage").val("");
        $("#Empresa").val("");
        
        $scope.Name = undefined;
        $scope.UserName= undefined;
        $scope.Email= undefined;
        $scope.Direccion= undefined;
        $scope.Suite= undefined;
        $scope.Ciudad= undefined;
        $scope.PostalCode= undefined;
        $scope.Latitud= undefined;
        $scope.Longitud= undefined;
        $scope.Telefono= undefined;
        $scope.WebPage= undefined;
        $scope.Empresa= undefined;
        
        
        $("#Message").toggle();
        $("#txtlbl")[0].innerText = "Usuario Creado Correctamente";
        
        setTimeout(function () {
            $("#Message").toggle();
        },1400);
        
    };
    
}]);

App.controller('ToDoCtrl', ['$scope',function($scope) { 
        
    $scope.Title = "ToDo Usuarios";
    var UserId = "";
    $("#ShowNewTask").css("display","none");
    
    
    $scope.ListTodoUser=function(){
        
        if($scope.IdUser === "" || $scope.IdUser === undefined){
            $("#MessageError").toggle();
            $("#txtlblerror")[0].innerText = "Para efectuar la consulta, el campo Id Usuario no puede estar vacio.";

            setTimeout(function() {
            $("#MessageError").toggle();    
            },1500);
            return ;            
        }
        
        fetch('http://jsonplaceholder.typicode.com/users/'+$scope.IdUser+'/todos', {
        method: 'get'
        }).then(function(respuesta) {
            return respuesta.json();
        }).then(function(myJson) {
            $scope.GetTodosUser(myJson);
        }).catch(function(err) {
        }); 
        
    };
    
    function DeleteToDo(Id){
        fetch('https://jsonplaceholder.typicode.com/todos/'+Id+'', {
        method: 'DELETE'
        });
        
        $("#delete"+Id).remove();
        
        $("#Message").toggle();
        $("#txtlbl")[0].innerText = "Tarea Eliminada Correctamente.";

        setTimeout(function() {
            $("#Message").toggle();    
        },1500);
    };
    
    function ChangeState(Id){
        
        fetch('https://jsonplaceholder.typicode.com/todos/'+Id , {
            method: 'PUT',
            body: JSON.stringify({
              id:Id,
              completed: true
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(function(respuesta) {
            return respuesta.json();
          }).then(function(Response) {              
                $("#TR"+Id)[0].innerText = "Completado";        
                $("#TR"+Id).css("background-color","#9DC9AA");

                $("#Message").toggle();
                $("#txtlbl")[0].innerText = "Tarea Completada Correctamente.";

                setTimeout(function() {
                    $("#Message").toggle();    
                },1500);
                
                console.log(Response);
          }).catch(function(err) {
          });
    }
    
    function UpdateTask(Id){
        
        if($("#DV"+Id)[0].innerText === ""){
            $("#MessageError").toggle();
            $("#txtlblerror")[0].innerText = "si desea actualizar, la tarea no puede estar en blanco.";

            setTimeout(function() {
            $("#MessageError").toggle();    
            },1500);
            return ;            
        }
        
        fetch('https://jsonplaceholder.typicode.com/todos/'+Id, {
            method: 'PUT',
            body: JSON.stringify({
              id:Id,
              userId: UserId,
              title: $("#DV"+Id)[0].innerText
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(function(respuesta) {
            return respuesta.json();
          }).then(function(Response) {              
                $("#DV"+Id).attr("contenteditable",false);
                $("#DV"+Id).css("border","none");

                $("#Message").toggle();
                $("#txtlbl")[0].innerText = "Tarea Actualizada Correctamente.";

                setTimeout(function() {
                    $("#Message").toggle();    
                },1500);
                
                console.log(Response);
          }).catch(function(err) {
          });
    }    
    
    function EditableTask(Id){
        $("#DV"+Id).attr("contenteditable",true);        
        $("#DV"+Id).css("border","1px solid blue");
    }
    
    $scope.GetTodosUser=function(val){
        
        $("#DivTodo div").remove();      
        
        
        val.forEach(function(element) {
            UserId = element.userId;
            $("#DivTodo").append('<div id="delete'+element.id+'"><div class="col-md-6" id="DV'+element.id+'" title="Doble Click Para Editar" style="border-radius:5px;background-color: #D1D1D1;border: 1px solid #A7A5A5;margin-bottom:10px;color:black;font-size:15px;">'+element.title+'</div>\n\
                                <div class="col-md-2" id="TR'+element.id+'" style=";border-radius:5px;background-color:'+(element.completed == false ? "#F86161":"#9DC9AA")+' ;border: 1px solid #A7A5A5;margin-bottom:10px;color:black;font-size:15px;margin-left:5px;text-align:center">'+ (element.completed == false ? "Pendiente":"Completado")+'</div>\n\
                                <div class="col-md-1" id="upd'+element.id+'" style="width:15px; cursor:pointer;border-radius:5px;background-color: white;border: 1px solid #A7A5A5;margin-bottom:10px;color:black;font-size:15px;margin-left:5px;text-align:center" title="Actualizar">A</div>\n\
                                <div class="col-md-1" id="del'+element.id+'" style="width:15px;cursor:pointer;border-radius:5px;background-color: white;border: 1px solid #A7A5A5;margin-bottom:10px;color:black;font-size:15px;margin-left:5px;text-align:center" title="Eliminar">E</div>\n\
                                <div class="col-md-1" id="act'+element.id+'" style="width:15px;cursor:pointer;border-radius:5px;background-color: white;border: 1px solid #A7A5A5;margin-bottom:10px;color:black;font-size:15px;margin-left:5px;text-align:center" title="Completar">C</div></div>');
            document.getElementById("del"+element.id+"").addEventListener("click", function(){
                DeleteToDo(element.id);
            }, false);
            
            document.getElementById("act"+element.id+"").addEventListener("click", function(){
                ChangeState(element.id);
            }, false);
            
            document.getElementById("upd"+element.id+"").addEventListener("click", function(){
                UpdateTask(element.id);
            }, false);
            
            document.getElementById("DV"+element.id+"").addEventListener("click", function(){
                EditableTask(element.id);
            }, false);
        });
        
        $("#ShowNewTask").css("display","block");
        
    };
     
    
    $scope.AddTask= function () {
        
        if ($scope.Tittle === undefined || $scope.Tittle === "") {
            $("#MessageError").toggle();
            $("#txtlblerror")[0].innerText = "Debe digitar una tarea para poder guardar.";

            setTimeout(function() {
            $("#MessageError").toggle();    
            },1500);
            return ;
        }
        
        fetch('http://jsonplaceholder.typicode.com/users/'+UserId+'/todos', {
            method: 'POST',
            body: JSON.stringify({
              userId: UserId,
              title: $scope.Tittle,
              completed: false
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(function(respuesta) {
            return respuesta.json();
          }).then(function(Response) {
              $("#DivTodo").prepend('<div id="delete'+Response.id+'"><div class="col-md-6" id="DV'+Response.id+'" title="Doble Click Para Editar" style="border-radius:5px;background-color: #D1D1D1;border: 1px solid #A7A5A5;margin-bottom:10px;color:black;font-size:15px;">'+Response.title+'</div>\n\
                                <div class="col-md-2" id="TR'+Response.id+'" style=";border-radius:5px;background-color:'+(Response.completed == false ? "#F86161":"#9DC9AA")+' ;border: 1px solid #A7A5A5;margin-bottom:10px;color:black;font-size:15px;margin-left:5px;text-align:center">'+(Response.completed == false ? "Pendiente":"Completado")+'</div>\n\
                                <div class="col-md-1" id="upd'+Response.id+'" style="width:15px;cursor:pointer;border-radius:5px;background-color: white;border: 1px solid #A7A5A5;margin-bottom:10px;color:black;font-size:15px;margin-left:5px;text-align:center" title="Actualizar">A</div>\n\
                                <div class="col-md-1" id="del'+Response.id+'" style="width:15px;cursor:pointer;border-radius:5px;background-color: white;border: 1px solid #A7A5A5;margin-bottom:10px;color:black;font-size:15px;margin-left:5px;text-align:center" title="Eliminar">E</i></div>\n\
                                <div class="col-md-1" id="act'+Response.id+'" style="width:15px;cursor:pointer;border-radius:5px;background-color: white;border: 1px solid #A7A5A5;margin-bottom:10px;color:black;font-size:15px;margin-left:5px;text-align:center" title="Completar">C</div></div>');
                
                document.getElementById("del"+Response.id+"").addEventListener("click", function(){
                  DeleteToDo(Response.id);
                }, false);
                
                document.getElementById("act"+Response.id+"").addEventListener("click", function(){
                    ChangeState(Response.id);
                }, false);
                
                document.getElementById("upd"+Response.id+"").addEventListener("click", function(){
                    UpdateTask(Response.id);
                }, false);
                
                document.getElementById("DV"+Response.id+"").addEventListener("click", function(){
                    EditableTask(Response.id);
                }, false);

                $("#Message").toggle();
                $("#txtlbl")[0].innerText = "Tarea Creada Correctamente.";

                setTimeout(function() {
                    $("#Message").toggle();    
                },1500);
                
                console.log(Response);
                $scope.SuccessLoad();
          }).catch(function(err) {
          });
    };
    
}]);

})(window.angular);