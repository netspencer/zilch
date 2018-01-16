// @flow
import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import { compose, setDisplayName, withProps } from 'recompose'

export const Dice = compose(
	setDisplayName('DiceEntity'),
	withProps({ primitive: 'a-dice' })
)(Entity)

export const Light = compose(
	setDisplayName('LightEntity'),
	withProps({ primitive: 'a-light' })
)(Entity)

// FIXME: temporary constants - quick solution
const mw = 1200
const aspect = 0.9
const wh = 300 / aspect / Math.tan(10 * Math.PI / 180)

export const Spotlight = withProps({
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

export const Camera = compose(
	setDisplayName('CameraEntity'),
	withProps({
		primitive: 'a-camera',
		'look-controls-enabled': false,
		fov: 20,
		far: wh * 1.3,
		near: 1
	})
)(Entity)

export const Desk = compose(
	setDisplayName('DeskEntity'),
	withProps({
		primitive: 'a-plane',
		width: 1000,
		height: 1000,
		'segments-width': 1,
		'segments-height': 1
	})
)(Entity)
