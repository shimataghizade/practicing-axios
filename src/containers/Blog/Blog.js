import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../component/Post/Post';
import FullPost from '../../component/FullPost/FullPost';
import NewPost from '../../component/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts : [],
        selectedPostId : null
        }
    componentDidMount(){

        //how we can work whit axios
         axios.get('https://jsonplaceholder.typicode.com/posts')
                            .then(response =>{
                             const posts = response.data.slice(0,4)//how we can work whit the promise data
                             const updatedPosts = posts.map(post=>{
                                 return{ 
                                     ...post ,
                                    auther : 'max'}
                             })
                                
                             
                                this.setState({posts : updatedPosts})
                                
                            })

    }

    postSelectedHandler=(id)=>{
        this.setState({selectedPostId : id})
       
    }

    render () {

        const posts = this.state.posts.map(post =>(<Post 
                                                title={post.title}
                                                key={post.id}
                                                auther={post.auther}
                                                clicked={()=>this.postSelectedHandler(post.id)}/>
                                                  )
                                         )

        
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id = {this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;