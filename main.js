console.log("hello");

let books = [];

class Book {
    constructor(title, author, pages, readStatus = "Unread") {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = Number(pages);
        this.readStatus = readStatus;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(title, author, pages, readStatus) {
        const newBook = new Book(title, author, pages, readStatus);
        this.books.push(newBook);
        this.displayBooks();
    }

    deleteBook(bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
        this.displayBooks();
    }

    updateReadStatus(bookId, newStatus) {
        const book = this.books.find(book => book.id === bookId);
        if (book) {
            book.readStatus = newStatus;
            this.displayBooks();
        }
    }

    displayBooks() {
        const bookList = document.getElementById("favbook");
        bookList.innerHTML = "";

        this.books.forEach(book => {
            const card = document.createElement("div");
            card.classList.add("book-card");

            card.innerHTML = `
                <h1>${book.title}</h1>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <label><strong>Status:</strong>
                    <select class="status-select" data-id="${book.id}">
                        <option value="Unread" ${book.readStatus === "Unread" ? "selected" : ""}>Unread</option>
                        <option value="Read" ${book.readStatus === "Read" ? "selected" : ""}>Read</option>
                        <option value="Reading" ${book.readStatus === "Reading" ? "selected" : ""}>Reading</option>
                    </select>
                </label>
                <button class="delete-btn" data-id="${book.id}">🗑️</button>
            `;

            bookList.appendChild(card);
        });

        // Add event listeners for status change and delete buttons
        document.querySelectorAll(".status-select").forEach(select => {
            select.addEventListener("change", (event) => {
                const bookId = event.target.dataset.id;
                const newStatus = event.target.value;
                library.updateReadStatus(bookId, newStatus);
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const bookId = event.target.dataset.id;
                library.deleteBook(bookId);
            });
        });
    }
}

// Create library instance
const library = new Library();

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("name").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const readStatus = document.getElementById("read-status").value;

    if (title && author && pages) {
        library.addBook(title, author, pages, readStatus);
        document.getElementById("form").reset();
        dialog.close();
    }
});

const adding = document.getElementById("Button");
const dialog = document.getElementById("favdialog");
const cancelButton = document.getElementById("cancel");

adding.addEventListener("click", () => dialog.showModal());
cancelButton.addEventListener("click", () => dialog.close());
