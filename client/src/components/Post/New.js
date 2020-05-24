import React from 'react'
import  { Redirect } from 'react-router-dom'
import ImageUpload from './ImageUpload'
import Places from '../Maps/Places'

import CategoryContext  from '../../contexts/CategoryContext'

import SelectCategoriesPost from '../../components/Categories/SelectCategoriesPost'


class Post extends React.Component {
   static contextType = CategoryContext

  state = { 
      content: '',
      mediaArray: [],
      location: null,
      redirect: false
    }

    async componentDidMount(){
      console.log( this.context.selectedCategoriesIds,  "before mounted")
      await this.context.cleanSelectedCategoriesIds()
      console.log( this.context.selectedCategoriesIds,  "after mounted")
    }
  
  onSubmit = async e => {
    e.preventDefault();
    console.log( this.context.selectedCategoriesIds,  "on submit")
      try {
        await this.props.postContext.createPost(
          this.state.content,
          this.state.mediaArray,
          this.state.location,
          this.context.selectedCategoriesIds
        )

      this.setState({ redirect: true })
      // this.props.history.push('/')
 
    }  catch(err){
          console.log(err)
     }
  };
    
    onInputChange = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
    }


    getMediaArray = url => {
      this.setState({ mediaArray: [...this.state.mediaArray, url]})
    }

    getLocation = spotLocation => {
      this.setState({location: spotLocation})
    }

  render () {
    if(this.state.redirect){
      return <Redirect to="/" />
    }
    return (
      <div>
        <form onSubmit={this.onSubmit}>
            <input onChange={this.onInputChange} type="text" placeholder="content" name="content"/>
            <Places getLocation={this.getLocation} />
              <SelectCategoriesPost/>
            <button>Create post</button>
        </form>
        <ImageUpload getMediaArray={this.getMediaArray}/>
      </div>
    )
  }
}

export default Post

