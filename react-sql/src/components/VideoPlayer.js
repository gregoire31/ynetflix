import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

 const playerVideoStyle = {
   backgroundColor: 'grey',
   position: 'center'
 }

 const taillePlayerVideo = {
   width: '1000px',
   height: '500px',
 }

const VideoPlayer = ({ video }) => {
  if (!video) {
    return <div>Loading video player...</div>;
  }
  const videoId = video.idVideo;
  const url = `https://youtube.com/embed/${videoId}`;
  
  

  return (
    
    // <div className="video-detail col-md-6">
    //   <div className="embed-responsive embed-responsive-16by9">
    //     <iframe className="embed-responsive-item" src={url}></iframe>
    //   </div>
    //   <div className="details">
    //     <div>{video.title}</div>
    //   </div>
    // </div>

    //  <Grid style={playerVideoStyle} centered columns={1}>
    //   <Grid.Column>
    //     <iframe style={taillePlayerVideo} src={url}></iframe>
    //   </Grid.Column>
    //  </Grid>

      <div style={{display:"inline-grid",gridTemplateColumns:"auto 658px auto",gridTemplateRows:"40px 370px 20px 48px auto 0px",width:"100%",height:"100%",gridColumnStart:"2",paddingTop:"20px",backgroundColor:"#323232",padding:"0 0 64px 0"}}>
      <div style={{gridColumnStart:"2",gridRowStart:"2",justifySelf:"stretch"}}>
          <iframe style={{border:"0px solid #323232",width:"100%",height:"100%",placeSelf:"center"}} className="embed-responsive-item" src={url}></iframe>
      </div>
      </div>

  );
}

export default VideoPlayer;
