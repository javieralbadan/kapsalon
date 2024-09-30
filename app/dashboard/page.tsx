'use server';
import { PostgrestError } from '@supabase/supabase-js';
import { Database } from 'types/supabase';
import { fetchShops } from '../actions';

type ShowRow = Database['public']['Tables']['shops']['Row'];
interface ShowsResponseType {
	data: ShowRow[] | null;
	error: PostgrestError | null;
}

const Dashboard = async () => {
	const { data, error }: ShowsResponseType = await fetchShops();
	console.log('🚀 ~ Dashboard ~ data, error:', data, error);

	return (
		<div>
			<h1>Este es el dashboard de Kapsalon</h1>
		</div>
	);
};

export default Dashboard;
