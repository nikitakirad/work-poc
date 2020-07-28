import React, {  Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import {Card} from 'semantic-ui-react';
import Menu from '../../components/menu';
import Cards from '../../components/cards';
class Comments extends Component{
    state={
        searchid:null,
        search:false
    }
    
    componentDidMount(){
        this.props.oninitComments();
    }
    addfav=(id)=>{
        this.props.onAddFavComment(id);
    }
    search=(event)=>{
        let postid=null;
        this.props.comments.map(post=>{
            if(post.name === event.target.value){
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
        let comment;
        let searchcomment;
        comment=<Cards data={this.props.comments}
        addfav={this.addfav}/>
        if(this.state.search === true){
            searchcomment= <div style={{margin:'0px 20px'}}>
                                <Card color="black">
                                <Card.Content>
                                    <Card.Header>{this.props.comments[this.state.searchid].name}</Card.Header>
                                    <Card.Description>{this.props.comments[this.state.searchid].body}</Card.Description><br></br>
                                </Card.Content>
                            </Card><br/>
                            </div>
        }
        return(
            <div>
            <Menu displayParticular={searchcomment} 
                displayAll={comment}
                search={this.state.search}
                particularSearch={this.search}/>
            </div>
            
        );
    }
}
const mapStateToProps=state=>{
    return{
        comments:state.comment.comments
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        oninitComments: () => dispatch(actions.initComments()),
        onAddFavComment: (commentid) => dispatch(actions.addCommentsToFavs(commentid))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Comments);
