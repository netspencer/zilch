import React, { Component } from 'react'
import BaseScene from '../components/BaseScene'
import { Entity } from 'aframe-react'

const Dice = Entity
Dice.defaultProps = { dice: true }

export default class DiceSet extends Component {
	render() {
		return (
			<BaseScene>
				<Dice position={{ x: 0, y: -100, z: -500 }} />
				<Dice position={{ x: 400, y: 0, z: -500 }} />
				<Dice position={{ x: -300, y: 0, z: -500 }} />
				<Dice position={{ x: 200, y: 0, z: -500 }} />
				<Dice position={{ x: 0, y: 200, z: -500 }} />
				<Dice
					rotation={{ x: 30, y: 40, z: 180 }}
					position={{ x: -100, y: 0, z: -500 }}
				/>
			</BaseScene>
		)
	}
}
