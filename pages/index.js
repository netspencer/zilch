import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import DiceBox from '../scenes/DiceBox'

class Dice extends Component {
	render() {
		return <DiceBox />
	}
}

export default withRedux(initStore)(Dice)
