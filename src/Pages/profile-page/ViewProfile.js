import React,{Component}  from 'react';

const useStyles = (theme) => ({
   topBackground:{
       backgroundImage: `url(${'https://uploads-us-west-2.insided.com/coursera-en/attachment/0ee512f0-c148-4e6c-a3c5-ae5ea674bbf9_thumb.jpg'})`,
   }    
});
class ViewProfile extends Component{
    render(){
        return(
            <div>
                <div className={useStyles().topBackground}>
                    <p>abcs</p>
                </div>
                <div>
                
                </div>
            </div>
        )
    }
}
export default ViewProfile;