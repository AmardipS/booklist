// Book Contructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI Constructo
function UI() {}

// Add book to list UI prototype function
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    // Insert columns
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    // Append book row to list
    list.appendChild(row);
}

// Show Alert UI Prototype function
UI.prototype.showAlert = function(message, className){
    // Create a Div element
    const div = document.createElement('div');
    // Insert Classes to the Div
    div.className = `alert ${className}`;
    // Create text node
    const textNode = document.createTextNode(message);
    // Append text node to div
    div.appendChild(textNode);
    // Get the Container
    const container = document.querySelector('.container');
    // Get the Form
    const form = document.querySelector('#book-form');
    // Insert alert message
    container.insertBefore(div, form);

    // Set timeout alert message
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);

}

// Clear Fields UI Prototype function
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Delete book UI Prototype function
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}



// Event Listeners for adding book
document.getElementById('book-form').addEventListener('submit', 
function(e){
    // Get form values
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value
    
    // Instantiate Book
    const book = new Book(title, author, isbn);
    
    // Instantiate UI
    const ui = new UI();

    // Form validation
    if(title === '' || author === '' || isbn === ''){
        // Show alert message
        ui.showAlert("Please fill all the feilds.", 'error');
    } else{
        // Add book to the list
        ui.addBookToList(book);
    }

    // Clear the fields
    ui.clearFields();

    e.preventDefault();
});

// EventListener for delete book
document.getElementById('book-list').addEventListener('click', 
function(e){
    // Instantiate UI
    const ui = new UI();
    // Delete book
    ui.deleteBook(e.target);
    // Show message
    ui.showAlert('The book has been deleted!', 'success');  
    
})