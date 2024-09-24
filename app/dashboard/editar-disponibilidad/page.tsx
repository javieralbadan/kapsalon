'use client';
import { EditAvailabilityCarousel } from '@/components/EditAvailabilityCarousel';
import { Loading } from '@/components/ui/Loading';
import { getAvailabilitiesFromDB } from '@/db/staffAvailability';
import { StaffAvailabilityRow } from '@/types/staffAvailability';
import { Empty } from 'antd';
import { useEffect, useState } from 'react';

const EditAvailability = () => {
	const [isError, setError] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [availabilitiesList, setAvailabilitiesList] = useState<StaffAvailabilityRow[] | []>([]);

	useEffect(() => {
		const fetchData = async () => {
			const { data: slots, error: errorAvailability } = await getAvailabilitiesFromDB();
			console.log('errorAvailability, slots', errorAvailability, slots);
			if (!errorAvailability && slots?.length) {
				setAvailabilitiesList(slots);
			}

			setError(!!errorAvailability);
			setLoading(false);
		};

		void fetchData();
	}, []);

	return (
		<div className="p-4 text-center">
			<h1>Editar disponibilidad</h1>
			{isLoading && <Loading />}
			{!isLoading && isError && (
				<div className="flex h-[calc(100vh-180px)] items-center justify-center">
					<Empty description="No fue posible cargar los datos" />
				</div>
			)}
			{!isLoading && !isError && (
				<EditAvailabilityCarousel availabilitiesList={availabilitiesList} />
			)}
		</div>
	);
};

export default EditAvailability;
