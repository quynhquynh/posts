import React from 'react'
import { Link } from 'react-router-dom'


class List extends React.PureComponent{



    render(){
        const {id, title, category, handleClick, author, isEdit, date, content} = this.props
        return(
            <div>
                <div>
                    <h4>{title}</h4>
                    <p className='posts-category' onClick={e => handleClick(e, category)}>#{category}</p>
                    <p className='posts-author'>by {author}</p>
                    <p className='posts-date'>{isEdit ? `edited: ${date}` : `created: ${date}`}</p>
                </div>
                <p className='posts-content'>{content.slice(0, 50)}...</p>
                <div className='more'><Link to={`/posts/${id}`}>more</Link></div>
            </div>
            
        )
    }
}


export default List