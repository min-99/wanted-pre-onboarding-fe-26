import { memo } from "react";
import { MockData } from "../type";
import { formatDate, formatNumberWithCommas } from "../utill";
import "./ProductItem.css";

interface ProductItem extends MockData {}

const ProductItem = ({
  productId,
  productName,
  price,
  boughtDate,
}: ProductItem) => {
  return (
    <div className="product-item">
      <h5>상품 ID : {productId}</h5>
      <h3>상품명 : {productName}</h3>
      <h5>금액 : {formatNumberWithCommas(price)}원</h5>
      <h5>
        구매 일자 : {formatDate(boughtDate, "YYYY년 MM월 DD일 HH시 mm분")}
      </h5>
    </div>
  );
};

export default memo(ProductItem);
