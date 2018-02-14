import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Book from './Book'

class BooksApp extends React.Component {
  state = {
    currentlyReading: '',
    wantToRead: '',
    read: '',
    query: '',
    searchResult: ''
  }

  fetchMyBooks() {
    BooksAPI.getAll().then(result => this.setState({
      currentlyReading: result.filter((book) => {
        return book.shelf === 'currentlyReading'
      }),
      wantToRead: result.filter((book) => {
        return book.shelf === 'wantToRead'
      }),
      read: result.filter((book) => {
        return book.shelf === 'read'
      })
    }))
  }

  componentDidMount() {
    this.fetchMyBooks();
  }

  updateQuery(query) {
    this.setState({ query: query })
    BooksAPI.search(query).then(result => this.setState({
      searchResult: result
    }))
  }

  getBookShelf(bookId) {
    let shelf = "none"
    this.state.currentlyReading.map((book) => {
      book.id === bookId ? shelf = "currentlyReading" : ""
    })
    this.state.wantToRead.map((book) => {
      book.id === bookId ? shelf = "wantToRead" : ""
    })
    this.state.read.map((book) => {
      book.id === bookId ? shelf = "read" : ""
    })
    return shelf
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search query={this.state.query} searchResult={this.state.searchResult} updateQuery={(query) => this.updateQuery(query)} updateBooks={() => this.fetchMyBooks()} getBookShelf={(bookId) => this.getBookShelf(bookId)} />
        )}
        />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf shelfTitle={"Currently Reading"} books={this.state.currentlyReading} updateBooks={() => this.fetchMyBooks()} getBookShelf={(bookId) => this.getBookShelf(bookId)} />
                <Shelf shelfTitle={"Want to Read"} books={this.state.wantToRead} updateBooks={() => this.fetchMyBooks()} getBookShelf={(bookId) => this.getBookShelf(bookId)} />
                <Shelf shelfTitle={"Read"} books={this.state.read} updateBooks={() => this.fetchMyBooks()} getBookShelf={(bookId) => this.getBookShelf(bookId)} />
              </div>
            </div>
            <Link className="open-search" to="/search">Add a book</Link>
          </div>
        )} />
      </div>
    )
  }
}

const Shelf = ({ shelfTitle, updateBooks, getBookShelf, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books !== '' ? books.map((book) => (
            <Book key={book.id} book={book} updateBooks={() => updateBooks()} getBookShelf={(bookId) => getBookShelf(bookId)} />
          )) : ""}
        </ol>
      </div>
    </div>
  )
}

export default BooksApp
