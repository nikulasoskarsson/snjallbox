import { GET_USER, GET_ORDERS, GET_ORDER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case GET_ORDER:
      return {
        ...state,
        order: action.payload
      };

    default:
      return state;
  }
};
