import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import GameContainer from '../components/GameContainer'
import Dice from '../components/Dice'

import { Entity } from 'aframe-react'

class Counter extends React.Component {
	render() {
		return (
			<GameContainer>
				<Dice />
			</GameContainer>
		)
	}
}

export default withRedux(initStore)(Counter)
