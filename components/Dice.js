import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class Dice extends Component {
	render() {
		return (
			<Entity
				id="box"
				geometry={{ primitive: 'box' }}
				material={{ color: 'red', opacity: 0.6 }}
				position={{ x: 0, y: 1, z: -3 }}
			/>
		)
	}
}
