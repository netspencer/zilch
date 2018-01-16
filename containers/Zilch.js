// @flow
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Scene, Entity } from 'aframe-react'
import { Dice, Light, Spotlight, Camera, Desk } from '../components/dice'

const SceneContainer = styled.main`
	width: 100vw;
	height: 100vh;
	background: url('/static/textures/concrete-texture.png');
`

// FIXME: temporary constants - quick solution
const mw = 1200
const aspect = 0.9
const wh = 300 / aspect / Math.tan(10 * Math.PI / 180)

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

	renderAFrame = () => (
		<Scene
			vr-mode-ui={{ enabled: false }}
			keyboard-shortcuts={{ enterVR: false }}
		>
			<Dice position={{ x: 0, y: -100, z: 0 }} />
			<Dice position={{ x: 400, y: 0, z: 0 }} />
			<Dice position={{ x: -300, y: 0, z: 0 }} />
			<Dice position={{ x: 200, y: 0, z: 0 }} />
			<Dice position={{ x: 0, y: 200, z: 0 }} />
			<Dice
				rotation={{ x: 30, y: 40, z: 180 }}
				position={{ x: -100, y: 0, z: 0 }}
			/>
			<Light type="ambient" color="#f0f5fb" />
			<Spotlight position={{ x: -mw / 2, y: mw / 2, z: mw * 2 }} />
			<Camera position={{ x: 0, y: 0, z: wh }} />
			<Desk />
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
