import { useMediaQuery } from '@react-hook/media-query';

export const MOBILE_BREAKPOINT = '(max-width: 768px)';

export const useIsMobile = () => useMediaQuery(MOBILE_BREAKPOINT);
