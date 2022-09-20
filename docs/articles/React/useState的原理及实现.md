
# useState的原理及实现

> useState 是我们在 React(v16+) 中常用的 Hook，那它具体的原理是什么？又是怎样实现的呢？

**useState 为什么仅在函数组件上可用，在class组件中不可用。**    
答：render方法 问题。

**useState 为什么在函数组件中可以维持状态？**    
答：因为Fiber，Fiber是存在内存中的，在mount时，就给每个state打上了key，然后每次更新都会记录前一个state，然后在更新，然后在走render，同步到页面。

**Fiber的更新方式和之前的 Stack reconciler 有什么不同。**    
答：Fiber是利用主线程空余的间隔时间进行逐步一段段的更新，把一个耗时很长的任务分片进行，将更新过程碎片化，并进行优先级排序。    
而 reconciler 则会自顶向下的递归mount/update，无法中断（持续占用主线程，可能会造成卡顿白屏），这样主线程上的布局、动画等周期性任务以及交互响应就无法立即得到处理，影响体验
渲染过程中没有优先级可言。

## 参考
- [从源码剖析useState的执行过程](https://juejin.cn/post/6844903833764642830)
- [react技术分享----useState的原理及自定义useState的实现](https://blog.csdn.net/m0_46694056/article/details/122600029)
