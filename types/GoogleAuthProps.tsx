import { Provider, UserMetadata } from '@supabase/supabase-js';

interface providerObject {
	provider: Provider;
	url: string;
}

export type GoogleAuthProps = {
	signInWithGoogle: () => Promise<providerObject | undefined>;
	signout: () => Promise<void>;
	user?: UserMetadata;
	loader: boolean;
};
