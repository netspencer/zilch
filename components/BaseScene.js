// @flow
import React, { Component } from 'react'
import { Scene, Entity } from 'aframe-react'

export default class BaseScene extends Component {
	state = {
		appRendered: false
	}

	componentDidMount() {
		// only in browser, when window is defined, we will load aframe
		if (typeof window !== 'undefined') {
			require('aframe')
			require('../aframe/dice')
			this.setState({ appRendered: true })
		}
	}

	render() {
		return (
			<main style={{ height: '100vh', width: '100vw' }}>
				{this.state.appRendered && (
					<Scene
						vr-mode-ui={{ enabled: false }}
						keyboard-shortcuts={{ enterVR: false }}
					>
						{this.props.children}
						<Entity camera look-controls={{ enabled: false }} />
					</Scene>
				)}
			</main>
		)
	}
}
