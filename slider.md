# Technical Specification: Pure CSS 3D Animated Carousel

본 문서는 [Ana Tudor의 CodePen 프로젝트](https://codepen.io/thebabydino/pen/dPXVyqN)를 직접 분석하여 작성된 프론트엔드 기술 명세서입니다. 이 문서를 입력받는 에이전트는 하기에 기술된 DOM 구조, 공간 수학 공식, 모던 CSS 설정을 통해 별도의 JavaScript 애니메이션 라이브러리 없이 완전히 동일한 3D 원기둥 회전 씬(Scene)을 물리적으로 구현할 수 있어야 합니다.

---

## 1. DOM 구조 및 데이터 레이어 (HTML/Data)

최적의 3D 렌더링 성능과 마스크 처리를 위해 최소한의 시맨틱 태그 인터페이스를 유지합니다. 

### 1.1 구조적 계층
* **`Root Container (.scene)`**: 3D 카메라 원근감(Perspective)과 가로축 페이드 아웃 마스크를 제어하는 최상위 공간입니다.
* **`3D Object Container (.a3d)`**: 3D 공간 상태(`preserve-3d`)를 유지하며, 가상 Y축을 중심으로 무한 회전하는 모터 역할을 합니다.
* **`Carousel Items (item)`**: 원기둥의 외벽을 구성하는 개별 이미지 요소들입니다.

### 1.2 데이터 정의 (JavaScript/Pug Template 변수)
* 총 아이템 개수 ($N$)는 CSS 변수(--n)로 스타일시트에 동적 전달되어 각도 및 반지름 계산에 사용됩니다.
* 각 아이템은 자신이 몇 번째 요소인지를 나타내는 제로 베이스 인덱스($i$) 정보를 인라인 스타일(`--i`)로 가집니다.

---

## 2. 3D 공간 수학 및 배치 원리 (Spatial Mathematics)

아이템들을 겹치지 않고 정원 기둥(Cylinder) 형태로 배치하기 위해 CSS 내에서 삼각함수와 변형(Transform) 공식을 사용합니다.

### 2.1 개별 아이템 회전각 ($\theta$)
전체 원($360^\circ$ 또는 $1\text{turn}$)을 총 아이템 개수 $N$으로 나누어 기하학적 기준 각도를 산출합니다.
$$\theta = \frac{360^\circ}{N}$$
각 아이템은 자신의 고유 인덱스 $i$에 따라 Y축 기준으로 다음과 같이 회전합니다.
$$\text{rotateY} = i \times \theta$$

### 2.2 원기둥 반지름 ($r$) 및 밀어내기 (Translation)
모든 아이템이 중심점에서 겹치는 현상을 방지하기 위해, 각도를 튼 후 원기둥의 반지름만큼 Z축(사용자 방향)으로 밀어내야 합니다. 아이템의 가로 너비를 $w$라고 할 때, 정다각형의 내접원 반지름 공식에 의해 CSS 내부 반지름($r$)은 다음과 같이 계산됩니다.
$$r = \frac{w}{2 \cdot \tan\left(\frac{180^\circ}{N}\right)}$$

---

## 3. 핵심 CSS 명세 (Functional CSS Styling)

에이전트는 아래 명시된 속성을 누락 없이 선언해야 동일한 시각적 공간감을 확보할 수 있습니다.

```css
/* 1. 레이아웃 기반 구축 */
.scene, .a3d { 
  display: grid; 
}

/* 2. 3D 스페이스 스펙 및 시각 마스크 */
.scene {
  overflow: hidden; /* 자식 요소 회전 시 발생하는 스크롤바 방지 */
  perspective: 35em; /* 3D 공간 깊이감 정의 (값이 작을수록 원근 왜곡 극대화) */
  
  /* 측면 페이드아웃 마스크: 양끝 영역 투명화로 공간이 끝없이 연장되는 투시 효과 구현 */
  mask: linear-gradient(90deg, #0000, red 20% 80%, #0000); 
}

/* 3. 회전 모터 축 */
.a3d {
  place-self: center; /* 그리드 중앙 정렬 */
  transform-style: preserve-3d; /* 핵심: 자식 요소들의 3D 입체 변형 상태를 상속 유지 */
  animation: rotateCarousel 12s linear infinite; /* 무한 등속 회전 */
}

/* 4. 개별 아이템 공간 배치 가이드 */
.carousel-item {
  grid-area: 1/ 1; /* 모든 아이템을 중앙 한 점에 중첩 시킨 후 3D 변형 시작 */
  
  /* 공식 대입: 각도를 틀고, 계산된 반지름(Z축 변위)만큼 바깥으로 Push */
  transform: 
    rotateY(calc(var(--i) * 1turn / var(--n))) 
    translateZ(var(--rc)); 
}