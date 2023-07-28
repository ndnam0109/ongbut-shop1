'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { Category, CategoryService} from "@/lib/repo/category.repo";
import { Product, ProductService} from "@/lib/repo/product.repo";
import {cloneDeep} from "lodash";

export const ProductsContext = createContext<
  Partial<{
    categories: Category[];
    loadCategories: (reset?: boolean) => Promise<any>;
    filter: any;
    onFilterChange: (data: any) => any;
    changePositionProduct: (catIndex: number, proIndex: number, up: boolean) => any;
  }>
>({});
export function ProductsProvider(props: any) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async (reset: boolean = false) => {
    if (reset) {
      setCategories([]);
      await CategoryService.clearStore();
    }
    CategoryService.getAll({
      query: {
        limit: 0,
        order: { priority: -1, createdAt: 1 },
      },
      fragment: CategoryService.shortFragmentWithProducts,
    }).then((res) => {
        console.log(res)
      setCategories(cloneDeep(res.data));
    });
  };

  const onFilterChange = (data: any) => {
    setFilter({ ...filter, ...data });
  };

  return (
    <ProductsContext.Provider
      value={{
        categories,
        loadCategories,
        filter,
        onFilterChange,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => useContext(ProductsContext);
