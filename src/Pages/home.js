import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShareModal from '../modals/shareModal'
import GroupNameModal from '../modals/groupNameModal'
import RemainderModal from '../modals/reminderModal';
import download from 'js-file-download';
export default class Home extends React.Component {
    constructor(props){
        super(props)
        this.state={
          currentColorBtn:"#122b79",
          nOfParticipants:0
        }
             
    }
    componentDidMount(){
      const that=this;
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      

      fetch("/getcurrentp", requestOptions)
        .then(response => response.text())
        .then(result => this.setState({nOfParticipants:result}))
        .catch(error => console.log('error', error));
      
        
   
}
    render() {
      const a= this.state.nOfParticipants
  
      return(
        <div style={{height:"100vh"}}>
              
            <div >
            <p class="text-center" style={{fontFamily:"Helvetica, sans-serif",color:"white",fontSize:"3vw"}}>פרוייקט נצר אחרון</p>
            <p class="text-justify"style={{color:"white",direction:"rtl",width:"100%",position:"relative",marginTop:"3%",fontSize:"1.5vw"}}>חללי נצר אחרון הם שורדי שואה אחרונים ממשפחתם שנהרגו כחללי צהל במלחמות ישראל. חללים אלו נותרו ללא משפחה שתזכור אותם ביום הזכרון. אנו מזמינים אתכם להיות המשפחה שלהם ולאמץ חלל.

אז מה בעצם צריך לעשות?
להדליק נר ביום הזיכרון הקרוב לזכר החלל שמופיע בכרטיס שקיבלת. כמובן שכל רעיון נוסף מבורך😊

אספנו כמה רעיונות לדברים שנעשו ואפשר לעשות גם:
🕯לחפש חומר וללמוד קצת על החלל שקיבלת.
🕯ללמוד לעילוי נשמתו.
🕯לאמץ אותו לשנה הקרובה ולערוך לו אזכרה/להדליק נר או לעלות לקברו ביום השנה.</p>
            </div>
           
           <RemainderModal></RemainderModal>
             <div >
             <p  class="text-center" style={{fontSize:'2vw',color:"rgb(40 255 1)",fontFamily:"Helvetica, sans-serif",fontFamily:"Helvetica, sans-serif"}}>כרגע השתתפו {a} משתמשים בפרוייקט</p>
             <p  class="text-center" style={{fontSize:'1.75vw',color:"white"}}>:פרטי יצירת קשר</p>
             <p  class="text-center" style={{fontSize:'1.5vw',color:"white"}}>Netzer.aharon@gmail.com:אימייל</p>
             <p  class="text-center" style={{fontSize:'1.5vw',color:"white"}}>0507421494:טלפון</p>
             </div>
            
          </div>
          
          
          
      );
    }
}