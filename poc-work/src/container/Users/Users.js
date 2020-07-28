import React, {  Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import {Card} from 'semantic-ui-react';
import Menu from '../../components/menu';
import Cards from '../../components/cards';
class Users extends Component{
    state={
        menuVisible: false,
        searchid:null,
        search:false
    }
    
    componentDidMount(){
        this.props.oninitUser();
    }
    addfav=(id)=>{
        this.props.onAddFavUser(id);
    }
    search=(event)=>{
        let postid=null;
        this.props.users.map(post=>{
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
        let user;
        let searchuser;
        user=<Cards data={this.props.users}
        addfav={this.addfav}/>
        if(this.state.search === true){
            searchuser= <div style={{margin:'0px 20px'}}>
                                <Card color="black">
                                <Card.Content>
                                    <Card.Header>{this.props.users[this.state.searchid].name}</Card.Header>
                                    <Card.Description>
                                        {this.props.users[this.state.searchid].email}<br/>
                                        {this.props.users[this.state.searchid].phone}<br/>
                                        {this.props.users[this.state.searchid].website}<br/>
                                    </Card.Description><br></br>
                                </Card.Content>
                            </Card><br/>
                            </div>
        }
        return(
            <div>
             <Menu displayParticular={searchuser} 
                displayAll={user}
                search={this.state.search}
                particularSearch={this.search}/>
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        users:state.user.users
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        oninitUser: () => dispatch(actions.initUsers()),
        onAddFavUser: (userid) => dispatch(actions.addUserToFavs(userid))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Users);
