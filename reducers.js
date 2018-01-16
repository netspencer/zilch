import immer from 'immer'

export default (state = [], action) =>
	// immer produces nextState from draftState and returns it
	immer(state, draftState => {
		switch (action.type) {
			case 'ADD_TODO':
				draftState.push({
					id: action.id,
					text: action.text,
					completed: false
				})
				return
			case 'TOGGLE_TODO':
				const todo = draftState.find(todo => todo.id === action.id)
				todo.completed = !todo.completed
				return
		}
	})
