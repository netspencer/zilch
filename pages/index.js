import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import BackgroundTexture from '../components/BackgroundTexture'

class Counter extends React.Component {
	render() {
		return <BackgroundTexture />
	}
}

export default withRedux(initStore)(Counter)
