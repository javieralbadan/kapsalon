import { SWRConfig } from 'swr';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SWRConfig
			value={{
				revalidateOnFocus: false, // Desactiva revalidación al enfocar la ventana
				revalidateOnReconnect: true, // Revalida cuando el usuario reconecta
				refreshWhenOffline: false, // No intenta revalidar cuando está offline
				shouldRetryOnError: false, // No reintenta automáticamente en caso de error
			}}
		>
			{children}
		</SWRConfig>
	);
}
