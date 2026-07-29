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

    const criticalTransitionImagePreloads = {
        'research.html': [
            'images/RESEARCH/research.webp'
        ],
        'life.html': [
            'images/LIFE/life.webp'
        ],
        'motion.html': [
            'images/MOTION/sports.webp'
        ],
        'about.html': [
            'images/ABOUT/jiaozhi.webp'
        ]
    };

    function getCriticalTransitionPreloadUrls(targetUrl) {
        const page = targetUrl.split('#')[0].split('?')[0].split('/').pop();
        return criticalTransitionImagePreloads[page] || [];
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

    const fullBleedMobileImages = new Set([
        'images/research.webp',
        'images/home.webp',
        'images/life-bg.webp',
        'images/sports.webp',
        'images/jiaozhi.webp',
        'images/RESEARCH/research.webp',
        'images/LIFE/life.webp',
        'images/MOTION/sports.webp',
        'images/ABOUT/jiaozhi.webp'
    ]);

    function getNormalizedImagePath(src) {
        if (!src) return '';
        return src.split('?')[0].replace(/^\.\//, '');
    }

    function isFullBleedMobileImage(src) {
        return fullBleedMobileImages.has(getNormalizedImagePath(src));
    }

    function getMobileImageWidth(src) {
        if (!isConstrainedDevice()) return null;
        if (isFullBleedMobileImage(src)) {
            return window.matchMedia('(max-width: 480px)').matches ? 768 : 1024;
        }
        if (window.matchMedia('(max-width: 480px)').matches) return 768;
        return 1024;
    }

    function getMobileImageSrc(src) {
        const width = getMobileImageWidth(src);
        if (!width || !src || src.includes('/mobile/')) return src;

        const [path, query = ''] = src.split('?');
        const match = path.match(/^(\.?\/)?images\/(.+?)\.(?:webp|png|jpe?g)$/i);
        if (!match) return src;

        const prefix = match[1] || '';
        const nextSrc = `${prefix}images/mobile/${width}/${match[2]}.webp`;
        return query ? `${nextSrc}?${query}` : nextSrc;
    }

    function applyMobileImageSources(root = document) {
        if (!isConstrainedDevice()) return;

        root.querySelectorAll('img[src]').forEach(image => {
            if (image.hasAttribute('srcset')) return;

            const originalSrc = image.getAttribute('src');
            const mobileSrc = getMobileImageSrc(originalSrc);
            if (mobileSrc === originalSrc) return;

            image.src = mobileSrc;
            image.setAttribute('data-original-src', originalSrc);
            image.loading = image.loading === 'eager' ? 'eager' : 'lazy';
            image.decoding = 'async';
        });
    }

    const preloadedImages = new Set();
    const imagePreloadCache = new Map();

    function preloadImage(src, options = {}) {
        const preloadSrc = getMobileImageSrc(src);
        if (!preloadSrc) return Promise.resolve(null);
        if (imagePreloadCache.has(preloadSrc)) return imagePreloadCache.get(preloadSrc);

        const promise = new Promise(resolve => {
            const image = new Image();
            image.decoding = 'async';
            image.loading = 'eager';
            if (options.fetchPriority) {
                image.fetchPriority = options.fetchPriority;
            }
            image.onload = () => {
                if (options.decode && image.decode) {
                    image.decode().then(() => resolve(image), () => resolve(image));
                    return;
                }
                resolve(image);
            };
            image.onerror = () => resolve(null);
            image.src = preloadSrc;
        });

        imagePreloadCache.set(preloadSrc, promise);
        return promise;
    }

    function preloadImages(urls, options = {}) {
        const uniqueUrls = [...new Set((urls || []).filter(Boolean).map(getMobileImageSrc))];
        const tasks = uniqueUrls.map(src => {
            const linkRel = options.linkRel || 'prefetch';
            const preloadKey = `${linkRel}:${src}`;
            if (!preloadedImages.has(preloadKey)) {
                preloadedImages.add(preloadKey);

                const link = document.createElement('link');
                link.rel = linkRel;
                link.as = 'image';
                link.href = src;
                if (options.fetchPriority) {
                    link.fetchPriority = options.fetchPriority;
                }
                document.head.appendChild(link);
            }

            return preloadImage(src, options);
        });

        return Promise.all(tasks);
    }

    applyMobileImageSources();

    function scheduleIdleTask(task, timeout = 1600) {
        if (window.requestIdleCallback) {
            window.requestIdleCallback(task, { timeout });
            return;
        }
        window.setTimeout(task, Math.min(timeout, 500));
    }

    function waitForImageElement(image, timeout = 2200) {
        if (!image) return Promise.resolve();

        const decodeImage = () => {
            if (!image.decode) return Promise.resolve();
            return image.decode().catch(() => undefined);
        };

        if (image.complete && image.naturalWidth > 0) {
            return waitBriefly(decodeImage(), timeout);
        }

        return new Promise(resolve => {
            let settled = false;
            const finish = () => {
                if (settled) return;
                settled = true;
                window.clearTimeout(timer);
                image.removeEventListener('load', finish);
                image.removeEventListener('error', finish);
                decodeImage().then(resolve, resolve);
            };
            const timer = window.setTimeout(finish, timeout);
            image.addEventListener('load', finish, { once: true });
            image.addEventListener('error', finish, { once: true });
        });
    }

    function getInitialCriticalImages() {
        if (!isHomePage) return [];
        return [...document.querySelectorAll('.hero-poster img, [data-critical-image]')];
    }

    // 首次进入：等关键背景图就绪后收起 loader，并设置最长兜底时间。
    function initialLoader(readyPromise, callback) {
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
            let target = 88;
            const loadingInterval = setInterval(() => {
                progress = Math.min(target, progress + Math.max(3, (target - progress) * 0.18));
                updateProgress(progress);
            }, 80);

            waitBriefly(readyPromise, isConstrainedDevice() ? 2400 : 1700).then(() => {
                target = 100;
                updateProgress(100);
                clearInterval(loadingInterval);
                window.setTimeout(() => {
                    if (callback) callback();
                }, 140);
            });
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

    // 页面初始加载
    if (loader && progressBar) {
        const criticalImagesReady = Promise.all(getInitialCriticalImages().map(image => waitForImageElement(image)));
        initialLoader(criticalImagesReady, () => {
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
                preloadImages(getCriticalTransitionPreloadUrls(targetUrl));
            }, { once: true });
            link.addEventListener('focus', () => {
                const targetUrl = link.getAttribute('href') || '';
                preloadImages(getCriticalTransitionPreloadUrls(targetUrl));
            }, { once: true });
            link.addEventListener('pointerdown', () => {
                const targetUrl = link.getAttribute('href') || '';
                preloadImages(getCriticalTransitionPreloadUrls(targetUrl), {
                    linkRel: 'preload',
                    fetchPriority: 'high'
                });
            }, { once: true, passive: true });

            link.addEventListener('click', function(e) {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                const targetUrl = this.getAttribute('href');
                const criticalPreload = preloadImages(getCriticalTransitionPreloadUrls(targetUrl), {
                    decode: true,
                    linkRel: 'preload',
                    fetchPriority: 'high'
                });

                // 统一使用 1000ms
                customLoader(1000, () => {
                    const navigationReady = isConstrainedDevice()
                        ? criticalPreload
                        : waitBriefly(criticalPreload, 650);

                    navigationReady.then(() => {
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
        }, { passive: true });
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
    const heroContent = document.querySelector('.hero-content');
    let parallaxFrame = null;

    window.addEventListener('scroll', () => {
        if (parallaxFrame || !heroContent) return;

        parallaxFrame = requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(-50%) translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
            parallaxFrame = null;
        });
    }, { passive: true });

    // ===== 鼠标跟随效果 =====
    const enablePointerEffects = !isConstrainedDevice() && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (enablePointerEffects) {
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        let pointerFrame = null;
        let refreshCardRects = true;
        const pointerCards = [...document.querySelectorAll('.visual-card, .grid-item, .stat-item')];
        const visiblePointerCards = new Set();
        const cardRects = new WeakMap();

        if ('IntersectionObserver' in window) {
            const pointerObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        visiblePointerCards.add(entry.target);
                        cardRects.set(entry.target, entry.target.getBoundingClientRect());
                    } else {
                        visiblePointerCards.delete(entry.target);
                        entry.target.style.transform = '';
                    }
                });
            }, { rootMargin: '120px 0px' });

            pointerCards.forEach(card => pointerObserver.observe(card));
        } else {
            pointerCards.forEach(card => visiblePointerCards.add(card));
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            if (!pointerFrame) {
                pointerFrame = requestAnimationFrame(animateCursor);
            }
        }, { passive: true });

        function animateCursor() {
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;

            if (refreshCardRects) {
                visiblePointerCards.forEach(card => {
                    cardRects.set(card, card.getBoundingClientRect());
                });
                refreshCardRects = false;
            }

            visiblePointerCards.forEach(card => {
                const rect = cardRects.get(card);
                if (!rect) return;
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;

                const angleX = (window.innerHeight / 2 - cardCenterY) * currentY * 0.01;
                const angleY = (cardCenterX - window.innerWidth / 2) * currentX * 0.01;

                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });

            const stillMoving = Math.abs(mouseX - currentX) > 0.002 || Math.abs(mouseY - currentY) > 0.002;
            pointerFrame = stillMoving && !document.hidden
                ? requestAnimationFrame(animateCursor)
                : null;
        }

        const markCardRectsDirty = () => {
            refreshCardRects = true;
        };

        window.addEventListener('resize', markCardRectsDirty, { passive: true });
        window.addEventListener('scroll', markCardRectsDirty, { passive: true });
    }

    // ===== 视频处理 =====
    const heroVideo = document.getElementById('heroVideo');
    const heroSection = document.getElementById('hero');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let heroVideoInView = true;

    function hasVideoSource(video) {
        return Boolean(video && (video.currentSrc || video.querySelector('source')));
    }

    function loadHeroVideoWhenAppropriate() {
        if (!heroVideo || isConstrainedDevice() || reduceMotion || heroVideo.dataset.loaded === 'true') return;

        const src = heroVideo.dataset.src;
        if (!src) return;

        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        heroVideo.appendChild(source);
        heroVideo.dataset.loaded = 'true';
        heroVideo.load();
    }

    // 检查视频是否可以播放
    if (heroVideo) {
        heroVideo.addEventListener('canplay', () => {
            heroVideo.classList.add('is-ready');
            if (heroVideoInView && !document.hidden) {
                heroVideo.play().catch(() => {
                    console.log('视频自动播放被阻止，用户交互后播放');
                });
            }
        });

        if (heroSection && 'IntersectionObserver' in window) {
            const heroVideoObserver = new IntersectionObserver(entries => {
                heroVideoInView = Boolean(entries[0]?.isIntersecting);
                if (!heroVideoInView) {
                    heroVideo.pause();
                } else if (hasVideoSource(heroVideo) && !document.hidden) {
                    heroVideo.play().catch(() => undefined);
                }
            }, { threshold: 0.12 });
            heroVideoObserver.observe(heroSection);
        }

        window.addEventListener('load', () => {
            scheduleIdleTask(loadHeroVideoWhenAppropriate, 2600);
        }, { once: true });

        // 用户交互后尝试播放视频（仅主页，避免与pages.js冲突）
        if (document.getElementById('hero')) {
            document.addEventListener('click', () => {
                loadHeroVideoWhenAppropriate();
                if (heroVideoInView && hasVideoSource(heroVideo) && heroVideo.paused) {
                    heroVideo.play().catch(() => undefined);
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
            if (heroVideo && heroVideoInView && hasVideoSource(heroVideo) && heroVideo.paused) {
                heroVideo.play().catch(() => undefined);
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
