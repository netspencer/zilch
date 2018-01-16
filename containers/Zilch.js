// @flow
import React, { Component, Fragment } from 'react'
import { Scene, Entity } from 'aframe-react'
import styled from 'styled-components'

const SceneContainer = styled.main`
	width: 100vw;
	height: 100vh;
	background: url('/static/textures/concrete-texture.png');
`

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

	renderAFrame = () => (
		<Scene
			vr-mode-ui={{ enabled: false }}
			keyboard-shortcuts={{ enterVR: false }}
		>
			{this.props.children}
		</Scene>
	)

	render() {
		return (
			<SceneContainer>
				{this.state.appRendered && this.renderAFrame()}
			</SceneContainer>
		)
	}
}
