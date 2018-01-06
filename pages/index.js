import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, addCount } from '../store'
import withRedux from 'next-redux-wrapper'
import BackgroundTexture from '../components/BackgroundTexture'

class Counter extends React.Component {
	static getInitialProps({ store }) {
		store.dispatch(addCount())
	}

	render() {
		return <BackgroundTexture />
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addCount: bindActionCreators(addCount, dispatch)
	}
}

export default withRedux(initStore, null, mapDispatchToProps)(Counter)
