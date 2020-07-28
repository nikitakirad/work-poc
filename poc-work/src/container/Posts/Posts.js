import React, {  Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import {Card} from 'semantic-ui-react';
import Menu from '../../components/menu';
import Cards from '../../components/cards';

class Posts extends Component{
    state={
        searchid:null,
        search:false
    }
    
    componentDidMount(){
        this.props.oninitPosts();
    }
    addfav=(id)=>{
        console.log(id);
        this.props.onAddFavPost(id);
    }
    search=(event)=>{
        let postid=null;
        this.props.posts.map(post=>{
            if(post.title === event.target.value){
                postid=post.id; 
            }
            return -1;
        })
        if(postid){
            this.setState({searchid:postid});
            this.setState({search:true});   
        }
        if(postid===null){
            this.setState({search:false});
        }
    }
    render(){
        let post;
        let searchpost;
        post=<Cards data={this.props.posts}
        addfav={this.addfav}/>
        if(this.state.search === true){
            searchpost= <div style={{margin:'0px 20px'}}>
                            <Card color="black">
                            <Card.Content>
                                <Card.Header>{this.props.posts[this.state.searchid].title}</Card.Header>
                                <Card.Description>{this.props.posts[this.state.searchid].body}</Card.Description><br></br>
                            </Card.Content>
                            </Card><br></br>
                            </div>
        }
        return(
            <div>
            <Menu displayParticular={searchpost} 
                displayAll={post}
                search={this.state.search}
                particularSearch={this.search}/>
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        posts:state.post.posts
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        oninitPosts: () => dispatch(actions.initPosts()),
        onAddFavPost: (postid) => dispatch(actions.addFav(postid))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Posts);
