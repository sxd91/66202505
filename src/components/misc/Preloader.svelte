<script lang="ts">
  import { onMount } from 'svelte';
  import { pagePreloader } from '../../utils/page-preloader';

  let progress = 0;
  let statusText = '正在初始化...';
  let isVisible = false;
  let isFirstVisit = false;
  let isComplete = false;

  onMount(async () => {
    const hasVisited = localStorage.getItem('hasVisited');
    isFirstVisit = !hasVisited;

    if (isFirstVisit) {
      isVisible = true;
      
      pagePreloader.setProgressCallback((newProgress, newStatus) => {
        progress = newProgress;
        statusText = newStatus;
      });

      try {
        await pagePreloader.start();
      } catch {} finally {
        progress = 100;
        statusText = '加载完成';
        isComplete = true;
        
        setTimeout(() => {
          isVisible = false;
          localStorage.setItem('hasVisited', 'true');
          document.dispatchEvent(new Event('preloader:complete'));
        }, 600);
      }
    }
  });
</script>

{#if isVisible && isFirstVisit}
  <div class="preloader-overlay" class:preloader-hide={isComplete}>
    <div class="preloader-content">
      <div class="preloader-logo">
        <div class="logo-ring"></div>
        <div class="logo-center"></div>
      </div>
      
      <div class="preloader-progress-wrapper">
        <div class="preloader-progress-bar">
          <div class="preloader-progress-fill" style="width: {progress}%"></div>
        </div>
        <span class="preloader-progress-text">{progress}%</span>
      </div>
      
      <p class="preloader-status">{statusText}</p>
    </div>
  </div>
{/if}

<style>
  .preloader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease, visibility 0.5s ease;
  }

  .preloader-hide { opacity: 0; visibility: hidden; }

  .preloader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
  }

  .preloader-logo {
    width: 80px;
    height: 80px;
    position: relative;
    margin-bottom: 1rem;
  }

  .logo-ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 3px solid rgba(102, 126, 234, 0.3);
    border-radius: 50%;
    animation: ringPulse 2s ease-in-out infinite;
  }

  .logo-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: centerPulse 2s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.6);
  }

  @keyframes ringPulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.1); opacity: 1; }
  }

  @keyframes centerPulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 20px rgba(102, 126, 234, 0.6); }
    50% { transform: translate(-50%, -50%) scale(1.2); box-shadow: 0 0 40px rgba(102, 126, 234, 0.9); }
  }

  .preloader-progress-wrapper {
    width: 280px;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .preloader-progress-bar {
    flex: 1;
    height: 6px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
    overflow: hidden;
  }

  .preloader-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 3px;
    transition: width 0.3s ease;
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
  }

  .preloader-progress-text {
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    min-width: 40px;
    text-align: right;
  }

  .preloader-status {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin: 0;
  }

  @media (max-width: 768px) {
    .preloader-progress-wrapper { width: 220px; }
    .preloader-logo { width: 60px; height: 60px; }
    .logo-center { width: 30px; height: 30px; }
  }
</style>