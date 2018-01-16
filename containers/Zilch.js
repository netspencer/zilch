// @flow
import React, { Component } from 'react'
import DiceBox from '../components/DiceBox'

export default class Zilch extends Component {
	state = {
		appRendered: false
	}

	componentDidMount() {
		// only in browser, when window is defined, we will load aframe
		if (typeof window !== 'undefined') {
			require('aframe')
			require('../utils/aframe')
			this.setState({ appRendered: true })
		}
	}

	renderBrowser = () => <DiceBox />

	render() {
		return this.state.appRendered ? this.renderBrowser() : null
	}
}
