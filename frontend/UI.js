import BookService from "./services/BookService";
const bookService = new BookService();
import {format} from "timeago.js";

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    ui.renderBooks();
});

class UI {
    async renderBooks() {
        const books = await bookService.getBooks();
        const booksContainer = document.getElementById("books-cards");
        booksContainer.innerHTML = "";
        books.forEach(book => {
            const div = document.createElement("div");
            div.className = "";
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${book.imagePath}" alt="" class="img-fluid" />
                        </div>
                        <div class="col md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" data-id="${book._id}">X</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                </div>
            `;
            booksContainer.appendChild(div);
        });
    }

    async addBook(book) {        
        await bookService.postBooks(book);
        this.clearBookForm();
        this.renderMessage("Book added", "success", 3000);
        this.renderBooks();
    }

    clearBookForm() {
        document.getElementById("book-form").reset();
    }

    renderMessage(msg, type, duration) {
        const div = document.createElement("div");
        div.className = `alert alert-${type} message`;
        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector(".col-md-4");
        const bookForm = document.querySelector("#book-form");

        container.insertBefore(div, bookForm);

        setTimeout(() => {
            document.querySelector(".message").remove();
        }, duration);
    }

    async deleteBook(id) {
        await bookService.deleteBook(id);
        this.renderMessage("Book removed", "danger", 3000);
        this.renderBooks();
    }
}

export default UI;