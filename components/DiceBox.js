// @flow
import React, { Component, Fragment } from 'react'
import { Scene, Entity } from 'aframe-react'
import windowDimensions from 'react-window-dimensions'
import { Dice, Light, Spotlight, Camera, Desk } from './dice'
import CANNON from 'cannon'

class DiceBox extends Component {
	componentDidMount() {
		// setup physics world
		this.world = new CANNON.World()
		this.world.gravity.set(0, 0, -9.8 * 800)
		this.world.broadphase = new CANNON.NaiveBroadphase()
		this.world.solver.iterations = 16

		// use half size
		this.width = this.props.width / 2
		this.height = this.props.height / 2

		// default aspect ratio
		this.aspect = 1

		// calculate scale
		this.scale = (this.width * this.width + this.height * this.height) / 13

		// define some constants for the math
		this.wh = this.height / this.aspect / Math.tan(10 * Math.PI / 180)
		this.mw = Math.max(this.width, this.height)
	}

	dice = () => (
		<Fragment>
			<Dice position={{ x: 0, y: -100, z: 0 }} />
			<Dice position={{ x: 400, y: 0, z: 0 }} />
			<Dice position={{ x: -300, y: 0, z: 0 }} />
			<Dice position={{ x: 200, y: 0, z: 0 }} />
			<Dice position={{ x: 0, y: 200, z: 0 }} />
			<Dice
				rotation={{ x: 30, y: 40, z: 180 }}
				position={{ x: -100, y: 0, z: 0 }}
			/>
		</Fragment>
	)

	render() {
		return (
			<Scene
				vr-mode-ui={{ enabled: false }}
				keyboard-shortcuts={{ enterVR: false }}
			>
				{this.dice()}
				<Light type="ambient" color="#f0f5fb" />
				<Spotlight
					position={{ x: -this.mw / 2, y: this.mw / 2, z: this.mw * 2 }}
				/>
				<Camera position={{ x: 0, y: 0, z: this.wh }} />
				<Desk />
			</Scene>
		)
	}
}

export default windowDimensions()(DiceBox)
