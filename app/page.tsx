"use server";
// import { signInWithGoogle } from "@utils/auth/googleAuth";
import ShopsList from "@components/ShopsList";
import { PostgrestError } from "@supabase/postgrest-js";
import { Database } from "types/supabase";
import { fetchShops } from "./actions";

type ShowRow = Database["public"]["Tables"]["shops"]["Row"];
interface ShowsResponseType {
  data: ShowRow[] | null;
  error: PostgrestError | null;
}

export default async function HomePage() {
  const { data, error } = await fetchShops();

  // handleCreateShop
  // const handleLogin = async () => {
  //   const next =
  //     typeof searchParams.next === "string" ? searchParams.next : undefined;
  //   try {
  //     await signInWithGoogle(next);
  //   } catch (error) {
  //     console.error("Error signing in", error);
  //     //TODO: Use Alert component to show error message
  //   }
  // };

  return (
    <main className="flex h-screen items-center justify-center lg:px-12 xl:px-44">
      <div className="min-w-[340px]">
        <h1>Bienvenid@</h1>
        <div className="mb-4 text-lg text-neutral-500">
          Agenda tu cita con solo tu email y número de whatsapp
        </div>
        <ShopsList data={data} error={error} />
        <button>Registrarme</button>
      </div>
    </main>
  );
}
