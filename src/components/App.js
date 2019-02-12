import React, { Component } from 'react';
import axios from 'axios'
import Post from './Post/Post'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPost = this.searchPost.bind(this)
    this.restorePosts = this.restorePosts.bind(this)
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(response => {

      this.setState({
        posts: response.data
      })
    })
  }

  restorePosts() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(response => {

      this.setState({
        posts: response.data
      })
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then( response => {

    this.setState({
      posts:response.data
    })
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(response=>{
      this.setState({
        posts:response.data
      })
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text}).then(response => {
      this.setState({
        posts: response.data
      })
    })
  }
  
  searchPost(search) {
    let filteredPost = this.state.posts.filter(post => post.text.includes(search))
    this.setState({
      posts: filteredPost
    })
  }
  
  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header restorePostsFn={this.restorePosts} searchPostFn={this.searchPost}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {
            posts.map(( post, i ) => (
            <Post deletePostFn={this.deletePost} id={post.id} updatePostFn={this.updatePost} date={post.date} text={post.text} key={post.id} />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
