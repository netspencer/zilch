// @flow
import React, { Component } from 'react'
import { Scene } from 'aframe-react'

export default class GameContainer extends Component {
	state = {
		appRendered: false
	}

	componentDidMount() {
		if (typeof window !== 'undefined') {
			require('aframe')
			this.setState({ appRendered: true })
		}
	}

	render() {
		return (
			<div style={{ height: '100%', width: '100%' }}>
				{this.state.appRendered && <Scene>{this.props.children}</Scene>}
			</div>
		)
	}
}
