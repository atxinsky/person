// 双语数据结构
export const content = {
  nav: {
    en: { projects: 'Projects', writing: 'Writing', about: 'About', contact: 'Contact' },
    zh: { projects: '作品', writing: '文章', about: '关于', contact: '联系' }
  },

  hero: {
    en: {
      preLabel: '// tretra — @travider',
      h1: ['I BUILD', 'AT THE', 'EDGE.'],
      subtitle: 'Where artificial intelligence, quantitative trading, and education collide — that\'s where I work.',
      descriptors: ['AI Educator', '9-Year Crypto Trader', 'Vibecoder'],
      cta: 'Explore'
    },
    zh: {
      preLabel: '// tretra — @travider',
      h1: ['在边界', '之上，', '创造。'],
      subtitle: '人工智能、量化交易与教育的交汇处——就是我工作的地方。',
      descriptors: ['AI培训架构师', '9年加密货币交易员', 'Vibecoder'],
      cta: '探索'
    }
  },

  projects: {
    en: {
      sectionNum: '01',
      title: ['SELECTED', 'WORKS.'],
      items: [
        { name: 'Quantitative Trading Systems', nameSub: '量化交易系统集', desc: 'Full-market dashboard + strategy backtest + live execution. BTC/ETH, US stocks, A-shares, commodity futures.', tags: ['Python', 'Node.js', 'ML', '4yr Live'], status: 'RUNNING', image: 'ai/case-screener.png' },
        { name: 'Market Dashboard', nameSub: '全市场行情仪表盘', desc: 'A-shares, HK, US, crypto, futures — all-in-one real-time overview with auto-refresh.', tags: ['React', 'WebSocket', 'Multi-Market'], status: 'LIVE', image: 'ai/case-dashboard.png' },
        { name: 'Rongyi Companion', nameSub: '融易陪伴', desc: 'AI education platform bridging online and offline learning. Curriculum informed by AI4K12 and Elements of AI.', tags: ['EdTech', 'Curriculum', 'Platform'], status: 'LIVE', url: 'https://rongyiren.top' },
        { name: 'Taiji Circle', nameSub: '太极圈 · 社区SaaS', desc: 'WeChat mini-program + admin panel + NestJS backend. Full SaaS with AI content recommendations.', tags: ['NestJS', 'MySQL', 'Docker'], status: 'LIVE', url: 'http://106.54.0.22:8080/' },
        { name: 'Enterprise AI Training', nameSub: '企业AI赋能培训', desc: 'Interactive training for electric grid companies. Non-technical teams, hands-on AI integration.', tags: ['Training', 'Enterprise', 'RAG'], status: 'DELIVERED', url: 'ai/' },
        { name: 'Altcoin Screener', nameSub: '山寨币筛选器', desc: 'Systematic crypto screening with Binance API. Streamlit-powered.', tags: ['Python', 'Binance', 'Streamlit'], status: 'OPEN SOURCE' },
        { name: 'Inception Trading', nameSub: '盗梦空间交易系统', desc: 'Psychological defense framework mapping dream layers to trading risk.', tags: ['Pine Script', 'TradingView', 'Psychology'], status: 'PERSONAL' },
        { name: 'Banbot', nameSub: '', desc: 'Automated ETH/USDT trading. MACD-EMA strategies in Go.', tags: ['Go', 'MACD-EMA', 'Automation'], status: 'RUNNING' }
      ]
    },
    zh: {
      sectionNum: '01',
      title: ['精选', '作品。'],
      items: [
        { name: '量化交易系统集', nameSub: 'Quant Trading Systems', desc: '覆盖BTC/ETH、美股、A股、商品期货的全市场行情仪表盘+策略回测+实盘执行系统', tags: ['Python', 'Node.js', 'ML', '4年实盘'], status: 'RUNNING', image: 'ai/case-screener.png' },
        { name: '全市场行情仪表盘', nameSub: 'Market Dashboard', desc: 'A股、港股、美股、加密货币、商品期货——一站式实时行情总览，自动刷新。', tags: ['React', 'WebSocket', '全市场'], status: 'LIVE', image: 'ai/case-dashboard.png' },
        { name: '融易陪伴', nameSub: 'Rongyi Companion', desc: 'AI教育平台，打通线上线下学习。课程体系参考AI4K12和Elements of AI。', tags: ['教育科技', '课程', '平台'], status: 'LIVE', url: 'https://rongyiren.top' },
        { name: '太极圈', nameSub: '社区SaaS平台', desc: '微信小程序+管理后台+NestJS后端，完整SaaS架构。AI用于内容推荐和智能客服。', tags: ['NestJS', 'MySQL', 'Docker'], status: 'LIVE', url: 'http://106.54.0.22:8080/' },
        { name: '企业AI赋能培训', nameSub: 'Enterprise AI Training', desc: '面向电网公司的交互式培训。为非技术团队设计，实操式AI集成。', tags: ['培训', '企业', 'RAG'], status: 'DELIVERED', url: 'ai/' },
        { name: 'Altcoin Screener', nameSub: '山寨币筛选器', desc: '基于Binance API的系统化加密货币筛选工具，Streamlit驱动。', tags: ['Python', 'Binance', 'Streamlit'], status: 'OPEN SOURCE' },
        { name: '盗梦空间交易系统', nameSub: 'Inception Trading', desc: '将诺兰的梦境层级映射到交易风险的心理防御框架。', tags: ['Pine Script', 'TradingView', '心理学'], status: 'PERSONAL' },
        { name: 'Banbot', nameSub: '', desc: 'ETH/USDT自动化交易。Go语言实现MACD-EMA策略。', tags: ['Go', 'MACD-EMA', '自动化'], status: 'RUNNING' }
      ]
    }
  },

  writing: {
    en: {
      sectionNum: '02',
      title: ['WRITING &', 'THINKING.'],
      items: [
        { title: 'SaaS is Dead, AaaS Lives Forever', desc: 'First-principles analysis of value capture in the age of agents.', date: '2024', lang: 'CN' },
        { title: 'The Inception Trading Framework', desc: 'Mapping Nolan\'s dream layers to systematic trading psychology.', date: '2024', lang: 'EN/CN' },
        { title: 'AI Education: East Meets West', desc: 'Gap analysis between Western AI curricula and China\'s training market.', date: '2024', lang: 'CN' },
        { title: 'From Zero to Profitable', desc: '9 years in crypto — breakeven in 2023, profitable in 2024.', date: '2024', lang: 'EN' }
      ]
    },
    zh: {
      sectionNum: '02',
      title: ['文章 &', '思考。'],
      items: [
        { title: 'SaaS已死，AaaS永生', desc: '从第一性原理分析Agent时代的价值捕获。', date: '2024', lang: 'CN' },
        { title: '盗梦空间交易框架', desc: '将诺兰的梦境层级映射到系统化交易心理学。', date: '2024', lang: 'EN/CN' },
        { title: 'AI教育：东西方碰撞', desc: '西方AI课程体系与中国培训市场的差距分析。', date: '2024', lang: 'CN' },
        { title: '从零到盈利', desc: '加密货币9年——2023年持平，2024年盈利。', date: '2024', lang: 'EN' }
      ]
    }
  },

  about: {
    en: {
      sectionNum: '03',
      title: ['ABOUT', 'TRETRA.'],
      stats: [
        { number: '9+', label: 'Years in Crypto' },
        { number: '3', label: 'AI Subscriptions' },
        { number: '8+', label: 'Projects Shipped' },
        { number: '2024', label: 'First Profitable Year' }
      ],
      paragraphs: [
        'Started in real estate research. The pull of markets was stronger. Nine years deep into crypto — surviving cycles, building systems, turning profitable in 2024.',
        'Discovered that explaining AI to non-technical people was both a market gap and something I loved. Enterprise training led to an education platform, then a full pivot into the intersection.',
        'I build with AI as co-pilot. No CS degree. Just relentless iteration across every tool available — Claude, ChatGPT, Gemini, all at once.',
        'Based in Zhengzhou. Building Rongyi Companion. Growing on X. Always hunting the next intersection where uncommon knowledge creates uncommon value.'
      ],
      toolchain: ['Claude', 'ChatGPT', 'Gemini', 'React', 'Go', 'Pine Script', 'Cloudflare', 'TiDB', 'Vercel', 'TradingView', 'Binance API']
    },
    zh: {
      sectionNum: '03',
      title: ['关于', 'TRETRA。'],
      stats: [
        { number: '9+', label: '加密货币经验' },
        { number: '3', label: '个AI订阅' },
        { number: '8+', label: '已交付项目' },
        { number: '2024', label: '首个盈利年' }
      ],
      paragraphs: [
        '从房地产研究起步。市场的引力更强。加密货币9年——穿越周期，构建系统，2024年实现盈利。',
        '发现给非技术人员讲AI有市场缺口，也是我热爱的事。企业培训带来了教育平台，然后全面转向交叉领域。',
        '用AI作为驾驶员的一切。没有CS学位，只有对每个工具的不断迭代——同时使用Claude、ChatGPT、Gemini。',
        '目前在郑州。构建融易陪伴，在X上增长，寻找下一个非共识知识产生非共识价值的交叉点。'
      ],
      toolchain: ['Claude', 'ChatGPT', 'Gemini', 'React', 'Go', 'Pine Script', 'Cloudflare', 'TiDB', 'Vercel', 'TradingView', 'Binance API']
    }
  },

  contact: {
    en: {
      sectionNum: '04',
      title: ['LET\'S', 'CONNECT.'],
      subtitle: 'Always open to interesting conversations and collaborations.',
      links: [
        { platform: 'X / Twitter', handle: '@travider', url: 'https://x.com/travider' },
        { platform: 'GitHub', handle: 'atxinsky', url: 'https://github.com/atxinsky' },
        { platform: 'WeChat', handle: '融易陪伴', url: '#' }
      ]
    },
    zh: {
      sectionNum: '04',
      title: ['保持', '联系。'],
      subtitle: '始终对有趣的交流与合作保持开放。',
      links: [
        { platform: 'X / Twitter', handle: '@travider', url: 'https://x.com/travider' },
        { platform: 'GitHub', handle: 'atxinsky', url: 'https://github.com/atxinsky' },
        { platform: '微信', handle: '融易陪伴', url: '#' }
      ]
    }
  },

  footer: {
    en: { copyright: '© 2024 Tretra. Built with AI co-pilots.', backToTop: 'Back to top ↑' },
    zh: { copyright: '© 2024 Tretra. AI协作构建。', backToTop: '回到顶部 ↑' }
  }
}
