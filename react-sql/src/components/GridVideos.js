import React, { Component } from 'react'
import { Grid, Image, Label, Segment } from 'semantic-ui-react'
import _ from 'lodash';

const clickImage = {
  
  cursor:'pointer',
  borderRadius : '5px',
  border : '5px solid white'
};

const backgroundComponent = {
  
  backgroundColor : 'grey'
};


class GridVideos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos : [],
      categories : [],
      tableauvideoCategorie : [],
      tableauRange : []
    };
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.videos !== this.props.videos){
         this.setState({ videos: nextProps.videos })
    }
    
  } 
  componentDidMount() {

    fetch('http://localhost:4000/categories')
    .then(response => response.json())
    .then(response => this.setState({
      categories : response.data
    }))
    const {categories, videos } = this.state
    //console.log(categories) // rien
    //console.log(videos) // rien

  }

  selectIdVideo(idVideo){
    //console.log(idVideo)

    fetch(`http://localhost:4000/videoById?idVideo=${idVideo}`)
    .then(response => response.json())
     .then(response => this.props.updateVideosSelected(response.data))
    
  }

  // componentWillMount(){
  //    const {categories, videos } = this.state
  //    console.log(categories) // rien
  //    console.log(videos) // rien
  //    let tableau =[]
  //    let tableauTampon = []
  //    for(let i = 0 ; i < categories.length ; i++){
  //      for(let u = 0 ; u < videos.length ; u++){
   
  //        if(videos[u].categorie === categories[i].name){
  //            tableauTampon.push(videos[u])
  //        }
  //      }
  //      tableau.push([categories[i],tableauTampon])
  //      tableauTampon = []
  //    }

  //    console.log(tableau)
  //    tableau.map((tablea)=>{
  //      this.setState({
  //        tableauvideoCategorie : [...tablea]
  //      })
  //      console.log(tablea)
  //    })
  //  }


  // testFunction() {
  //   // const {categories, videos } = this.state
    
  //   // let tableau =[]
  //   // let tableauTampon = []
  //   // for(let i = 0 ; i < categories.length ; i++){
  //   //   for(let u = 0 ; u < videos.length ; u++){
        
  //   //     if(videos[u].categorie === categories[i].name){
  //   //         tableauTampon.push(videos[u])
  //   //     }
  //   //   }
  //   //   tableau.push([categories[i],tableauTampon])
  //   //   tableauTampon = []
  //   // }

  //   // console.log(tableau)
  //   // this.setState({
  //   //   tableauvideoCategorie : [...tableau]
  //   // })

  //   let tableauRemplissage = []
  //   let tableauRange = []
  //   //console.log(this.state.tableauvideoCategorie)
  //   this.state.tableauvideoCategorie.map((tableau, i) => {
  //     //console.log(tableau[1].length)
  //       if(tableau[1].length > 0){
          
  //         for(let u = 0 ; u < tableau[1].length ; u++){
  //           //console.log(tableau[1][u].image)
  //           //console.log(tableau[0].name)
  //            const grid = 
  //            <Grid.Column value={tableau[0].name} key={tableau[0]._id}>
  //              <Image  src={tableau[1][u].image} />
  //            </Grid.Column>
  //           tableauRemplissage.push(grid)
  //         }
  //         tableauRange.push(tableauRemplissage)
  //         tableauRemplissage= []
          
  //       }
  //    })
  //    console.log(tableauRange)
  //     this.setState({
  //       tableauRange : tableauRange
  //     })
  // }


  render() {
    const { tableauvideoCategorie, categories, videos} = this.state
    //console.log(categories)
    //console.log(videos)

    let tableau =[]
     let tableauTampon = []
     for(let i = 0 ; i < categories.length ; i++){
       for(let u = 0 ; u < videos.length ; u++){
   
         if(videos[u].categorie === categories[i].name){
             tableauTampon.push(videos[u])
         }
       }
       tableau.push([categories[i],tableauTampon])
       tableauTampon = []
     }

    //  console.log(tableau)
    //  tableau.map((tablea)=>{
    //   //  this.setState({
    //   //    tableauvideoCategorie : [...tablea]
    //   //  })
    //   tableau = [...tablea]
    //    console.log(tablea)
    //  })

     let tableauRemplissage = []
     let tableauRange = []

     //console.log(tableau)
     tableau.map((tableau, i) => {
       //console.log(tableau[1].length)
         if(tableau[1].length > 0){
           
           for(let u = 0 ; u < tableau[1].length ; u++){
             //console.log(tableau[1][u])
             //console.log(tableau[0].name)
              const grid = 
              <Grid.Column value={tableau[0].name} key={tableau[0]._id}>
                <Image style={clickImage} onClick={()=>{this.selectIdVideo(tableau[1][u]._id)}} src={tableau[1][u].image} />
              </Grid.Column>
             tableauRemplissage.push(grid)
           }
           tableauRange.push(tableauRemplissage)
           tableauRemplissage= []
           
         }
      })

      //console.log(tableauRange)




    //  const columns = _.times(tableauvideoCategorie.length, i => (
    //    <Grid.Column key={tableauvideoCategorie[i][0].name}>
    //      <Image src={tableauvideoCategorie[1][1][1].image} />
    //    </Grid.Column>
    //  ))


    return (
      <div>
        {tableauRange.map(tableau => (
          <Segment style={backgroundComponent}>
          <Label ribbon>{tableau[0].props.value}</Label>
          <Grid key = {tableau[0].key} columns={6} >{tableau}</Grid>
          </Segment>
        ))}
      
      
      </div>
  // <Grid>
    
  //   <Grid.Row columns={6}>
  //     <Grid.Column>
  //       <Image src='/images/wireframe/image.png' />
  //     </Grid.Column>
  //     <Grid.Column>
  //       <Image src='/images/wireframe/image.png' />
  //     </Grid.Column>
  //     <Grid.Column>
  //       <Image src='/images/wireframe/image.png' />
  //     </Grid.Column>
  //     <Grid.Column>
  //       <Image src='/images/wireframe/image.png' />
  //     </Grid.Column>
  //     <Grid.Column>
  //       <Image src='/images/wireframe/image.png' />
  //     </Grid.Column>
  //   </Grid.Row>
  // </Grid>
  
    )}
}

export default GridVideos
