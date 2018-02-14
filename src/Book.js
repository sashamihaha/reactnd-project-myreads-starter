import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

const Book = ({ book, updateBooks, getBookShelf }) => {

    let imageLink = ''
    book.imageLinks.thumbnail ? imageLink = `url(${book.imageLinks.thumbnail})` : ''
    return (
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: imageLink }}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={getBookShelf(book.id)} onChange={(event) => BooksAPI.update(book, event.target.value).then(() => updateBooks())}>
                            <option value="moveTo" disabled>Move to...</option>
                            <option value="currentlyReading" >Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        </li>
    )
}

export default Book