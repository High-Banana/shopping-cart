/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  addProduct,
  // addToStock,
  deleteProduct,
  // fetchAddedProducts,
  fetchAllProducts,
  fetchFilteredProducts,
  fetchProductByID,
  fetchSearchedProducts,
  // fetchStockProducts,
  updateProduct,
  // updateStock,
} from "../services/api/ProductAPI";
import { productFetchType, productSubmitType } from "../services/constants";
import { addToStock, fetchAddedProducts, fetchStockProducts, updateStock } from "../services/api/StockAPI";

export default function useProductAPI() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorState, setErrorState] = React.useState(null);
  const [productCategory, setProductCategory] = React.useState([]);
  let productTypes;

  async function fetchProductCategories() {
    let products = await fetchAllProducts();
    productTypes = Array.from(new Set(products.map((product) => product.product_type)));
  }

  async function fetchItems({ productID = null, category = null, searchValue = null, fetchType }) {
    setErrorState(null);
    setIsLoading(true);
    try {
      let products;
      switch (fetchType) {
        case productFetchType.ALL:
          products = await fetchAllProducts();
          break;
        case productFetchType.PRODUCT_ID:
          products = await fetchProductByID(productID);
          break;
        case productFetchType.PRODUCT_CATEGORY:
          products = await fetchFilteredProducts(category);
          break;
        case productFetchType.SEARCH:
          products = await fetchSearchedProducts(searchValue);
          break;
        case productFetchType.STOCK:
          products = await fetchStockProducts();
          break;
        case productFetchType.ADDED_PRODUCTS:
          products = await fetchAddedProducts();
          console.log(products);
          break;
        default:
          throw new Error(`Invalid fetch type: ${fetchType}`);
      }
      await fetchProductCategories();
      setItems(products);
      setProductCategory(productTypes);
      console.log(productTypes);
    } catch (error) {
      console.log(error);
      setErrorState(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitProductForm(formData, submitType, productID) {
    setErrorState(null);
    setIsLoading(true);
    // console.log(submitType);
    // console.log(productID);
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
    try {
      switch (submitType) {
        case productSubmitType.ADD_PRODUCT:
          return await addProduct(formData);
        case productSubmitType.UPDATE_PRODUCT:
          return await updateProduct(formData, productID);
        case productSubmitType.DELETE_PRODUCT:
          return await deleteProduct(productID);
        case productSubmitType.ADD_TO_STOCK:
          return await addToStock(formData);
        case productSubmitType.UPDATE_STOCK:
          return await updateStock(formData, productID);
        default:
          throw new Error(`Invalid submit type : ${submitType}`);
      }
    } catch (error) {
      console.log(error);
      setErrorState(error);
    } finally {
      setIsLoading(false);
    }
  }
  return { items, isLoading, errorState, productCategory, fetchItems, submitProductForm };
}
