import React, { Component } from 'react'
import { Table, Dropdown } from 'semantic-ui-react'

const couleurDropDown = {

  backgroundColor: 'grey',
  color: 'red',

};
class TableSelectable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            videos: [{
                _id : 'aaaaa',
                title: 'zzzzzzz'
            }],
            categories : []
          }
      
    }

    componentDidMount() {

      fetch('http://localhost:4000/categories')
      .then(response => response.json())
      .then(response => this.setState({
        categories : response.data
      }))
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.videos !== this.props.videos){
             this.setState({ videos: nextProps.videos })
        }
        
    }

    testFunction(index) {

      fetch(`http://localhost:4000/videoDeleteById?idVideo=${index}`)
      .then(response => response.json())
      .then(response =>  this.props.updateVideosBdd(response.data))
      console.log(this.state.videos)

    }
    selectCategorieVideo(index){
      fetch(`http://localhost:4000/videoCategorie?idVideo=${index}`)
       .then(response => response.json())
       .then(response => console.log(response.data))
    }

    changeDropdownValue(e,data){
      let categorie = 'vide'
      if(e.target.firstChild !== null){
        categorie = e.target.firstChild.innerHTML
      }

      let idVideo = data
       fetch(`http://localhost:4000/ajouteCategories?idVideo=${idVideo}&categorieVideo=${categorie}`)
       .then(response => response.json())
       .then(response => console.log(response.data))
    }

    //<Table.Cell>{categories.map((categorie)=>(categorie.name))}</Table.Cell>


    render() {

      const {videos, categories} = this.state
    
      const options = categories.map((categorie) => (
        { key: categorie._id,text: categorie.name, value: [categorie.name] }
      ))
        
        
      return (

          <Table celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>categories</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
            { videos.map((video)=>(
              <Table.Row key={video._id}>
                <Table.Cell>{video._id}</Table.Cell>
                <Table.Cell>{video.title}</Table.Cell>
                <Table.Cell><Dropdown placeholder={video.categorie} style={couleurDropDown} clearable options={options} selection onChange={(e) => this.changeDropdownValue(e,video._id)} /></Table.Cell>
                <Table.Cell onClick = {() => this.testFunction(video._id)} textAlign='right' >Delete</Table.Cell>
              </Table.Row>
              ))}
            </Table.Body>
            
          </Table>

)}}


export default TableSelectable