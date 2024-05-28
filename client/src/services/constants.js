export const BASE_URL = "http://localhost:5000";
export const IMAGE_SRC_PATH = `${BASE_URL}/db_images`;
export const HEADERS = { headers: { "Content-Type": "multipart/form-data" } };

export const productFetchType = {
  ALL: "all",
  PRODUCT_ID: "id",
  PRODUCT_CATEGORY: "category",
  SEARCH: "search",
  STOCK: "stock",
};

export const productSubmitType = {
  ADD_PRODUCT: "add",
  UPDATE_PRODUCT: "update",
  DELETE_PRODUCT: "delete",
};

export const productFormFillup = {
  SET_PRODUCT_NAME: "set-name",
  SET_PRODUCT_IMAGE: "set-image",
  SET_PRODUCT_PRICE: "set-price",
  SET_PRODUCT_TYPE: "set-type",
  SET_PRODUCT_DESCRIPTION: "set-description",
  SET_PRODUCT_UUID: "set-uuid",
};

export const userFormFillup = {
  SET_USER_EMAIL: "set-email",
  SET_USER_NAME: "set-username",
  SET_USER_PASSWORD: "set-password",
  SET_USER_PHONE_NUMBER: "set-phone-number",
};

export const userFormType = {
  LOGIN_FORM: "login-form",
  REGISTER_FORM: "register-form",
};
