import { Component } from 'react';

import './App.css';

class App extends Component {
  constructor () {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };

    console.log('constructor');
  }
  
  componentDidMount() {
    console.log('component did mount');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState(
        () => {
          return { monsters: users }
        },
        () => {
          console.log(this.state);
        }
        ));
      }
      
  render () {
    console.log('render');

    const filteredMonsters = this.state.monsters.filter(monster => 
      monster.name.toLocaleLowerCase().includes(this.state.searchField)
    );

    return (
      <div className="App">
      <input
        type="search"
        className="search-box"
        placeholder="Search monsters..."
        onChange={(e) => {
          const searchField = e.target.value.toLocaleLowerCase();

          this.setState(() => {
            return {
              searchField
            }
          });
        }}
      />
        {filteredMonsters.map(monster => <div key={monster.id}>
          <h1>{monster.name}</h1>
        </div>)}
      </div>
    );
  }
}

export default App;
