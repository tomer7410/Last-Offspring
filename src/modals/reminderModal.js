
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import ThankUModal from  "./thankUModal"
export default class  MultiSharedModal extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showModal:false,
      currentColorBtn:"#122b79",
      phoneNumber:'',
      name:''
    }
    this.handleClose=this.handleClose.bind(this)
    this.handleShow=this.handleShow.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.formValidation=this.formValidation.bind(this)
    this.sendNotification=this.sendNotification.bind(this)
    
    
  }
  
  handleClose(){
    this.setState({showModal:false,phoneNumber:'',name:''});
  }
  handleShow(){
    this.setState({showModal:true})
  }
  
  handleChange(e){
    if(e.target.name=="phone-number"){
      this.setState({phoneNumber:e.target.value})
    }
    else{
      this.setState({name:e.target.value})
    }
    
  }
  formValidation(fields,fn){
    var isValid=true
    if(!(/^\+?(972|0|\+972|00972)(\-)?(([23489]{1}\d{7})|[5]{1}\d{8})/.test(fields.phoneNumber))){
     
      isValid=false
    }
    if(fields.name==""){
      alert("please fill the name field")
      isValid=false
    }
    fn(isValid)
  }
  sendNotification(){
      this.formValidation(this.state,(result)=>{
      if(result){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("fName",`${this.state.name}`);
        urlencoded.append("pNumber", `${this.state.phoneNumber}`);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

        fetch("/setNRemainder", requestOptions)
          .then(response => response.text())
          .then(result => {
            if(result =="1"){
              alert("We wil Remaind you")
            }
            else{
              alert(result)
            }
          })
          .catch(error => alert(error));
        this.handleClose()
      }
      else{
        alert("invalid input")
      }
    })
            
          }
  render(){
    const {showModal}=this.state
    const pNumberInput=this.state.phoneNumber
    const name=this.state.name
    return(
      <div style={{height:"15%"}}>
          <Modal show={showModal} onHide={this.handleClose} >
        <div style={{textAlign:"center",borderBottom:"solid #122b79",height:"53px"}}>
          
          <h5 style={{position:"relative",top:"30%"}}>הזן שם ומספר טלפון לתזכורת</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{position:"relative",top:"-35px",right:"2px"}} onClick={this.handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div style={{height:"100%"}}  >
          <input type="text" class="form-control" name="phone-number" placeholder="מספר טלפון" style={{position:"relative",top:"25%",float:"right",right:"2%",width:"40%",textAlign:"center"}} onChange={this.handleChange} value={pNumberInput}/>
          <input type="text" class="form-control" name="name"  placeholder="שם מלא" style={{position:"relative",float:"right",top:"25%",right:"4%",width:"30%",textAlign:"center"}} onChange={this.handleChange} value={name}/> 
          <button type="button" class="btn btn-primary" style={{background:"#122b79",borderColor:"#122b79",position:"relative",float:"right",top:"25%",right:"8%"}} onMouseOver= {this.OnMouseOver} onMouseLeave={this.OnMouseLeave} onClick={this.sendNotification}>שלח</button>
      </div>
      </Modal>
      <ThankUModal showPNumberModal={this.handleShow}/>      
      </div>
      
      
    );
  }
  
}