import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const ilmoitusStyle = {
  margin: 10,
  textAlign: 'center',
  borderRadius: 25,
  backgroundColor: 'lightgrey',
  color: 'green',
  fontStyle: 'italic',
  fontSize: 25
}

const menuStyle = {
  paddingLeft: 10,
  borderRadius: 25,
  margin: 10,
  backgroundColor: 'lightgreen',
}

const aktiivinen = {
    fontWeight: 'bold',
    color: 'red',
    textDecorationLine: 'underline',
    textDecorationStyle: 'wavy',
}

const Menu = () => (
  <div style= {menuStyle}>
    <NavLink exact to="/" activeStyle={aktiivinen} >anecdotes</NavLink>   &nbsp;
    <NavLink to="/create" activeStyle={aktiivinen} >create new</NavLink>  &nbsp;
    <NavLink to="/about" activeStyle={aktiivinen}  >about</NavLink>       &nbsp;
  </div>
)

const Ilmoitus = ( {ilmoitus} ) => (
  <div style={ilmoitusStyle}>
    {ilmoitus === ''
      ? <div></div>
      : <p> {ilmoitus} </p>
    }
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => 
        <ListGroupItem key={anecdote.id}>
          <NavLink to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </NavLink>
        </ListGroupItem>
      )}
    </ListGroup>
  </div>
)

const Anecdote = ({anecdote}) => {
  return(
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p> has {anecdote.votes} votes </p>
    <p>for more information see <a href={anecdote.info}>{anecdote.info}</a>  </p>
  </div>
)}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid>
      <Row className="show-grid">
        <Col xs={12} md={8}>
          According to Wikipedia:
        </Col>
        <Col xs={6} md={4}></Col>
      </Row>
      <p></p>
      <Row className="show-grid">
        <Col xs={12} md={8}>
            An anecdote is a brief, revealing account of an individual person or an incident. 
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
            An anecdote is "a story with a point."
            Software engineering is full of excellent anecdotes, at this app you can find the best and add more.
        </Col>
        <Col xs={6} md={4}>
          <img src={require('./assets/Bill_Gates.jpg')} alt="GillBates" ></img>
        </Col>
      </Row>      
    </Grid>
    <p></p>
  </div>
)

const Footer = () => (
  <div>
    <p></p>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalContent">
            <Col componentClass={ControlLabel} sm={2}>
              content
            </Col>
            <Col sm={10}>
              <FormControl name='content' value={this.state.content} onChange={this.handleChange} placeholder="Anekdootti tähän" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalAuthor">
            <Col componentClass={ControlLabel} sm={2}>
              author
            </Col>
            <Col sm={10}>
              <FormControl name='author' value={this.state.author} onChange={this.handleChange} placeholder="Kenen anekdootti" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalUrl">
            <Col componentClass={ControlLabel} sm={2}>
              url for more info
            </Col>
            <Col sm={10}>
              <FormControl name='info' value={this.state.info} onChange={this.handleChange} placeholder="URLia vielä kaivataan" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">create</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>  
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })

    const notifikaatio = 'a new anecdote ' + anecdote.content + ' created!'
    this.setState({ notification: notifikaatio })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div>
        <Router> 
          <div>
            <h1>Software anecdotes</h1>
              <Menu />
              <Ilmoitus ilmoitus= {this.state.notification}/>
              <Route exact path="/" render={ () => <AnecdoteList anecdotes={this.state.anecdotes} /> } />
              <Route path="/create" render={() =>
                this.state.notification === ''
                  ? <CreateNew addNew={this.addNew} />
                  : <Redirect to="/" />
              }/>
              <Route exact path="/about" render={ () => <About /> } />
              <Route exact path="/anecdotes/:id" render={({match}) =>
                <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
              />
          </div>
        </Router>
        <div><Footer /></div>
      </div>
    );
  }
}

export default App;