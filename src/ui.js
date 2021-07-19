class UI {
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts){
        let output = '';
        posts.forEach((post)=> {
            output += `
            <div class="card bg-dark mb-3">
              <div class="card-body">
                <h4 class="card-title">${post.title}</h4>
                <p class="card-text">${post.body}</p>
                <a href="#" class="edit card-link" data-id="${post.id}">
                  <i class="fa fa-pencil"></i>
                </a>
    
                <a href="#" class="delete card-link" data-id="${post.id}">
                <i class="fa fa-remove"></i>
              </a>
              </div>
            </div>
          `;
        });
        this.post.innerHTML = output;
    }
    
    showAlert(message, className){
        //Clear Alert
         this.clearAlert();
        //Create Div
        const div = document.createElement('div');
        //Add Class
        div.className = className;
        //Append text 
        div.appendChild(document.createTextNode(message));
        //Get Parent Element
        const container = document.querySelector('.main');
        //Get child Element
        const posts = document.querySelector('#posts');
        //Insert the Alert 
        container.insertBefore(div, posts);
        //Set Alert timeout
        setTimeout(()=>{
        this.clearAlert()
        },3000)
    }

    clearAlert(){
        const currentAlert = document.querySelector('.alert');

        if(currentAlert){
            currentAlert.remove();
        }
    } 
    //Clear the input fields
    clearFields(){
        this.titleInput.value = '',
        this.bodyInput.value = ''
    }

    //Fill up the user form to perform edit
    fillForm(data){
      this.titleInput.value = data.title;
      this.bodyInput.value = data.body;
      this.idInput.value = data.id;
     // Change Form state
      this.changeFormState('edit');
    }
    //clear Id input
    clearIdInput(){
      this.idInput.value = '';
    }
    //Change the form state to edit
    changeFormState(type){
      if(type === 'edit'){
        this.postSubmit.textContent = 'Edit Post';
        this.postSubmit.className = 'post-submit btn btn-warning btn-block';
        //Create cancel button 
        const button = document.createElement('button');
        //Add Class
        button.className = 'post-cancel btn btn-light btn-block mt-2';
        //Add Text to button
        button.appendChild(document.createTextNode('Cancel Edit'));
        //Get parent to insert the button
        const formBody = document.querySelector('.card-body');
        //Select element to insert button before it 
        const formEnd = document.querySelector('.from-end');
        //Insert the created button 
        formBody.insertBefore(button, formEnd);
      }else{
        this.postSubmit.textContent = 'Post It';
        this.postSubmit.className = 'post-submit btn btn-primary btn-block';
        //Remove Cancel button if its there
        if(document.querySelector('.post-cancel')){
          document.querySelector('.post-cancel').remove();
        }
        //Clear ID from hidden fields
        this.clearIdInput();
        //Clear Input Fields
        this.clearFields();
      }
    }
}

export const ui = new UI;