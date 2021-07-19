import {http} from './http';
import {ui} from './ui'

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
//Submit Posts when button click
document.querySelector('.post-submit').addEventListener('click', submitPost);
//Delete post when button click
document.querySelector('#posts').addEventListener('click', deletePost);
//Event listener for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);
//Listen for Cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err));
}

function submitPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }

  // Validate input
  if(title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {
    // Check for ID
    if(id === '') {
      // Create Post
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
    } else {
      // Update Post
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post updated', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));
    }

  }
  }

function deletePost(e){
  if(e.target.parentElement.classList.contains('delete')){
    const id  = e.target.parentElement.dataset.id;
   if(confirm('Are you sure?')) {
    http.delete(`http://localhost:3000/posts/${id}`)
    .then( data => {
      ui.showAlert('Post removed', 'alert alert-danger');
      getPosts();
    })
    .catch(err => console.log(err));
   }
  }
  e.preventDefault();
}

function enableEdit(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data ={
      id,
      title,
      body
    }
    //Fill up the form with current post
    ui.fillForm(data); 
  }
}

function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add');
  }
  e.preventDefault();
}
