const newBookBtn = document.querySelector("#btn-new-book");
const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector("#cancel");
const form = document.querySelector("form");
const submitBtn = document.querySelector("#submit");

const myLibrary = [];

form.addEventListener("submit", (e)=>{
    let title = document.querySelector("#title");
    let author = document.querySelector("#author");
    let pages = document.querySelector("#pages");
    let read = document.querySelector("#read");

    console.log(read.checked);

    addBookToLibrary(title.value, author.value, pages.value, read.checked?"Read":"Not Read");
    displayLibrary();

    dialog.close();
    form.reset();

    e.preventDefault();
})

newBookBtn.addEventListener("click", ()=> {
    dialog.showModal();
})
closeBtn.addEventListener("click", ()=>{
    dialog.close();
})

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function(){
    if(this.read == "Read"){
        this.read = "Not Read";
    }
    else{
        this.read = "Read";
    }
}

function removeBook(e){
    let id = e.target.parentElement.dataset.id;
    console.log(id);

    const index = myLibrary.findIndex((element) => {
        return element.id == id;
    })
    myLibrary.splice(index, 1);
    displayLibrary();
    console.log(index);

}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}


function displayLibrary(){
    const shelf = document.querySelector("#shelf");
    shelf.innerHTML = "";

    myLibrary.forEach((book) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <p class="card-title">${book.title}</p>
            <p class="card-author">${book.author}</p>
            <p class="card-pages">${book.pages} pg</p>
        `;
        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.addEventListener("click", removeBook);
        removeBtn.classList.add("remove-btn");

        let toggleRead = document.createElement("button");
        toggleRead.innerText = book.read;
        toggleRead.dataset.read = book.read;
        toggleRead.addEventListener("click", ()=>{
            book.toggleRead();
            displayLibrary();
        });

        card.appendChild(toggleRead);

        card.appendChild(removeBtn);
        card.dataset.id = book.id
        shelf.appendChild(card);
    })
}


addBookToLibrary("harry potter", "idk", 2000, "Read");
addBookToLibrary("harry putter", "idk", 2000, "Not Read");
addBookToLibrary("dkan dja", "idk", 2000, "Read");


displayLibrary();