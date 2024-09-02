'use server';
import { createServiceInDB, getServicesFromDB } from 'db/services';
import { createStaffMemberInDB, getStaffMembersFromDB } from 'db/staffMembers';
import { ServiceInsert, ServicesResponseType } from 'types/services';
import { StaffMemberInsert, StaffMembersResponseType } from 'types/staffMembers';

export const fetchStaffMembers = async () => {
	const { data, error }: StaffMembersResponseType = await getStaffMembersFromDB();
	return { data, error };
};

export const createStaffMember = async (newStaffMember: StaffMemberInsert) => {
	const { data, error }: StaffMembersResponseType = await createStaffMemberInDB(newStaffMember);
	return { data, error };
};

export const fetchServices = async () => {
	const { data, error }: ServicesResponseType = await getServicesFromDB();
	return { data, error };
};

export const createService = async (newService: ServiceInsert) => {
	const { data, error }: ServicesResponseType = await createServiceInDB(newService);
	return { data, error };
};
