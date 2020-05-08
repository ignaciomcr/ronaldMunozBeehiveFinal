function TodosComponent(callback) {
    //Se llama a toda la estructura.
    AppComponent.call(this);
}


TodosComponent.prototype = Object.create(AppComponent.prototype);
TodosComponent.prototype.constructor = TodosComponent;


TodosComponent.prototype.showBeeDetailsTODO = function (user,usuario) {
         
    document.getElementById('divTodos').innerHTML='';
    var divTodos = document.getElementById('divTodos'); 
    
    var h1Todos = document.createElement('h1');
    h1Todos.innerHTML = "Bee´s ToDos (" + user.name + ")";
    h1Todos.classList.add('h1Todos');
   
    divTodos.appendChild(h1Todos);


    this.todos = [];

    var url = 'https://beehive-270a2.firebaseio.com/data/todos.json';
    
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.onreadystatechange = processRequest; 

    function processRequest(e) {
        var request = e.target;

        if (request.readyState === 4) {
            switch (request.status) {
                case 200:
                    console.log('OK');
                    processResponse(request.responseText);
                    break;
                case 404:
                    console.log('Error');
                    break;
            }
        }
    }


    function processResponse(text){

        var data = JSON.parse(text);
        console.log(data);

        //Limpiar arreglo.
        this.todos = [];
    
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var todo = data[key];

                
                var usr;

                if (usuario === 'defecto'){
                    usr = 1;
                    h1Todos.innerHTML = "Bee´s ToDos (Leanne Graham)";
                }else
                {
                    usr = user.userid;
                }
                
                if (todo.userId === usr/*user.userid*/){

                    todos.push(new Todo(todo.id,todo.completed,todo.title,todo.userId));

                }
                
            }
        }
                    
                   
        for (let i = 0; i < todos.length; i++) {
            
            const todo = todos[i];
            new TodoComponent(todo, divTodos, null);

        } 

        var btNewTodo = document.createElement('button');
        btNewTodo.innerHTML = "New Todo";
        btNewTodo.onclick=mostrarDiv;
        btNewTodo.classList.add('btNewTodo');

        divTodos.appendChild(btNewTodo); 


        var divNewTodo = document.createElement('div');
        divNewTodo.id='divNewTodo';
        divNewTodo.classList.add('DivNewTodo');
        divNewTodo.hidden=true;
            
        var labelTitle = document.createElement('p');
        labelTitle.innerHTML="Title:";
        labelTitle.classList.add('pNuevoTodo');

        var inputTitle = document.createElement('input');
        inputTitle.id='inputTitleTodo';
        inputTitle.classList.add('input');

        var btOK = document.createElement('button');
        btOK.innerHTML = "OK";
        btOK.onclick=ocultarDiv;
        btOK.classList.add('btOKtodo');
        
        divNewTodo.appendChild(labelTitle);
        divNewTodo.appendChild(inputTitle);
        divNewTodo.appendChild(btOK);
            

                
        divTodos.appendChild(divNewTodo); 
        
    }  


    function mostrarDiv(){

        var divNewTodo=document.getElementById('divNewTodo');
        divNewTodo.hidden=false;
        document.getElementById('inputTitleTodo').value = '';
    
    }


    function ocultarDiv(){
        var divNewTodo=document.getElementById('divNewTodo');
        divNewTodo.hidden=true;
        
        if (document.getElementById('inputTitleTodo').value != ''){
            alert ('TODO agregado'+ "\n" + document.getElementById('inputTitleTodo').value);
        }

    }

}