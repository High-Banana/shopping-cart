export const BASE_URL = "http://localhost:5000";
export const IMAGE_SRC_PATH = `${BASE_URL}/db_images`;
export const HEADERS = { headers: { "Content-Type": "multipart/form-data" } };
export const productFetchType = {
  ALL: "all",
  PRODUCT_ID: "id",
  PRODUCT_CATEGORY: "category",
};
