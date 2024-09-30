import ProductItem from "../ProductItem";
import useApp from "./useProductList";
import { formatNumberWithCommas } from "../utill";

import "./ProductList.css";

const ProductList = () => {
  const { data, total, isEnd, loadMoreRef } = useApp();
  return (
    <div className="product-list">
      <div className="product-list__header">
        <h1>원티드 프리온보딩 FE 26차 사전 과제 - 탁민주</h1>
      </div>

      <div className="product-list__content">
        {data.map((x) => (
          <ProductItem key={x.productId} {...x} />
        ))}
        {!isEnd && (
          <div ref={loadMoreRef}>
            <h3>Loading more...</h3>
          </div>
        )}
      </div>
      <div className="product-list__footer">
        <h3>
          총 개수 : {formatNumberWithCommas(total.count)}개 &nbsp;&nbsp;&nbsp;
          총 금액 : {formatNumberWithCommas(total.price)}원
        </h3>
      </div>
    </div>
  );
};

export default ProductList;
