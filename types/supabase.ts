export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string;
          customer_id: string;
          date_time: string;
          id: string;
          original_date: string | null;
          price_override: number | null;
          rating: number | null;
          service_id: string;
          staff_member_id: string;
          status: Database['public']['Enums']['appointment_status'];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          customer_id: string;
          date_time: string;
          id?: string;
          original_date?: string | null;
          price_override?: number | null;
          rating?: number | null;
          service_id: string;
          staff_member_id: string;
          status?: Database['public']['Enums']['appointment_status'];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          customer_id?: string;
          date_time?: string;
          id?: string;
          original_date?: string | null;
          price_override?: number | null;
          rating?: number | null;
          service_id?: string;
          staff_member_id?: string;
          status?: Database['public']['Enums']['appointment_status'];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'appointments_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'appointments_service_id_fkey';
            columns: ['service_id'];
            isOneToOne: false;
            referencedRelation: 'services';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'appointments_staff_member_id_fkey';
            columns: ['staff_member_id'];
            isOneToOne: false;
            referencedRelation: 'staff';
            referencedColumns: ['id'];
          },
        ];
      };
      customers: {
        Row: {
          created_at: string;
          email: string | null;
          first_name: string;
          id: string;
          last_name: string;
          last_session: string | null;
          phone_number: string;
          phone_verified: boolean;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          first_name: string;
          id?: string;
          last_name: string;
          last_session?: string | null;
          phone_number: string;
          phone_verified?: boolean;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          last_session?: string | null;
          phone_number?: string;
          phone_verified?: boolean;
        };
        Relationships: [];
      };
      services: {
        Row: {
          created_at: string;
          description: string | null;
          duration: number;
          id: string;
          name: string;
          price: number;
          staff_member_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          duration?: number;
          id?: string;
          name?: string;
          price?: number;
          staff_member_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          duration?: number;
          id?: string;
          name?: string;
          price?: number;
          staff_member_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'services_staff_member_id_fkey';
            columns: ['staff_member_id'];
            isOneToOne: false;
            referencedRelation: 'staff';
            referencedColumns: ['id'];
          },
        ];
      };
      shops: {
        Row: {
          address: string;
          created_at: string;
          id: string;
          id_backup: string;
          logo: string | null;
          name: string;
        };
        Insert: {
          address: string;
          created_at?: string;
          id: string;
          id_backup?: string;
          logo?: string | null;
          name: string;
        };
        Update: {
          address?: string;
          created_at?: string;
          id?: string;
          id_backup?: string;
          logo?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      staff: {
        Row: {
          active: boolean;
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          phone_number: string;
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
          phone_number: string;
          profile_image?: string | null;
          shop_id?: string | null;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          phone_number?: string;
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
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      appointment_status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      appointment_status: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
    },
  },
} as const;
