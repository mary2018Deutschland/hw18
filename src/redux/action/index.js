import axios from "axios";
export const FETCH_GOODS_REQUEST = 'FETCH_GOODS_REQUEST';
export const FETCH_GOODS_SUCCESS = 'FETCH_GOODS_SUCCESS';
export const FETCH_GOODS_FAILURE = 'FETCH_GOODS_FAILURE';

export const ADD_TO_BASKET_REQUEST = 'ADD_TO_BASKET_REQUEST';
export const ADD_TO_BASKET_SUCCESS = 'ADD_TO_BASKET_SUCCESS';
export const ADD_TO_BASKET_FAILURE = 'ADD_TO_BASKET_FAILURE';

export const FETCH_BASKET_REQUEST = 'FETCH_BASKET_REQUEST';
export const FETCH_BASKET_SUCCESS = 'FETCH_BASKET_SUCCESS';
export const FETCH_BASKET_FAILURE = 'FETCH_BASKET_FAILURE';

export const REMOVE_FROM_BASKET_REQUEST = 'REMOVE_FROM_BASKET_REQUEST';
export const REMOVE_FROM_BASKET_SUCCESS = 'REMOVE_FROM_BASKET_SUCCESS';
export const REMOVE_FROM_BASKET_FAILURE = 'REMOVE_FROM_BASKET_FAILURE';

// Запросы на товары
export const fetchGoodsRequest = () => ({ type: FETCH_GOODS_REQUEST });
export const fetchGoodsSuccess = goods => ({
  type: FETCH_GOODS_SUCCESS,
  payload: goods,
});
export const fetchGoodsFailure = error => ({
  type: FETCH_GOODS_FAILURE,
  payload: error,
});

export const fetchGoods = () => {
  return async dispatch => {
    dispatch(fetchGoodsRequest());
    try {
      const response = await axios.get(
        'https://66ced668901aab24841fc54d.mockapi.io/productData'
      );
      dispatch(fetchGoodsSuccess(response.data));
    } catch (error) {
      dispatch(fetchGoodsFailure(error.message));
    }
  };
};

// Запросы на корзину
export const addToBasketRequest = () => ({ type: ADD_TO_BASKET_REQUEST });
export const addToBasketSuccess = item => ({
  type: ADD_TO_BASKET_SUCCESS,
  payload: item,
});
export const addToBasketFailure = error => ({
  type: ADD_TO_BASKET_FAILURE,
  payload: error,
});

export const fetchBasketRequest = () => ({ type: FETCH_BASKET_REQUEST });
export const fetchBasketSuccess = basket => ({
  type: FETCH_BASKET_SUCCESS,
  payload: basket,
});
export const fetchBasketFailure = error => ({
  type: FETCH_BASKET_FAILURE,
  payload: error,
});

export const removeFromBasketRequest = () => ({
  type: REMOVE_FROM_BASKET_REQUEST,
});
export const removeFromBasketSuccess = itemId => ({
  type: REMOVE_FROM_BASKET_SUCCESS,
  payload: itemId,
});
export const removeFromBasketFailure = error => ({
  type: REMOVE_FROM_BASKET_FAILURE,
  payload: error,
});
// Добавление в корзину
// export const addToBasket = item => {
//   return async dispatch => {
//     dispatch(addToBasketRequest());
//     try {
//       const basketItem = {
//         image: item.image,
//         name: item.name,
//         price: item.price,
//         id: item.id,
//       };

//       const response = await axios.post(
//         'https://66ced668901aab24841fc54d.mockapi.io/basket',
//         basketItem
//       );
//       dispatch(addToBasketSuccess(response.data));
//     } catch (error) {
//       dispatch(addToBasketFailure(error.message));
//     }
//   };
// };
export const addToBasket = item => {
  return async (dispatch, getState) => {
    dispatch(addToBasketRequest());

    // Получаем текущее состояние корзины из Redux
    const state = getState();
    const basket = state.basket; 

   
    const isItemInBasket = basket.some(
      basketItem => basketItem.price === item.price
    );

    if (isItemInBasket) {
      // console.log('Item already exists in the basket');
      dispatch(addToBasketFailure('Item already exists in the basket'));
      return;
    }

    try {
      
      const basketItem = {
        image: item.image,
        name: item.name,
        price: item.price,
        id: item.id,
      };

      //  запрос на добавление нового товара
      const response = await axios.post(
        'https://66ced668901aab24841fc54d.mockapi.io/basket',
        basketItem
      );

      dispatch(addToBasketSuccess(response.data));
    } catch (error) {
      dispatch(addToBasketFailure(error.message));
    }
  };
};
// Получить из корзины
export const fetchBasket = () => {
  return async dispatch => {
    dispatch(fetchBasketRequest());
    try {
      const response = await axios.get(
        'https://66ced668901aab24841fc54d.mockapi.io/basket'
      );
      dispatch(fetchBasketSuccess(response.data));
    } catch (error) {
      dispatch(fetchBasketFailure(error.message));
    }
  };
};

// Удаление из корзины
export const removeFromBasket = itemId => {
  return async dispatch => {
    dispatch(removeFromBasketRequest());
    try {
      await axios.delete(`https://66ced668901aab24841fc54d.mockapi.io/basket/${itemId}`);
      dispatch(removeFromBasketSuccess(itemId));
    } catch (error) {
      dispatch(removeFromBasketFailure(error.message));
    }
  };
};
