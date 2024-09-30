import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MOCK_DATA from "../data/mockProductData";
import { MockData } from "../type";

const PER_PAGE = 10;

const useProductList = () => {
  const [page, setPage] = useState<number>(-1);
  const [data, setData] = useState<MockData[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 원티드에서 제공한 mock data를 가져오는 함수
  const getMockData = useCallback((pageNum: number) => {
    return new Promise<{ datas: MockData[]; isEnd: boolean }>((resolve) => {
      setTimeout(() => {
        const datas: MockData[] = MOCK_DATA.slice(
          PER_PAGE * pageNum,
          PER_PAGE * (pageNum + 1),
        );
        const isEnd = PER_PAGE * (pageNum + 1) >= MOCK_DATA.length;

        resolve({ datas, isEnd });
      }, 1500);
    });
  }, []);

  // (초기)IntersectionObserver설정
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // API 호출
  useEffect(() => {
    if (page >= 0) {
      getMockData(page)
        .then(({ datas, isEnd }) => {
          setData((prev) => [...prev, ...datas]);
          if (isEnd) setIsEnd(true);
          if (isEnd && observerRef.current) {
            observerRef.current.disconnect();
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [page]);

  // total 정보 계산
  const total = useMemo(() => {
    return {
      count: data.length,
      price: data.reduce((acc, cur) => acc + cur.price, 0),
    };
  }, [data]);

  return { data, total, loadMoreRef, isEnd };
};

export default useProductList;
