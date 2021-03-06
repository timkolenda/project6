import React, { Component } from 'react';
import FullScreenMessage from './FullScreenMessage'


class Messages extends Component {
    constructor(){
        super();
        this.state = {
            viewSingleMessage: false,
            selectedMessageKey: "",
            selectedMessageObject: {}
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.messages !== prevProps.messages) {
            console.log('forcing an update in message');
            this.selectSingleMessage();
            // this.props.selectMessageForReply(this.state.selectedMessageKey);
        }
    }


    viewMessage = (e) => {
        e.preventDefault();
        this.setState({
            // viewSingleMessage: true,
            selectedMessageKey: e.target.id
        }, () => {
            this.selectSingleMessage();
            this.props.selectMessageForReply(this.state.selectedMessageKey);
        })
    }   
    selectSingleMessage = () => {
        const selectedMessageArray = this.props.messages.filter((message) => {
            return (message.key === this.state.selectedMessageKey)
        });
        console.log("sma", selectedMessageArray);
        // this.props.setSecondUserNameOnMessageOpen(selectedMessageArray[0].from)
        this.setState({
            selectedMessageObject: selectedMessageArray[0]
        }, () => {
            this.setState({
                viewSingleMessage: true 
            })
        });
    }
    
    render(){
        return (
            <div className="messages">
                <div className="messages__inbox">
                    {/* <div>
                        <button className="app__button">Home</button>
                    </div> */}
                    {this.props.messages.map((message) => {
                        return (
                            <button id={message.key} className="messages__preview" onClick={this.viewMessage} >
                                <div id={message.key} className="wrapper">
                                    <p className="messages__previewFrom" id={message.key} >{message.from}</p>
                                    <p className="messages__previewDate" id={message.key} >{message.displayDate}</p>          
                                </div>
                            </button>
                        )
                    })}
                    {(this.state.viewSingleMessage) 
                    ? (
                        <FullScreenMessage 
                        message={this.state.selectedMessageObject}
                        replyToMessage={this.props.replyToMessage}
                        recieveRestaurantResult={this.props.recieveRestaurantResult}
                        userName={this.props.userName}
                        showFindInvite={this.props.showFindInvite}
                        />
                    ) : (
                        ""
                    )   
                    }
                    </div>
            </div>
            )
            
        

    }

} 

export default Messages