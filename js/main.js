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

    const expandedTransitionImagePreloads = {
        'research.html': [
            'images/RESEARCH/pulsar_searching.webp',
            'images/RESEARCH/frb_rate.png'
        ],
        'life.html': [
            'images/LIFE/MOTOR/motor2.webp',
            'images/LIFE/MOTOR/motor3.webp',
            'images/LIFE/MOTOR/motor4.webp',
            'images/LIFE/ART/dingprize-en.webp',
            'images/LIFE/ART/art1.webp',
            'images/LIFE/ART/art2.png',
            'images/LIFE/ART/art3.webp',
            'images/LIFE/ART/art4.webp',
            'images/LIFE/TRAVEL/France/fr.webp',
            'images/LIFE/TRAVEL/Italy/it.webp',
            'images/LIFE/TRAVEL/NewZealand/nz.webp',
            'images/LIFE/TRAVEL/Qatar/qatar.webp',
            'images/LIFE/TRAVEL/CHINA/Anhui/ah.webp',
            'images/LIFE/TRAVEL/CHINA/Aomen/am.webp',
            'images/LIFE/TRAVEL/CHINA/Beijing/bj.webp',
            'images/LIFE/TRAVEL/CHINA/Chongqing/cq.webp',
            'images/LIFE/TRAVEL/CHINA/Guangdong/gd.webp',
            'images/LIFE/TRAVEL/CHINA/Guizhou/gz.webp',
            'images/LIFE/TRAVEL/CHINA/Hainan/hn.webp',
            'images/LIFE/TRAVEL/CHINA/Hebei/hb.webp',
            'images/LIFE/TRAVEL/CHINA/Henan/hn.webp',
            'images/LIFE/TRAVEL/CHINA/Hubei/hb.webp',
            'images/LIFE/TRAVEL/CHINA/Hunan/hn.webp',
            'images/LIFE/TRAVEL/CHINA/Jiangsu/js.webp',
            'images/LIFE/TRAVEL/CHINA/Jiangxi/jx.webp',
            'images/LIFE/TRAVEL/CHINA/Jilin/jl.webp',
            'images/LIFE/TRAVEL/CHINA/Liaoning/ln.webp',
            'images/LIFE/TRAVEL/CHINA/Neimenggu/nm.webp',
            'images/LIFE/TRAVEL/CHINA/Ningxia/nx.webp',
            'images/LIFE/TRAVEL/CHINA/SIchuan/sc.webp',
            'images/LIFE/TRAVEL/CHINA/Shandong/sd.webp',
            'images/LIFE/TRAVEL/CHINA/Shanghai/sh.webp',
            'images/LIFE/TRAVEL/CHINA/Shanxi_Jin/sx.webp',
            'images/LIFE/TRAVEL/CHINA/Shanxi/sx.webp',
            'images/LIFE/TRAVEL/CHINA/Tianjin/tj.webp',
            'images/LIFE/TRAVEL/CHINA/Xianggang/xg.webp',
            'images/LIFE/TRAVEL/CHINA/Yunnan/yn.webp',
            'images/LIFE/TRAVEL/CHINA/Zhejiang/zj.webp'
        ],
        'motion.html': [
            'images/MOTION/OR/or2.webp',
            'images/MOTION/OR/or3.webp',
            'images/MOTION/OR/or4.webp',
            'images/MOTION/OR/or5.webp',
            'images/MOTION/OR/or6.webp',
            'images/MOTION/OR/or7.webp',
            'images/MOTION/OR/or8.webp',
            'images/MOTION/TRACK/track2.webp',
            'images/MOTION/TRACK/track3.webp',
            'images/MOTION/TRACK/track4.webp',
            'images/MOTION/TRACK/track5.webp',
            'images/MOTION/TRACK/track6.webp',
            'images/MOTION/TRACK/track7.webp',
            'images/MOTION/TRACK/track8.webp',
            'images/MOTION/TRACK/track9.webp'
        ]
    };

    Object.entries(expandedTransitionImagePreloads).forEach(([page, urls]) => {
        transitionImagePreloads[page] = [...new Set([...(transitionImagePreloads[page] || []), ...urls])];
    });

    const criticalTransitionImagePreloads = {
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

    function getCriticalTransitionPreloadUrls(targetUrl) {
        const page = targetUrl.split('#')[0].split('?')[0].split('/').pop();
        return criticalTransitionImagePreloads[page] || getTransitionPreloadUrls(targetUrl).slice(0, 4);
    }

    function isConstrainedDevice() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        return window.matchMedia('(max-width: 768px), (pointer: coarse)').matches ||
            Boolean(connection && (connection.saveData || /2g/.test(connection.effectiveType || '')));
    }

    function waitBriefly(promise, timeout = 650) {
        return Promise.race([
            promise,
            new Promise(resolve => window.setTimeout(resolve, timeout))
        ]);
    }

    const preloadedImages = new Set();
    const imagePreloadCache = new Map();

    function preloadImage(src, options = {}) {
        if (!src) return Promise.resolve(null);
        if (imagePreloadCache.has(src)) return imagePreloadCache.get(src);

        const promise = new Promise(resolve => {
            const image = new Image();
            image.decoding = 'async';
            image.loading = 'eager';
            image.onload = () => {
                if (options.decode && image.decode) {
                    image.decode().then(() => resolve(image), () => resolve(image));
                    return;
                }
                resolve(image);
            };
            image.onerror = () => resolve(null);
            image.src = src;
        });

        imagePreloadCache.set(src, promise);
        return promise;
    }

    function preloadImages(urls, options = {}) {
        const uniqueUrls = [...new Set((urls || []).filter(Boolean))];
        const tasks = uniqueUrls.map(src => {
            if (!preloadedImages.has(src)) {
                preloadedImages.add(src);

                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            }

            return preloadImage(src, options);
        });

        return Promise.all(tasks);
    }

    function collectDocumentImageUrls() {
        const urls = new Set();
        const imagePattern = /images\/[^,\s"')]+?\.(?:webp|png|jpe?g|gif|svg)/gi;

        document.querySelectorAll('img[src]').forEach(image => urls.add(image.getAttribute('src')));
        document.querySelectorAll('[data-carousel-photos], [data-carousel-photos-en], [data-carousel-link-photo], [data-carousel-link-photo-en], [data-photo], [data-photos]').forEach(element => {
            [...element.attributes].forEach(attribute => {
                let match;
                while ((match = imagePattern.exec(attribute.value))) {
                    urls.add(match[0]);
                }
                imagePattern.lastIndex = 0;
            });
        });

        return [...urls];
    }

    function warmCurrentPageImages() {
        if (isHomePage || isConstrainedDevice()) return;
        preloadImages(collectDocumentImageUrls(), { decode: true });
    }

    const scheduleImageWarmup = window.requestIdleCallback
        ? () => window.requestIdleCallback(warmCurrentPageImages, { timeout: 1600 })
        : () => window.setTimeout(warmCurrentPageImages, 350);

    window.addEventListener('load', scheduleImageWarmup, { once: true });

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
        const navigationEntries = performance.getEntriesByType ? performance.getEntriesByType('navigation') : [];
        const navigationEntry = navigationEntries[0];
        const isHistoryRestore = event.persisted || (navigationEntry && navigationEntry.type === 'back_forward');
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
                const targetUrl = link.getAttribute('href') || '';
                const urls = isConstrainedDevice() ? getCriticalTransitionPreloadUrls(targetUrl) : getTransitionPreloadUrls(targetUrl);
                preloadImages(urls);
            }, { once: true });
            link.addEventListener('focus', () => {
                const targetUrl = link.getAttribute('href') || '';
                const urls = isConstrainedDevice() ? getCriticalTransitionPreloadUrls(targetUrl) : getTransitionPreloadUrls(targetUrl);
                preloadImages(urls);
            }, { once: true });

            link.addEventListener('click', function(e) {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                const targetUrl = this.getAttribute('href');
                const criticalPreload = preloadImages(getCriticalTransitionPreloadUrls(targetUrl), { decode: true });
                const restUrls = getTransitionPreloadUrls(targetUrl).filter(src => !getCriticalTransitionPreloadUrls(targetUrl).includes(src));
                if (!isConstrainedDevice()) {
                    preloadImages(restUrls);
                }

                // 统一使用 1000ms
                customLoader(1000, () => {
                    waitBriefly(criticalPreload).then(() => {
                        window.location.href = targetUrl;
                    });
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
