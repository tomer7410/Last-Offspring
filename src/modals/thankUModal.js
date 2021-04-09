
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import EmailModal from './emailModal'
export default class  ThankUModal extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showModal:false
    }
    this.handleClose=this.handleClose.bind(this)
    this.handleShow=this.handleShow.bind(this)
    this.SwitchModal=this.SwitchModal.bind(this)
   
  }
  
  handleClose(){
    this.setState({showModal:false});
  }
  handleShow(){
    this.setState({showModal:true})
  }
  SwitchModal(){
    this.setState({showModal:false})
    this.props.showPNumberModal()
  }

  
  render(){
    const {showModal}=this.state
    return(
      <div style={{height:"100%"}}>
        
      <Modal show={showModal}  nHide={this.handleClose} class="a" >
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"  onClick={this.handleClose}>
            <span aria-hidden="true" style={{position:"relative",left:"47%"}}>&times;</span>
          </button>
        <h3  class="text-center" style={{position:"relative",color:"#122b79"}}>  תודה שהשתתפת בפרוייקט נצר אחרון.לתזכורת לחץ <a style={{color:"white"}}onClick={this.SwitchModal} href="#">כאן</a></h3>
      </Modal>
      <EmailModal goToThanksModal={this.handleShow}/>
      </div>
    );
  }
  
}