import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import styledNormalize from 'styled-normalize'
import { injectGlobal } from 'styled-components'

injectGlobal`
  ${styledNormalize}
`

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const sheet = new ServerStyleSheet()
		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />)
		)
		const styleTags = sheet.getStyleElement()
		return { ...page, styleTags }
	}

	render() {
		return (
			<html>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<title>ZILCH</title>
					{this.props.styleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}
