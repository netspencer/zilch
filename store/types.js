// @flow

/**
 * State is object
 */
export type State = Object

export type DiceSet = string

export type Action =
	| { type: 'DICE_ROLL' }
	| { type: 'DICE_PICKUP', diceSet?: ?DiceSet }

export type Dispatch = (
	action: Action | ThunkAction | PromiseAction | Array<Action>
) => any

export type GetState = () => State

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any

export type PromiseAction = Promise<Action>
