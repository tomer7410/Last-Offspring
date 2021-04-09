
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import ShareModal from './shareModal'
export default class  EmailModal extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showModal:false,
      emailAddress:'',
      nOfFiles:'1'
    }
    this.handleClose=this.handleClose.bind(this)
    this.handleShow=this.handleShow.bind(this)
    this.SwitchModal=this.SwitchModal.bind(this)
    this.sendEmail=this.sendEmail.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.validateEmail=this.validateEmail.bind(this)
  }
  handleChange(e){
    this.setState({emailAddress:e.target.value})
  }
  handleClose(){
    this.setState({showModal:false,emailAddress:'',nOfFiles:'1'});
  }
  handleShow(nOfFiles){
    this.setState({showModal:true,nOfFiles:nOfFiles})
  }
  updateCurrentP(additionalP){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("additionalP", additionalP);
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      body: urlencoded
    };
    
    fetch("/setcurrentp", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  sendEmail(){
    this.validateEmail(this.state.emailAddress,(result)=>{
      if(result){
        var myHeaders = new Headers();
        myHeaders.append("sec-ch-ua", "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"");
        myHeaders.append("Accept", "application/json");
        myHeaders.append("sec-ch-ua-mobile", "?0");
        myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", this.state.emailAddress);
        urlencoded.append("nOfFiles", this.state.nOfFiles);
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch("/emaillSending", requestOptions)
          .then(response => response.text())
          .then(result => alert(result))
          .catch(error => alert(error));
        this.updateCurrentP(this.state.nOfFiles)
        this.SwitchModal()
      }
      else{
        alert("Wrong Email Format")
        
      }
    })
   


  }
  SwitchModal(){
    this.props.goToThanksModal()
    this.handleClose()
  }
  validateEmail(emailAddress,fn){
    var isValid=true
    if(!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(this.state.emailAddress)){
      isValid=false
    }
   fn(isValid)
  }
  

  render(){
    const showModal=this.state.showModal
    const textInput=this.state.emailAddress
    
    return(
      <div style={{height:"100%"}}>
            <Modal show={showModal} onHide={this.handleClose} >
        <div style={{textAlign:"center",borderBottom:"solid #122b79",height:"53px"}}>
          
          <h5 style={{position:"relative",top:"30%"}}>הזן דואר אלקטרוני </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{position:"relative",top:"-35px",right:"2px"}} onClick={this.handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div style={{height:"100%"}} >
        <input type="text" class="form-control" placeholder="מייל" style={{position:"relative",left:"30%",width:"40%",top:"7%",textAlign:"center"}} onChange={this.handleChange} value={textInput}/>
      
        <button type="button" class="btn btn-primary" style={{background:"#122b79",borderColor:"#122b79",position:"relative",top:"15px",left:"42%"}} onClick={this.sendEmail}>שתף</button>
        
        

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
      <ShareModal goToEmailModal={this.handleShow}></ShareModal>
      </div>

      
      
    );
  }
  
}