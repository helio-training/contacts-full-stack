import React, { Component, Fragment } from 'react'
import logo from './logo.svg'
import './App.css'

const BASE_URI = 'https://contacts-api-okcopdixts.now.sh'

const getUserById = async id => {
  const resp = await fetch(`${BASE_URI}/v1/contacts/${id}`, { mode: 'cors' })
  return await resp.json()
}

const updateUser = async (id, user) => {
  await fetch(`${BASE_URI}/v1/contacts/${id}`, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(user)
  })

  alert('User saved')
  return await getUserById(id)
}

class App extends Component {
  state = {
    user: {}
  }

  async componentDidMount() {
    const user = await getUserById('5b84560c25345c004fa65d1e')
    this.setState({ user })
  }

  render() {
    const { user } = this.state
    return (
      <Fragment>
        <form
          onSubmit={ async e => {
            e.preventDefault()
            const { user } = this.state
            const updated = await updateUser(user._id, { name: user.name, email: user.email })
            this.setState({ user: updated })
          } }
        >
          <div>
            ID: <input
            type="text" name="id" value={ user._id }
            onChange={ e => this.setState({ user: { ...this.state.user, _id: e.target.value } }) }
          />
          </div>
          <div>
            Name: <input
            type="text" value={ user.name }
            onChange={ e => this.setState({ user: { ...this.state.user, name: e.target.value } }) }
          />
          </div>
          <div>
            Email: <input
            type="email" value={ user.email }
            onChange={ e => this.setState({ user: { ...this.state.user, email: e.target.value } }) }
          />
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </Fragment>
    )
  }
}

export default App
