import {
  FETCH_GOODS_REQUEST,
  FETCH_GOODS_SUCCESS,
  FETCH_GOODS_FAILURE,
  ADD_TO_BASKET_REQUEST,
  ADD_TO_BASKET_SUCCESS,
  ADD_TO_BASKET_FAILURE,
  FETCH_BASKET_REQUEST,
  FETCH_BASKET_SUCCESS,
  FETCH_BASKET_FAILURE,
  REMOVE_FROM_BASKET_REQUEST,
  REMOVE_FROM_BASKET_SUCCESS,
  REMOVE_FROM_BASKET_FAILURE,
} from '../action';

const initialState = {
  goods: [],
  basket: [],
  loading: false,
  error: '',
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GOODS_REQUEST:
    case ADD_TO_BASKET_REQUEST:
    case FETCH_BASKET_REQUEST:
    case REMOVE_FROM_BASKET_REQUEST:
      return {
        ...state,
        loading: true,
        error:null,
      };
    case FETCH_GOODS_SUCCESS:
      return {
        ...state,
        loading: false,
        goods: action.payload,
        error: '',
      };
    case FETCH_BASKET_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        error: '',
      };
    case ADD_TO_BASKET_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: [...state.basket, action.payload],
        error: '',
      };
    case REMOVE_FROM_BASKET_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: state.basket.filter(item => item.id !== action.payload),
        error: '',
      };
    case FETCH_GOODS_FAILURE:
    case ADD_TO_BASKET_FAILURE:
    case FETCH_BASKET_FAILURE:
    case REMOVE_FROM_BASKET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
