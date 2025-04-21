// Performance optimization script

// Function to defer non-critical images
function deferImages() {
    const imgDefer = document.getElementsByTagName('img');
    for (let i = 0; i < imgDefer.length; i++) {
        if (imgDefer[i].getAttribute('data-src')) {
            imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
        }
    }
}

// Function to defer non-critical CSS
function loadDeferredStyles() {
    const addStylesNode = document.getElementById('deferred-styles');
    const replacement = document.createElement('div');
    replacement.innerHTML = addStylesNode.textContent;
    document.body.appendChild(replacement);
    addStylesNode.parentElement.removeChild(addStylesNode);
}

// Function to measure and log performance metrics
function logPerformanceMetrics() {
    window.addEventListener('load', function() {
        // Use Performance API to get timing metrics
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domReadyTime = perfData.domComplete - perfData.domLoading;
            
            console.log('Page load time: ' + pageLoadTime + 'ms');
            console.log('DOM ready time: ' + domReadyTime + 'ms');
            
            // Send metrics to analytics if needed
            // Example: sendToAnalytics('pageLoadTime', pageLoadTime);
        }, 0);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Load deferred images
    if (window.addEventListener) {
        window.addEventListener('load', deferImages, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', deferImages);
    }
    
    // Log performance metrics
    logPerformanceMetrics();
    
    // Prefetch pages that might be visited next
    const prefetchLinks = [
        'menu.html'
    ];
    
    prefetchLinks.forEach(link => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link;
        document.head.appendChild(prefetchLink);
    });
});
