import { createSelector } from "reselect";
// Базовые селекторы
const selectShop = state => state;

// Мемоизированные селекторы
export const selectGoods = createSelector(
  [selectShop],
  shop => shop.goods
);

export const selectLoading = createSelector(
  [selectShop],
  shop => shop.loading
);

export const selectError = createSelector(
  [selectShop],
  shop => shop.error
);

// export const selectBasket = createSelector(
//   [selectShop],
//   shop => shop.basket
// );