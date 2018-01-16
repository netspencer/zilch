// @flow
import React, { Component } from 'react'
import BaseScene from '../components/BaseScene'
import { Entity } from 'aframe-react'
import { compose, setDisplayName, withProps } from 'recompose'

const Dice = compose(
	setDisplayName('DiceEntity'),
	withProps({ primitive: 'a-dice' })
)(Entity)

const Light = compose(
	setDisplayName('LightEntity'),
	withProps({ primitive: 'a-light' })
)(Entity)

const mw = 1200
const aspect = 0.9
const wh = 300 / aspect / Math.tan(10 * Math.PI / 180)

const Spotlight = withProps({
	type: 'spot',
	color: '#efdfd5',
	intensity: 2.0,
	castShadow: true,
	shadowBias: 0.001,
	shadowMapWidth: 1024,
	shadowMapHeight: 1024,
	shadowDarkness: 1.1,
	shadowCameraFov: 50,
	shadowCameraFar: mw * 5,
	shadowCameraNear: mw / 10,
	distance: mw * 5,
	target: { position: { x: 0, y: 0, z: 0 } }
})(Light)

const Camera = compose(
	setDisplayName('CameraEntity'),
	withProps({
		primitive: 'a-camera',
		'look-controls-enabled': false,
		fov: 20,
		far: wh * 1.3,
		near: 1
	})
)(Entity)

const Desk = compose(
	setDisplayName('DeskEntity'),
	withProps({
		primitive: 'a-plane',
		width: 1000,
		height: 1000,
		'segments-width': 1,
		'segments-height': 1
	})
)(Entity)

export default () => (
	<BaseScene>
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
	</BaseScene>
)
