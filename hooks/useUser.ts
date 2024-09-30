/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserMetadata } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabaseClient } from './../utils/supabase/client';

export const useUser = (): UserMetadata => {
	const [user, setUser] = useState<UserMetadata>({});

	useEffect(() => {
		const getUsers = async () => {
			const { data } = await supabaseClient.auth.getUser();
			if (data && data.user) {
				setUser(data.user.user_metadata);
			}
		};

		void getUsers();

		//unmount
		return () => {};
	}, []);

	return user;
};
