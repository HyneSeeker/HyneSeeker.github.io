// ========== 主交互脚本 ==========
(function() {
    'use strict';

    // 检测是否为主页（子页面没有 loader 和 hero section）
    const isHomePage = document.getElementById('loader') && document.getElementById('hero');

    // ===== 语言切换 =====
    const langToggle = document.getElementById('langToggle');
    const body = document.body;

    // 从本地存储读取语言偏好
    const savedLang = localStorage.getItem('lang') || 'zh';
    body.setAttribute('data-lang', savedLang);
    updateLangToggle(savedLang);

    // 只在主页添加语言切换监听器（子页面由 pages.js 处理）
    if (langToggle && isHomePage) {
        langToggle.addEventListener('click', () => {
            const currentLang = body.getAttribute('data-lang');
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            body.setAttribute('data-lang', newLang);
            localStorage.setItem('lang', newLang);
            updateLangToggle(newLang);
        });
    }

    function updateLangToggle(lang) {
        const langIcon = langToggle?.querySelector('.lang-icon');
        if (langIcon) {
            langIcon.textContent = lang === 'zh' ? 'EN' : '中文';
        }
    }

    // ===== 加载屏 =====
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.progress-bar');

    function updateProgress(percent) {
        if (progressBar) {
            progressBar.style.width = percent + '%';
        }
    }

    const transitionImagePreloads = {
        'research.html': [
            'images/RESEARCH/research.webp',
            'images/RESEARCH/dart_catalog.webp',
            'images/RESEARCH/still_working.webp',
            'images/RESEARCH/spherex.webp'
        ],
        'life.html': [
            'images/LIFE/life.webp',
            'images/LIFE/ChinaMap1-dark.webp',
            'images/LIFE/TRAVEL/beyond.webp',
            'images/LIFE/MOTOR/motor1.webp',
            'images/LIFE/ART/dingprize.webp'
        ],
        'motion.html': [
            'images/MOTION/sports.webp',
            'images/MOTION/OR/or1.webp',
            'images/MOTION/bilibili.webp',
            'images/MOTION/TRACK/track1.webp'
        ],
        'about.html': [
            'images/ABOUT/jiaozhi.webp',
            'images/ABOUT/id.webp'
        ]
    };

    function getTransitionPreloadUrls(targetUrl) {
        const page = targetUrl.split('#')[0].split('?')[0].split('/').pop();
        return transitionImagePreloads[page] || [];
    }

    const preloadedImages = new Set();

    function preloadImages(urls) {
        urls.forEach(src => {
            if (preloadedImages.has(src)) return;
            preloadedImages.add(src);

            const image = new Image();
            image.decoding = 'async';
            image.src = src;

            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // 慢速加载（首次进入页面）- 约2秒
    function slowLoader(callback) {
        if (loader) {
            loader.classList.remove('loaded');
            if (progressBar) {
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.transition = 'width 0.3s ease';
                }, 10);
            }

            let progress = 0;
            const loadingInterval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    updateProgress(100);
                    clearInterval(loadingInterval);
                    setTimeout(() => {
                        if (callback) callback();
                    }, 300);
                } else {
                    updateProgress(progress);
                }
            }, 200);
        } else if (callback) {
            callback();
        }
    }

    // 快速加载（页面切换）- 500ms
    function fastLoader(callback) {
        if (loader) {
            loader.classList.remove('loaded');
            if (progressBar) {
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.transition = 'width 0.3s ease';
                }, 10);
            }

            let progress = 0;
            const stepTime = 25;
            const progressPerStep = 100 / (500 / stepTime);
            const loadingInterval = setInterval(() => {
                progress += progressPerStep;
                if (progress >= 100) {
                    progress = 100;
                    updateProgress(100);
                    clearInterval(loadingInterval);
                    if (callback) callback();
                } else {
                    updateProgress(progress);
                }
            }, stepTime);
        } else if (callback) {
            callback();
        }
    }

    // 页面初始加载 - 慢速
    if (loader && progressBar) {
        slowLoader(() => {
            loader.classList.add('loaded');
        });
    }

    window.addEventListener('pageshow', event => {
        const navigationEntry = performance.getEntriesByType?.('navigation')?.[0];
        const isHistoryRestore = event.persisted || navigationEntry?.type === 'back_forward';
        if (!isHistoryRestore) return;

        if (loader) {
            loader.classList.add('loaded');
        }
        if (progressBar) {
            progressBar.style.width = '100%';
        }
    });

    // ===== 页面切换过渡 - 仅主页 =====
    if (isHomePage) {
        document.querySelectorAll('a[href$=".html"]').forEach(link => {
            link.addEventListener('pointerenter', () => {
                preloadImages(getTransitionPreloadUrls(link.getAttribute('href') || ''));
            }, { once: true });
            link.addEventListener('focus', () => {
                preloadImages(getTransitionPreloadUrls(link.getAttribute('href') || ''));
            }, { once: true });

            link.addEventListener('click', function(e) {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                const targetUrl = this.getAttribute('href');
                preloadImages(getTransitionPreloadUrls(targetUrl));

                // 统一使用 1000ms
                customLoader(1000, () => {
                    window.location.href = targetUrl;
                });
            });
        });
    }

    // 自定义时长的加载动画
    function customLoader(duration, callback) {
        if (loader) {
            loader.classList.remove('loaded');
            if (progressBar) {
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.transition = 'width 0.3s ease';
                }, 10);
            }

            let progress = 0;
            const stepTime = 25;
            const progressPerStep = 100 / (duration / stepTime);
            const loadingInterval = setInterval(() => {
                progress += progressPerStep;
                if (progress >= 100) {
                    progress = 100;
                    updateProgress(100);
                    clearInterval(loadingInterval);
                    if (callback) callback();
                } else {
                    updateProgress(progress);
                }
            }, stepTime);
        } else if (callback) {
            callback();
        }
    }

    // ===== 导航栏 =====
    const nav = document.getElementById('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // 关闭移动端菜单当点击链接
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ===== 平滑滚动 =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 300; // 300ms 快速滚动
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                    window.scrollTo(0, startPosition + distance * ease);
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                requestAnimationFrame(animation);
            }
        });
    });

    // ===== 区块动画 =====
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // 触发数字动画
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    animateNumber(stat);
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    // ===== 数字动画 =====
    function animateNumber(element) {
        if (element.classList.contains('animated')) return;

        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const startTime = Date.now();
        const startValue = 0;

        function updateNumber() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 缓动函数
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target;
                element.classList.add('animated');
            }
        }

        updateNumber();
    }

    // ===== 视差效果 =====
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Hero 视差
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(-50%) translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }

    });

    // ===== 鼠标跟随效果 =====
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateCursor() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        // 对卡片应用微妙的倾斜效果
        document.querySelectorAll('.visual-card, .grid-item, .stat-item').forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            const angleX = (window.innerHeight / 2 - cardCenterY) * currentY * 0.01;
            const angleY = (cardCenterX - window.innerWidth / 2) * currentX * 0.01;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // ===== 视频处理 =====
    const heroVideo = document.getElementById('heroVideo');

    // 检查视频是否可以播放
    if (heroVideo) {
        heroVideo.addEventListener('canplay', () => {
            heroVideo.play().catch(err => {
                console.log('视频自动播放被阻止，用户交互后播放');
            });
        });

        // 用户交互后尝试播放视频（仅主页，避免与pages.js冲突）
        if (document.getElementById('hero')) {
            document.addEventListener('click', () => {
                if (heroVideo.paused) {
                    heroVideo.play();
                }
            }, { once: true });
        }
    }

    // ===== 触摸设备优化 =====
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouch) {
        document.body.classList.add('touch-device');

        // 移除鼠标跟随效果
        document.querySelectorAll('.visual-card, .grid-item, .stat-item').forEach(card => {
            card.style.transform = '';
        });
    }

    // ===== 页面可见性 =====
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (heroVideo && !heroVideo.paused) {
                heroVideo.pause();
            }
        } else {
            if (heroVideo && heroVideo.paused) {
                heroVideo.play();
            }
        }
    });

    // ===== 键盘快捷键 =====
    document.addEventListener('keydown', (e) => {
        // ESC 关闭移动菜单
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // ===== 控制台彩蛋 =====
    console.log('%c✨ 欢迎访问我的个人主页!', 'font-size: 20px; color: #c9a227; font-weight: bold;');
    console.log('%cDriven By Dreams', 'font-size: 14px; color: #888;');

})();
