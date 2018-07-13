import React from 'react'
import { addPost } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

class PostNew extends React.Component{
    generateDate = () => {
        const [day, month, year] = [
            new Date().getDate(),
            new Date().getMonth() + 1,
            new Date().getFullYear()
        ]
        const date = `${day > 9 ? day : `0${day}`}.${month > 9 ? month : `0${month}`}.${year}`
        return date
    }
    //title, category, content
    //id, date, author
    onSubmit = values => {
        let copy_values = {...values}
        copy_values.id = this.props.keys[this.props.keys.length -1] + 1 
        copy_values.author = this.props.login_u.username
        copy_values.date = this.generateDate()
        this.props.addPost(copy_values, () => {
            this.props.history.push('/')
        })
    }

    renderInput = props => {
        console.log('props', props)
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
        // const {meta: {touched, error}} = props
        return(
            <div>
                <label>{label}</label>
                <textarea type='text' {...input} />
                <p className='err'>{touched ? error : ''}</p>
            </div>
        )
    }


    render(){
        const { handleSubmit } = this.props
        console.log(this.props)
      
        return(
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <h4>Create new post</h4>
                <Field label='Title: ' name='title' component={this.renderInput} type='text' />
                <Field label='Category: ' name='category' component={this.renderSelect} >
                    <option value='culture'>Culture</option>
                    <option value='lifestyle'>Lifestyle</option>
                    <option value='tech'>Tech</option>
                </Field>
                <Field label='Content: ' name='content' component={this.renderTextarea} type='text' />
                <div id='save-cancel'>
                    <button type='submit'>Save</button>
                    <button><Link to='/'>Cancel</Link></button>
                </div>
            </form>
        )
    }
}




const mapStateToProps = state => ({
    keys: Object.keys(state.posts),
    login_u: state.login
})
    
const validate = values => {
    //name must be same as keys of errors
    const errors = {
        title: !values.title ? 'Enter a title' : '',
        category: !values.category ? 'Enter a category' : '',
        content: !values.content ? 'Enter some content' : ''
    }
    return errors
}



export default reduxForm({
    validate,
    form: 'NewPost'
})(
    connect(mapStateToProps, { addPost })(PostNew)
)
