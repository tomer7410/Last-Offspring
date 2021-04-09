
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
export default class  MultiSharedModal extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showModal:false,
      currentColorBtn:"#122b79",
      groupName:''
      
    }
    this.handleClose=this.handleClose.bind(this)
    this.handleShow=this.handleShow.bind(this)
    this.SwitchModal=this.SwitchModal.bind(this)
    this.sendGName=this.sendGName.bind(this)
    this.handleChange=this.handleChange.bind(this)
   
  }
  
  handleClose(){
    this.setState({showModal:false,groupName:''});
  }
  handleShow(){
    this.setState({showModal:true})
  }
  SwitchModal(){
    this.props.goToNextModal()
    this.handleClose()
  }
  
  handleChange(e){
    this.setState({groupName:e.target.value})
  }
  sendGName(){
    if(this.state.groupName!=''){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("gName",this.state.groupName);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("/setGroupM", requestOptions)
        .then(response => {
         
          console.log( response.text())
        })
        .then(result =>console.log(result))
        .catch(error =>console.log(error));
        this.SwitchModal()
    }
    else{
      alert("Group Name cannot be empty")
    }
    
  }

  render(){
    const {showModal}=this.state
   
    return(
      
      <Modal show={showModal} onHide={this.handleClose} >
        <div style={{textAlign:"center",borderBottom:"solid #122b79",height:"53px"}}>
          
          <h5 style={{position:"relative",top:"30%"}}>הזן את שם התנועה</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{position:"relative",top:"-35px",right:"2px"}} onClick={this.handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div style={{height:"100%"}} >
        <input type="text" class="form-control" placeholder="שם תנועה" style={{position:"relative",left:"30%",width:"40%",top:"7%",textAlign:"center"}} onChange={this.handleChange}/>
      
        <button type="button" class="btn btn-primary" style={{background:"#122b79",borderColor:"#122b79",position:"relative",top:"15px",left:"42%"}} onClick={this.sendGName}>המשך</button>
        
        

      </div>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
      
    );
  }
  
}