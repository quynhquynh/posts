//without redux-form
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, updatePost } from '../actions'
import Form from '../components/form'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      title: '',
      category: '',
      date: '',
      content: '',
      isEdit: false
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { title, category, date, content } = this.props.post[0]
    this.setState({
      id: Number(id),
      title,
      category,
      date,
      content
    })
  }

  generateDate = () => {
    const [day, month, year] = [
      new Date().getDate(),
      new Date().getMonth() + 1,
      new Date().getFullYear()
    ]
    const date = `${day > 9 ? day : `0${day}`}.${month > 9 ? month : `0${month}`}.${year}`
    return date
  }

  handleDelete = () => {
    const { id } = this.state
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
  }

  handleEdit = () => {
    this.setState({ isEdit: true })
  }

  handleCancel = () => {
    this.setState({ isEdit: false })
  }

  handleChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
      date: this.generateDate()
    })
  }

  handleSave = () => {
    this.props.updatePost(this.state)
    this.setState({
      id: 0,
      title: '',
      category: '',
      content: '',
      isEdit: false
    })
  }

  render() {
    const { title, category, author, date, content } = this.props.post[0]
    if (!this.props.post) {
      return <div>Loading...</div>
    }
    const login_user = this.props.login_u.username

    const memberAction = () => (
      <div>
        <button className="del-btn" onClick={this.handleDelete}>
          Delete Post
        </button>
        <button className="edit-btn" onClick={this.handleEdit}>
          Edit Post
        </button>
      </div>
    )

    const renderNormal = () => {
      return (
        <div>
          <div id="post-head">
            <Link to="/" className="back">
              Back to Posts
            </Link>
            {login_user === author && memberAction()}
          </div>
          <div id="post-body">
            <h3 className="title">{title}</h3>
            <p className="category">{category}</p>
            <p className="author">By {author}</p>
            <p className="date">Created: {date}</p>
            <p>{content}</p>
          </div>
        </div>
      )
    }

    const renderEdit = () => {
      return (
        <div>
          <Link to="/" className="back">
            Back to Posts
          </Link>
          <form onSubmit={this.handleSubmit}>
            <h4>Update Post</h4>
            <Form props={this.state} handleChange={this.handleChange} />
            <div id="save-cancel">
              <button onClick={this.handleSave}>Save</button>
              <button onClick={this.handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )
    }

    return this.state.isEdit ? renderEdit() : renderNormal()
  }
}

const mapStateToProps = (state, props) => {
  const id = Number(props.match.params.id)
  const posts = Object.values(state.posts)
  return {
    post: posts.filter(post => post.id === id),
    login_u: state.login
  }
}

export default connect(
  mapStateToProps,
  { deletePost, updatePost }
)(Post)
