// ========== 子页面交互脚本 ==========
(function() {
    'use strict';

    // ===== 语言切换 =====
    const langToggle = document.getElementById('langToggle');
    const body = document.body;

    // 从本地存储读取语言偏好
    const savedLang = localStorage.getItem('lang') || 'zh';
    body.setAttribute('data-lang', savedLang);
    updateLangToggle(savedLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = body.getAttribute('data-lang');
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            body.setAttribute('data-lang', newLang);
            localStorage.setItem('lang', newLang);
            updateLangToggle(newLang);
            updateActiveTravelPlace();
            window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: newLang } }));
        });
    }

    function updateLangToggle(lang) {
        const langIcon = langToggle?.querySelector('.lang-icon');
        if (langIcon) {
            langIcon.textContent = lang === 'zh' ? 'EN' : '中文';
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
            'images/LIFE/MOTOR/motor5.webp',
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
        ],
        'index.html': [
            'images/home.webp',
            'images/research.webp',
            'images/spherex.webp',
            'images/life-bg.webp',
            'images/life-map.webp',
            'images/sports.webp'
        ]
    };

    const expandedTransitionImagePreloads = {
        'research.html': [
            'images/RESEARCH/pulsar_searching.webp',
            'images/RESEARCH/frb_rate.png'
        ],
        'life.html': [
            'images/LIFE/MOTOR/motor6.webp',
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
        ],
        'index.html': [
            'images/jiaozhi.webp'
        ]
    };

    Object.entries(expandedTransitionImagePreloads).forEach(([page, urls]) => {
        transitionImagePreloads[page] = [...new Set([...(transitionImagePreloads[page] || []), ...urls])];
    });

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
        ],
        'index.html': [
            'images/home.webp'
        ]
    };

    const allPageIdlePreloads = [...new Set(Object.values(criticalTransitionImagePreloads).flat())];

    function getTransitionPreloadUrls(targetUrl) {
        const page = targetUrl.split('#')[0].split('?')[0].split('/').pop() || 'index.html';
        return transitionImagePreloads[page] || [];
    }

    function getCriticalTransitionPreloadUrls(targetUrl) {
        const page = targetUrl.split('#')[0].split('?')[0].split('/').pop() || 'index.html';
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
    let activeTransitionLoader = null;
    let activeTransitionInterval = null;
    let activeTransitionTimeout = null;

    function preloadImage(src, options = {}) {
        const preloadSrc = getMobileImageSrc(src);
        if (!preloadSrc) return Promise.resolve(null);
        if (imagePreloadCache.has(preloadSrc)) {
            const cached = imagePreloadCache.get(preloadSrc);
            if (!options.decode) return cached;

            return cached.then(image => {
                if (image && image.decode) {
                    return image.decode().then(() => image, () => image);
                }
                return image;
            });
        }

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

    function scheduleIdleTask(callback, timeout = 1600, delay = 350) {
        if (window.requestIdleCallback) {
            window.requestIdleCallback(callback, { timeout });
            return;
        }

        window.setTimeout(() => {
            callback({
                didTimeout: true,
                timeRemaining: () => 12
            });
        }, delay);
    }

    const mobileImageWarmupQueue = [];
    const mobileImageWarmupQueued = new Set();
    let mobileImageWarmupRunning = false;

    function runMobileImageWarmup() {
        if (mobileImageWarmupRunning || !mobileImageWarmupQueue.length) return;

        mobileImageWarmupRunning = true;
        scheduleIdleTask(deadline => {
            const batch = [];
            const maxBatch = window.matchMedia('(max-width: 480px)').matches ? 2 : 3;

            while (
                mobileImageWarmupQueue.length &&
                batch.length < maxBatch &&
                (deadline.didTimeout || deadline.timeRemaining() > 5)
            ) {
                batch.push(mobileImageWarmupQueue.shift());
            }

            if (!batch.length && mobileImageWarmupQueue.length) {
                batch.push(mobileImageWarmupQueue.shift());
            }

            const finish = () => {
                mobileImageWarmupRunning = false;
                if (mobileImageWarmupQueue.length) {
                    window.setTimeout(runMobileImageWarmup, isConstrainedDevice() ? 900 : 180);
                }
            };

            preloadImages(batch, { decode: false }).then(finish, finish);
        }, 1800, 450);
    }

    function queueMobileImageWarmup(urls, options = {}) {
        const uniqueUrls = [...new Set((urls || []).filter(Boolean))];
        if (!uniqueUrls.length) return;

        if (!isConstrainedDevice()) {
            preloadImages(uniqueUrls, { decode: true });
            return;
        }

        const orderedUrls = options.priority ? uniqueUrls.slice().reverse() : uniqueUrls;
        orderedUrls.forEach(src => {
            if (mobileImageWarmupQueued.has(src)) {
                if (options.priority) {
                    const queueIndex = mobileImageWarmupQueue.indexOf(src);
                    if (queueIndex >= 0) {
                        mobileImageWarmupQueue.splice(queueIndex, 1);
                        mobileImageWarmupQueue.unshift(src);
                    }
                }
                return;
            }

            mobileImageWarmupQueued.add(src);
            if (options.priority) {
                mobileImageWarmupQueue.unshift(src);
            } else {
                mobileImageWarmupQueue.push(src);
            }
        });

        runMobileImageWarmup();
    }

    function getNearbyImageUrls(urls, index, distance = 2) {
        if (!urls?.length) return [];

        const nearby = [];
        for (let step = 1; step <= distance; step += 1) {
            nearby.push(urls[(index + step) % urls.length]);
            nearby.push(urls[(index - step + urls.length) % urls.length]);
        }

        return [...new Set(nearby)].filter(Boolean);
    }

    function collectDocumentImageUrls() {
        const urls = new Set();
        const imagePattern = /images\/[^,\s"')]+?\.(?:webp|png|jpe?g|gif|svg)/gi;

        document.querySelectorAll('img[src]').forEach(image => {
            if (!image.hasAttribute('srcset')) {
                urls.add(image.getAttribute('src'));
            }
        });
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
        if (isConstrainedDevice()) {
            queueMobileImageWarmup(collectDocumentImageUrls(), { priority: true });
            queueMobileImageWarmup(allPageIdlePreloads);
            return;
        }
        preloadImages(collectDocumentImageUrls(), { decode: true }).then(() => {
            preloadImages(allPageIdlePreloads, { fetchPriority: 'low' });
        });
    }

    const scheduleImageWarmup = () => scheduleIdleTask(warmCurrentPageImages, 1600, 350);

    window.addEventListener('load', scheduleImageWarmup, { once: true });

    function clearPageTransition() {
        if (activeTransitionInterval) {
            clearInterval(activeTransitionInterval);
            activeTransitionInterval = null;
        }
        if (activeTransitionTimeout) {
            clearTimeout(activeTransitionTimeout);
            activeTransitionTimeout = null;
        }
        if (activeTransitionLoader) {
            activeTransitionLoader.remove();
            activeTransitionLoader = null;
        }
        document.querySelectorAll('[data-transitioning="true"]').forEach(link => {
            link.dataset.transitioning = 'false';
        });
    }

    window.addEventListener('pageshow', clearPageTransition);
    window.addEventListener('pagehide', clearPageTransition);
    window.addEventListener('popstate', clearPageTransition);

    // ===== 页面切换过渡 =====
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
        link.addEventListener('pointerdown', () => {
            const targetUrl = link.getAttribute('href') || '';
            preloadImages(getCriticalTransitionPreloadUrls(targetUrl), {
                linkRel: 'preload',
                fetchPriority: 'high'
            });
        }, { once: true, passive: true });

        link.addEventListener('click', function(e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            const targetUrl = this.getAttribute('href');
            const criticalPreload = preloadImages(getCriticalTransitionPreloadUrls(targetUrl), {
                decode: true,
                linkRel: 'preload',
                fetchPriority: 'high'
            });
            const restUrls = getTransitionPreloadUrls(targetUrl).filter(src => !getCriticalTransitionPreloadUrls(targetUrl).includes(src));
            if (!isConstrainedDevice()) {
                preloadImages(restUrls);
            }

            // 返回主页的链接直接跳转，由主页 main.js 处理加载动画
            if (targetUrl.includes('index.html')) {
                return; // 不阻止默认行为，让浏览器直接跳转
            }

            e.preventDefault();
            e.stopPropagation();

            // 防止重复触发
            if (link.dataset.transitioning === 'true') return;
            clearPageTransition();
            link.dataset.transitioning = 'true';

            // 统一使用 1000ms
            const transitionTime = 1000;

            // 创建临时加载屏
            const loader = document.createElement('div');
            loader.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;pointer-events:none;';
            loader.dataset.pageTransitionLoader = 'true';
            loader.innerHTML = `
                <div class="pages-logo" style="width:200px;opacity:0;">
                    <img src="images/Ding_ver1.png" alt="DING Logo" style="width:100%;height:auto;">
                </div>
                <div style="position:absolute;bottom:30%;width:200px;height:2px;background:rgba(255,255,255,0.1);overflow:hidden;">
                    <div class="pages-progress-bar" style="height:100%;background:#fff;width:0;transition:width 0.3s ease;"></div>
                </div>
            `;
            activeTransitionLoader = loader;
            document.body.appendChild(loader);

            // 移除链接的焦点，防止 :active 样式
            link.blur();

            const logo = loader.querySelector('.pages-logo');
            const progressBar = loader.querySelector('.pages-progress-bar');

            // 显示图标
            setTimeout(() => {
                if (logo) {
                    logo.style.transition = 'opacity 0.2s';
                    logo.style.opacity = '1';
                }
            }, 50);

            // 进度条动画（逐步增加，与主页一致）
            let progress = 0;
            const stepTime = 40;
            const progressPerStep = 100 / (transitionTime / stepTime);
            activeTransitionInterval = setInterval(() => {
                progress += progressPerStep;
                if (progress >= 100) {
                    progress = 100;
                    if (progressBar) progressBar.style.width = '100%';
                    clearInterval(activeTransitionInterval);
                    activeTransitionInterval = null;
                    activeTransitionTimeout = setTimeout(() => {
                        const navigationReady = isConstrainedDevice()
                            ? criticalPreload
                            : waitBriefly(criticalPreload, 650);

                        navigationReady.then(() => {
                            window.location.href = targetUrl;
                        });
                    }, 50);
                } else {
                    if (progressBar) progressBar.style.width = progress + '%';
                }
            }, stepTime);
        });
    });

    document.querySelectorAll('a[data-reference-link]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            const targetUrl = this.href;
            if (targetUrl) {
                window.open(targetUrl, '_blank', 'noopener,noreferrer');
            }
        }, true);
    });

    // ===== 导航栏滚动效果 =====
    const nav = document.getElementById('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ===== 科研页目录锚点 =====
    const researchLayout = document.querySelector('.research-layout');
    const researchToc = document.querySelector('.research-toc');
    const researchTocNav = document.querySelector('.research-toc-nav');
    const researchTocToggle = document.querySelector('.research-toc-toggle');

    function updateResearchTocToggle() {
        if (!researchLayout || !researchTocToggle) return;

        const isCollapsed = researchLayout.classList.contains('toc-collapsed');
        const zhLabel = researchTocToggle.querySelector('.lang-zh');
        const enLabel = researchTocToggle.querySelector('.lang-en');

        researchTocToggle.setAttribute('aria-expanded', String(!isCollapsed));
        if (zhLabel) zhLabel.textContent = isCollapsed ? '展开目录' : '收起目录';
        if (enLabel) enLabel.textContent = isCollapsed ? 'Expand index' : 'Collapse index';
    }

    if (researchTocToggle && researchLayout) {
        researchTocToggle.addEventListener('click', () => {
            researchLayout.classList.toggle('toc-collapsed');
            updateResearchTocToggle();
        });
        updateResearchTocToggle();
    }

    function getResearchScrollOffset() {
        const navHeight = nav && (window.scrollY > 100 || window.location.hash)
            ? 72
            : (nav ? nav.getBoundingClientRect().height : 0);
        const tocHeight = researchToc && window.matchMedia('(max-width: 1024px)').matches && !researchLayout?.classList.contains('toc-collapsed')
            ? researchToc.getBoundingClientRect().height
            : 0;

        return Math.ceil(navHeight + tocHeight + 12);
    }

    function scrollToResearchTarget(hash, behavior = 'auto') {
        const target = hash ? document.querySelector(hash) : null;
        if (!target) return;

        const targetTop = target.getBoundingClientRect().top + window.scrollY - getResearchScrollOffset();
        const scrollTop = Math.max(0, targetTop);

        if (behavior === 'auto') {
            const html = document.documentElement;
            const bodyScrollBehavior = document.body.style.scrollBehavior;
            const htmlScrollBehavior = html.style.scrollBehavior;

            html.style.scrollBehavior = 'auto';
            document.body.style.scrollBehavior = 'auto';
            const scroller = document.scrollingElement || html;
            scroller.scrollTop = scrollTop;
            window.scrollTo(0, scrollTop);

            requestAnimationFrame(() => {
                html.style.scrollBehavior = htmlScrollBehavior;
                document.body.style.scrollBehavior = bodyScrollBehavior;
            });
            return;
        }

        window.scrollTo({ top: scrollTop, behavior });
    }

    if (researchTocNav) {
        researchTocNav.addEventListener('click', event => {
            const item = event.target.closest('button[data-target]');
            if (!item) return;

            const hash = item.dataset.target;
            history.pushState(null, '', hash);
            scrollToResearchTarget(hash, 'auto');

            [80, 280].forEach(delay => {
                setTimeout(() => scrollToResearchTarget(hash, 'auto'), delay);
            });
        });
    }

    function scheduleResearchHashCorrection() {
        if (window.location.hash) {
            [80, 360, 900].forEach(delay => {
                setTimeout(() => scrollToResearchTarget(window.location.hash, 'auto'), delay);
            });
        }
    }

    scheduleResearchHashCorrection();

    window.addEventListener('load', scheduleResearchHashCorrection);

    window.addEventListener('hashchange', () => {
        if (window.location.hash) {
            setTimeout(() => scrollToResearchTarget(window.location.hash, 'auto'), 80);
        }
    });

    // ===== 内容项滚动动画 =====
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 添加延迟，创造逐个出现的效果
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-item').forEach(item => {
        itemObserver.observe(item);
    });

    // ===== 书影音年度记录计数 =====
    document.querySelectorAll('[data-media-log]').forEach(list => {
        const logName = list.dataset.mediaLog;
        const counter = document.querySelector(`[data-media-count="${logName}"]`);
        if (!counter) return;

        const count = list.querySelectorAll('li:not(.media-log-empty):not([data-counted="false"])').length;
        counter.textContent = count;
    });

    // ===== 照片轮播 =====
    document.querySelectorAll('[data-sports-carousel]').forEach(carousel => {
        const image = carousel.querySelector('[data-carousel-image]');
        const counter = carousel.querySelector('[data-carousel-counter]');
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');
        const dots = carousel.querySelector('[data-carousel-dots]');
        const imageLink = carousel.querySelector('[data-carousel-link]');
        const linkedPhotos = [
            carousel.dataset.carouselLinkPhoto || '',
            carousel.dataset.carouselLinkPhotoZh || '',
            carousel.dataset.carouselLinkPhotoEn || ''
        ].filter(Boolean);
        const linkedUrl = carousel.dataset.carouselLinkUrl || '';
        const carouselName = carousel.dataset.carouselName || '照片';
        const carouselAlt = carousel.dataset.carouselAlt || 'Carousel photo';
        function getCarouselPhotos() {
            const lang = body.getAttribute('data-lang') || 'zh';
            const langKey = lang === 'en' ? 'carouselPhotosEn' : 'carouselPhotosZh';
            const photoSource = carousel.dataset[langKey] || carousel.dataset.carouselPhotos || '';
            return photoSource
                .split(',')
                .map(photo => photo.trim())
                .filter(Boolean);
        }

        let photos = getCarouselPhotos();

        if (!image || photos.length === 0) return;
        image.loading = 'eager';
        image.decoding = 'async';

        function warmCarouselPhotos() {
            if (isConstrainedDevice()) {
                preloadImages(photos.slice(0, 2), { decode: false });
                queueMobileImageWarmup(photos.slice(2));
                return;
            }

            preloadImages(photos, { decode: true });
        }

        warmCarouselPhotos();

        let currentIndex = 0;
        let renderToken = 0;

        function updateCarouselOrientation() {
            const { naturalWidth, naturalHeight } = image;
            if (!naturalWidth || !naturalHeight) return;

            carousel.classList.toggle('is-portrait', naturalHeight > naturalWidth);
            carousel.classList.toggle('is-landscape', naturalWidth >= naturalHeight);
        }

        image.addEventListener('load', updateCarouselOrientation);
        if (image.complete) {
            updateCarouselOrientation();
        }

        function renderCarousel(index) {
            currentIndex = (index + photos.length) % photos.length;
            const targetIndex = currentIndex;
            const targetSrc = photos[targetIndex];
            const displaySrc = getMobileImageSrc(targetSrc);
            const token = ++renderToken;

            if (isConstrainedDevice()) {
                queueMobileImageWarmup(getNearbyImageUrls(photos, targetIndex, 2), { priority: true });
            }

            preloadImage(targetSrc, { decode: true }).then(nextImage => {
                if (token !== renderToken) return;
                if (!nextImage) {
                    image.style.opacity = '1';
                    return;
                }

                image.style.opacity = '0';
                image.src = displaySrc;
                image.alt = `${carouselAlt} ${targetIndex + 1}`;
                carousel.classList.toggle('is-portrait', nextImage.naturalHeight > nextImage.naturalWidth);
                carousel.classList.toggle('is-landscape', nextImage.naturalWidth >= nextImage.naturalHeight);
                carousel.classList.toggle('is-linked-photo', linkedPhotos.includes(targetSrc));
                requestAnimationFrame(() => {
                    if (token === renderToken) {
                        image.style.opacity = '1';
                    }
                });
            }).catch(() => {
                if (token !== renderToken) return;
                image.style.opacity = '1';
            });

            if (imageLink) {
                const hasLink = Boolean(linkedUrl && linkedPhotos.includes(targetSrc));
                imageLink.toggleAttribute('href', hasLink);
                if (hasLink) {
                    imageLink.href = linkedUrl;
                    imageLink.removeAttribute('aria-disabled');
                    imageLink.removeAttribute('tabindex');
                } else {
                    imageLink.removeAttribute('href');
                    imageLink.setAttribute('aria-disabled', 'true');
                    imageLink.setAttribute('tabindex', '-1');
                }
            }

            if (counter) {
                counter.textContent = `${currentIndex + 1} / ${photos.length}`;
            }

            dots?.querySelectorAll('button').forEach((dot, dotIndex) => {
                dot.classList.toggle('is-active', dotIndex === currentIndex);
                dot.setAttribute('aria-current', dotIndex === currentIndex ? 'true' : 'false');
            });
        }

        function renderDots() {
            if (!dots) return;

            dots.innerHTML = '';
            photos.forEach((_, dotIndex) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.setAttribute('aria-label', `查看第 ${dotIndex + 1} 张${carouselName}`);
                dot.addEventListener('click', () => renderCarousel(dotIndex));
                dots.appendChild(dot);
            });
        }

        renderDots();

        prevButton?.addEventListener('click', () => renderCarousel(currentIndex - 1));
        nextButton?.addEventListener('click', () => renderCarousel(currentIndex + 1));
        window.addEventListener('languagechange', () => {
            photos = getCarouselPhotos();
            if (photos.length === 0) return;
            warmCarouselPhotos();
            currentIndex = Math.min(currentIndex, photos.length - 1);
            renderDots();
            renderCarousel(currentIndex);
        });
        renderCarousel(0);
    });

    // ===== 旅行地图交互 =====
    let activeTravelPlace = null;
    const defaultTravelPhotos = [
        'images/LIFE/TRAVEL/beyond.webp'
    ];
    const countryTravelPhotos = {
        France: ['images/LIFE/TRAVEL/France/fr.webp'],
        Italy: ['images/LIFE/TRAVEL/Italy/it.webp'],
        'New Zealand': ['images/LIFE/TRAVEL/NewZealand/nz.webp'],
        Qatar: ['images/LIFE/TRAVEL/Qatar/qatar.webp']
    };
    const countryTravelDescriptions = {
        China: {
            zh: '中国很大，每一次出发都像从熟悉里走向另一种辽阔。',
            en: 'China is vast; every departure feels like walking from the familiar into another kind of expanse.'
        },
        France: {
            zh: '法国的街巷、光线和博物馆，把日常也放进了电影镜头里。',
            en: 'France folds streets, light, and museums into something that feels cinematic.'
        },
        Italy: {
            zh: '意大利像一座露天的时间博物馆，石头、广场和风都带着故事。',
            en: 'Italy feels like an open-air museum of time, where stones, piazzas, and wind all carry stories.'
        },
        'New Zealand': {
            zh: '新西兰把山、湖和云摊开，让路本身成为风景。',
            en: 'New Zealand opens mountains, lakes, and clouds so widely that the road itself becomes the view.'
        },
        Qatar: {
            zh: '卡塔尔在沙色与海风之间，显出一种安静而明亮的秩序。',
            en: 'Qatar sits between sand tones and sea wind with a quiet, bright sense of order.'
        }
    };
    const chinaProvinceTravelPhotos = {
        安徽: ['images/LIFE/TRAVEL/CHINA/Anhui/ah.webp'],
        澳门: ['images/LIFE/TRAVEL/CHINA/Aomen/am.webp'],
        北京: ['images/LIFE/TRAVEL/CHINA/Beijing/bj.webp'],
        重庆: ['images/LIFE/TRAVEL/CHINA/Chongqing/cq.webp'],
        广东: ['images/LIFE/TRAVEL/CHINA/Guangdong/gd.webp'],
        贵州: ['images/LIFE/TRAVEL/CHINA/Guizhou/gz.webp'],
        海南: ['images/LIFE/TRAVEL/CHINA/Hainan/hn.webp'],
        河北: ['images/LIFE/TRAVEL/CHINA/Hebei/hb.webp'],
        河南: ['images/LIFE/TRAVEL/CHINA/Henan/hn.webp'],
        湖北: ['images/LIFE/TRAVEL/CHINA/Hubei/hb.webp'],
        湖南: ['images/LIFE/TRAVEL/CHINA/Hunan/hn.webp'],
        江苏: ['images/LIFE/TRAVEL/CHINA/Jiangsu/js.webp'],
        江西: ['images/LIFE/TRAVEL/CHINA/Jiangxi/jx.webp'],
        吉林: ['images/LIFE/TRAVEL/CHINA/Jilin/jl.webp'],
        辽宁: ['images/LIFE/TRAVEL/CHINA/Liaoning/ln.webp'],
        内蒙古: ['images/LIFE/TRAVEL/CHINA/Neimenggu/nm.webp'],
        宁夏: ['images/LIFE/TRAVEL/CHINA/Ningxia/nx.webp'],
        四川: ['images/LIFE/TRAVEL/CHINA/SIchuan/sc.webp'],
        山东: ['images/LIFE/TRAVEL/CHINA/Shandong/sd.webp'],
        上海: ['images/LIFE/TRAVEL/CHINA/Shanghai/sh.webp'],
        山西: ['images/LIFE/TRAVEL/CHINA/Shanxi_Jin/sx.webp'],
        陕西: ['images/LIFE/TRAVEL/CHINA/Shanxi/sx.webp'],
        天津: ['images/LIFE/TRAVEL/CHINA/Tianjin/tj.webp'],
        香港: ['images/LIFE/TRAVEL/CHINA/Xianggang/xg.webp'],
        云南: ['images/LIFE/TRAVEL/CHINA/Yunnan/yn.webp'],
        浙江: ['images/LIFE/TRAVEL/CHINA/Zhejiang/zj.webp']
    };
    const chinaProvincePinyinNames = {
        北京: 'Beijing',
        天津: 'Tianjin',
        河北: 'Hebei',
        山西: 'Shanxi',
        内蒙古: 'Neimenggu',
        辽宁: 'Liaoning',
        吉林: 'Jilin',
        黑龙江: 'Heilongjiang',
        上海: 'Shanghai',
        江苏: 'Jiangsu',
        浙江: 'Zhejiang',
        安徽: 'Anhui',
        福建: 'Fujian',
        江西: 'Jiangxi',
        山东: 'Shandong',
        河南: 'Henan',
        湖北: 'Hubei',
        湖南: 'Hunan',
        广东: 'Guangdong',
        广西: 'Guangxi',
        海南: 'Hainan',
        重庆: 'Chongqing',
        四川: 'Sichuan',
        贵州: 'Guizhou',
        云南: 'Yunnan',
        西藏: 'Xizang',
        陕西: 'Shaanxi',
        甘肃: 'Gansu',
        青海: 'Qinghai',
        宁夏: 'Ningxia',
        新疆: 'Xinjiang',
        香港: 'Hong Kong',
        澳门: 'Macao',
        台湾: 'Taiwan'
    };
    const provinceTravelDescriptions = {
        北京: { zh: '历史、胡同和巨大的日常，在北京交叠成一种清醒的节奏。', en: 'History, hutongs, and immense daily life overlap into a clear rhythm in Beijing.' },
        天津: { zh: '河流、码头和城市褶皱，让天津带着一点松弛的旧时光。', en: 'Rivers, docks, and urban folds give Tianjin a relaxed trace of older time.' },
        河北: { zh: '河北围绕首都展开，在山海之间保留着北方的厚度。', en: 'Hebei stretches around the capital, holding northern depth between mountains and sea.' },
        山西: { zh: '山西的古建、黄土和院落，让时间变得可以触摸。', en: 'Ancient buildings, loess, and courtyards make time feel touchable in Shanxi.' },
        内蒙古: { zh: '内蒙古有草原、风和漫长地平线，适合把视线放得很远。', en: 'Neimenggu has grasslands, wind, and long horizons that ask the eye to travel farther.' },
        辽宁: { zh: '辽宁把海岸线和老工业城市并置，粗粝里有开阔。', en: 'Liaoning places coastline beside old industrial cities, wide open inside its roughness.' },
        吉林: { zh: '吉林有山林、湖泊和东北的风，安静里藏着清冽。', en: 'Jilin carries forests, lakes, and northeastern wind, crisp beneath its quietness.' },
        黑龙江: { zh: '黑龙江让边境、雪原和远方的想象靠得很近。', en: 'Heilongjiang brings borderlands, snowfields, and the imagination of distance close together.' },
        上海: { zh: '上海的密度、速度和城市光，把夜晚也推向前方。', en: 'Shanghai turns density, speed, and city light into forward motion, even at night.' },
        江苏: { zh: '江苏的水网、城市和细密生活，像一段缓慢铺开的长卷。', en: 'Jiangsu unfolds water networks, cities, and fine-grained life like a slow handscroll.' },
        浙江: { zh: '浙江有江南、海岛和潮湿的风，轻盈里带着山水。', en: 'Zhejiang carries Jiangnan, islands, and humid wind, light but full of landscape.' },
        安徽: { zh: '安徽在山水之间留住皖南的雾气和白墙。', en: 'Anhui keeps southern Anhui mist and white walls between mountains and water.' },
        福建: { zh: '福建山海相接，南方口音和海风一起转弯。', en: 'Fujian joins mountains and sea, where southern accents turn with the sea wind.' },
        江西: { zh: '江西有湖泊、群山和瓷的光泽，温润又沉静。', en: 'Jiangxi holds lakes, mountains, and porcelain sheen, gentle and still.' },
        山东: { zh: '山东在海岱之间，让山与海并行。', en: 'Shandong lets mountains and sea move side by side between Hai and Dai.' },
        河南: { zh: '河南位于中原腹地，文明的回声常常在日常里响起。', en: 'Henan sits in the Central Plains, where echoes of civilization enter everyday life.' },
        湖北: { zh: '湖北在江汉之间，水与城不断交汇。', en: 'Hubei lies between rivers, where water and cities keep meeting.' },
        湖南: { zh: '湖南有山水、烟火和热辣口味，鲜明得很直接。', en: 'Hunan is vivid with mountains, rivers, street life, and heat on the tongue.' },
        广东: { zh: '广东的海风、城市群和饭桌，组成一种明亮的南方效率。', en: 'Guangdong blends sea breeze, city clusters, and dining tables into bright southern efficiency.' },
        广西: { zh: '广西的喀斯特山水和南方湿气，让空间变得柔软。', en: 'Guangxi softens space with karst landscapes and southern humidity.' },
        海南: { zh: '海南把热带海岛和缓慢假日放在同一阵风里。', en: 'Hainan puts a tropical island and slow holiday into the same breeze.' },
        重庆: { zh: '重庆有坡、桥、雾和火锅，城市像立体地生长。', en: 'Chongqing grows in three dimensions through slopes, bridges, mist, and hotpot.' },
        四川: { zh: '四川在盆地、雪山和松弛生活之间，保留着自己的节拍。', en: 'Sichuan keeps its own tempo between basin, snow mountains, and relaxed living.' },
        贵州: { zh: '贵州的群山、苗寨和云雾，让路途慢下来。', en: 'Guizhou slows the road with mountains, villages, and mist.' },
        云南: { zh: '云南有边地、花和多民族的颜色，像一场不断展开的南方。', en: 'Yunnan carries borderlands, flowers, and many cultures like an unfolding south.' },
        西藏: { zh: '西藏有高原、雪山和缓慢的呼吸。', en: 'Xizang holds plateaus, snow mountains, and slower breathing.' },
        陕西: { zh: '陕西把长安、秦岭和历史纵深放在同一条路上。', en: 'Shaanxi places Chang’an, Qinling, and historical depth on the same road.' },
        甘肃: { zh: '甘肃有河西走廊与山色，像通向远方的一条线。', en: 'Gansu stretches through the Hexi Corridor and mountain colors like a line toward distance.' },
        青海: { zh: '青海的高原湖泊和稀薄空气，让世界变得更安静。', en: 'Qinghai makes the world quieter through plateau lakes and thin air.' },
        宁夏: { zh: '宁夏在黄河转弯处，显出一种干净的安静。', en: 'Ningxia finds clean quiet where the Yellow River turns.' },
        新疆: { zh: '新疆有山脉、戈壁和极远的路。', en: 'Xinjiang holds mountains, deserts, and very distant roads.' },
        香港: { zh: '香港在山海和高楼之间，把速度折进日常。', en: 'Hong Kong folds speed into daily life between hills, harbor, and towers.' },
        澳门: { zh: '澳门在街巷、海风和旧建筑里保留着细小的戏剧感。', en: 'Macao keeps small dramas in alleys, sea wind, and old buildings.' },
        台湾: { zh: '台湾有岛屿、海风和待补充的故事。', en: 'Taiwan holds an island, sea breeze, and stories still to be added.' }
    };
    let currentTravelPhotos = [...defaultTravelPhotos];
    let currentTravelPhotoIndex = 0;
    let travelPhotoTimer = null;
    let travelPhotoRenderToken = 0;
    const allTravelPhotoUrls = [defaultTravelPhotos, ...Object.values(countryTravelPhotos), ...Object.values(chinaProvinceTravelPhotos)]
        .reduce((allPhotos, photos) => allPhotos.concat(photos), []);

    function warmTravelPhotos(photos) {
        if (isConstrainedDevice()) {
            preloadImages(photos.slice(0, 1), { decode: false });
            queueMobileImageWarmup(photos.slice(1));
            return;
        }

        preloadImages(photos, { decode: true });
    }

    function warmNearbyTravelPhotos(index) {
        if (isConstrainedDevice()) {
            queueMobileImageWarmup(getNearbyImageUrls(currentTravelPhotos, index, 2), { priority: true });
        }
    }

    const scheduleTravelPhotoWarmup = () => scheduleIdleTask(() => {
        if (isConstrainedDevice()) {
            queueMobileImageWarmup(allTravelPhotoUrls);
            return;
        }

        preloadImages(allTravelPhotoUrls, { decode: true });
    }, 2200, 650);

    scheduleTravelPhotoWarmup();

    function getTravelPhotos(place) {
        if (!place?.dataset.photos) {
            return defaultTravelPhotos;
        }

        const photos = place.dataset.photos.split(',').map(photo => photo.trim()).filter(Boolean);
        return photos.length ? photos : defaultTravelPhotos;
    }

    function renderTravelDots() {
        const dots = document.getElementById('travelPhotoDots');
        if (!dots) return;

        dots.innerHTML = currentTravelPhotos.map((_, index) => (
            `<button class="photo-dot${index === currentTravelPhotoIndex ? ' active' : ''}" type="button" data-photo-index="${index}" aria-label="Show photo ${index + 1}"></button>`
        )).join('');

        dots.querySelectorAll('.photo-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                showTravelPhoto(parseInt(dot.dataset.photoIndex, 10));
                restartTravelPhotoTimer();
            });
        });
    }

    function showTravelPhoto(index) {
        const photo = document.getElementById('travelPhoto');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');

        if (!currentTravelPhotos.length) return;

        currentTravelPhotoIndex = (index + currentTravelPhotos.length) % currentTravelPhotos.length;
        const photoSrc = currentTravelPhotos[currentTravelPhotoIndex];
        const displaySrc = getMobileImageSrc(photoSrc);
        const title = document.getElementById('travelPhotoTitle')?.innerText || 'Travel photo';
        const caption = `${title} · ${currentTravelPhotoIndex + 1}/${currentTravelPhotos.length}`;
        const token = ++travelPhotoRenderToken;

        if (lightboxCaption) {
            lightboxCaption.textContent = caption;
        }
        renderTravelDots();
        warmNearbyTravelPhotos(currentTravelPhotoIndex);

        preloadImage(photoSrc, { decode: true }).then(() => {
            if (token !== travelPhotoRenderToken) return;

            if (photo) {
                photo.loading = 'eager';
                photo.decoding = 'async';
                photo.src = displaySrc;
                photo.alt = caption;
            }
            if (lightboxImage) {
                lightboxImage.loading = 'eager';
                lightboxImage.decoding = 'async';
                lightboxImage.src = displaySrc;
                lightboxImage.alt = caption;
            }
        });
    }

    function moveTravelPhoto(delta) {
        showTravelPhoto(currentTravelPhotoIndex + delta);
        restartTravelPhotoTimer();
    }

    function restartTravelPhotoTimer() {
        window.clearInterval(travelPhotoTimer);
        if (currentTravelPhotos.length <= 1) return;
        travelPhotoTimer = window.setInterval(() => {
            showTravelPhoto(currentTravelPhotoIndex + 1);
        }, 4500);
    }

    function updateTravelPhoto(place) {
        const photo = document.getElementById('travelPhoto');
        const title = document.getElementById('travelPhotoTitle');
        const caption = document.getElementById('travelPhotoCaption');

        if (!place || !photo || !title || !caption) return;

        const lang = body.getAttribute('data-lang') || 'zh';
        const titleText = place.dataset[`title${lang === 'zh' ? 'Zh' : 'En'}`] || place.textContent.trim();
        const captionText = place.dataset[`caption${lang === 'zh' ? 'Zh' : 'En'}`] || '';

        photo.alt = titleText;
        title.textContent = titleText;
        caption.textContent = captionText;
        currentTravelPhotos = getTravelPhotos(place);
        currentTravelPhotoIndex = 0;
        warmTravelPhotos(currentTravelPhotos);
        showTravelPhoto(0);
        restartTravelPhotoTimer();
    }

    function showDefaultTravelPhotos() {
        const title = document.getElementById('travelPhotoTitle');
        const caption = document.getElementById('travelPhotoCaption');
        const lang = body.getAttribute('data-lang') || 'zh';

        if (title) {
            title.textContent = lang === 'zh' ? '旅行影像' : 'Travel Images';
        }
        if (caption) {
            caption.textContent = lang === 'zh'
                ? '未选择具体地点时，先把目光留给尚未抵达的远方。'
                : 'Before a specific place is selected, the view stays with the places still beyond reach.';
        }

        currentTravelPhotos = [...defaultTravelPhotos];
        currentTravelPhotoIndex = 0;
        warmTravelPhotos(currentTravelPhotos);
        showTravelPhoto(0);
        restartTravelPhotoTimer();
    }

    function updateActiveTravelPlace() {
        if (activeTravelPlace) {
            updateTravelPhoto(activeTravelPlace);
        } else {
            showDefaultTravelPhotos();
        }
    }

    function clearTravelSelection() {
        document.querySelectorAll('.travel-place.active, .globe-country.active, .globe-province.active').forEach(activePlace => {
            activePlace.classList.remove('active');
        });
        activeTravelPlace = null;
        showDefaultTravelPhotos();
    }

    function selectTravelPlace(place) {
        document.querySelectorAll('.travel-place.active, .globe-country.active, .globe-province.active').forEach(activePlace => {
            activePlace.classList.remove('active');
        });
        place.classList.add('active');
        activeTravelPlace = place;
        updateTravelPhoto(place);
    }

    const visitedCountryNames = new Set(['China', 'Taiwan', 'New Zealand', 'Qatar', 'Italy', 'France']);
    const unvisitedChinaProvinceNames = new Set(['新疆', '西藏', '广西', '福建', '台湾', '甘肃']);

    function getProvinceShortName(name) {
        return (name || '')
            .replace('特别行政区', '')
            .replace('维吾尔自治区', '')
            .replace('壮族自治区', '')
            .replace('回族自治区', '')
            .replace('自治区', '')
            .replace('省', '')
            .replace('市', '');
    }

    function isVisitedCountryName(name) {
        return visitedCountryNames.has(name) || (name === 'Taiwan' && visitedCountryNames.has('China'));
    }

    function isVisitedChinaProvinceName(name) {
        const shortName = getProvinceShortName(name);
        return Boolean(shortName) && !unvisitedChinaProvinceNames.has(shortName);
    }

    function getProvincePinyinName(name) {
        const shortName = getProvinceShortName(name);
        return chinaProvincePinyinNames[shortName] || shortName || name || '';
    }

    function formatTravelPhotos(photos) {
        return (photos?.length ? photos : defaultTravelPhotos).join(', ');
    }

    function getProvinceTravelPhotos(name) {
        const shortName = getProvinceShortName(name);
        return isVisitedChinaProvinceName(shortName)
            ? (chinaProvinceTravelPhotos[shortName] || defaultTravelPhotos)
            : defaultTravelPhotos;
    }

    function getCountryTravelPhotos(name) {
        return isVisitedCountryName(name)
            ? (countryTravelPhotos[name] || defaultTravelPhotos)
            : defaultTravelPhotos;
    }

    function getProvinceTravelDescription(name) {
        const shortName = getProvinceShortName(name);
        const pinyinName = getProvincePinyinName(shortName);
        return provinceTravelDescriptions[shortName] || {
            zh: `${shortName || name}是一处仍在地图上等待补充的旅行坐标。`,
            en: `${pinyinName} is a travel coordinate still waiting for more detail.`
        };
    }

    function getCountryTravelDescription(name, nameZh, nameEn) {
        return countryTravelDescriptions[name] || {
            zh: `${nameZh}是一处地图上的远方，等待在下一次出发里被看见。`,
            en: `${nameEn} is a distant point on the map, waiting to be seen on another departure.`
        };
    }

    document.querySelectorAll('.province-shape').forEach(place => {
        const provinceName = place.dataset.titleZh || place.dataset.titleEn || '';
        const visited = isVisitedChinaProvinceName(provinceName);
        const description = getProvinceTravelDescription(provinceName);
        place.classList.toggle('visited', visited);
        place.dataset.titleEn = getProvincePinyinName(provinceName);
        place.dataset.visited = visited ? 'true' : 'false';
        place.dataset.photos = formatTravelPhotos(getProvinceTravelPhotos(provinceName));
        place.dataset.captionZh = description.zh;
        place.dataset.captionEn = description.en;
    });

    document.querySelectorAll('.travel-place').forEach(place => {
        place.addEventListener('click', () => {
            selectTravelPlace(place);
        });

        place.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                place.click();
            }
        });
    });

    showDefaultTravelPhotos();

    function initTravelGlobe() {
        const globeElement = document.getElementById('travelGlobe');
        if (!globeElement || !window.d3 || !window.topojson) return;

        const width = 640;
        const height = 640;
        const baseScale = 286;
        const minZoom = 0.82;
        const maxZoom = 3.4;
        const labelZoomThreshold = 1.35;
        const chinaDetailZoomThreshold = 1.85;
        const chinaCenter = [104, 35];
        let globeZoom = 1;
        const svg = d3.select(globeElement);
        svg.selectAll('*').remove();
        svg.append('text')
            .attr('class', 'globe-loading')
            .attr('x', width / 2)
            .attr('y', height / 2)
            .text('Loading globe...');

        const countryNameZh = {
            Afghanistan: '阿富汗',
            Albania: '阿尔巴尼亚',
            Algeria: '阿尔及利亚',
            Angola: '安哥拉',
            Antarctica: '南极洲',
            Argentina: '阿根廷',
            Armenia: '亚美尼亚',
            Australia: '澳大利亚',
            Austria: '奥地利',
            Azerbaijan: '阿塞拜疆',
            Bahamas: '巴哈马',
            Bangladesh: '孟加拉国',
            Belarus: '白俄罗斯',
            Belgium: '比利时',
            Belize: '伯利兹',
            Benin: '贝宁',
            Bhutan: '不丹',
            Bolivia: '玻利维亚',
            'Bosnia and Herz.': '波斯尼亚和黑塞哥维那',
            Botswana: '博茨瓦纳',
            Brazil: '巴西',
            Brunei: '文莱',
            Bulgaria: '保加利亚',
            'Burkina Faso': '布基纳法索',
            Burundi: '布隆迪',
            Cambodia: '柬埔寨',
            Cameroon: '喀麦隆',
            Canada: '加拿大',
            'Central African Rep.': '中非共和国',
            Chad: '乍得',
            Chile: '智利',
            China: '中国',
            Colombia: '哥伦比亚',
            Congo: '刚果（布）',
            'Costa Rica': '哥斯达黎加',
            Croatia: '克罗地亚',
            Cuba: '古巴',
            Cyprus: '塞浦路斯',
            Czechia: '捷克',
            'Côte d\'Ivoire': '科特迪瓦',
            'Dem. Rep. Congo': '刚果（金）',
            Denmark: '丹麦',
            Djibouti: '吉布提',
            'Dominican Rep.': '多米尼加共和国',
            Ecuador: '厄瓜多尔',
            Egypt: '埃及',
            'El Salvador': '萨尔瓦多',
            'Eq. Guinea': '赤道几内亚',
            Eritrea: '厄立特里亚',
            Estonia: '爱沙尼亚',
            Ethiopia: '埃塞俄比亚',
            eSwatini: '斯威士兰',
            'Falkland Is.': '福克兰群岛',
            Fiji: '斐济',
            Finland: '芬兰',
            'Fr. S. Antarctic Lands': '法属南部和南极领地',
            France: '法国',
            Gabon: '加蓬',
            Gambia: '冈比亚',
            Georgia: '格鲁吉亚',
            Germany: '德国',
            Ghana: '加纳',
            Greece: '希腊',
            Greenland: '格陵兰',
            Guatemala: '危地马拉',
            Guinea: '几内亚',
            'Guinea-Bissau': '几内亚比绍',
            Guyana: '圭亚那',
            Haiti: '海地',
            Honduras: '洪都拉斯',
            Hungary: '匈牙利',
            Iceland: '冰岛',
            India: '印度',
            Indonesia: '印度尼西亚',
            Iran: '伊朗',
            Iraq: '伊拉克',
            Ireland: '爱尔兰',
            Israel: '以色列',
            Italy: '意大利',
            Jamaica: '牙买加',
            Japan: '日本',
            Jordan: '约旦',
            Kazakhstan: '哈萨克斯坦',
            Kenya: '肯尼亚',
            Kosovo: '科索沃',
            Kuwait: '科威特',
            Kyrgyzstan: '吉尔吉斯斯坦',
            Laos: '老挝',
            Latvia: '拉脱维亚',
            Lebanon: '黎巴嫩',
            Lesotho: '莱索托',
            Liberia: '利比里亚',
            Libya: '利比亚',
            Lithuania: '立陶宛',
            Luxembourg: '卢森堡',
            Macedonia: '北马其顿',
            Madagascar: '马达加斯加',
            Malawi: '马拉维',
            Malaysia: '马来西亚',
            Mali: '马里',
            Mauritania: '毛里塔尼亚',
            Mexico: '墨西哥',
            Moldova: '摩尔多瓦',
            Mongolia: '蒙古',
            Montenegro: '黑山',
            Morocco: '摩洛哥',
            Mozambique: '莫桑比克',
            Myanmar: '缅甸',
            'N. Cyprus': '北塞浦路斯',
            Namibia: '纳米比亚',
            Nepal: '尼泊尔',
            Netherlands: '荷兰',
            'New Caledonia': '新喀里多尼亚',
            'New Zealand': '新西兰',
            Nicaragua: '尼加拉瓜',
            Niger: '尼日尔',
            Nigeria: '尼日利亚',
            'North Korea': '朝鲜',
            Norway: '挪威',
            Oman: '阿曼',
            Pakistan: '巴基斯坦',
            Palestine: '巴勒斯坦',
            Panama: '巴拿马',
            'Papua New Guinea': '巴布亚新几内亚',
            Paraguay: '巴拉圭',
            Peru: '秘鲁',
            Philippines: '菲律宾',
            Poland: '波兰',
            Portugal: '葡萄牙',
            'Puerto Rico': '波多黎各',
            Qatar: '卡塔尔',
            Romania: '罗马尼亚',
            Russia: '俄罗斯',
            Rwanda: '卢旺达',
            'S. Sudan': '南苏丹',
            'Saudi Arabia': '沙特阿拉伯',
            Senegal: '塞内加尔',
            Serbia: '塞尔维亚',
            'Sierra Leone': '塞拉利昂',
            Slovakia: '斯洛伐克',
            Slovenia: '斯洛文尼亚',
            'Solomon Is.': '所罗门群岛',
            Somalia: '索马里',
            Somaliland: '索马里兰',
            'South Africa': '南非',
            'South Korea': '韩国',
            Spain: '西班牙',
            'Sri Lanka': '斯里兰卡',
            Sudan: '苏丹',
            Suriname: '苏里南',
            Sweden: '瑞典',
            Switzerland: '瑞士',
            Syria: '叙利亚',
            Taiwan: '中国台湾',
            Tajikistan: '塔吉克斯坦',
            Tanzania: '坦桑尼亚',
            Thailand: '泰国',
            'Timor-Leste': '东帝汶',
            Togo: '多哥',
            'Trinidad and Tobago': '特立尼达和多巴哥',
            Tunisia: '突尼斯',
            Turkey: '土耳其',
            Turkmenistan: '土库曼斯坦',
            Uganda: '乌干达',
            Ukraine: '乌克兰',
            'United Arab Emirates': '阿联酋',
            'United Kingdom': '英国',
            'United States of America': '美国',
            Uruguay: '乌拉圭',
            Uzbekistan: '乌兹别克斯坦',
            Vanuatu: '瓦努阿图',
            Venezuela: '委内瑞拉',
            Vietnam: '越南',
            'W. Sahara': '西撒哈拉',
            Yemen: '也门',
            Zambia: '赞比亚',
            Zimbabwe: '津巴布韦'
        };

        function isChinaTerritory(country) {
            const name = country?.properties?.name;
            return name === 'China' || name === 'Taiwan';
        }

        function getCountryEnName(country) {
            return isChinaTerritory(country) ? 'China' : (country?.properties?.name || 'World');
        }

        function getCountryZhName(country) {
            const name = getCountryEnName(country);
            return countryNameZh[name] || name;
        }

        function isSmallChinaRegion(province) {
            const name = province?.properties?.name || '';
            return name.includes('香港') || name.includes('澳门');
        }

        function rewindRing(ring) {
            return (ring || []).map(point => [point[0], point[1]]).reverse();
        }

        function rewindGeometry(geometry) {
            if (!geometry) return geometry;

            if (geometry.type === 'Polygon') {
                return {
                    ...geometry,
                    coordinates: geometry.coordinates.map(rewindRing)
                };
            }

            if (geometry.type === 'MultiPolygon') {
                return {
                    ...geometry,
                    coordinates: geometry.coordinates.map(polygon => polygon.map(rewindRing))
                };
            }

            return geometry;
        }

        function setProvinceDataset(node, province) {
            const fullName = province?.properties?.name || '';
            const shortName = getProvinceShortName(fullName);
            const description = getProvinceTravelDescription(fullName);
            node.dataset.titleZh = shortName || fullName;
            node.dataset.titleEn = getProvincePinyinName(fullName);
            node.dataset.captionZh = description.zh;
            node.dataset.captionEn = description.en;
            node.dataset.photos = formatTravelPhotos(getProvinceTravelPhotos(fullName));
            node.dataset.visited = isVisitedChinaProvinceName(fullName) ? 'true' : 'false';
        }

        function setCountryDataset(node, country) {
            const nameEn = getCountryEnName(country);
            const nameZh = getCountryZhName(country);
            const description = getCountryTravelDescription(country?.properties?.name, nameZh, nameEn);
            node.dataset.countryName = country?.properties?.name || '';
            node.dataset.titleZh = nameZh;
            node.dataset.titleEn = nameEn;
            node.dataset.captionZh = description.zh;
            node.dataset.captionEn = description.en;
            node.dataset.photos = formatTravelPhotos(getCountryTravelPhotos(country?.properties?.name));
            node.dataset.visited = isVisitedCountryName(country?.properties?.name) ? 'true' : 'false';
        }

        const embeddedWorldData = typeof worldAtlasCountries110m !== 'undefined' ? worldAtlasCountries110m : null;
        const loadWorldData = embeddedWorldData
            ? Promise.resolve(embeddedWorldData)
            : fetch('data/countries-110m.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Unable to load globe data: ${response.status}`);
                    }
                    return response.json();
                });

        const embeddedChinaProvinceData = typeof chinaProvincesGeojson !== 'undefined' ? chinaProvincesGeojson : null;
        const loadChinaProvinceData = embeddedChinaProvinceData
            ? Promise.resolve(embeddedChinaProvinceData)
            : fetch('data/china-provinces.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Unable to load China province data: ${response.status}`);
                    }
                    return response.json();
                });

        Promise.all([loadWorldData, loadChinaProvinceData])
            .then(([world, chinaProvinces]) => {
                const countries = topojson.feature(world, world.objects.countries).features;
                const countryMesh = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
                const chinaFeature = countries.find(country => country.properties?.name === 'China');
                const provinceFeatures = (chinaProvinces?.features || [])
                    .filter(province => province.properties?.name)
                    .map(province => ({
                        ...province,
                        properties: { ...province.properties },
                        geometry: rewindGeometry(province.geometry)
                    }));
                const countryArea = new Map(countries.map(country => [country.id, d3.geoArea(country)]));
                const provinceArea = new Map(provinceFeatures.map(province => [province.properties.name, getPlanarFeatureArea(province)]));
                let isDraggingGlobe = false;
                let hoveredProvince = null;
                const projection = d3.geoOrthographic()
                    .scale(baseScale)
                    .translate([width / 2, height / 2])
                    .clipAngle(90)
                    .precision(0.35);
                const path = d3.geoPath(projection);
                const graticule = d3.geoGraticule10();

                svg.selectAll('*').remove();

                const defs = svg.append('defs');
                const oceanGradient = defs.append('radialGradient')
                    .attr('id', 'globeOceanGradient')
                    .attr('cx', '38%')
                    .attr('cy', '28%')
                    .attr('r', '72%');
                oceanGradient.append('stop').attr('offset', '0%').attr('stop-color', '#132231');
                oceanGradient.append('stop').attr('offset', '62%').attr('stop-color', '#071019');
                oceanGradient.append('stop').attr('offset', '100%').attr('stop-color', '#02050a');

                const shadeGradient = defs.append('radialGradient')
                    .attr('id', 'globeShadeGradient')
                    .attr('cx', '34%')
                    .attr('cy', '25%')
                    .attr('r', '78%');
                shadeGradient.append('stop').attr('offset', '0%').attr('stop-color', 'rgba(255,255,255,0.16)');
                shadeGradient.append('stop').attr('offset', '48%').attr('stop-color', 'rgba(255,255,255,0)');
                shadeGradient.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(0,0,0,0.62)');

                const sphere = svg.append('path').attr('class', 'globe-ocean');
                const graticulePath = svg.append('path').attr('class', 'globe-graticule').datum(graticule);
                const countryPaths = svg.append('g')
                    .attr('class', 'globe-countries')
                    .selectAll('path')
                    .data(countries)
                    .join('path')
                    .attr('class', country => {
                        const classes = ['globe-country'];
                        if (isChinaTerritory(country)) classes.push('china-territory');
                        if (isVisitedCountryName(country?.properties?.name)) classes.push('visited');
                        return classes.join(' ');
                    })
                    .attr('tabindex', 0)
                    .attr('role', 'button')
                    .each(function(country) {
                        setCountryDataset(this, country);
                    });
                const boundaryPath = svg.append('path').attr('class', 'globe-boundary').datum(countryMesh);
                const chinaDetailGroup = svg.append('g').attr('class', 'globe-china-detail');
                const shade = svg.append('circle')
                    .attr('class', 'globe-shade')
                    .attr('cx', width / 2)
                    .attr('cy', height / 2)
                    .attr('r', projection.scale())
                    .attr('fill', 'url(#globeShadeGradient)');
                const zoomReadout = svg.append('text')
                    .attr('class', 'globe-zoom-readout')
                    .attr('x', width - 52)
                    .attr('y', 46);

                const provinceGroups = chinaDetailGroup.selectAll('g')
                    .data(provinceFeatures)
                    .join('g')
                    .attr('class', province => {
                        const classes = ['globe-province'];
                        if (isSmallChinaRegion(province)) classes.push('globe-province-point');
                        if (isVisitedChinaProvinceName(province?.properties?.name)) classes.push('visited');
                        return classes.join(' ');
                    })
                    .attr('tabindex', 0)
                    .attr('role', 'button')
                    .each(function(province) {
                        setProvinceDataset(this, province);
                    });

                provinceGroups.append('path');
                provinceGroups.append('circle')
                    .attr('r', province => isSmallChinaRegion(province) ? 7 : 0);

                provinceGroups
                    .on('click', function(event) {
                        event.stopPropagation();
                        selectTravelPlace(this);
                    })
                    .on('keydown', function(event) {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            selectTravelPlace(this);
                        }
                    });

                function isChinaDetailVisible() {
                    const rotate = projection.rotate();
                    return globeZoom >= chinaDetailZoomThreshold &&
                        d3.geoDistance(chinaCenter, [-rotate[0], -rotate[1]]) < Math.PI / 2;
                }

                function renderChinaDetail() {
                    const visible = chinaFeature && isChinaDetailVisible();
                    svg.classed('china-detail-mode', Boolean(visible));
                    svg.classed('globe-dragging', isDraggingGlobe);
                    chinaDetailGroup.classed('visible', Boolean(visible));
                    provinceGroups.attr('display', visible ? null : 'none');

                    if (!visible) return;

                    chinaDetailGroup.attr('transform', null);
                    provinceGroups.each(function(province) {
                        const projectedCenter = projection(getPlanarFeatureCentroid(province));
                        const bounds = path.bounds(province);
                        const boundsWidth = bounds[1][0] - bounds[0][0];
                        const boundsHeight = bounds[1][1] - bounds[0][1];
                        const hasUsableBounds = Number.isFinite(boundsWidth) && Number.isFinite(boundsHeight) &&
                            boundsWidth > 0 && boundsHeight > 0;
                        let hitCenter = hasUsableBounds && (boundsWidth < 28 || boundsHeight < 28)
                            ? [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2]
                            : projectedCenter;
                        if ((province.properties?.name || '').includes('北京') && hasUsableBounds) {
                            hitCenter = [
                                bounds[0][0] + boundsWidth * 0.72,
                                bounds[0][1] + boundsHeight * 0.28
                            ];
                        }
                        const provinceGroup = d3.select(this);
                        const isPointRegion = isSmallChinaRegion(province);
                        provinceGroup
                            .attr('data-center-x', projectedCenter ? projectedCenter[0] : -999)
                            .attr('data-center-y', projectedCenter ? projectedCenter[1] : -999);
                        provinceGroup.select('path').attr('d', isPointRegion ? null : path(province));
                        provinceGroup.select('circle')
                            .attr('cx', hitCenter ? hitCenter[0] : -999)
                            .attr('cy', hitCenter ? hitCenter[1] : -999)
                            .attr('r', hitCenter ? 9 : 0);
                    });
                }

                function getSvgPoint(event) {
                    const rect = globeElement.getBoundingClientRect();
                    const scale = Math.min(rect.width / width, rect.height / height);
                    const offsetX = (rect.width - width * scale) / 2;
                    const offsetY = (rect.height - height * scale) / 2;

                    return [
                        (event.clientX - rect.left - offsetX) / scale,
                        (event.clientY - rect.top - offsetY) / scale
                    ];
                }

                function isPointOnGlobe(point) {
                    const dx = point[0] - width / 2;
                    const dy = point[1] - height / 2;
                    return Math.sqrt(dx * dx + dy * dy) <= projection.scale() + 8;
                }

                function pointInRing(point, ring) {
                    const x = point[0];
                    const y = point[1];
                    let inside = false;

                    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
                        const xi = ring[i][0];
                        const yi = ring[i][1];
                        const xj = ring[j][0];
                        const yj = ring[j][1];
                        const intersects = ((yi > y) !== (yj > y)) &&
                            (x < (xj - xi) * (y - yi) / ((yj - yi) || 1e-12) + xi);

                        if (intersects) inside = !inside;
                    }

                    return inside;
                }

                function pointInPolygon(point, polygon) {
                    if (!polygon?.length || !pointInRing(point, polygon[0])) return false;
                    return !polygon.slice(1).some(ring => pointInRing(point, ring));
                }

                function pointInGeometry(point, geometry) {
                    if (!geometry) return false;
                    if (geometry.type === 'Polygon') {
                        return pointInPolygon(point, geometry.coordinates);
                    }
                    if (geometry.type === 'MultiPolygon') {
                        return geometry.coordinates.some(polygon => pointInPolygon(point, polygon));
                    }
                    return false;
                }

                function getRingArea(ring) {
                    let area = 0;
                    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
                        area += (ring[j][0] * ring[i][1]) - (ring[i][0] * ring[j][1]);
                    }
                    return Math.abs(area / 2);
                }

                function getPlanarFeatureArea(feature) {
                    const geometry = feature?.geometry;
                    if (!geometry) return 0;

                    const polygons = geometry.type === 'Polygon'
                        ? [geometry.coordinates]
                        : geometry.coordinates || [];

                    return polygons.reduce((total, polygon) => {
                        const outer = getRingArea(polygon[0] || []);
                        const holes = polygon.slice(1).reduce((sum, ring) => sum + getRingArea(ring), 0);
                        return total + Math.max(outer - holes, 0);
                    }, 0);
                }

                function getRingCentroid(ring) {
                    if (!ring?.length) return [0, 0];

                    let twiceArea = 0;
                    let x = 0;
                    let y = 0;

                    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
                        const previous = ring[j];
                        const current = ring[i];
                        const cross = previous[0] * current[1] - current[0] * previous[1];

                        twiceArea += cross;
                        x += (previous[0] + current[0]) * cross;
                        y += (previous[1] + current[1]) * cross;
                    }

                    if (Math.abs(twiceArea) < 1e-12) {
                        return ring[0];
                    }

                    return [x / (3 * twiceArea), y / (3 * twiceArea)];
                }

                function getPlanarFeatureCentroid(feature) {
                    const geometry = feature?.geometry;
                    if (!geometry) return [0, 0];

                    const polygons = geometry.type === 'Polygon'
                        ? [geometry.coordinates]
                        : geometry.coordinates || [];

                    let totalArea = 0;
                    let x = 0;
                    let y = 0;

                    polygons.forEach(polygon => {
                        const outerRing = polygon[0] || [];
                        const area = getRingArea(outerRing);
                        const centroid = getRingCentroid(outerRing);

                        totalArea += area;
                        x += centroid[0] * area;
                        y += centroid[1] * area;
                    });

                    return totalArea ? [x / totalArea, y / totalArea] : [0, 0];
                }

                function findProvinceAtPoint(point, lonLat) {
                    if (!isChinaDetailVisible()) return null;

                    return provinceFeatures
                        .filter(province => pointInGeometry(lonLat, province.geometry))
                        .sort((a, b) => (provinceArea.get(a.properties.name) || 0) - (provinceArea.get(b.properties.name) || 0))[0] || null;
                }

                function findCountryAtLonLat(lonLat) {
                    return countries
                        .filter(country => d3.geoContains(country, lonLat))
                        .sort((a, b) => (countryArea.get(a.id) || 0) - (countryArea.get(b.id) || 0))[0] || null;
                }

                function selectProvinceFeature(province) {
                    const provinceNode = provinceGroups
                        .filter(item => item === province)
                        .node();

                    if (provinceNode) {
                        selectTravelPlace(provinceNode);
                    }
                }

                function setHoveredProvince(province) {
                    if (hoveredProvince === province) return;
                    hoveredProvince = province;
                    provinceGroups.classed('hovered', item => item === hoveredProvince);
                }

                function setChinaTerritoryHover(isHovered) {
                    countryPaths
                        .filter(country => isChinaTerritory(country))
                        .classed('hovered', isHovered);
                }

                function selectCountryFeature(country) {
                    const countryNode = countryPaths
                        .filter(item => item === country)
                        .node();

                    if (countryNode) {
                        setCountryDataset(countryNode, country);
                        focusCountry(country);
                        selectTravelPlace(countryNode);
                    }
                }

                function selectMapFeatureFromEvent(event, country, countryNode) {
                    const svgPoint = getSvgPoint(event);
                    const lonLat = isPointOnGlobe(svgPoint) ? projection.invert(svgPoint) : null;
                    const provinceTarget = event.target.closest?.('.globe-province');
                    const province = provinceTarget
                        ? d3.select(provinceTarget).datum()
                        : (lonLat ? findProvinceAtPoint(svgPoint, lonLat) : null);

                    if (province) {
                        selectProvinceFeature(province);
                        return;
                    }

                    setCountryDataset(countryNode, country);
                    focusCountry(country);
                    selectTravelPlace(countryNode);
                }

                function clampZoom(value) {
                    return Math.max(minZoom, Math.min(maxZoom, value));
                }

                function setGlobeZoom(value) {
                    globeZoom = clampZoom(value);
                    projection.scale(baseScale * globeZoom);
                    render();
                }

                function focusCountry(country) {
                    const center = isChinaTerritory(country) ? chinaCenter : d3.geoCentroid(country);
                    const lat = Math.max(-65, Math.min(65, center[1]));
                    projection.rotate([-center[0], -lat, 0]);
                    setGlobeZoom(isChinaTerritory(country) ? 2.25 : Math.max(globeZoom, 1.65));
                }

                function render() {
                    sphere.datum({ type: 'Sphere' }).attr('d', path);
                    graticulePath.attr('d', path);
                    countryPaths.attr('d', path);
                    boundaryPath.attr('d', path);
                    shade.attr('r', projection.scale());
                    renderChinaDetail();
                    zoomReadout.text(`${globeZoom.toFixed(1)}x`);
                }

                countryPaths
                    .on('mouseover', function(event, country) {
                        if (isChinaTerritory(country)) {
                            setChinaTerritoryHover(true);
                        }
                    })
                    .on('mouseout', function(event, country) {
                        if (isChinaTerritory(country)) {
                            setChinaTerritoryHover(false);
                        }
                    })
                    .on('click', function(event, country) {
                        event.stopPropagation();
                        selectMapFeatureFromEvent(event, country, this);
                    })
                    .on('keydown', function(event, country) {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setCountryDataset(this, country);
                            focusCountry(country);
                            selectTravelPlace(this);
                        }
                    });

                let startRotation = projection.rotate();
                let startPoint = [0, 0];
                let pinchState = null;
                const pinchListenerOptions = { passive: false, capture: true };

                function getTouchDistance(touches) {
                    const dx = touches[0].clientX - touches[1].clientX;
                    const dy = touches[0].clientY - touches[1].clientY;
                    return Math.sqrt(dx * dx + dy * dy);
                }

                function beginPinchZoom(event) {
                    if (event.touches.length < 2) return;
                    const distance = getTouchDistance(event.touches);
                    if (!distance) return;

                    pinchState = {
                        distance,
                        zoom: globeZoom
                    };
                    isDraggingGlobe = false;
                    svg.classed('globe-dragging', false);
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }

                function updatePinchZoom(event) {
                    if (!pinchState || event.touches.length < 2) return;
                    const distance = getTouchDistance(event.touches);
                    if (distance) {
                        setGlobeZoom(pinchState.zoom * (distance / pinchState.distance));
                    }
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }

                function endPinchZoom(event) {
                    if (!pinchState) return;
                    if (event.touches.length < 2) {
                        pinchState = null;
                        isDraggingGlobe = false;
                        render();
                    }
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }

                const dragBehavior = d3.drag()
                    .filter(event => !event.touches || event.touches.length < 2)
                    .on('start', event => {
                        if (pinchState) return;
                        isDraggingGlobe = true;
                        startRotation = projection.rotate();
                        startPoint = [event.x, event.y];
                        render();
                    })
                    .on('drag', event => {
                        if (pinchState) return;
                        const sensitivity = 0.32;
                        const nextRotation = [
                            startRotation[0] + (event.x - startPoint[0]) * sensitivity,
                            Math.max(-65, Math.min(65, startRotation[1] - (event.y - startPoint[1]) * sensitivity)),
                            startRotation[2]
                        ];
                        projection.rotate(nextRotation);
                        render();
                    })
                    .on('end', () => {
                        if (pinchState) return;
                        isDraggingGlobe = false;
                        render();
                    });

                svg.call(dragBehavior);
                globeElement.addEventListener('touchstart', beginPinchZoom, pinchListenerOptions);
                globeElement.addEventListener('touchmove', updatePinchZoom, pinchListenerOptions);
                globeElement.addEventListener('touchend', endPinchZoom, pinchListenerOptions);
                globeElement.addEventListener('touchcancel', endPinchZoom, pinchListenerOptions);
                svg.on('mousemove', event => {
                    if (isDraggingGlobe) {
                        setHoveredProvince(null);
                        return;
                    }

                    const svgPoint = getSvgPoint(event);
                    const lonLat = isPointOnGlobe(svgPoint) ? projection.invert(svgPoint) : null;
                    setHoveredProvince(lonLat ? findProvinceAtPoint(svgPoint, lonLat) : null);
                });
                svg.on('mouseleave', () => setHoveredProvince(null));
                svg.on('wheel', event => {
                    event.preventDefault();
                    const direction = event.deltaY > 0 ? 0.9 : 1.1;
                    setGlobeZoom(globeZoom * direction);
                });
                svg.on('click', event => {
                    const elementsAtPoint = document.elementsFromPoint(event.clientX, event.clientY);
                    const clickedCountry = event.target.closest?.('.globe-country') ||
                        elementsAtPoint.find(element => element.closest?.('.globe-country'))?.closest?.('.globe-country');

                    if (clickedCountry) {
                        const country = d3.select(clickedCountry).datum();
                        selectMapFeatureFromEvent(event, country, clickedCountry);
                        return;
                    }

                    const svgPoint = getSvgPoint(event);
                    if (isPointOnGlobe(svgPoint)) {
                        const lonLat = projection.invert(svgPoint);
                        const province = lonLat ? findProvinceAtPoint(svgPoint, lonLat) : null;

                        if (province) {
                            selectProvinceFeature(province);
                            return;
                        }

                        const country = lonLat ? findCountryAtLonLat(lonLat) : null;
                        if (country) {
                            selectCountryFeature(country);
                            return;
                        }
                    }

                    if (event.target === globeElement) {
                        clearTravelSelection();
                    }
                });

                document.getElementById('globeZoomOut')?.addEventListener('click', () => setGlobeZoom(globeZoom * 0.82));
                document.getElementById('globeZoomIn')?.addEventListener('click', () => setGlobeZoom(globeZoom * 1.22));
                document.getElementById('globeZoomReset')?.addEventListener('click', () => {
                    projection.rotate([0, 0, 0]);
                    setGlobeZoom(1);
                });

                render();
                window.travelGlobeState = {
                    countries: countries.length,
                    getRotation: () => projection.rotate(),
                    getZoom: () => globeZoom,
                    focusChina: () => focusCountry(chinaFeature),
                    getProvinceCenters: () => provinceFeatures.map(province => ({
                        name: getProvinceShortName(province.properties?.name),
                        point: projection(getPlanarFeatureCentroid(province))
                    })),
                    setZoom: setGlobeZoom,
                    render
                };
            })
            .catch(error => {
                svg.selectAll('*').remove();
                svg.append('text')
                    .attr('class', 'globe-loading')
                    .attr('x', width / 2)
                    .attr('y', height / 2)
                    .text('Globe data failed to load');
                console.warn(error);
            });
    }

    initTravelGlobe();

    document.querySelectorAll('.map-tab').forEach(tabButton => {
        tabButton.addEventListener('click', () => {
            const target = tabButton.dataset.mapTarget;
            if (!target) return;

            document.querySelectorAll('.map-tab').forEach(button => {
                button.classList.toggle('active', button === tabButton);
            });
            document.querySelectorAll('.map-layer').forEach(layer => {
                layer.classList.toggle('active', layer.dataset.mapLayer === target);
            });
        });
    });

    document.getElementById('travelPhotoPrev')?.addEventListener('click', () => moveTravelPhoto(-1));
    document.getElementById('travelPhotoNext')?.addEventListener('click', () => moveTravelPhoto(1));

    const lightbox = document.getElementById('travelLightbox');
    const openLightboxButton = document.getElementById('travelPhotoOpen');
    const closeLightboxButton = document.getElementById('lightboxClose');

    function openTravelLightbox() {
        if (!lightbox) return;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeTravelLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openLightboxButton?.addEventListener('click', openTravelLightbox);
    closeLightboxButton?.addEventListener('click', closeTravelLightbox);
    document.getElementById('lightboxPrev')?.addEventListener('click', () => moveTravelPhoto(-1));
    document.getElementById('lightboxNext')?.addEventListener('click', () => moveTravelPhoto(1));
    lightbox?.addEventListener('click', event => {
        if (event.target === lightbox) {
            closeTravelLightbox();
        }
    });
    document.addEventListener('keydown', event => {
        if (!lightbox?.classList.contains('open')) return;
        if (event.key === 'Escape') closeTravelLightbox();
        if (event.key === 'ArrowLeft') moveTravelPhoto(-1);
        if (event.key === 'ArrowRight') moveTravelPhoto(1);
    });

    showTravelPhoto(0);
    restartTravelPhotoTimer();

    // ===== 视差效果 =====
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const pageHero = document.getElementById('pageHero');

        if (pageHero && scrolled < window.innerHeight) {
            const heroContent = pageHero.querySelector('.page-hero-content');
            const heroBg = pageHero.querySelector('.page-hero-bg');

            if (heroContent) {
                heroContent.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
            }

            if (heroBg) {
                heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
    });

    // ===== 视频处理 =====
    const heroVideo = document.getElementById('heroVideo');

    if (heroVideo) {
        heroVideo.addEventListener('canplay', () => {
            heroVideo.play().catch(err => {
                console.log('视频自动播放被阻止，用户交互后播放');
            });
        });

        document.addEventListener('click', () => {
            if (heroVideo.paused) {
                heroVideo.play();
            }
        }, { once: true });
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

    // ===== 数字动画（用于统计数据） =====
    function animateNumber(element, target) {
        if (element.classList.contains('animated')) return;

        const duration = 2000;
        const startTime = Date.now();
        const startValue = 0;

        function updateNumber() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);

            element.textContent = currentValue + '+';

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target + '+';
                element.classList.add('animated');
            }
        }

        updateNumber();
    }

    // 触发统计数字动画
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.mini-stat-number');
                statNumbers.forEach(stat => {
                    if (stat.closest('.multi-sport-stats')) return;

                    const rawValue = stat.textContent.trim();
                    if (!/^\d+$/.test(rawValue)) return;

                    const target = parseInt(rawValue, 10);
                    if (!isNaN(target)) {
                        animateNumber(stat, target);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.item-stats').forEach(stat => {
        statsObserver.observe(stat);
    });

    // ===== 平滑滚动返回顶部 =====
    const scrollLine = document.querySelector('.page-hero-scroll .scroll-line');
    if (scrollLine) {
        scrollLine.addEventListener('click', () => {
            const pageContent = document.getElementById('pageContent');
            if (pageContent) {
                const targetPosition = pageContent.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 300; // 300ms 快速滚动
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    window.scrollTo(0, startPosition + distance * ease);
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                requestAnimationFrame(animation);
            }
        });
    }

    // ===== 控制台信息 =====
    console.log('%c✨ 欢迎来到我的世界!', 'font-size: 20px; color: #c9a227; font-weight: bold;');

})();
