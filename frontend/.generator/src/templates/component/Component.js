import propTypes from 'prop-types'

import styles from './component.module.scss';

const Component = ({ title }) => {
	return (
		<div className={styles.container}>{title}</div>
	)
}

Component.propTypes = {
	title: propTypes.string
}

export default Component
