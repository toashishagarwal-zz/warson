import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import './slider.css';
import * as FontAwesome from 'react-icons/lib/fa';

class App extends Component {

  constructor(){
    super();
   
    this.state = {  
      username: '',
      wishes : [],
      wish:'',
      fulfilled: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    var url = process.env.REACT_APP_BE_URL + '/wishes';
   
    axios
      .get(url+'/1')
      .then(response => this.setState({wishes: response.data}));

    axios
      .get(url + '/2')
      .then(r => this.setState({fulfilled: r.data}));
  }

  handleChange(event) {
    var wish = event.target.value;

    this.setState({wish: wish});
  }

  handleSubmit(event) {
    event.preventDefault();
    var url = process.env.REACT_APP_BE_URL + '/wishes';
    axios
      .post(url + '/1/add', {
          "description" : this.state.wish,
          "status" : 1,
          "fulfilledby" : 1
      })
      .then((response) => {
        axios
          .get(url + '/1')
          .then(response => this.setState({wishes: response.data}));
      })
      .catch((response) => console.log("Error")); 
  }

  render() {
    let wishesList = this.state.wishes.map(wish => <div>{wish.description}</div>)
    let fulfilledList = this.state.fulfilled.map(f =><div class="slide"><p>{f.description}</p><img src="/slider_back.png" /></div>)
    return (
      <div>  
        <div class="header-container">
          <img src="logo3.png" />
        </div>
     
        <div class="quote-container">
          <div>"Happiness doesn't result from what we GET, but from what we GIVE"</div>
        </div>

        <div class="form-style">
          <form onSubmit={this.handleSubmit} >
            <font class="wish-style">I wish </font>
              <input type="text" name="wish" onChange={this.handleChange}  />
            <input class="button" type="submit" value="Post it on Wall" />
          </form>
        </div>

        <div class="wrapper">
          {wishesList}
        </div>

        <div class="quote-container">
          <div>How this works?</div>
        </div>

        <div>
          <center><img src="/howitworks.png" width="600px" height="280px" /> </center>
        </div>

        <div class="quote-container">
          <div>Thank you with <font color="red">&hearts; </font> for fulfilling these wishes</div>
        </div>

        <div class="slider">
          <figure>
          {fulfilledList}
          </figure>
        </div>
        
        { /* 
        
        <div class="wrapper-fulfilled">
          {fulfilledList}
        </div>
        
        */ }

        <div class="footer-container">
          <div>
            Home &nbsp;  &nbsp;
            About &nbsp;  &nbsp;
            FAQ
          </div>
          <div>
            Proudly Made in India <br/><br/>
            <FontAwesome.FaPhone /> +91 XXXXXXXX <br/><br/>
            <FontAwesome.FaEnvelope /> support@happynesswall.com <br/><br/>
          </div>
          <div>
          <FontAwesome.FaFacebook /> &nbsp; &nbsp;
          <FontAwesome.FaTwitter /> &nbsp; &nbsp;
          <FontAwesome.FaLinkedin /> &nbsp; &nbsp;
          </div>
        </div>

      </div>
    );  
  }
}

export default App;