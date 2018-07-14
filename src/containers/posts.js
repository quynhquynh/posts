import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signup, login, logout } from '../actions'
import Checkbox from '../components/checkbox'
import UserAction from '../containers/user-action'
import List from '../components/list'


class Posts extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filter: [],
            sortType: 'date-des'
        }
    }

    handleCheckbox = (e, cate = '') => {
        let copy_filter = [...this.state.filter]
        !cate 
            ? copy_filter.includes(e.target.value) ? copy_filter.splice(copy_filter.indexOf(e.target.value), 1) : copy_filter.push(e.target.value)
            : copy_filter.includes(cate) ? copy_filter.splice(copy_filter.indexOf(cate), 1) : copy_filter.push(cate)
        this.setState({filter: copy_filter})
    }

    handleSort = e => {
        this.setState({sortType: e.target.value})
    }
       

    filterPosts = posts => {
        let {filter} = this.state
        const locked = posts
        for(let item of filter){
            if(item === filter[0]) posts = [...locked.filter(post => post.category === item)]
            if(item !== filter[0]) posts = [...posts, ...locked.filter(post => post.category === item)]
        }
        return posts
    }


    sortingPosts = (sortType, posts) => {
        switch(sortType){
        case 'date-asc': 
            return posts.sort((a, b) => {
                let aa = Number(a.date.split('.').reverse().join(''))
                let bb = Number(b.date.split('.').reverse().join(''))
                return aa - bb
            }) 
        case 'author-asc':
            return posts.sort((aa, bb) => aa.author < bb.author ? -1 : 1)
        case 'author-des':
            return posts.sort((aa, bb) => aa.author < bb.author ? 1 : -1)
        default: 
            return posts.sort((a, b) => {
                let aa = Number(a.date.split('.').reverse().join(''))
                let bb = Number(b.date.split('.').reverse().join(''))
                return bb - aa
            }) 
        }
    }

    
    render(){
        let {posts, login_u} = {...this.props}
        let {filter, sortType } = this.state

        posts = this.sortingPosts(sortType,  this.filterPosts(posts))

        const radio = [{id: 'culture', name: 'cate', label: 'Culture'}, {id: 'lifestyle', name: 'cate', label: 'Lifestyle'}, {id: 'tech', name: 'cate', label: 'Tech'}]
        
        return(
            <div className='posts'>
                <UserAction />
                <div id='all-sort'>
                    <h2>All posts {Object.keys(login_u).length ? <span>| <Link to='/posts/new' id='add-new'> Add new</Link></span> : ''}</h2> 
                    <select value={this.state.sortType} onChange={this.handleSort}>
                        <option value='author-asc'>sort by author asc</option>
                        <option value='author-des'>sort by author des</option> 
                        <option value='date-des'>sort by date lastest</option>
                        <option value='date-asc'>sort by date oldest</option>
                    </select>
                </div>
                <ul id='filter-btn'>
                    {radio.map((item, i) => <Checkbox 
                        key={i} 
                        id={item.id} 
                        name={item.name}
                        label={item.label} 
                        checked={filter.includes(item.id)} 
                        onChange={this.handleCheckbox} />)}
                </ul>
                <ul className='posts-list'>
                    {posts.map(post => {
                        return(
                            <li key={post.id} className='post-item'>
                                <List
                                    id={post.id}
                                    title={post.title}
                                    handleClick={this.handleCheckbox}
                                    category={post.category}
                                    content={post.content}
                                    author={post.author}
                                    date={post.date}
                                    isEdit={post.isEdit} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({posts, login}) => {
    const values = Object.values(posts)
    return {
        posts: values,
        login_u: login
    }
}


export default connect(mapStateToProps, { signup, login, logout })(Posts)