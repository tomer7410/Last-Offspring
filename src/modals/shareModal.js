
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import MultiSharedModal from './multiSharedModal'
export default class ShareModal extends React.Component {
  constructor(props){
    super(props)
    this.state={
      showModal:false,
      nOfFiles:'1',
      currentColorBtn:"#122b79"
    }
    this.handleClose=this.handleClose.bind(this)
    this.handleShow=this.handleShow.bind(this)
    this.OnMouseOver=this.OnMouseOver.bind(this)
    this.OnMouseLeave=this.OnMouseLeave.bind(this)
    this.switchModal=this.switchModal.bind(this)
    this.handleFirstOpen=this.handleFirstOpen.bind(this)
    this.downLoadFiles=this.downLoadFiles.bind(this)
    
  }
  handleFirstOpen(){
    this.setState({showModal:true})
  }
  
  handleClose(){
    this.setState({showModal:false,nOfFiles:'1'});
  }
  handleShow(nOfFiles){
    this.setState({showModal:true,nOfFiles:nOfFiles})
  }
 
  OnMouseOver() {
    this.setState({currentColorBtn:"rgb(28 61 164)"})
  }
  OnMouseLeave() {
    this.setState({currentColorBtn:"#122b79"})
  }
  switchModal(){
    this.props.goToEmailModal(this.state.nOfFiles)
    this.handleClose()
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
  downLoadFiles(){
    var myHeaders = new Headers();
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Cache-Control", "max-age=0");
    myHeaders.append("if-modified-since", "");
    myHeaders.append("accept", "*/*");
    myHeaders.append("if-none-match", "");
    myHeaders.append("accept-language", "en-US,en;q=0.9");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36");
    //myHeaders.append("Referer", "/");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
     
    };
    fetch(`/downloadFiles?nOfFiles=${this.state.nOfFiles}`, requestOptions)
      .then(response => {response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        if(this.state.nOfFiles>1){
          a.download="images.zip"
        }
        else{
          a.download="image.png"
        }
        a.click();
        a.remove()
      });})
      this.updateCurrentP(this.state.nOfFiles)

  }
  


  render(){
    const showModal=this.state.showModal
    const currentColorBtn=this.state.currentColorBtn
    return(
      <div style={{height:"100%",position:"relative"}}>
          <Button variant="primary" onClick={this.handleFirstOpen} onMouseEnter={this.OnMouseOver} onMouseLeave={this.OnMouseLeave} style={{background:currentColorBtn,borderColor:currentColorBtn,
        width:'38%',
        
        fontSize:'1.3vw',
        position:'relative',
        top:'4%',
       left:"30%"}}>
        "גם אני רוצה לקחת חלק בפרוייקט "נצר אחרון 
      </Button>

      <Modal show={showModal} onHide={this.handleClose} >
      <div style={{textAlign:"center",borderBottom:" 1.5px solid #122b79"}}>
        
        <h5 style={{position:"relative",top:"30%"}}>שיתוף פלאיירים</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{position:"relative",top:"-35px",right:"2px"}} onClick={this.handleClose}>
          <span aria-hidden="true" >&times;</span>
        </button>
      </div>
        <div style={{height:"100%"}}>
        <button type="button" class="btn btn-primary"  style={{background:"#122b79",borderColor:"#122b79",float:"left",position:"relative",top:"30%",left:"3%"}} onClick={this.switchModal}>באמצעות מייל</button>
        <button type="button" class="btn btn-primary" style={{background:"#122b79",borderColor:"#122b79",float:"right",position:"relative",top:"30%",right:"3%"}} onClick={this.downLoadFiles}>הורד למחשב</button>

      </div>
        {/* <Modal.Footer>
          <Button variant="secondatextAlign:"center"ry" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
      <MultiSharedModal showNextModal={this.handleShow}/>
        
      </div>
    );
    
  }
  
}