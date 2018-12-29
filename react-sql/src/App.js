import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import VideoList from './components/VideoList'
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import CoverFlow from 'coverflow-react';
import { Search, Grid, Image } from 'semantic-ui-react';
import VideoPlayer from './components/VideoPlayer';
import TableSelectable from './components/TableSelectable';
import GridVideos from './components/GridVideos'

const YT_API = 'AIzaSyBafp54pvh5YERoM1N7PqR6ihNK2IDsffY';

const couleurSearchBar = {
  margin: '10px',
  backgroundColor: 'grey',
  textAlign : 'center'
};

const couleurGrid = {
  backgroundColor: 'grey',
  textAlign : 'center'
};


class App extends Component {
  constructor(props){
    super(props);

    this.state= {
      products : [],
      videos : [],
      videosBDD : [],
      product : {
        name: '',
        price: 0
      },
      selectedVideo : [],
      idVideo : '',
      title : '',
      image : '',
      isLoading : false,
      results: [],
      value: '',
      selectedVideoBDD: [],
      
    }
    this.updateVideos = this.updateVideos
  }

  updateVideos = (videosBDD) => {this.setState({ videosBDD })}
  updateVideosSelected=(videoAdequat) => {this.setState({selectedVideoBDD : videoAdequat})}

  componentWillMount() {
    let videoDepart = this.state.videosBDD[0]
    this.resetComponent()
    this.setState({
      selectedVideoBDD: videoDepart
    })
    
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    let source = _.times(5, (i) => ({
      title: this.state.videosBDD[i].title,
      image: this.state.videosBDD[i].image
    }))

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }
  
  componentDidMount() {
    let videoDepart = this.state.videosBDD[0]
    this.getProducts();
    this.getVideos();
    this.setState({
      selectedVideoBDD: videoDepart
    })
    

  }


  searchYoutube(term) {
    YTSearch({ key: YT_API, term: term}, (videos) => {
      //console.log(videos)
      this.setState({
        videos: videos,
        selectedVideo : videos[0],
        idVideo : videos[0].id.videoId,
        title: videos[0].snippet.title,
        image: videos[0].snippet.thumbnails.medium.url
      });
    });
  }

  videoSearch = _.debounce((term) => { this.searchYoutube(term) }, 300);

// fonction qui va chercher les données dans la route products présent dans le index.js du dossier supérieur. elle intègre les données dans la variable product
// qui est le state de la class App et donc disponnible pour le reste de la classe.

  getProducts = _ => {
    fetch('http://localhost:4000/products')
    .then(response => response.json())
    .then(response => this.setState({
      products : response.data
    }))
    .catch(err => console.error(err))
  }

  getVideos = _ => {
    fetch('http://localhost:4000/videos')
    .then(response => response.json())
    .then(response => this.setState({
      videosBDD : response.data
    }))
    .catch(err => console.error(err))
  }
  
  addProduct = _ => {
    const { product } = this.state;
    fetch(`http://localhost:4000/products/add?name=${product.name}&price=${product.price}`)
    .then(this.getProducts)
    .catch(err => console.error(err))

  }

  addVideo = (selectedVideo) => {
    
    selectedVideo = (selectedVideo.selectedVideo)
    const idVideo = selectedVideo.id.videoId;
    const title = selectedVideo.snippet.title;
    const image = selectedVideo.snippet.thumbnails.medium.url;
    fetch(`http://localhost:4000/videos/add?idVideo=${idVideo}&title=${title}&image=${image}`)
    .then(this.getVideos)
    .catch(err => console.error(err))

  }

  afficheCoverflow(index){
    
    fetch(`http://localhost:4000/videoById?idVideo=${index}`)
    .then(response => response.json())
     .then(response => this.setState({
      selectedVideoBDD : response.data
     }))
  }
  selectIdVideo(i){

    fetch(`http://localhost:4000/videoById?idVideo=${i}`)
    .then(response => response.json())
     .then(response => this.setState({
      selectedVideoBDD : response.data
     }))
  }




  renderProduct = ({product_id, name, price}) => <div key={product_id}>  {name} {price} </div> 
  renderVideos = ({ID, idVideo, title, image}) => <div key={ID}>  {idVideo} {title} {image} </div> 

  render() {

  const { videosBDD, isLoading, results, value, selectedVideoBDD } = this.state

  let imagesArr = [];
  let imagesArrImages = [];
  let imagesArrId = [];

  for(let i = 0 ; i < videosBDD.length ; i++){
    imagesArr.push(videosBDD[i].image,videosBDD[i]._id)
    
  }

  for(var u = 0 ; u < imagesArr.length ; u++){
    if(u%2 === 0){

      imagesArrImages.push(imagesArr[u])
    }
  }


  for(u = 0 ; u < imagesArr.length ; u++){
    if(u%2 !== 0){

      imagesArrId.push(imagesArr[u])
    }
  }


  const columns = _.times(videosBDD.length, i => (
    
    <Grid.Column key={videosBDD[i]._id}>
      <Image onClick={()=>{this.selectIdVideo(videosBDD[i]._id);}} src={videosBDD[i].image} />
    </Grid.Column>
  ))
  
    return (
      <div className="App">
      <div style={couleurSearchBar}>
      <Grid centered>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
      </div>

      

      <CoverFlow handleSelect={(index)=>{this.afficheCoverflow(imagesArrId[index]);}} imagesArr={imagesArrImages}/>
      <div>
      <VideoPlayer video={selectedVideoBDD} />
      </div>
        {/* <Grid style={couleurGrid} columns={6} >{columns}</Grid> */}

        <GridVideos videos={videosBDD} updateVideosSelected={this.updateVideosSelected} />
        
        {/*{products.map(this.renderProduct)}
        {videos.map(this.renderVideos)}*/}
        <SearchBar onChange={(searchTerm) => {this.videoSearch(searchTerm)}} />
        <VideoList
            onVideoSelect={(selectedVideo) => {this.addVideo({selectedVideo})}}
            videos={this.state.videos}
        />
        

        <TableSelectable videos={videosBDD} updateVideosBdd={this.updateVideos} />

        {/* <div>
          <input 
          value={product.name} 
          onChange={e => this.setState({ product: { ... product, name: e.target.value}})} />
          <input 
          value={product.price} 
          onChange={e => this.setState({ product: { ... product, price: e.target.value}})} />
        </div>
        <button onClick ={ this.addProduct}> Add product</button>
       */}
       </div>
    );
  }
}

export default App;
