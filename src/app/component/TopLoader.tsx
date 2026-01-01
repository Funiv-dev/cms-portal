'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ 
    showSpinner: false,  // 스피너 숨기기
    speed: 500,
    minimum: 0.3
});

export default function TopLoader() {
    useEffect(() => {
        NProgress.start();
        
        const timer = setTimeout(() => {
            NProgress.done();
        }, 2000);

        return () => {
            clearTimeout(timer);
            NProgress.done();
        };
    }, []);

    return null;
}