import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../component/Post/Post';
import FullPost from '../../component/FullPost/FullPost';
import NewPost from '../../component/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts : [],
        selectedPostId : null , 
        error : false
        }
    componentDidMount(){

        //how we can work whit axios
         axios.get('https://jsonplaceholder.typicode.com/postsss')
                            .then(response =>{
                             const posts = response.data.slice(0,4)//how we can work whit the promise data
                             const updatedPosts = posts.map(post=>{
                                 return{ 
                                     ...post ,
                                    auther : 'max'}
                             })
                                
                             
                                this.setState({posts : updatedPosts})
                                
                            })
                            .catch(error=>{
                                console.log(error)
                                this.setState({
                                   error : true
                               })
                            })

    }

    postSelectedHandler=(id)=>{
        this.setState({selectedPostId : id})
       
    }

    render () {
        let posts = <p style={{textAlign : 'center'}}>something went wrong...!</p>
        if(!this.state.error){
                posts = this.state.posts.map(post =>(<Post 
                title={post.title}
                key={post.id}
                auther={post.auther}
                clicked={()=>this.postSelectedHandler(post.id)}/>
                  )
         )

        }

       
        
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