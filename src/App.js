import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    currentlyReading: '',
    wantToRead: '',
    read: '',
    query: '',
    searchResult: undefined
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

  componentDidUpdate() {
    this.fetchMyBooks();
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    BooksAPI.search(this.state.query).then(result => this.setState({
      searchResult: result
    }))
  }

  moveToShelf = (bookId, shelf) => {
    BooksAPI.update(bookId, shelf);
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchResult ? this.state.searchResult.map((result) => (
                  <Book key={result.id} props={result} />
                )) : ""}
              </ol>
            </div>
          </div>
        )}
        />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.currentlyReading !== '' ? this.state.currentlyReading.map((book) => (
                        <Book key={book.id} props={book} />
                      )) : ""}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.wantToRead !== '' ? this.state.wantToRead.map((book) => (
                        <Book key={book.id} props={book} />
                      )) : ""}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.read !== '' ? this.state.read.map((book) => (
                        <Book key={book.id} props={book} />
                      )) : ""}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <Link className="open-search" to="/search">Add a book</Link>
          </div>
        )} />
      </div>
    )
  }
}

const Book = ({ props }) => {
  return (
    <li key={props.id}>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select defaultValue="moveTo" onChange={(event) => BooksAPI.update(props, event.target.value)}>
              <option value="moveTo" disabled>Move to...</option>
              <option value="currentlyReading" >Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.authors}</div>
      </div>
    </li>
  )
}

export default BooksApp
