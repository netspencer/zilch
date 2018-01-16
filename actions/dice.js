/**
 * ACTIONS: dice
 * @flow
 */

import type { Action, ThunkAction, DiceSet } from '../types'

export const roll = (): Action => {
	return { type: 'DICE_ROLL' }
}

export const pickup = (diceSet: ?DiceSet): Action => {
	return { type: 'DICE_PICKUP', diceSet }
}
