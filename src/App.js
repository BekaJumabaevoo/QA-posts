import React from "react";
import axios from "axios";
import "./App.scss";

export default class App extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
      const posts = res.data;
      this.setState({ posts });
    });
  }

  deleteRow(id) {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        console.log(res);

        const posts = this.state.posts.filter((item) => item.id !== id);
        this.setState({ posts });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Post title</h1>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td className="btn-td">
                  <button
                    className="btn btn-danger"
                    onClick={(e) => this.deleteRow(post.id, e)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
