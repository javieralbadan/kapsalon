import { useMediaQuery } from '@react-hook/media-query';

export const MOBILE_BREAKPOINT = '(max-width: 768px)';
export const IS_MOBILE = useMediaQuery(MOBILE_BREAKPOINT);
