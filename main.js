console.log("hello");


let books= [];

function Book(title, author, pages, readStatus="Unread"){
    if(!new.target){
        throw Error("You must use new opeartor to call this function")
    }
    this.id = crypto.randomUUID();
    this.title = title,
    this.author = author,
    this.pages = pages;
    this.readStatus = this.readStatus;
} 

function addBookToLibrary(title, author, pages, readStatus){
    pages = Number(pages);
    const newBook = new Book(title, author, pages, readStatus);
    books.push(newBook);
    display_books();
}


const adding = document.getElementById("Button");
const dialog = document.getElementById("favdialog")
const cancelButton = document.getElementById("cancel");

adding.addEventListener("click", () =>{
    dialog.showModal();
})

cancelButton.addEventListener("click", ()=>{
    dialog.close();
    
})

function display_books(){
    const bookList = document.getElementById("favbook");
    bookList.innerHTML= "";

    books.forEach(book =>{
       const card = document.createElement("div");
       card.classList.add("book-card");

       console.log("Displaying Pages:", book.pages, typeof book.pages);

       card.innerHTML = 
       `<h1>${book.title}</h3>
       <p><strong>Author:</strong> ${book.author}</p>
       <p><strong>Pages:</strong> ${book.pages}</p>
       <label><strong>Status:</strong>
                <select class="status-select" data-id="${book.id}">
                    <option value="Unread" ${book.readStatus === "Unread" ? "selected" : ""}>Unread</option>
                 <option value="Read" ${book.readStatus === "Read" ? "selected" : ""}>Read</option>
                 <option value="Reading" ${book.readStatus === "Reading" ? "selected" : ""}>Reading</option>
                </select>
            </label>

            <button class="delete-btn" onclick="deleteBook('${book.id}')">
                🗑️
            </button>
       `;
       bookList.appendChild(card);

    })
}

document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault();
    const title = document.getElementById("name").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const readStatus = document.getElementById("read-status").value;


    console.log("Pages:", pages);

    if(title && author && pages){
        addBookToLibrary(title, author, pages, readStatus);
        document.getElementById("form").reset(); 
        dialog.close();   }

});

//function to update read status
function updateReadStatus(bookId, newStatus) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.readStatus = newStatus;
        display_books(); // Refresh display
    }
}

//funcion for deleting book
function deleteBook(bookId) {
    books = books.filter(book => book.id !== bookId); // Remove book from array
    display_books(); // Refresh book list
}

