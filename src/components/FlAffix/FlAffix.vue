<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    relativeElementSelector: {
      type: String,
      required: true,
    },

    offset: {
      type: Object,
      default() {
        return {
          top: 40,
          bottom: 40,
        };
      },
      validator(offset) {
        if (typeof offset !== 'object') {
          return false;
        }

        const keys = Object.keys(offset);

        return keys.includes('top') && keys.includes('bottom');
      },
    },

    enabled: {
      type: Boolean,
      default: true,
    },

    scrollAffix: {
      type: Boolean,
      default: false,
    },

    scrollContainerSelector: {
      type: String,
      default: null,
    },
  },

  computed: {
    relativeElement() {
      return document.querySelector(this.relativeElementSelector);
    },

    scrollContainer() {
      if (this.scrollContainerSelector) {
        return document.querySelector(this.scrollContainerSelector);
      }

      return window;
    },

    affixTopPos() {
      return this.affixRect.top + this.topOfScreen - this.offset.top - this.topPadding;
    },

    affixBottomPos() {
      return this.affixRect.bottom + this.topOfScreen + this.offset.bottom;
    },

    bottomOfScreen() {
      return this.topOfScreen + this.scrollContainer.innerHeight;
    },

    relativeElmTopPos() {
      return this.topOfScreen + this.relativeElement.getBoundingClientRect().top;
    },

    relativeElmBottomPos() {
      return this.topOfScreen + this.relativeElement.getBoundingClientRect().bottom;
    },

    screenIsPastAffix() {
      return this.bottomOfScreen >= this.affixBottomPos;
    },

    screenIsBeforeAffix() {
      return this.topOfScreen <= this.affixTopPos;
    },

    screenIsBeforeRelativeElm() {
      return this.topOfScreen <= this.relativeElmTopPos - this.offset.top;
    },

    screenIsPastRelativeElm() {
      return this.bottomOfScreen >= this.relativeElmBottomPos + this.offset.bottom;
    },

    screenIsInsideRelativeElm() {
      return !this.screenIsBeforeRelativeElm && !this.screenIsPastRelativeElm;
    },
  },

  data() {
    return {
      frameId: null,
      affixHeight: null,
      affixRect: null,
      affixInitialTop: null,
      relativeElmOffsetTop: null,
      topPadding: null,
      lastState: null,
      currentState: null,
      currentScrollAffix: null,
      topOfScreen: null,
      lastDistanceFromTop: null,
      scrollingUp: null,
      scrollingDown: null,
    };
  },

  watch: {
    offset(val, oldVal) {
      if (val.top !== oldVal.top || val.bottom !== oldVal.bottom) {
        this.onScroll();
      }
    },
  },

  methods: {
    updateData() {
      this.topOfScreen = this.scrollContainer.scrollTop || window.pageYOffset;
      this.affixRect = this.$el.getBoundingClientRect();
      this.affixHeight = this.$el.offsetHeight;
      this.relativeElmOffsetTop = this.getOffsetTop(this.relativeElement);
    },

    handleScroll() {
      if (this.frameId) {
        return;
      }

      this.frameId = window.requestAnimationFrame(() => {
        this.onScroll();
        this.frameId = null;
      });
    },

    onScroll() {
      if (!this.enabled) {
        this.removeClasses();

        return;
      }

      this.updateData();

      const affixIsBiggerThanRelativeElement = this.affixHeight + this.offset.top
        >= this.relativeElement.offsetHeight;

      if (affixIsBiggerThanRelativeElement) {
        if (this.scrollAffix && this.currentScrollAffix !== 'scrollaffix-top') {
          this.setScrollAffixTop();
        } else if (this.currentState !== 'affix-top') {
          this.setAffixTop();
        }

        return;
      }

      const affixTotalHeight = this.affixHeight + this.offset.bottom + this.offset.top;
      const shouldUseScrollAffix = this.scrollAffix
        && affixTotalHeight > this.scrollContainer.innerHeight;

      if (shouldUseScrollAffix) {
        this.handleScrollAffix();

        return;
      }

      this.handleAffix();
    },

    handleAffix() {
      if (this.topOfScreen < this.relativeElmOffsetTop - this.offset.top) {
        this.setAffixTop();
      }

      if (this.topOfScreen >= this.relativeElmOffsetTop - this.offset.top
        && this.relativeElmBottomPos - this.offset.bottom
        >= this.topOfScreen + this.topPadding + this.affixHeight + this.offset.top) {
        this.setAffix();
      }

      if (this.relativeElmBottomPos - this.offset.bottom < this.topOfScreen
        + this.topPadding + this.affixHeight + this.offset.top) {
        this.setAffixBottom();
      }

      this.lastState = this.currentState;
    },

    handleScrollAffix() {
      this.setScrollingDirection();

      if (this.screenIsBeforeRelativeElm) {
        this.setScrollAffixTop();
      } else if (this.screenIsPastRelativeElm) {
        this.setScrollAffixBottom();
      } else if (this.screenIsInsideRelativeElm) {
        const shouldSetAffixScrolling = (this.currentScrollAffix === 'scrollaffix-top')
          || (this.currentScrollAffix === 'scrollaffix-bottom')
          || (this.currentScrollAffix === 'scrollaffix-up' && this.scrollingDown)
          || (this.currentScrollAffix === 'scrollaffix-down' && this.scrollingUp);

        if (this.screenIsBeforeAffix && this.scrollingUp) {
          this.setScrollAffixUp();
        } else if (this.screenIsPastAffix && this.scrollingDown) {
          this.setScrollAffixDown();
        } else if (shouldSetAffixScrolling) {
          this.setScrollAffixScrolling();
        }
      }

      this.lastScrollAffixState = this.currentScrollAffix;
      this.lastDistanceFromTop = this.topOfScreen;
    },

    initScrollAffix() {
      if (this.bottomOfScreen < this.affixBottomPos) {
        this.setScrollAffixTop();
      } else if (this.screenIsInsideRelativeElm) {
        this.setScrollAffixDown();
      } else if (this.screenIsPastRelativeElm) {
        this.setScrollAffixBottom();
      } else {
        this.setScrollAffixScrolling();
      }
    },

    setScrollAffixScrolling() {
      this.currentScrollAffix = 'scrollaffix-scrolling';
      this.$el.style.top = `${(Math.floor(this.affixRect.top) + this.topOfScreen) - this.affixInitialTop}px`;
      this.$el.style.bottom = 'auto';
      this.removeClasses();
      this.emitEvent();
    },

    setScrollAffixUp() {
      this.currentScrollAffix = 'scrollaffix-up';

      if (this.currentScrollAffix !== this.lastScrollAffixState) {
        this.$el.style.top = `${this.topPadding + this.offset.top}px`;
        this.$el.style.bottom = 'auto';
        this.removeClasses();
        this.emitEvent();
        this.$el.classList.add('affix');
      }
    },

    setScrollAffixDown() {
      this.currentScrollAffix = 'scrollaffix-down';

      if (this.currentScrollAffix !== this.lastScrollAffixState) {
        this.$el.style.bottom = `${this.offset.bottom}px`;
        this.$el.style.top = 'auto';
        this.removeClasses();
        this.emitEvent();
        this.$el.classList.add('affix');
      }
    },

    setScrollAffixTop() {
      this.currentScrollAffix = 'scrollaffix-top';
      this.$el.style.top = 0;
      this.$el.style.bottom = 'auto';
      this.removeClasses();
      this.emitEvent();
    },

    setScrollAffixBottom() {
      this.currentScrollAffix = 'scrollaffix-bottom';
      this.$el.style.top = `${this.relativeElmBottomPos - this.affixInitialTop - this.affixHeight}px`;
      this.$el.style.bottom = 'auto';
      this.removeClasses();
      this.emitEvent();
    },

    setScrollingDirection() {
      if (this.topOfScreen > this.lastDistanceFromTop) {
        this.scrollingDown = true;
        this.scrollingUp = false;
      } else {
        this.scrollingUp = true;
        this.scrollingDown = false;
      }
    },

    setAffixTop() {
      this.currentState = 'affix-top';

      if (this.currentState !== this.lastState) {
        this.emitEvent();
        this.removeClasses();
        this.$el.classList.remove('affix');
        this.$el.classList.add('affix-top');
        this.$el.style.top = null;
      }
    },

    setAffix() {
      this.currentState = 'affix';
      this.$el.style.top = `${this.topPadding + this.offset.top}px`;

      if (this.currentState !== this.lastState) {
        this.emitEvent();
        this.removeClasses();
        this.$el.classList.add('affix');
      }
    },

    setAffixBottom() {
      this.currentState = 'affix-bottom';
      this.$el.style.top = `${this.relativeElement.offsetHeight - this.affixHeight
        - this.offset.bottom - this.topPadding}px`;

      if (this.currentState !== this.lastState) {
        this.emitEvent();
        this.removeClasses();
        this.$el.classList.add('affix-bottom');
      }
    },

    removeClasses() {
      this.$el.classList.remove('affix-top');
      this.$el.classList.remove('affix');
      this.$el.classList.remove('affix-bottom');
    },

    emitEvent() {
      if (this.scrollAffix && this.lastScrollAffixState
        && this.currentScrollAffix !== this.lastScrollAffixState) {
        this.$emit(this.currentScrollAffix.replace('-', ''));
      }

      if (this.lastState) {
        this.$emit(this.currentState.replace('-', ''));
      }
    },

    getOffsetTop(element) {
      let yPosition = 0;
      let nextElement = element;

      while (nextElement) {
        yPosition += (nextElement.offsetTop);
        nextElement = nextElement.offsetParent;
      }

      return yPosition;
    },
  },

  mounted() {
    this.$el.classList.add('fl-affix');
    this.affixInitialTop = this.getOffsetTop(this.$el);
    this.topPadding = this.affixInitialTop - this.getOffsetTop(this.relativeElement);

    this.updateData();

    if (this.scrollAffix) {
      const affixTotalHeight = this.affixHeight + this.offset.bottom + this.offset.top;
      const shouldUseScrollAffix = this.scrollAffix
        && affixTotalHeight > this.scrollContainer.innerHeight;

      if (shouldUseScrollAffix) this.initScrollAffix();
    }

    this.onScroll();
    this.scrollContainer.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy() {
    this.scrollContainer.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
