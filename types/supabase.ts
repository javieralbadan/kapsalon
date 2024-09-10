export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			appointments: {
				Row: {
					created_at: string;
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
						isOneToOne: false;
						referencedRelation: 'customers';
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
					id: string;
					name: string;
					price: number;
					staff_member_id: string;
				};
				Insert: {
					created_at?: string;
					description?: string | null;
					id?: string;
					name?: string;
					price?: number;
					staff_member_id: string;
				};
				Update: {
					created_at?: string;
					description?: string | null;
					id?: string;
					name?: string;
					price?: number;
					staff_member_id?: string;
				};
				Relationships: [];
			};
			services_duplicate: {
				Row: {
					created_at: string;
					description: string | null;
					id: string;
					name: string;
					staff_member_id: string;
				};
				Insert: {
					created_at?: string;
					description?: string | null;
					id?: string;
					name?: string;
					staff_member_id: string;
				};
				Update: {
					created_at?: string;
					description?: string | null;
					id?: string;
					name?: string;
					staff_member_id?: string;
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
					created_at: string;
					email: string;
					first_name: string;
					id: string;
					last_name: string;
					phone_number: number;
				};
				Insert: {
					created_at?: string;
					email?: string;
					first_name: string;
					id?: string;
					last_name: string;
					phone_number: number;
				};
				Update: {
					created_at?: string;
					email?: string;
					first_name?: string;
					id?: string;
					last_name?: string;
					phone_number?: number;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
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
