import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import DiceSet from '../components/DiceSet'

class Dice extends Component {
	render() {
		return <DiceSet />
	}
}

export default withRedux(initStore)(Dice)
