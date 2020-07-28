import React from 'react';
import {Card,Button,Segment} from 'semantic-ui-react';

const cards=(props)=>{
    let album;
    album=props.data.map(post=>{
        return(
                <div style={{margin:'0px 20px'}}>
                    <Card color="black">
                    <Card.Content>
                    <Card.Header>{post.title}{post.name}</Card.Header>
                        <Card.Description>
                            {post.body}<br/>
                            {post.email}<br/>
                            {post.phone}<br/>
                            {post.website}
                        </Card.Description>
                        <Button id="btn" onClick={()=>props.addfav(post.id)} 
                             basic color='yellow'>
                             Add 
                        </Button >
                    </Card.Content>
                    </Card><br/>
                </div>
    )})
    return(
        <div>
            <Segment>
                <Card.Group>
                    {album}
                </Card.Group>
            </Segment>
            
        </div>
    )
}

export default cards;