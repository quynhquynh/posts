import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, updatePost } from '../actions'
import { Field, reduxForm, getFormSyncErrors } from 'redux-form'


class Post extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isEdit: false
        }
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
        const id = Number(this.props.match.params.id)
        this.props.deletePost(id, () => {
            this.props.history.push('/')
        })
    }

    handleEdit = () => {
        this.setState({isEdit: true})
    }

    handleCancel = () => {
        this.setState({isEdit: false})
    }

    onSubmit = values => {
        let copy_values = {...values}
        copy_values.id = Number(this.props.match.params.id)
        copy_values.author = this.props.login_u.username
        copy_values.date = this.generateDate()
        copy_values.isEdit = true
        this.props.updatePost(copy_values)
        this.setState({
            isEdit: false
        })
    }

    renderInput = props => {
        console.log(props)
        const {meta: {touched, error}} = props
        return(
            <div>
                <label>{props.label}</label>
                <input type='text' {...props.input} />
                <p className='err'>{touched ? error : ''}</p>
            </div>
        )
    }

    renderSelect = ({meta, label, input, children}) => {
        const {touched, error} = meta
        return(
            <div>
                <label>{label}</label>
                <select {...input}>
                    {children}
                </select>
                <p className='err'>{touched ? error : ''}</p>
            </div>
        )
    }

    renderTextarea = ({meta, label, input}) => {
        const {touched, error} = meta
        return(
            <div>
                <label>{label}</label>
                <textarea type='text' {...input}/>
                <p className='err'>{touched ? error : ''}</p>
            </div>
        )
    }
   

    render(){
        const { title, category, author, date, content } = this.props.post
        if(!this.props.post){
            return <div>Loading...</div>
        }
        const login_user = this.props.login_u.username

        const memberAction = () => (
            <div>
                <button className='del-btn' onClick={this.handleDelete}>Delete Post</button>
                <button className='edit-btn' onClick={this.handleEdit}>Edit Post</button>
            </div>
        )

        const renderNormal = () => {
            return(
                <div>
                    <div id='post-head'>
                        <Link to='/' className='back'>Back to Posts</Link>
                        {login_user === author && memberAction()}
                    </div>
                    <div id='post-body'>
                        <h3 className='title'>{title}</h3>
                        <p className='category'>{category}</p>
                        <p className='author'>By {author}</p>
                        <p className='date'>Created: {date}</p>
                        <p>{content}</p>
                    </div>
                </div>
            )
        }


        const renderEdit = () => {
            const { handleSubmit } = this.props
            return(
                <div>  
                    <Link to='/' className='back'>Back to Posts</Link>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <h4>Update Post</h4>
                        <Field label='Title: ' name='title' component={this.renderInput} type='text' />
                        <Field label='Category: ' name='category' component={this.renderSelect} >
                            <option value='culture'>Culture</option>
                            <option value='lifestyle'>Lifestyle</option>
                            <option value='tech'>Tech</option>
                        </Field>
                        <Field label='Content: ' name='content' component={this.renderTextarea} type='text' />
                        <div id='save-cancel'>
                            <button type='submit'>Save</button>
                            <button type='clear' onClick={this.props.reset}>Reset</button>
                            <button onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>

            
            )
        }

        return (this.state.isEdit ? renderEdit() : renderNormal())
       
    }
}


const mapStateToProps = (state, props) => {
    const id = Number(props.match.params.id)
    const posts = Object.values(state.posts)
    const post = posts.find(post => post.id === id)
    
    return {
        editFromErrors: getFormSyncErrors('EditPost')(state),
        post: post,
        login_u: state.login,
        initialValues: {title: post.title, category: post.category, content: post.content} //reduxForm uses it not the component
    }
}

const validate = (values, props) => {
    //name must be same as keys of errors
    const errors = {
        title: !values.title || values.title === props.initialValues.title ? 'Enter a title' : '',
        category: !values.category ? 'Enter a category' : '',
        content: !values.content ? 'Enter some content' : ''
    }
    return errors
}
    
const ReduxFormComponent = reduxForm({
    validate,
    form: 'EditPost'
})(Post)

export default connect(mapStateToProps, { deletePost, updatePost })(ReduxFormComponent)

//order of redux-form and connect matters if reduxForm needs to use any key (like initialValues), post and login_u no need