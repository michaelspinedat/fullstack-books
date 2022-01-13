import "./styles/app.css";
import UI from "./UI";

const form = document.getElementById("book-form")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = form["title"].value;
    const author = form["author"].value;
    const isbn = form["isbn"].value;
    const image = form["image"].files;
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("isbn", isbn);
    formData.append("image", image[0]);        

    const ui = new UI();
    ui.addBook(formData);
});

document.getElementById("books-cards")
    .addEventListener("click", e => {
        e.preventDefault();
        if (e.target.classList.contains("delete")) {
            const ui = new UI();
            ui.deleteBook(e.target.dataset.id);
        }
        
    });

