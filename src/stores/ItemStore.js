import { create } from "zustand";

const useItemStore = create((set) => ({
  items: [
    { id: "1", name: "식기 세트", icon: "/asset/icon/1.svg", img: "/asset/img/1.svg", text: "숟가락 2개, 포크 2개, 젓가락 2개, 넓적 그릇 2개, 밥 그릇 2개, 오목 접시 2개. 기숙사에서 혼자 밥을 먹을 때 필요한 식기류입니다.", price: 7000 },
    { id: "2", name: "조리 세트", icon: "/asset/icon/2.svg", img: "/asset/img/2.svg", text: "후라이팬 2개(소, 대 사이즈), 냄비 1개. 기숙사에서 혼자 조리할 때 필요한 조리 도구들입니다.", price: 200000 },
    { id: "3", name: "조미료 세트", icon: "/asset/icon/3.svg", img: "/asset/img/3.svg", text: "코인육수 10개, 스틱다시다 5개, 고추장 170ml, 소금, 후추, 설탕. 집에서 밥을 조리할 때 필수 조미료들로 구성되어있습니다.", price: 15000 },
    { id: "4", name: "옷걸이", icon: "/asset/icon/4.svg", img: "/asset/img/4.svg", text: "옷걸이 6개. 옷장에 옷을 걸어둘 때 유용한 옷걸이입니다. 기숙사에서 옷걸이가 부족할 경우에 유용합니다.", price: 5000 },
    { id: "5", name: "세탁 세트", icon: "/asset/icon/5.svg", img: "/asset/img/5.svg", text: "캡슐 세제 26개, 섬유유연제 750ml, 확장형 건조대 1개. 코인빨래방을 이용할 때 사용할 수 있는 세제와 섬유유연제, 건조기가 없을 상황에서 건조대를 사용할 수 있습니다. ", price: 15000 },
    { id: "6", name: "밥솥", icon: "/asset/icon/6.svg", img: "/asset/img/6.svg", text: "한국 미니 밥솥 1대. 1~2인분 밥짓기가 가능합니다. 쌀밥을 주 3회 이상 자주 먹는 사람에게 추천합니다.", price: 30000 },
    { id: "7", name: "브리타", icon: "/asset/icon/7.svg", img: "/asset/img/7.svg", text: "브리타 정수기 1개, 브리타 정수기 필터 3개. 매번 마시는 물을 사지 않고 수돗물을 정수해서 마실 수 있습니다.", price: 20000 },
    { id: "8", name: "공유기", icon: "/asset/icon/8.svg", img: "/asset/img/8.svg", text: "공유기 1대. 기숙사 입사 시 공유기가 권장되기도 합니다. 와이파이가 불안정하거나 끊기지 않게 도와줍니다.", price: 15000 },
    { id: "9", name: "드라이기", icon: "/asset/icon/9.svg", img: "/asset/img/9.svg", text: "드라이기 1대. 샤워 후 머리를 말릴 때 사용할 수 있는 바람이 센 편의 헤어 드라이기입니다.", price: 13000 },
    { id: "10", name: "침구 세트", icon: "/asset/icon/10.svg", img: "/asset/img/10.svg", text: "이불 1개, 베개 2개, 시트 1개, 쿠션 1개. 기숙사에서 사용할 수 있는 포근한 침구 세트입니다.", price: 30000 },
    { id: "11", name: "청소 세트", icon: "/asset/icon/11.svg", img: "/asset/img/11.svg", text: "밀대 1개, 습식포 16매, 비닐봉지 소형 묶음, 돌돌이 1개. 깨끗한 방을 유지할 수 있게 밀고 쓸 때 유용한 청소 세트입니다.", price: 15000 },
    { id: "12", name: "헤어 세트", icon: "/asset/icon/12.svg", img: "/asset/img/12.svg", text: "미니 드라이기 1개, 미니 고데기 1개. 드라이기뿐만 아니라 스타일링을 위한 고데기도 필요한 사람에게 추천합니다.", price: 20000 },
  ],
  updateItemQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));
export default useItemStore;

