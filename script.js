document.addEventListener('DOMContentLoaded', () => {
    // --- 1. 3D Carousel Auto-Rotation is handled via CSS animation ---


    // --- 2. macOS Dock Magnification Wave Logic ---
    const dockItems = document.querySelectorAll('#dock .nav-item');

    dockItems.forEach((item, index) => {
        item.addEventListener('mousemove', (e) => {
            // Apply scale classes dynamically based on distance
            item.classList.add('hover');
            
            // Left siblings
            if (index > 0) {
                dockItems[index - 1].classList.add('sibling-close');
                if (index > 1) {
                    dockItems[index - 2].classList.add('sibling-far');
                }
            }
            
            // Right siblings
            if (index < dockItems.length - 1) {
                dockItems[index + 1].classList.add('sibling-close');
                if (index < dockItems.length - 2) {
                    dockItems[index + 2].classList.add('sibling-far');
                }
            }
        });

        item.addEventListener('mouseleave', () => {
            resetDockClasses();
        });
    });

    function resetDockClasses() {
        dockItems.forEach(item => {
            item.classList.remove('hover', 'sibling-close', 'sibling-far');
        });
    }


    // --- 3. Switchable 3 Icon Sets Data & Toggling ---
    const iconData = {
        mac: [
            // Notion
            `<svg viewBox="0 0 24 24"><path d="M4 3h16v18H4zM8 7v10M12 7v10M16 7h-2M16 17h-2"/></svg>`,
            // Asana
            `<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="2.5"/><circle cx="7.5" cy="15" r="2.5"/><circle cx="16.5" cy="15" r="2.5"/></svg>`,
            // Slack
            `<svg viewBox="0 0 24 24"><rect x="5" y="5" width="4" height="4"/><rect x="15" y="5" width="4" height="4"/><rect x="5" y="15" width="4" height="4"/><rect x="15" y="15" width="4" height="4"/></svg>`,
            // Figma
            `<svg viewBox="0 0 24 24"><path d="M8 5a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0v-8a3 3 0 0 1 3-3zM16 5a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0v-8a3 3 0 0 1 3-3z"/></svg>`,
            // GitHub
            `<svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`
        ],
        glass: [
            `<i class="ri-notion-fill"></i>`,
            `<i class="ri-pages-line"></i>`,
            `<i class="ri-slack-fill"></i>`,
            `<i class="ri-figma-fill"></i>`,
            `<i class="ri-github-fill"></i>`
        ],
        brutal: [
            `<i class="ri-keyboard-line"></i>`,
            `<i class="ri-palette-line"></i>`,
            `<i class="ri-chat-4-line"></i>`,
            `<i class="ri-pen-nib-line"></i>`,
            `<i class="ri-git-branch-line"></i>`
        ]
    };

    const iconBoxes = document.querySelectorAll('.icon-box');

    function applyIconTheme(theme) {
        iconBoxes.forEach((box, i) => {
            box.className = 'icon-box'; // reset
            box.classList.add(`${theme}-icon`);
            box.innerHTML = iconData[theme][i];
        });
    }

    // Initialize with standard mac theme
    applyIconTheme('mac');



    // --- 4. Interactive Dialog Info Panel ---
    const btnInfo = document.getElementById('btnInfo');
    const infoModal = document.getElementById('infoModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');

    // Unique modal content for each image card index
    const modalData = [
        {
            title: "JELLYFISH ARTWORK 1",
            desc: "어두운 밤하늘과 같은 심해 속을 유영하는 붉은색 터치의 해파리 스크린샷 1번 아트워크입니다. 신비로운 자연의 유기적인 곡선과 3D 씬의 깊이를 상징합니다."
        },
        {
            title: "JELLYFISH ARTWORK 2",
            desc: "다수의 해파리들이 은하수처럼 수놓인 심해의 군무를 담은 스크린샷 2번 아트워크입니다. 고요함 속에서도 생동감 넘치는 발광 효과를 관찰할 수 있습니다."
        },
        {
            title: "JELLYFISH ARTWORK 3",
            desc: "밝은 보라빛과 노란빛의 강렬한 대비를 보여주는 클로즈업 스크린샷 3번 아트워크입니다. 독창적인 촉수의 디테일과 브루탈리즘 테두리가 극대화되어 표현됩니다."
        },
        {
            title: "JELLYFISH ARTWORK 1 (COPY)",
            desc: "3D 원기둥 순환 고리를 위해 복제된 4번째 아카이브 스크린샷입니다. 원본 스크린샷 1번과 동일한 매혹적인 빛망울을 공유합니다."
        },
        {
            title: "JELLYFISH ARTWORK 2 (COPY)",
            desc: "3D 원기둥의 순환 고리를 형성하는 5번째 복제 아트워크입니다. 심해의 군무를 반대편 축에서 지속하여 매끄러운 3D 뷰를 완성합니다."
        },
        {
            title: "JELLYFISH ARTWORK 3 (COPY)",
            desc: "3D 원통의 외벽을 닫아주는 마지막 6번째 복제 아트워크입니다. 강렬한 촉수의 생명력이 무한 루프 애니메이션을 유기적으로 이어줍니다."
        }
    ];

    btnInfo.addEventListener('click', () => {
        // Default workspace info
        infoModal.querySelector('h3').textContent = "ALMENDRA WORKSPACE";
        infoModal.querySelector('p').textContent = "Almendra Display 폰트를 이용해 세련되게 꾸민 브루탈리즘 워크스페이스입니다. 상단의 둥근 버튼을 제외하고는 모두 1px 블랙 보더와 직각(sharp edges) 레이아웃을 취하고 있습니다. 하단의 독 내비게이션 바에서 3가지 아이콘 요소 디자인을 마음껏 전환해 보세요.";
        infoModal.classList.add('active');
        modalOverlay.classList.add('active');
    });

    // Handle clicks on each image slide card
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'), 10);
            const data = modalData[index] || { title: "UNKNOWN WORK", desc: "상세 정보가 존재하지 않습니다." };
            
            infoModal.querySelector('h3').textContent = data.title;
            infoModal.querySelector('p').textContent = data.desc;
            infoModal.classList.add('active');
            modalOverlay.classList.add('active');
        });
    });

    function closeModal() {
        infoModal.classList.remove('active');
        modalOverlay.classList.remove('active');
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Archive button simple alert placeholder
    document.getElementById('btnArchive').addEventListener('click', () => {
        alert('작업 아카이브 페이지를 불러오는 중입니다...');
    });
});
