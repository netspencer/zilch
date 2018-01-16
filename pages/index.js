import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import Zilch from '../containers/Zilch'

class Index extends Component {
	render() {
		return <Zilch />
	}
}

export default withRedux(initStore)(Index)
