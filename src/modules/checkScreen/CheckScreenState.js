// @flow
type CheckScreenStateType = {};

type ActionType = {
  type: string,
  payload?: any,
};

export const initialState: CheckScreenStateType = {};

export const ACTION = 'CheckScreenState/ACTION';

export function actionCreator(): ActionType {
  return {
    type: ACTION,
  };
}

export default function CheckScreenStateReducer(state: CheckScreenStateType = initialState, action: ActionType): CheckScreenStateType {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
      };
    default:
      return state;
  }
}
