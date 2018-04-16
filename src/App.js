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
    axios
      .get('http://localhost:8080/api/wishes/1')
      .then(response => this.setState({wishes: response.data}));

    axios
      .get('http://localhost:8080/api/wishes/2')
      .then(r => this.setState({fulfilled: r.data}));
  }

  handleChange(event) {
    var wish = event.target.value;

    this.setState({wish: wish});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post('http://localhost:8080/api/wishes/1/add', {
          "description" : this.state.wish,
          "status" : 1,
          "fulfilledby" : 1
      })
      .then((response) => {
        console.log(response);
        axios
          .get('http://localhost:8080/api/wishes/1')
          .then(response => this.setState({wishes: response.data}));
      })
      .catch((response) => console.log(response)); 
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

        { /* slider start */ }
        <div class="slider">
          <figure>
          {fulfilledList}
          </figure>
        </div>

        { /* slider end */ }
        
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
            Proudly Made in Pune, India <br/><br/>
            <FontAwesome.FaPhone /> +91 XXXXXXXX <br/><br/>
            <FontAwesome.FaEnvelope /> support@happynesswall.com <br/><br/>
          </div>
          <div>Socials</div>
        </div>

      </div>
    );  
  }
}

export default App;