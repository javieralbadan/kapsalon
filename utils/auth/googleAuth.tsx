import getURL from '@utils/getUrl';
import { supabaseClient } from '@utils/supabase/client';

export const signInWithGoogle = async (pathToRedirect?: string) => {
	await supabaseClient.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${getURL()}auth/callback${pathToRedirect ? `?next=${pathToRedirect}` : ''}`,
		},
	});
};

export const signout = async () => {
	const { error } = await supabaseClient.auth.signOut();
	if (error) throw new Error('An error ocurred during sign out');
};
