<<<<<<< Updated upstream
=======
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
>>>>>>> Stashed changes
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			appointments: {
				Row: {
					created_at: string;
<<<<<<< Updated upstream
					customer_id: string;
					date_time: string | null;
					id: string;
					price_override: number | null;
					rating: number | null;
					service_id: string;
					staff_member_id: string;
					status: Database['public']['Enums']['appointment_status'];
					time: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					customer_id: string;
					date_time?: string | null;
					id?: string;
					price_override?: number | null;
					rating?: number | null;
					service_id: string;
					staff_member_id: string;
					status?: Database['public']['Enums']['appointment_status'];
					time?: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					customer_id?: string;
					date_time?: string | null;
					id?: string;
					price_override?: number | null;
					rating?: number | null;
					service_id?: string;
					staff_member_id?: string;
					status?: Database['public']['Enums']['appointment_status'];
					time?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'appointments_customer_id_fkey';
						columns: ['customer_id'];
=======
					customer: string;
					date: string;
					id: string;
					rating: number | null;
					service_id: string;
					staff_member: string;
					time: string;
				};
				Insert: {
					created_at?: string;
					customer: string;
					date: string;
					id?: string;
					rating?: number | null;
					service_id: string;
					staff_member: string;
					time?: string;
				};
				Update: {
					created_at?: string;
					customer?: string;
					date?: string;
					id?: string;
					rating?: number | null;
					service_id?: string;
					staff_member?: string;
					time?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'public_appointments_customer_fkey';
						columns: ['customer'];
>>>>>>> Stashed changes
						isOneToOne: false;
						referencedRelation: 'customers';
						referencedColumns: ['id'];
					},
					{
<<<<<<< Updated upstream
						foreignKeyName: 'appointments_service_id_fkey';
=======
						foreignKeyName: 'public_appointments_service_id_fkey';
>>>>>>> Stashed changes
						columns: ['service_id'];
						isOneToOne: false;
						referencedRelation: 'services';
						referencedColumns: ['id'];
					},
					{
<<<<<<< Updated upstream
						foreignKeyName: 'appointments_staff_member_id_fkey';
						columns: ['staff_member_id'];
=======
						foreignKeyName: 'public_appointments_staff_member_fkey';
						columns: ['staff_member'];
>>>>>>> Stashed changes
						isOneToOne: false;
						referencedRelation: 'staff';
						referencedColumns: ['id'];
					},
				];
			};
			customers: {
				Row: {
					created_at: string;
					email: string;
					first_name: string;
					id: string;
					last_name: string;
					last_session: string | null;
					phone_number: number;
				};
				Insert: {
					created_at?: string;
					email: string;
					first_name: string;
					id?: string;
					last_name: string;
					last_session?: string | null;
					phone_number: number;
				};
				Update: {
					created_at?: string;
					email?: string;
					first_name?: string;
					id?: string;
					last_name?: string;
					last_session?: string | null;
					phone_number?: number;
				};
				Relationships: [];
			};
			services: {
				Row: {
					created_at: string;
					description: string | null;
<<<<<<< Updated upstream
					duration: number;
					id: string;
					name: string;
					price: number;
					staff_member_id: string;
=======
					id: string;
					name: string;
>>>>>>> Stashed changes
				};
				Insert: {
					created_at?: string;
					description?: string | null;
<<<<<<< Updated upstream
					duration?: number;
					id?: string;
					name?: string;
					price?: number;
					staff_member_id: string;
=======
					id: string;
					name?: string;
>>>>>>> Stashed changes
				};
				Update: {
					created_at?: string;
					description?: string | null;
<<<<<<< Updated upstream
					duration?: number;
					id?: string;
					name?: string;
					price?: number;
					staff_member_id?: string;
=======
					id?: string;
					name?: string;
>>>>>>> Stashed changes
				};
				Relationships: [];
			};
			shops: {
				Row: {
					address: string;
					created_at: string;
					id: string;
					logo: string;
					name: string;
				};
				Insert: {
					address: string;
					created_at?: string;
					id?: string;
					logo?: string;
					name: string;
				};
				Update: {
					address?: string;
					created_at?: string;
					id?: string;
					logo?: string;
					name?: string;
				};
				Relationships: [];
			};
			staff: {
				Row: {
<<<<<<< Updated upstream
					active: boolean;
					created_at: string;
					email: string;
=======
					availability: Json | null;
					created_at: string;
					email: string;
					enabled_notifications: boolean | null;
>>>>>>> Stashed changes
					first_name: string;
					id: string;
					last_name: string;
					phone_number: number;
<<<<<<< Updated upstream
					profile_image: string | null;
					shop_id: string | null;
				};
				Insert: {
					active?: boolean;
					created_at?: string;
					email?: string;
					first_name: string;
					id?: string;
					last_name: string;
					phone_number: number;
					profile_image?: string | null;
					shop_id?: string | null;
				};
				Update: {
					active?: boolean;
					created_at?: string;
					email?: string;
=======
				};
				Insert: {
					availability?: Json | null;
					created_at?: string;
					email?: string;
					enabled_notifications?: boolean | null;
					first_name?: string;
					id: string;
					last_name?: string;
					phone_number: number;
				};
				Update: {
					availability?: Json | null;
					created_at?: string;
					email?: string;
					enabled_notifications?: boolean | null;
>>>>>>> Stashed changes
					first_name?: string;
					id?: string;
					last_name?: string;
					phone_number?: number;
<<<<<<< Updated upstream
					profile_image?: string | null;
					shop_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'staff_shop_id_fkey';
						columns: ['shop_id'];
						isOneToOne: false;
						referencedRelation: 'shops';
						referencedColumns: ['id'];
					},
				];
			};
			staff_availability: {
				Row: {
					created_at: string;
					day_of_week: number;
					end_time: string;
					id: string;
					is_available: boolean;
					staff_member_id: string;
					start_time: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					day_of_week: number;
					end_time: string;
					id?: string;
					is_available?: boolean;
					staff_member_id: string;
					start_time: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					day_of_week?: number;
					end_time?: string;
					id?: string;
					is_available?: boolean;
					staff_member_id?: string;
					start_time?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'staff_availability_staff_member_id_fkey';
						columns: ['staff_member_id'];
						isOneToOne: false;
						referencedRelation: 'staff';
						referencedColumns: ['id'];
					},
				];
=======
				};
				Relationships: [];
>>>>>>> Stashed changes
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
<<<<<<< Updated upstream
			appointment_status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
=======
			[_ in never]: never;
>>>>>>> Stashed changes
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
	? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
	? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
	? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
	? PublicSchema['Enums'][PublicEnumNameOrOptions]
	: never;
