import { useMediaQuery } from '@react-hook/media-query';

export const MOBILE_BREAKPOINT = '(max-width: 768px)';

export const useisMobile = () => useMediaQuery(MOBILE_BREAKPOINT);
