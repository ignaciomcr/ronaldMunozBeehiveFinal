function PostsComponent(callback) {
    //Se llama a toda la estructura.
    
    //ESTO LO DESHABILITÉ PORQUE BLOQUEBA LOR PRIMEROS BOTONES 
    AppComponent.call(this);    

}

PostsComponent.prototype = Object.create(AppComponent.prototype);
PostsComponent.prototype.constructor = PostsComponent;
 


PostsComponent.prototype.showBeeDetailsPOST = function (user,usuario) {

        document.getElementById('divPosts').innerHTML='';
        var divPosts = document.getElementById('divPosts'); 
        
        var h1Posts = document.createElement('h1');
        h1Posts.innerHTML = "Bee´s Posts (" + user.name + ")";
        h1Posts.classList.add('h1Posts');

        divPosts.appendChild(h1Posts); 
        
        this.posts = [];

        var url = 'https://beehive-270a2.firebaseio.com/data/posts.json';
        
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
            this.posts=[];
        
        
            for (var key in data) {
                if (data.hasOwnProperty(key)) {

                    var post = data[key];
                    
                    var usr;

                    if (usuario === 'defecto'){
                        usr = 1;
                        h1Posts.innerHTML = "Bee´s Posts (Leanne Graham)";
                    }else
                    {
                        usr = user.userid;
                    }

                    
                    if (post.userId === usr){
                        posts.push(new Post(post.title,post.body, post.userId));
                    }
                    
                }
            }
                   
           

            for (let i = 0; i < posts.length; i++) {
                const post = posts[i];
                new PostComponent(post, divPosts, null);
                
            } 

            var btNewPost = document.createElement('button');
            btNewPost.innerHTML = "New Post";
            btNewPost.onclick=mostrarDiv;
            btNewPost.classList.add('btNewPost');
                
            divPosts.appendChild(btNewPost); 

            var divNewPost = document.createElement('div');
            divNewPost.id='divNewPost';
            divNewPost.classList.add('DivNewPost');
            divNewPost.hidden=true;
            
            var labelTitle = document.createElement('p');
            labelTitle.innerHTML="Title:";
            labelTitle.classList.add('pNuevoPost');

            var inputTitle = document.createElement('input');
            inputTitle.id='inputTitle';
            inputTitle.classList.add('input');

            var labelBody = document.createElement('p');
            labelBody.innerHTML="Body:";
            labelBody.classList.add('pNuevoPost');

            var inputBody = document.createElement('input');
            inputBody.id='inputBody';
            inputBody.classList.add('input');

            var btOK = document.createElement('button');
            btOK.innerHTML = "OK";
            btOK.onclick=ocultarDiv;
            btOK.classList.add('btOK');
            
            divNewPost.appendChild(labelTitle);
            divNewPost.appendChild(inputTitle);
            divNewPost.appendChild(labelBody);
            divNewPost.appendChild(inputBody);
            divNewPost.appendChild(btOK);
            

                
            divPosts.appendChild(divNewPost); 

            
            
        }  

        function mostrarDiv(){

            var divNewPost=document.getElementById('divNewPost');
            divNewPost.hidden=false;
            document.getElementById('inputTitle').value = '';
            document.getElementById('inputBody').value = '';
        
        }


        function ocultarDiv(){
            var divNewPost=document.getElementById('divNewPost');
            divNewPost.hidden=true;
            
            if (document.getElementById('inputTitle').value != ''){
                alert ('POST agregado'+ "\n" + document.getElementById('inputTitle').value + "\n" + document.getElementById('inputBody').value);
            }

        }

}

