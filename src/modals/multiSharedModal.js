
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import GroupNameModal from './groupNameModal'
export default class  MultiSharedModal extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showModal:false,
      nOfFiles:'0',
      currentColorBtn:"#122b79"
    }
    this.handleClose=this.handleClose.bind(this)
    this.handleShow=this.handleShow.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.SwitchModal=this.SwitchModal.bind(this)
    this.OnMouseOver=this.OnMouseOver.bind(this)
    this.OnMouseLeave=this.OnMouseLeave.bind(this)
    this.child = React.createRef();
  }
  
  handleClose(){
    this.setState({showModal:false,nOfFiles:'0'});
  }
  handleShow(){
    this.setState({showModal:true})
  }
  handleChange(e){
    this.setState({nOfFiles:e.target.value})
  }
  SwitchModal(){
    if(Number(this.state.nOfFiles)>=1&&Number(this.state.nOfFiles)<=150){
      this.props.showNextModal(this.state.nOfFiles)
      this.handleClose()
    }
    else{
      alert("You can ask for 1-150 files only!")
      this.setState({nOfFiles:''})
    }
    
  }
  OnMouseOver() {
    this.setState({currentColorBtn:"rgb(28 61 164)"})
  }
  OnMouseLeave() {
    this.setState({currentColorBtn:"#122b79"})
  }
  onShowChildM = () => {
    this.child.current.handleShow();
  };

  render(){
    const showModal=this.state.showModal
    const currentColorBtn=this.state.currentColorBtn
    const fileN=this.state.nOfFiles
    return(
      <div style={{height:"100%"}} >
        <Button variant="primary" onClick={this.onShowChildM} onMouseOver= {this.OnMouseOver} onMouseLeave={this.OnMouseLeave} style={{background:currentColorBtn,borderColor:currentColorBtn,
        width:'38%',
        fontSize:'1.3vw',
        position:'relative',
        top:"10%",
        left:"30%"}}>
       אני רכז,ואני רוצה מספר פלאיירים
      </Button>
      <Modal show={showModal} onHide={this.handleClose} >
        <div style={{textAlign:"center",borderBottom:"solid #122b79"}}>
          
          <h5 style={{position:"relative",top:"30%"}}>מספר פלאיירים לשיתוף</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{position:"relative",top:"-35px",right:"2px"}} onClick={this.handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div>
        <input type="text" class="form-control"  style={{position:"relative",left:"44%",width:"50px",top:"7%",textAlign:"center"}} onChange={this.handleChange} value={fileN}/>
      
        <button type="button" class="btn btn-primary" style={{background:"#122b79",borderColor:"#122b79",position:"relative",top:"12px",marginLeft:"43%"}} onClick={this.SwitchModal}>שתף</button>
        
        

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
      <GroupNameModal ref={this.child} goToNextModal={this.handleShow}/>
      </div>
    );
  }
  
}